$(function () {
	initUI();
	bindEvent();
	initDepartmentTree();
});

/**
 * 初始化高度
 */
function initUI() {
	$('.left-content').height($(window).height() - 120);
	$('#departmentTree').height($(window).height() - 240);
	$('.right-content').height($(window).height() - 120);
	$('.table-ware').height($(window).height() - 170);
}

/**
 * 绑定事件
 */
function bindEvent() {
	$('#add_department_btn').click(addDepartment);
	$('#upd_department_btn').click(updDepartment);
	$('#del_department_btn').click(delDepartment);
}

/**
 * 初始化部门树
 */
function initDepartmentTree() {
	doPost('/department/treeData', {}, function (result) {
		if (result.result) {
			let zNodes = result.data;
			let setting = {
				data: {
					simpleData: {
						enable: true,
						idKey: 'id',
						pIdKey: 'pId',
						rootPId: null
					}
				},
				view: {
					selectedMulti: false	// 设置只能选中一个节点
				},
				callback: {
					onClick: deptClick
				}
			};
			$.fn.zTree.init($('#departmentTree'), setting, zNodes);
		}
	});
}

/**
 * 获取zTree对象
 */
function getZTreeObj(id) {
	return $.fn.zTree.getZTreeObj(id);
}

/**
 * 获取选中的节点
 */
function getSelectedNode(id) {
	let nodes = getZTreeObj(id).getSelectedNodes();
	if (!nodes || nodes.length === 0) {
		return null;
	}
	return nodes[0];
}

/**
 * 节点点击时触发 显示员工列表
 */
function deptClick (event, treeId, treeNode) {
	let departmentId = treeNode.id;
	initEmployeeList(departmentId);
}

/**
 * 添加部门，弹出输入框
 */
function addDepartment () {
	formReset('departmentForm');
	let currentNode = getSelectedNode('departmentTree');
	if (!currentNode) {
		$('#department_pId').val('');
		$('#department_pName').val('没有上级部门');
	} else {
		$('#department_pId').val(currentNode.id);
		$('#department_pName').val(currentNode.name);
	}
	openContent('添加部门', 400, 'departmentContent');
}

/**
 * 修改部门 弹出输入框
 */
function updDepartment () {
	formReset('departmentForm');
	let currentNode = getSelectedNode('departmentTree');
	if (!currentNode) {
		alertMsg('请选择需要修改的部门');
		return;
	}
	doPost('/department/queryOne', {id: currentNode.id}, function (result) {
		if (!result.result) {
			alertMsg(result.msg);
		} else {
			$('#department_id').val(result.data.id);
			$('#department_name').val(result.data.name);
			$('#department_pName').val(result.data.pName || '没有上级部门');
			openContent('修改部门', 400, 'departmentContent');
		}
	});
}

/**
 * 保存部门数据 后台执行添加或修改操作
 */
function saveDepartment () {
	let data = $('#departmentForm').getFormJson();
	if (data.name === '' || $.trim(data.name) == '') {
		tips('请输入部门名称', 'department_name');
		return;
	}
	let url = '/department/addDepartment';
	if (data.id) {
		url = '/department/updDepartment';
	}
	doPost(url, data, function (result) {
		if (!result.result) {
			alertMsg(result.msg);
		} else {
			let treeObj = getZTreeObj('departmentTree');
			let currentNode = getSelectedNode('departmentTree');
			if (result.data.type === 'add') {
				treeObj.addNodes(currentNode, result.data.data);
				alertMsg('添加成功', function () {
					closeLayer();
				});
			} else if (result.data.type === 'upd') {
				currentNode.name = result.data.data.name;
				treeObj.updateNode(currentNode);
				alertMsg('修改成功', function () {
					closeLayer();
				});
			}
		}
	});
}

/**
 * 删除部门，需要该部门没有下级部门，没有员工
 */
function delDepartment () {
	let currentNode = getSelectedNode('departmentTree');
	if (!currentNode || !currentNode.id) {
		alertMsg('请选择需要删除的部门');
		return;
	}
	if (currentNode.isParent) {
		alertMsg('有下级部门，不能删除!');
		return;
	}

	doPost('/department/delDepartment', {id: currentNode.id}, function (result) {
		if (!result.result) {
			alertMsg(result.msg);
		} else {
			let treeObj = getZTreeObj('departmentTree');
			treeObj.removeNode(currentNode);
			alertMsg('删除成功');
		}
	});
}

/**
 * 显示员工列表
 */
function initEmployeeList(departmentId) {
	doPost('/employee/queryList', {'departmentId': departmentId}, function (result) {
		if (!result.result) {
			alertMsg(result.msg);
		} else {
			if (result.data.length === 0) {
				$('#employeeTable tbody').html('<tr><td colspan="7">暂无数据.</td></tr>');
			} else {
				$('#employeeTable tbody').html('');
				result.data.forEach(function(item, index) {
					let _html = '<tr>'
										+ '	<td>' + item.name + '</td>'
										+ '	<td>' + item.age + '</td>'
										+ '	<td>' + ((item.sex == '1') ? '男' : '女') + '</td>'
										+ '	<td>' + item.departmentName + '</td>'
										+ '	<td>' + item.address + '</td>'
										+ '	<td>' + item.desc + '</td>'
										+ '	<td>'
										+ "		<a href=\"javascript:updEmployee('" + item.id + "')\">修改</a>"
										+ "		<a href=\"javascript:delEmployee('" + item.id + "')\">删除</a>"
										+ '	</td>'
										+ '</tr>';
					$('#employeeTable tbody').append($(_html));
				});
			}
		}
	});
}

/**
 * 添加员工 弹出窗口
 */
function addEmployee() {
	let currentNode = getSelectedNode('departmentTree');
	if (!currentNode || !currentNode.id) {
		alertMsg('请选择部门');
		return;
	}
	formReset('employeeForm');
	$('#employeeForm #employee_departmentId').val(currentNode.id);
	$('#employeeForm #employee_departmentName').val(currentNode.name);
	openContent('添加员工', 500, 'employeeContent');
}

/**
 * 修改员工，弹出窗口
 */
function updEmployee(employeeId) {
	formReset('employeeForm');
	doPost('/employee/queryOne', {id: employeeId}, function (result) {
		if (!result.result) {
			alertMsg(result.msg);
		} else {
			$("#employeeForm #employee_id").val(result.data.id);
			$("#employeeForm #employee_name").val(result.data.name);
			$("#employeeForm #employee_age").val(result.data.age);
			$("#employeeForm #employee_address").val(result.data.address);
			$("#employeeForm #employee_departmentName").val(result.data.departmentName);
			$("#employeeForm #employee_departmentId").val(result.data.departmentId);
			$("#employeeForm #employee_desc").val(result.data.desc);
			if(result.data.sex == '1') {
				$('#employeeForm #sex_1').prop('checked', true);
			} else {
				$('#employeeForm #sex_0').prop('checked', true);
			}
			openContent('修改员工', 500, 'employeeContent');
		}
	});
}


/**
 * 删除员工
 */
function delEmployee(employeeId) {
	doPost('/employee/delEmployee', {id: employeeId}, function (result) {
		if (!result.result) {
			alertMsg(result.msg);
		} else {
			let currentNode = getSelectedNode('departmentTree');
			initEmployeeList(currentNode.id);
			alertMsg('删除成功', function () {
				closeLayer();
			});
		}
	});
}

/**
 * 保存员工信息，后台执行 新增或修改
 */
function saveEmployee() {
	let data = $('#employeeForm').getFormJson();
	let url = '/employee/addEmployee';
	if (data.id) {
		url = '/employee/updEmployee';
	}
	doPost(url, data, function (result) {
		if (!result.result) {
			alertMsg(result.msg);
		} else {
			initEmployeeList(data.departmentId);
			alertMsg('保存成功', function () {
				closeLayer();
			});
		}
	});
}

package com.jfinal.core;

import com.jfinal.config.Constants;
import com.jfinal.config.JFinalConfig;
import com.jfinal.core.Config;
import com.jfinal.core.JFinal;
import com.jfinal.handler.Handler;
import com.jfinal.log.Logger;
import java.io.IOException;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public final class JFinalFilter implements Filter {

	public JFinalFilter() {}

	public void init(FilterConfig filterConfig) throws ServletException {
	}

	public void doFilter(ServletRequest req, ServletResponse resp, FilterChain chain) throws IOException, ServletException {
	}

	public void destroy() {
	}

	private void createJFinalConfig(String configClass) {
	}
}

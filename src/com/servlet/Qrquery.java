package com.servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;

import com.dao.DataDao;

/**
 * Servlet implementation class Qrquery
 */
@WebServlet("/Qrquery")
public class Qrquery extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private static  DataDao dataDao = new DataDao();
	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public Qrquery() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doPost(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		request.setCharacterEncoding("utf-8");
		response.setCharacterEncoding("utf-8");
		response.setContentType("text/html"); // 设置响应的类型
		//		String action 
		//		二维码记录的id信息
		String qrqueryid = request.getParameter("qrqueryid");
		//		设置cookie中id，网页查询的id
		String queryid = request.getParameter("queryid");
		//		设置action 当为qrquery 时，重定向，，为idshow时，前端查询
		String action = request.getParameter("action");
		PrintWriter out = response.getWriter();
		if ("qrquery".equals(action)) {
			qrquery(request,response,qrqueryid);
		}else if ("idshow".equals(action)) {
			JSONArray result =idshow(queryid);
			out.print(result);
		}
	}
	protected void qrquery(HttpServletRequest request, HttpServletResponse response,String qrqueryid) throws ServletException, IOException {
		// TODO Auto-generated method stub
		request.setCharacterEncoding("utf-8");
		response.setCharacterEncoding("utf-8");
		response.setContentType("text/html"); // 设置响应的类型
		Cookie cookie =new Cookie("qrqueryid",qrqueryid);//实例化一个Cookie对象
//		cookie.setMaxAge(7*24*60*60);         //设置Cookie生命周期(有效时间);单位:秒
		response.addCookie(cookie);       //添加Cookie到会话
//		request.getRequestDispatcher("/qrquery.html").forward(request, response);
		response.sendRedirect("qrquery.html");
	
	}
	protected  JSONArray idshow(String id) {
		JSONArray result = dataDao.qrquery(id);
		return result;
	}

}

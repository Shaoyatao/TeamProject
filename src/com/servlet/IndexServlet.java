package com.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.dao.UserDao;
import com.bean.User;

/**
 * Servlet implementation class IndexServlet
 */
@WebServlet("/IndexServlet")
public class IndexServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private UserDao userDao = new UserDao();
	User f = new User();

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
		String action = request.getParameter("action");
		String username = request.getParameter("username");
		String nocache = request.getParameter("nocache");
		//		System.out.println("action1:" + action + ";username:" + username
		//				+ ";nocache:" + nocache);
		if ("login".equals(action)) { // 用户登录
			System.out.println("运行Login");
			this.login(request, response);
		} else if ("exit".equals(action)) {// 用户退出
			this.exit(request, response);
		} else if ("register".equals(action)) { // 保存用户注册信息
			System.out.println("执行registrt");
			this.save(request, response);
		} else if ("checkUser".equals(action)) {// 检测用户名是否存在
			this.checkUser(request, response);
			//		} else if ("gettime".equals(action)) {
			//			this.gettime(request, response);
		} else if ("getuser".equals(action)) {
			this.getuser(request, response);
			//		} else if ("getlevel".equals(action)) {
			//			this.getlevel(request, response);
		} else if ("edituser".equals(action)) {
			this.edituser(request, response);
			//		} else if ("getlevel".equals(action)) {
			//			this.getlevel(request, response);
		}


	}
	private void login(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub


		System.out.println("login_username1="+request.getParameter("username"));
		String username = request.getParameter("username");
		System.out.println("login_username="+username);
		f.setUsername(username); // 获取并设置用户名
		//		f.setUsername(request.getParameter("username")); // 获取并设置用户名
		f.setPassword(request.getParameter("password")); // 获取并设置密码
		//		f.setLevel(request.getParameter("level")); // 获取并设置密码
		System.out.println("用户名："+username+"userDao："+userDao);
		System.out.println("userDao："+userDao);
		int r = userDao.login(f);
		System.out.println("r="+r);
		int result;
		// System.out.println("Uid="+r);
		if (r > 0) {// 当用户登录成功时
			HttpSession session = request.getSession();
			session.setAttribute("userName", f.getUsername());// 保存用户名
			session.setAttribute("uid", r);// 保存用户ID
			session.setAttribute("level", f.getLevel());
			result = 1;
		} else {// 当用户登录不成功时
			result = 0;
		}
		PrintWriter out = response.getWriter();
		out.print(result); // 输出执行结果
		out.flush();
		out.close();// 关闭输出流对象
	}

	/* 获得当前用户 */
	public void getuser(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		response.setContentType("text/html;charset=utf-8");
		request.setCharacterEncoding("utf-8");
		HttpSession session = request.getSession();
		String userName = (String) session.getAttribute("userName");
		String level = (String) session.getAttribute("level");
		System.out.println("getuser,level:"+level);
		PrintWriter out = response.getWriter();
		System.out.println("userName="+userName);
		if(null==userName){
			out.print("你好，请登录！;"+0); // 输出执行结果			
		}else{
			if(level.equals("1")){
				out.print(userName+";"+1);
			}else if(level.equals("2")){
				out.print(userName+";"+2);
			}else if(level.equals("3")){
				//				out.print("管理员:"+userName+",您好!;"+2);
				out.print(userName+";"+3);
			}
		}
		out.flush();
		out.close();// 关闭输出流对象
	}

	private void exit(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.setCharacterEncoding("utf-8");
		HttpSession session = request.getSession();// 获取HttpSession的对象
		System.out.println("session:"+session+";\t当前用户为："+session.getAttribute("username"));
		session.invalidate();// 销毁session
		//		System.out.println(" 销毁session:"+session);
		//		System.out.println("session:"+session+";\t当前用户为："+session.getAttribute("username"));
		System.out.println("成功退出！");
		PrintWriter out = response.getWriter();
		out.print("成功退出!");
		out.flush();
		out.close();// 关闭输出流对象
	}
	public void checkUser(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		//		User f = new User();
		String username = request.getParameter("username"); // 获取用户名		
		System.out.println("checkUser_username="+username);
		f.setUsername(username);
		String result = userDao.checkUser(f); // 调用UserDao类的checkUser()方法判断用户是否被注册
		response.setContentType("text/html");

		PrintWriter out = response.getWriter();
		out.print(result); // 输出检测结果
		out.flush();
		out.close();
	}
	/**
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 * 保存用户信息
	 */
	public void save(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		//		User f= new User();
		PrintWriter out = response.getWriter();
		//		String username = new String(request.getParameter("username").getBytes("ISO-8859-1"),"utf-8");
		String username = request.getParameter("username"); // 获取用户名
		String password = request.getParameter("password"); // 获取密码
		String level = request.getParameter("level"); // 获取密码
		String miyao = request.getParameter("miyao");
		System.out.println("save_username="+username+"password"+password+"miyao"+miyao);
		//		System.out.println("miyai="+miyao);
		String time = time();// 获取时间
		f.setUsername(username);
		f.setPassword(password);
		f.setTime(time);		
		System.out.println("username:" + username + ";password:" + password +";level:"+level+";f.getLevel():"+f.getLevel()
		+ ";time：" + time);
		//		String sql=null;
		String result=null;
		if(null==level) {
			if(miyao==""){
				//				System.out.println("秘钥判断");
				f.setLevel("1");
				result = userDao.save(f);// 保存用户信息
				out.print(result); // 输出执行结果
			}else if("sytsyt".equals(miyao)){
				//				System.out.println("秘钥正确判断");
				f.setLevel("2");
				result = userDao.save(f);// 保存用户信息
				out.print(result); // 输出执行结果
				//		}else if (miyao == null ){
				//			System.out.println("miyao == null");
				//			f.setLevel("1");
				//			result = userDao.save(f);// 保存用户信息
			}else {
				result="管理员注册密钥错误！";
				out.print(result);
			}
		}else if(level.equals("1")||level.equals("2")){
			f.setLevel(level);
			//			System.out.println("f.getLevel():"+f.getLevel());
			result = userDao.save(f);// 保存用户信息
			out.print(result); // 输出执行结果
		}else {
			result="用户管理错误！";
			out.print(result);
		}
		System.out.println("save_result:" + result);
		out.flush();
		out.close();// 关闭输出流对象
	}

	/**
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 * 编辑用户
	 */
	public void edituser(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		PrintWriter out = response.getWriter();
//		String id = request.getParameter("id"); // 获取用户名
		String username = request.getParameter("username"); // 获取用户名
		String password = request.getParameter("password"); // 获取密码
		String level = request.getParameter("level"); // 获取密码
		String result="";
		String upuservalue="";
		String arr[] = {username,password,level};	
		for(int i=0;i<arr.length;i++) {
			if(arr[i]!=null) {
				switch (i) {
				case 0:
//					upuservalue +="name="+"\'"+arr[0]+"\',";
					f.setUsername(arr[0]);
					break;
				case 1:
					upuservalue +="pwd="+"\'"+arr[1]+"\',";
					f.setPassword(arr[1]);
					break;
				case 2:
					upuservalue +="level="+"\'"+arr[2]+"\',";
					f.setLevel(arr[2]);
					break;

				default:
					break;
				}
				//				upuservalue +="\'"+ arr[i]+ "\',";
			}
			System.out.println("upuservalue:upuservalue:"+upuservalue+upuservalue.length());
		}
		if(upuservalue.length()>0) {
			upuservalue = upuservalue.substring(0,upuservalue.length()-1);
			System.out.println("upuservalue:"+upuservalue);
			result = userDao.upuser(f,upuservalue);// 保存用户信息
			out.print(result); // 输出执行结果
		}else {
			result="未获取到更新数据";
			out.print(result); // 输出执行结果
		}
	}

	public String time() {
		Date day = new Date();
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		//		System.out.println(df.format(day));
		String time = df.format(day);
		return time;
	}
}
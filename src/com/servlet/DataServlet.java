package com.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;

import com.bean.Plants;
import com.dao.DataDao;

/**
 * Servlet implementation class DataServlet
 */
@WebServlet("/DataServlet")
public class DataServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private static  DataDao dataDao = new DataDao();
	Plants plant = new Plants();
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
		String table = request.getParameter("table");
		String removeid = request.getParameter("removeid");
		String nocache = request.getParameter("nocache");
		System.out.println("编码格式："+response.getCharacterEncoding()+";action:" + action +";table:"+table +";nocache:" + nocache);
		PrintWriter out = response.getWriter();
		if ("query".equals(action)) {
			JSONArray result = query(table);
			out.print(result);
		}else if ("reorder".equals(action)) {
			String result =reorder(table);
			out.print(result);
		}else if ("dataremove".equals(action)) {
			String result =dataremove(table,removeid);
			out.print(result);
			//					}else if ("userupdata".equals(action)) {
			//						String result =userupdata(table,removeid);
			//						out.print(result);
			//						
		}else if ("inserdata".equals(action)) {
			String result =inserdata(request,response);
			out.print(result);

		}else if ("editdata".equals(action)) {
			String result =editdata(request,response);
			out.print(result);

		}else {
			out.print("没有数据操作");
		}
	}
	protected  JSONArray query(String table) {
		JSONArray result = dataDao.query(table);
		return result;
	}
	protected String reorder(String table) {
		System.out.println("重新排序table:" + table);
		String result = dataDao.ordertable(table);
		return result;
	}
	//	protected String userupdata(String table,String removeid) {
	//		System.out.println("重新排序table:" + table);
	//		String result = dataDao.dataremove(table,removeid);
	//		return result;
	//	}
	protected String dataremove(String table,String removeid) {
		System.out.println("数据删除table:" + table);
		String result = dataDao.dataremove(table,removeid);
		return result;
	}

	protected String editdata(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {		
		String name = request.getParameter("name");
		String family = request.getParameter("family");
		String genus = request.getParameter("genus");
		String local = request.getParameter("local");
		String purpose = request.getParameter("purpose");
		//		String time = request.getParameter("time");
		String time = time();// 获取时间
		String imgpath = request.getParameter("imgpath");
		String updatavalue ="";
		String plantsname=name;
		String arr[] = {name,family,genus,local,purpose,time,imgpath};	
		for(int i=0;i<arr.length;i++) {
			if(arr[i]!=null) {
				switch (i) {
				case 0:
//					updatavalue +="name="+"\'"+arr[0]+"\',";
					break;
				case 1:
					updatavalue +="family="+"\'"+arr[1]+"\',";
					break;
				case 2:
					updatavalue +="genus="+"\'"+arr[2]+"\',";
					break;
				case 3:
					updatavalue +="local="+"\'"+arr[3]+"\',";
					break;
				case 4:
					updatavalue +="purpose="+"\'"+arr[4]+"\',";
					break;
				case 5:
					updatavalue +="time="+"\'"+arr[5]+"\',";
					break;
				case 6:
					updatavalue +="imgpath="+"\'"+arr[6]+"\',";
					break;

				default:
					break;
				}
				//				upuservalue +="\'"+ arr[i]+ "\',";
			}
//			System.out.println("upuservalue:upuservalue:"+updatavalue.length());
		}
		updatavalue = updatavalue.substring(0,updatavalue.length() - 1);
		System.out.println("updatavalue:"+updatavalue);
		String result = dataDao.editupdata(updatavalue,plantsname);
		return result;		
	}
	/**
	 * @param request
	 * @param response
	 * @return String 插入数据成功|插入数据失败
	 * @throws ServletException
	 * @throws IOException
	 * 功能：向数据库中添加数据
	 * 描述：获取post请求接受前端提交需要添加的值
	 */
	protected String inserdata(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		/*
		 * insert into
		 * plants(`name`,`family`,`genus`,`local`,`purpose`,`time`,`imgpath`)
		 * values('甘蓝','十字花科','芸薹属','中国各地','甘蓝菜所含的植化素可以作为重要的抗氧化剂和抗炎相关慢性疾病的预防，
		 * 包含癌症。','2019','img/gl.jpg');
		 */				
		//		String table = request.getParameter("table");
		String table = "plants";
		String name = request.getParameter("name");
		String family = request.getParameter("family");
		String genus = request.getParameter("genus");
		String local = request.getParameter("local");
		String purpose = request.getParameter("purpose");
		//		String time = request.getParameter("time");
		String time = time();// 获取时间
		String imgpath = request.getParameter("imgpath");
		String result ="";
		String tablevalue = "";
		String arr1 ="";
		tablevalue = table+"(`name`,`family`,`genus`,`local`,`purpose`,`time`,`imgpath`)";
		if(table == "plants") {
			String arr[] = {name,family,genus,local,purpose,time,imgpath};			
			for(int i=0;i<arr.length;i++) {
				arr1 +="\'"+ arr[i]+ "\',";
				System.out.println("arr1:"+arr1);
			}
			//		}else if(table =="userdata") {
			//			tablevalue = table+"(`name`,`pwd`,`level`)";
			//			String arr[] = {name,pwd,level};	
			//			for(int i=0;i<arr.length;i++) {
			//				arr1 +="\'"+ arr[i]+ "\',";
			//			}
			arr1 = arr1.substring(0,arr1.length() - 1);
			result = dataDao.inserttable(tablevalue,arr1);
		}else {
			result="未知错误！";
		}
		return result;
	}

	/*
	 * public static void main(String[] args) {
	 * 
	 * //判断插入语句 String arr[] ={"甘蓝", "十字花科", "芸薹属", "中国各地",
	 * "甘蓝菜所含的植化素可以作为重要的抗氧化剂和抗炎相关慢性疾病的预防，包含癌症。", "2019", "img/gl.jpg"}; String arr1
	 * =""; for(int i=0;i<arr.length;i++) { arr1 +="\'"+ arr[i]+ "\',"; } arr1 =
	 * arr1.substring(0,arr1.length() - 1); String result = dataDao.inserttable(
	 * "plants(`name`,`family`,`genus`,`local`,`purpose`,`time`,`imgpath`)",arr1);
	 * 
	 * }
	 */
	public String time() {
		Date day = new Date();
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		//		System.out.println(df.format(day));
		String time = df.format(day);
		return time;
	}
}


package com.servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


import com.baidu.ai.aip.utils.HttpUtil;

import java.net.URLEncoder;
/**
 * Servlet implementation class PlantRecognition
 */
@WebServlet("/PlantRecognition")
public class PlantRecognition extends HttpServlet {
	private static final long serialVersionUID = 1L;
	static String imgdata ="";

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public PlantRecognition() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		//		response.getWriter().append("Served at: ").append(request.getContextPath());
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
		PrintWriter out = response.getWriter();
		imgdata = request.getParameter("img");
//		System.out.println("imgdata:"+imgdata);
		if(imgdata==null) {
			out.print("失败");
		}else {
			String result = PlantRecognition.plant();
			out.print(result);
		}
	}

	public static String plant() {
		// 请求url
		String url = "https://aip.baidubce.com/rest/2.0/image-classify/v1/plant";
		try {
//			 本地文件路径
//			String filePath = "F:\\JavaWebProject\\TeamProject\\src\\com\\servlet\\zhiwu1.jpg";
//			byte[] imgData = FileUtil.readFileByBytes(filePath);
//			System.out.println("imgData:"+imgData);
//			String imgStr = Base64Util.encode(imgData);
//			System.out.println("imgStr:"+imgStr);
//			System.out.println("imgdata:"+imgdata);
//			String imgParam = URLEncoder.encode(imgStr, "UTF-8");
			String imgParam = URLEncoder.encode(imgdata, "UTF-8");
//			System.out.println("imgParam:"+imgParam);

			String param = "image=" + imgParam;

			// 注意这里仅为了简化编码每一次请求都去获取access_token，线上环境access_token有过期时间， 客户端可自行缓存，过期后重新获取。
			String accessToken = "24.c7c9b6f2734c4fca82df564cbe2994e1.2592000.1579265793.282335-18058446";

			String result = HttpUtil.post(url, accessToken, param);
			System.out.println("result:"+result);
			return result;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

//	public static void main(String[] args) {
//		PlantRecognition.plant();
//	}

}

package com.tool;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Properties;

public class ConnDB {
	public static Connection conn = null; // 声明Connection对象的实例
	public Statement stmt = null; // 声明Statement对象的实例
	public ResultSet rs = null; // 声明ResultSet对象的实例
	private static String dbClassName = "com.mysql.jdbc.Driver"; // 定义保存数据库驱动的变量
//	private static String dbUrl = "jdbc:mysql://127.0.0.1:3306/plantsinfo?user=root&password=123456&characterEncoding=utf8";
	private static String dbUrl = "jdbc:mysql://101.200.148.140:3306/plantsinfo?user=root&password=123&characterEncoding=utf8";
//	private static String dbUrl = "jdbc:mysql://127.0.0.1:3306/sytproject?user=syt&password=qwe123&characterEncoding=utf8";
//	private static String dbUrl = "jdbc:mysql://127.0.0.1:3306/robot?user=root&password=123456&useunicode=true&characterencoding=gbk";
//	private static String dbUrl = "jdbc:mysql://localhost:3306/robot?&useunicode=true&characterencoding=gbk";
//	private static String USERNAME="root";
//	private static String PASS="123456";
//	static{
//		try {
//			Class.forName("com.mysql.jdbc.Driver");				
//		} catch (Exception e) {
//			e.printStackTrace();
//		}finally{
//		
//		}
//	}
//	
//	public static Connection getConnection(){
//		try {
//			conn = DriverManager.getConnection(dbUrl, USERNAME, PASS);
//			
//			System.out.println("getConnection");
//		} catch (Exception e) {
//			// TODO: handle exception
//			e.printStackTrace();
//		}
//		return conn;
//	}
	public static Connection getConnection() {
		Connection conn = null;
		try { // 连接数据库时可能发生异常因此需要捕捉该异常
//			Class.forName(dbClassName); // 装载数据库驱动
			 Class.forName(dbClassName).newInstance(); // 装载数据库驱动
			conn = DriverManager.getConnection(dbUrl); // 建立与数据库URL中定义的数据库的连接
//			System.out.println("dbUrl="+dbUrl);
//			System.out.println("链接成功conn1="+conn);
		} catch (Exception ee) {
			ee.printStackTrace(); // 输出异常信息
		}
		if (conn == null) {
			System.err
					.println("警告: DbConnectionManager.getConnection() 获得数据库链接失败.\r\n\r\n链接类型:"
							+ dbClassName + "\r\n链接位置:" + dbUrl); // 在控制台上输出提示信息
		}
		return conn; // 返回数据库连接对象
	}

	/*
	 * 功能：执行查询语句
	 */
	public ResultSet executeQuery(String sql) {
//		System.out.println("connDB执行查询语句！");
		try { // 捕捉异常
			conn = getConnection(); // 调用getConnection()方法构造Connection对象的一个实例conn
			stmt = conn.createStatement();
			rs = stmt.executeQuery(sql);
			System.out.println("connDB.rs="+rs);
		} catch (SQLException ex) {
			System.err.println("查询语句失败"+ex.getMessage()+",conn:"+conn+",stmt:"+stmt); // 输出异常信息
		}
//		System.out.println("rs:"+rs);
		return rs; // 返回结果集对象
	}

	/*
	 * 功能:执行更新操作
	 */
	public int executeUpdate(String sql) {
		int result = 0; // 定义保存返回值的变量
		try { // 捕捉异常
			conn = getConnection(); // 调用getConnection()方法构造Connection对象的一个实例conn
			stmt = conn.createStatement();
//			System.out.println("stmt:"+stmt);
			result = stmt.executeUpdate(sql); // 执行更新操作
//			System.out.println("sql:"+sql+"updataresult:"+result);
			result = 1;
		} catch (SQLException ex) {
			System.err.println("数据更新语句失败:"+ex.getMessage());
			result = 0; // 将保存返回值的变量赋值为0
		}
//		System.out.println("update:"+result);
		return result; // 返回保存返回值的变量
	}

	/*
	 * 功能:关闭数据库的连接
	 */
	public void close() {
		try { // 捕捉异常
			if (rs != null) { // 当ResultSet对象的实例rs不为空时
				rs.close(); // 关闭ResultSet对象
			}
			if (stmt != null) { // 当Statement对象的实例stmt不为空时
				stmt.close(); // 关闭Statement对象
			}
			if (conn != null) { // 当Connection对象的实例conn不为空时
				conn.close(); // 关闭Connection对象
			}
		} catch (Exception e) {
			e.printStackTrace(System.err); // 输出异常信息
		}
	}
}

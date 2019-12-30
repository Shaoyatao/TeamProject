package com.dao;

import java.sql.ResultSet;
import java.sql.SQLException;

import com.bean.User;
import com.tool.ConnDB;

public class UserDao {
	private ConnDB conn = null;

	public UserDao() {
		conn = new ConnDB();
	}

	// 验证用户的方法，返回值为1表示登录成功，否则表示登录失败
	public int login(User user) {
		int flag = 0;
		String sql = "SELECT * FROM userdata where name='"
				+ user.getUsername() + "'";
		System.out.println(sql);
		ResultSet rs = conn.executeQuery(sql);// 执行SQL语句
	
		try {
			if (rs.next()) {
				System.out.println("login_rs1="+rs);
				String pwd = user.getPassword();// 获取密码
				if (pwd.equals(rs.getString(3))) {
					flag=1;					
				} else {
					flag = 0;
				}
				user.setLevel(rs.getString(4));//设置用户等级
			} else {
				flag = 0;
			}
		} catch (SQLException ex) {
			ex.printStackTrace();// 输出异常信息
			flag = 0;
		} finally {
			conn.close();// 关闭数据库连接
		}
		System.out.println("flag="+flag);
		return flag;
	}

	/**
	 * 功能：检测用户名是否为空
	 * 
	 * @param sql
	 * @return
	 */
	public String checkUser(User user) {
		String sql = "SELECT * FROM userdata WHERE name='" + user.getUsername() + "'";
		ResultSet rs = conn.executeQuery(sql); // 执行查询语句
		String result = "";
		try {
			if (rs.next()) {
				result = "很抱歉，用户名：[" + rs.getString(2) + "]已经被注册！";// rs.getString(2)取第二条数据
			} else {
				result = "1"; // 表示用户没有被注册
			}
		} catch (SQLException e) {
			e.printStackTrace(); // 输出异常信息
		} finally {
			conn.close(); // 关闭数据库连接
		}
		return result; // 返回判断结果
	}

	/**
	 * 功能：保存用户注册信息
	 * 
	 * @param sql
	 * @return
	 */
	public String save(User user) {
		String sql = "INSERT INTO userdata (name,pwd,level,time) VALUE ('"
				+ user.getUsername()+ "','" + user.getPassword() + "','" + user.getLevel() + "','" + user.getTime() + "')";
		int rtn = conn.executeUpdate(sql); // 执行更新语句
		System.out.println("rtn:" + rtn + "\tsql:" + sql);
		String result = "";
		if (rtn > 0) {
			result = "1";
		} else {
			result = "注册失败！";
		}
		conn.close(); // 关闭数据库的连接
		return result; // 返回执行结果
	}
	public String upuser(User user,String upuservalue) {
		String sql="UPDATE userdata SET "+upuservalue+" WHERE name='"+ user.getUsername() +"';";
		int rtn = conn.executeUpdate(sql); // 执行更新语句
		System.out.println("rtn:" + rtn + "\tsql:" + sql);
		String result = "";
		if (rtn > 0) {
			result = "1";
		} else {
			result = "编辑失败！";
		}
		conn.close(); // 关闭数据库的连接
		return result; // 返回执行结果
	}
}
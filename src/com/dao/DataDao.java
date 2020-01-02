package com.dao;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.ArrayList;
import org.json.JSONArray;
import org.json.JSONObject;

import com.tool.ConnDB;
public class DataDao {
	private ConnDB conn = null;

	public DataDao() {
		conn = new ConnDB();
	}

	/**
	 * @param tablevalue
	 * @param arr
	 * @return
	 * 插入数据
	 */
	public String inserttable(String tablevalue,String arr) {
//		String sql = "INSERT INTO " + tablevalue +" VALUES ("+ arr +");";
		String sql = "INSERT INTO " + tablevalue +" VALUES ("+ arr +");";
		int rtn = conn.executeUpdate(sql); // 执行更新语句
		System.out.println("rtn:" + rtn + ";reordersql:" + sql);
		String result = "";
		if (rtn > 0 ) { 
			result = "插入数据成功！";
		} else {
			result = "插入数据失败！";
		}
		System.out.println("insertResult:" + result);
		conn.close(); // 关闭数据库的连接
		return result; // 返回执行结果
	}
	/**
	 * @param updatavalue
	 * @param plantsname
	 * @return
	 * 更新数据
	 */
	public String editupdata(String updatavalue,String plantsname) {
		String sql="UPDATE plants SET "+updatavalue+" WHERE name='"+ plantsname  +"';";
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
	/**
	 * @param table
	 * @return JSONArray array
	 * SQL查询语句
	 */
	public JSONArray query(String table) {
		String sql =  "select * from " + table + ";";
		JSONArray array = new JSONArray();
		System.out.println("sql:"+sql);
		ResultSet rs = conn.executeQuery(sql); // 执行查询语句
		try{
			ResultSetMetaData metaData =  rs.getMetaData();  
			int columnCount = metaData.getColumnCount();
			//			System.out.println("columnCount="+columnCount);
			while(rs.next()){
				JSONObject jsonObj = new JSONObject();
				for(int i= 1;i <= columnCount;i++) {
					String columnName = metaData.getColumnLabel(i);
					//					System.out.println("columnName="+columnName);
					String value =rs.getString(columnName);
					//					System.out.println("value="+value);
					jsonObj.put(columnName, value);
				}
				array.put(jsonObj);
				//				System.out.println("转换成josn数据");
				//					System.out.println(array.toString());
			}

		} catch (Exception e) {
			e.printStackTrace();// TODO: handle exception
		} finally {
			conn.close(); // 关闭数据库连接
		}
		return array;
	}
	public JSONArray qrquery(String id) {
		String sql =  "select * from plants where id="+id+";";
		JSONArray array = new JSONArray();
		System.out.println("sql:"+sql);
		ResultSet rs = conn.executeQuery(sql); // 执行查询语句
		try{
			ResultSetMetaData metaData =  rs.getMetaData();  
			int columnCount = metaData.getColumnCount();
			//			System.out.println("columnCount="+columnCount);
			while(rs.next()){
				JSONObject jsonObj = new JSONObject();
				for(int i= 1;i <= columnCount;i++) {
					String columnName = metaData.getColumnLabel(i);
					//					System.out.println("columnName="+columnName);
					String value =rs.getString(columnName);
					//					System.out.println("value="+value);
					jsonObj.put(columnName, value);
				}
				array.put(jsonObj);
				//				System.out.println("转换成josn数据");
				//					System.out.println(array.toString());
			}
			
		} catch (Exception e) {
			e.printStackTrace();// TODO: handle exception
		} finally {
			conn.close(); // 关闭数据库连接
		}
		return array;
	}


	/**
	 * 
	 * 功能：删除数据库对应值
	 * 实现方式：获取参数
	 * 
	 * @param table
	 * @param removeid
	 * @return
	 */
	public String dataremove(String table,String removeid) {
		String sql = "delete from " + table + " where id = '" + removeid + "';";
		System.out.println("查询Sql:" + sql);
		int rtn = conn.executeUpdate(sql);
		String result = "";
		if (rtn > 0) {
			result = "删除成功！";
		} else {
			result = "删除失败！";
		}
		conn.close(); // 关闭数据库的连接
		return result; // 返回执行结果
	}

	public JSONArray querynum() {
		String sql = "SELECT family AS name,COUNT(family) AS num FROM plants GROUP BY family";
		System.out.println("查询数量Sql:" + sql);
		ResultSet rs = conn.executeQuery(sql); // 执行查询语句
		JSONArray array = new JSONArray();
		System.out.println("sql:"+sql);
		try{
			ResultSetMetaData metaData =  rs.getMetaData();  
			int columnCount = metaData.getColumnCount();
			//			System.out.println("columnCount="+columnCount);
			while(rs.next()){
				JSONObject jsonObj = new JSONObject();
				for(int i= 1;i <= columnCount;i++) {
					String columnName = metaData.getColumnLabel(i);
					//					System.out.println("columnName="+columnName);
					String value =rs.getString(columnName);
					//					System.out.println("value="+value);
					jsonObj.put(columnName, value);
				}
				array.put(jsonObj);
				//				System.out.println("转换成josn数据");
				//					System.out.println(array.toString());
			}

		} catch (Exception e) {
			e.printStackTrace();// TODO: handle exception
		} finally {
			conn.close(); // 关闭数据库连接
		}
		return array;

	}
	
	/**
	 * 
	 * 功能:对数据库id重新排序
	 * 实现方式： 先删除id列，再添加自动排序
	 * 
	 * 
	 * @param table
	 * @return  
	 */
	public String ordertable(String table) {
		String sql = "alter table " + table + " drop column id;";
		String sql1 = "alter table " + table
				+ " add id int(10) not null primary key auto_increment first;";
		int rtn = conn.executeUpdate(sql); // 执行更新语句
		int rtn1 = conn.executeUpdate(sql1); // 执行更新语句
		System.out.println("rtn:" + rtn + ";reordersql:" + sql);
		System.out.println("rtn1:" + rtn1 + ";reordersql1:" + sql1);
		String result = "";
		if (rtn > 0 && rtn1 > 0) { // rtn1是什么
			result = "重新排序成功！";
		} else {
			result = "重新排序失败！";
		}
		System.out.println("orderResult:" + result);
		conn.close(); // 关闭数据库的连接
		return result; // 返回执行结果
	}

	
}

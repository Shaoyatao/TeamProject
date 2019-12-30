package com.bean;

public class User {
	private String id = "";
	private String username = "";
	private String password = "";
	private String level = "";
	private String sign_time="";
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getLevel() {
		return level;
	}

	public void setLevel(String level) {
		this.level = level;
	}
	public String getTime() {
		return sign_time;
	}
	
	public void setTime(String sign_time) {
		this.sign_time = sign_time;
	}
	public static void main(String[] args) {
		System.out.println("hello");
	}
}

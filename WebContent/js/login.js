$(document).ready(function() {
	/*下划线切换*/
	$(".card").slideDown(500);
	$('[data-toggle="popover"]').popover();   
	$("#landing").addClass("border-btn");
	$("#registered").click(function() {
		$("#landing").removeClass("border-btn");
		$("#landing-content").hide(500);
		$(this).addClass("border-btn");
		$("#registered-content").show(500);
	})

	$("#landing").click(function() {
		$("#registered").removeClass("border-btn");
		$(this).addClass("border-btn");

		$("#landing-content").show(500);
		$("#registered-content").hide(500);
	})
	/*点击登录，开始用户登录验证*/
	$("#but_login").click(function() {
		if ($("#log_username").val() == "") { //
//			$(".popover").addClass("bg-warning")
			$("#log_username").attr("data-content","<span class='text-warning'>请填写此字段</span>")
			$("#log_username").focus(); //
			return false;
		} else if ($("#log_password").val() == "") {
			$("#log_password").attr("data-content","<span class='text-warning'>请填写此字段</span>")
			$("#log_password").focus();
			return false;	
		}else { 
			$.post("IndexServlet?action=login&username="+$("#log_username").val()+"&password="+$("#log_password").val()+ "&nocache=" + new Date().getTime(),
					function(data){
				if(data==1){

//					var success =confirm("登录成功！是否返回主页？");
//					if(success){
					window.location ="home.html";
//					window.location ="manage.html";
//					window.location ="https://www.baidu.com/index.php";
//					}else $("input").val("");							  							
				}else{
					bootbox.alert({
						title: "提示",
						message: "您输入的用户名或密码错误，请重新输入！",
						closeButton:false
					})
//					$("#log_username").attr("data-content","<span class='text-danger'>您输入的用户名或密码错误，请重新输入！</span>")
					$("#log_username").focus();
					$("#log_password").val("");
				}				
			});
		}
	});
	/*清除提示*/
	$("input").blur(function(){
		$("input").attr("data-content","")
	});
	/*用户注册*/
	$("#but_register").click(function() {
		if ($("#reg_username").val() == "") { // 判断是否输入用户名
			$("#reg_username").attr("data-content","<span class='text-warning'>请填写此字段</span>")
			$("#reg_username").focus(); // 让用户名文本框获得焦点
			return false;
		} else if ($("#reg_password").val() == "") {
			$("#reg_password").attr("data-content","<span class='text-warning'>请填写此字段</span>")
			$("#reg_password").focus();
			return false;
		} else if ($("#reg_password1").val() == "") {
			$("#reg_password1").attr("data-content","<span class='text-warning'>请填写此字段</span>")
			$("#reg_password1").focus();
			return false;
		} else if ($("#reg_password").val() != $("#reg_password1")
				.val()) {
			$("#reg_password1").attr("data-content","<span class='text-danger'>输入密码不一致</span>")
			$("#reg_password1").focus();
			return false;
		} // 已经输入用户名时，检测用户名是否唯一
		else{//检查用户名是否已被注册
			$.post("IndexServlet?action=checkUser&username=" +$("#reg_username").val() + "&nocache=" + new Date().getTime(), 
					function(data){
				if(data==1){
					$.post("IndexServlet?action=register&username="
							+ $("#reg_username").val() + "&password="
							+ $("#reg_password").val() + "&miyao="
							+ $("#reg_miyao").val()+"&nocache="
							+ new Date().getTime(), 
							function(data) {
								if(data==1){
									bootbox.alert({
										title: "提示",
										message: "恭喜您，注册成功",
										closeButton:false
									})
									$("input").val("");
									$("#landing").trigger("click")
									/*var success =confirm(data+"是否返回登录？");
									if(success){
										$("#landing").trigger("click")
//										window.location ="Login.html";
									}else $("input").val("");*/
								}else{
//									alert(data);
									bootbox.alert({
										title: "提示",
										message: data,
										closeButton:false
									})
									$("#reg_miyao").val("");
									$("#reg_miyao").focus();
								}
							});

				}else{
//					alert(data);
					bootbox.alert({
						title: "提示",
						message: data,
						closeButton:false
					})
					$("#username").focus();
					$("#password").val("");
					$("#password1").val("");
				}
			});

		}
	});
});
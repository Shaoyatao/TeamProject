/**
 * 
 */
/*导航栏加粗*/
;(function ($, window) {
//	$(document).ready(function(){  
	$(".menu li").removeClass("active");
	$(".menu li a").each(function(){  
		$this = $(this); 
//		console.log($this);
		if($this[0].href==String(window.location)){  
//			console.log($this[0].href,String(window.location));
			$this.parent().addClass("active");  
		}  
	});  
	//用户退出
	$("#exitbtn").click(function(){		
		$.get("IndexServlet?action=exit&nocache="+ new Date().getTime(),function(data){
			window.location ="home.html";
			$("#hrefexit").hide();
			$("#hreflogin").show();
			console.log(data);
		});		
	});	
	/*	$("#hrefexit").click(function(){
		var success =confirm("是否退出登录？");
		if(success){
//			$("#hrefexit").html("<a class='nav-link' id='hreflogin' href='login.html'>登录</a>");
			$("#hrefexit").attr("href","login.html");
			$("#hrefexit").html("登录");
			$("#hrefexit").attr("id","hreflogin");
			$.get("IndexServlet?action=exit&nocache="+ new Date().getTime(),function(data){
//				window.location ="manage.html";
				alert(data);
			});		
		}
	});*/
	//检测用户
	$.get("IndexServlet?action=getuser&nocache="+ new Date().getTime(),function(data){		
		var arr=data.split(";");
		result =arr[0];
		level = arr[1];
//		console.log("level",level);
		//用户未登录
		if(level==0){ 
		$("#hrefexit").hide();
		$("#hreflogin").show();
		$("#li_manager").hide();
//		$("#li_commonuser").show();	
		}else{
		$("#hrefexit").show();
		$("#hreflogin").hide();
		//不同等级用户管理权限
			if(level==1){// 普通用户
				$("#li_manager").hide();
				$("#li_commonuser").show();				
			}else if(level==2){
				$("#li_manager").hide();
				$("#li_commonuser").show();
			}else if(level==3){
				$("#li_manager").show();
				$("#li_commonuser").hide();
			}
		//不同等级用户管理权限
		}
	});	
/*	$("#hrefdetail").click(function(){
		console.log("all---hrefdetail被点击");
	});
	$("#btn_userdata").click(function(){
		if(String(window.location).indexOf('detail')){  
			window.location ="detail.html"; 
		}
		console.log("all---btn_userdata被点击");
	});
	$("#btn_imgdata").click(function(){
		
		console.log("all---btn_imgdata被点击");
	});*/
})(jQuery, window);
//function getuser(){
//result =""
//level =0
//$.get("IndexServlet?action=getuser&nocache="+ new Date().getTime(),function(data){
////window.location ="manage.html";
////alert(data);
//console.log("用户:"+data);
//var arr=data.split(";");
//result =arr[0];
//level = arr[1];
//console.log("result:"+result+"level:"+level);
////用户未登录
//if(level==0){ 
//$("#hrefexit").hide();
//$("#hreflogin").show();
//}else{
//$("#hrefexit").click(function(){
//$.get("IndexServlet?action=exit&nocache="+ new Date().getTime(),function(data){
////window.location ="manage.html";
//$("#hrefexit").hide();
//$("#hreflogin").show();
//console.log(data);
//});		
//});	
//$("#hrefexit").show();
//$("#hreflogin").hide();
////不同等级用户管理权限
//if(level==1){

//}else if(level==2){

//}
//}
//return {
//getuser_name:result,
//getuser_level:level,
//}
//});	
//}


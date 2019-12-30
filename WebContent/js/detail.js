'use strict';
/*var activebutton = "btn_example";
$(".pp-filter-button").on("click", function(e) {
	// remove btn-primary from all buttons first
	$(".pp-filter-button").removeClass("btn-primary");
	$(".pp-filter-button").addClass("btn-outline-primary");
	$(".pp-content>div").hide();
	// add btn-primary to active button
	var button = $(this);
	button.removeClass("btn-outline-primary");
	button.addClass("btn-primary");
	show(button.attr("id"));
//	showtable(activeFilter);
	initpage();
	getuser();

	$('.Ktext').val("") //查询框清空
	e.preventDefault();
})*/
;$(function(){
	getuser();
	initpage();
	$('.Ktext').val("") //查询框清空
});
/**
 * 获取表
 * @returns
 */
var user = getuser();
var table = activetable();
function activetable(){
	let table="";
	if(String(window.location).indexOf('plants')>=0){  
		table="plants";		
	}else if(String(window.location).indexOf('userdata')>=0){
		table="userdata";
	}
	return table
};

/**
 * 获取用户
 * @returns
 */
function getuser(){
	var result;
	var level;
	$.ajaxSettings.async = false;
	$.get("IndexServlet?action=getuser&nocache="+ new Date().getTime(),function(data){
//		window.location ="manage.html";
//		alert(data);
		console.log("用户:"+data);
		let arr=data.split(";");
		result = arr[0];
		level = arr[1];
//		console.log("result:"+result+"level:"+level);
		//用户未登录
		if(level==0){ 
			$("#hrefexit").hide();
			$("#hreflogin").show();
		}else{
			$("#hrefexit").show();
			$("#hreflogin").hide();
			//不同等级用户管理权限
//			if(level==1){

//			}else if(level==2){

//			}
		}
	});	
//	return level;
	console.log("result:"+result+"level:"+level);
	$.ajaxSettings.async = true;
	return{
		getuser_name:result,
		getuser_level:level
	}
}


/*function show(activebtn) {
//	if(activebtn === activebutton) {
//	return;
//	}else {
	activebutton=activebtn
//	}

	var show_div=activebutton.replace("btn","show")
//	console.log("activebutton:"+activebutton);
	$(".pp-content>div").each(function () {

		var showdiv = $(this);
//		showdiv.hide();
//		showdiv.fadeOut();
//		showdiv.slideUp("slow")
		if(showdiv.attr("id")==show_div){
//			showdiv.show()
			showdiv.fadeIn("300")
//			showdiv.slideDown("slow")
		}
	});
}*/



/**
 * 表格显示
 * @param params
 * @param table
 * @returns
 */
function getData(params,table) {
	var data=[];
//	console.log("params:"+params+";activebutton:"+activebutton);
	$.ajaxSettings.async = false;
	if(table =="userdata"|| table =="plants"){
		$.get("DataServlet?action=query&table="+table +"&nocache=" + new Date().getTime(), 
				function(result){
			data=result
			/*console.log("data类型："+typeof(result)+"data:"+data+";result:"+result);*/
//			alert("接收到数据data:"+data);
//			alert("接收到数据data:"+data);
//			$(".info_search").html(data);
		},"JSON");
	}	
	$.ajaxSettings.async = true;
//	console.log("data类型："+typeof(data)+"data:"+data);
	var start = (params.current - 1) * params.size;
	var end = params.current *params.size;
	var seachdata=[];
	var seachcloVal=""
		var seachVal=""
			var optionval=""
//				$(".search_btn").click(function(){
				for (var i = 0; i < data.length; i++) {
					var item = data[i];
//					var seachclo=$(".T-sort option:selected").val().splice(0,4);
					if(table=='userdata'){
						var optionval=$(".T-sort>option:selected").val();
//						var optionval=$("#show_userdata .T-sort>option:selected").val();
						var seachVal=$('.Ktext').val().trim();
//						var seachVal=$('#show_userdata .Ktext').val('');

					}else if(table=='plants'){
//						var optionval=$("#show_imgdata .T-sort>option:selected").val();
						var optionval=$(".T-sort>option:selected").val();
						var seachVal=$('.Ktext').val().trim();
//						var seachVal=$('#show_imgdata .Ktext').val('');
					}
//					console.log($(".T-sort>option").val());
//					optionval的值为data_id 或者 user_id 截取5位以后字符
					var seachclo=optionval.slice(5);
					switch(seachclo) {
					case 'id':
						seachcloVal=item.id;
						break;
					case 'name':
						seachcloVal=item.name;
						break;
						/*case 'pwd':
						seachcloVal=item.pwd;
						break;*/
					case 'level':
						seachcloVal=item.level;
						break;
					case 'family':
						seachcloVal=item.family
						break;
					case 'genus':
						seachcloVal=item.genus
						/*seachcloVal=item.filename.replace(/_/g,":");*/
						break;
					case 'local':
						seachcloVal=item.local;
						break;
					case 'purpose':
						seachcloVal=item.purpose;
						break;
					case 'time':
						seachcloVal=item.time;
//						console.log("seachcloVal:"+typeof(seachcloVal));
						break;
					default:
						seachcloVal="";
					break;
					} 

					//属性未输入时，可能报错
					try{
						//先从上到下执行try里面的语句，一旦发现错误则跳出try，不再执行try下面的语句
						if(seachcloVal.indexOf(seachVal)>-1){
							seachdata.push(item);
						}
					}catch(e){
						//如果try中发现错误，则执行catch中的语句，如果没有错误，则跳过catch
						//e是个系统封装好的对象，包含name和message两个属性
						//分别是错误名称(ex:ReferenceError)和错误信心(ex:b is not defined)
						console.log("查询出错，错误信息："+e.name+":"+e.message);
					}

				}	
//	});

	return {
		total: data.length,
		list: data.splice((params.current - 1) * params.size, params.size ),
		seachdata_seachVal:seachVal||'',
		seachdata_total:seachdata.length||0,
		seachdata_list: seachdata.splice((params.current - 1) * params.size, params.size )||''
	}
}
//设置tbody的html
function setTbody (arr,table) {
	var html = "";
	if(arr.length==0){
		$(".pp-manage #show_tbody").html(html);
		return
	}
	if(table =="plants"){
		for (var i = 0; i < arr.length; i++) {
			var item = arr[i];
			/*字符替换*/
//			$.ajaxSettings.async = false;
//			var falename=item.filename.replace(/_/g,":");
//			var time = item.time.replace(/_/g,":");
			if(user.getuser_level>=2){
//				html += "<tr><td>" + item.id + "</td><td>" + item.name + "</td><td>" + item.family + "</td><td>" + item.genus + "</td><td>" + item.local + "</td><td>" + item.purpose + "</td><td>" + item.time + "</td><td><button  type='button' class='btn btn-info' data-imgid='"+item.id+"' data-toggle='modal' data-target='#exampleModal'>查看</button><button type='button' class='btn btn-danger' id='btn_imgremove' data-imgid='"+item.id+"'>删除</button></td></tr>";
				html += "<tr><td>" + item.id + "</td><td>" + item.name + "</td><td>" + item.family + "</td><td>" + item.genus + "</td><td>" + item.local + "</td><td>" + item.purpose + "</td><td>" + item.time + "</td><td><button  type='button' class='btn btn-info' data-imgid='"+item.id+"' data-toggle='modal' data-target='#exampleModal'>查看</button><button type='button' class='btn btn-danger' id='btn_imgremove' data-imgid='"+item.id+"'>删除</button><button type='button' class='btn btn-info' id='btn_imgedit' data-imgid='"+item.id+"' data-toggle='modal' data-target='#editModal'>编辑</button></td></tr>";
			}else{
				html += "<tr><td>" + item.id + "</td><td>" + item.name + "</td><td>" + item.family + "</td><td>" + item.genus + "</td><td>" + item.local + "</td><td>" + item.purpose + "</td><td>" + item.time + "</td><td><button type='button' class='btn btn-info' data-imgid='"+item.id+"' data-toggle='modal' data-target='#exampleModal'>查看</button></td></tr>";
			}
			/*console.log(html);*/
//			$(".pp-manage #show_tbody").html(html);
			$(".pp-manage #show_tbody").html(html);
//			$.ajaxSettings.async = true;
		}
//		$("#btn_imgremove").click(function(){
//		alert("1");

//		});		
		$("#show_tbody button").click(function(){
			//删除按键
			if($(this).attr("id")=="btn_imgremove"){
				if(user.getuser_level < 2){
					bootbox.alert({
						title: "提示",
						message: user.getuser_level+"没有数据删除操作权限！",
						closeButton:false
					});
					return
				}
				var id = $(this).data("imgid")
//				alert("11"+$(this).data("imgid"));
				bootbox.confirm({
					title: "提示",
					closeButton:false,
					message: "是否确认删除该条数据?",
					buttons: {
						confirm: {
							label: 'Yes',
							className: 'btn-success'
						},
						cancel: {
							label: 'No',
							className: 'btn-danger'
						}
					},
					callback: function (result) {
						console.log('This was logged in the callback: ' + result);
						if(result ){
							$.get("DataServlet?action=dataremove&removeid=" +id+"&table=plants&nocache="
									+ new Date().getTime(), function(data) {
//								alert(data);
								bootbox.alert({
									title: "提示",
									message: data,
									closeButton:false
								})
								$("#search_btn").trigger("click")
							});}
					}
				});
				/*$.get("DataServlet?action=dataremove&removeid=" +id+"&table=plants&nocache="
						+ new Date().getTime(), function(data) {
					alert(data);
					bootbox.alert({
						title: "提示",
						message: data,
						closeButton:false
					})
					$("#search_btn").trigger("click")
				});*/
			}else if($(this).attr("id")=="btn_imgedit"){
				$("#edit_plansadd_btn_sure").hide();
				$("#edit_btn_sure").show();
				$("#plant_name").attr("disabled","disabled");
				$("#data_edit_title").text("编辑");
			}

			/*
			 * 查看按键
			 * 查看按钮匹配对应的图片id
			 * 编辑按钮匹配对应的信息
			 * */

			for (var i = 0; i < arr.length; i++) {
				var img_id=$(this).data("imgid")
				var item = arr[i];
				if(img_id==item.id){
					$("#img_path").attr('src',item.imgpath)
					$("#plant_name").val(item.name)
					$("#plant_family").val(item.family)
					$("#plant_genus").val(item.genus)
					$("#plant_local").val(item.local)
					$("#plant_purpose").val(item.purpose)
					$("#plant_imgpath").val(item.imgpath)
				}
			}			
		});	
	}
	//用户表
	else if(table =="userdata"){
		for (var i = 0; i < arr.length; i++) {
			var item = arr[i];
			if(user.getuser_level==3){
				$("#th_user").show();
//				html += "<tr><td>" + item.id + "</td><td>" + item.name + "</td><td>" + item.level + "</td><td>" + item.time + "</td><td><button  type='button' id='btn_usredit' class='btn btn-link' data-usrid='"+item.id+"' data-toggle='modal' data-target='#userModal'>编辑</button><button type='button' class='btn btn-link' id='btn_usrremove' data-usrid='"+item.id+"'>删除</button></td></tr>";
//				html += "<tr><td>" + item.id + "</td><td>" + item.name + "</td><td>" + item.level + "</td><td>" + item.time + "</td><td><button type='button' class='btn btn-danger' id='btn_usrremove' data-usrid='"+item.id+"'>删除</button></td></tr>";
				html += "<tr><td>" + item.id + "</td><td>" + item.name + "</td><td>" + item.level + "</td><td>" + item.time + "</td><td><button type='button' class='btn btn-danger' id='btn_userremove' data-userid='"+item.id+"'>删除</button><button type='button' class='btn btn-info' id='btn_imgedit' data-userid='"+item.id+"' data-toggle='modal' data-target='#editModal'>编辑</button></td></tr>";
			}else{
				$("#th_user").hide();
				html = "暂无权限！";
//				html += "<tr><td>" + item.id + "</td><td>" + item.name + "</td><td>" + item.level + "</td><td>" + item.time + "</td></tr>";
			}

			/*console.log(html);*/
			$(".pp-manage #show_tbody").html(html);
		}
		/*			$("#edit_btn").click(function(){
//				alert("22");
				console.log(11);
//				$.get("DataServlet?action=userupdata&removeid=" +id+"&table=userdata&nocache="
//						+ new Date().getTime(), function(data) {
//					
//					
//				})
			});*/
		$("#show_tbody button").click(function(){
			for (var i = 0; i < arr.length; i++) {
				var img_id=$(this).data("userid")
				var item = arr[i];
				if(img_id==item.id){
					$("#user_username").val(item.name);
					$("#user_password").val(item.pwd);
					$("#user_level").val(item.level)	;
					break;
				}
			}
			//删除按键
			if($(this).attr("id")=="btn_userremove"){
				if(user.getuser_level < 3){
					bootbox.alert({
						title: "提示",
						message: user.getuser_level+"没有用户删除操作权限！",
						closeButton:false
					});
					return
				}
				var id = $(this).data("userid")
//				alert("11"+$(this).data("usrid"));
				bootbox.confirm({ 
					message: "是否确认删除该条数据?",
					buttons: {
						confirm: {
							label: '确定',
							className: 'btn-success'
						},
						cancel: {
							label: '取消',
							className: 'btn-danger'
						}
					},
					title: "提示",
					closeButton:false,
					callback: function (result) {
						console.log('This was logged in the callback: ' + result);
						if(id !==1 && result){
							$.get("DataServlet?action=dataremove&removeid=" +id+"&table=userdata&nocache="
									+ new Date().getTime(), function(data) {
//								alert(data);
								bootbox.alert({
									title: "用户删除提示",
									message: data,
									closeButton:false
								})
								$("#search_btn").trigger("click")
							});
						}else if(id == 1 && result){
							bootbox.alert({
								title: "用户删除提示",
								message: "不能删除最高权限用户",
								closeButton:false
							});
							return;
						}
					}
				});

			}else if($(this).attr("id")=="btn_imgedit"){
				$("#edit_useradd_btn_sure").hide();
				$("#edit_btn_sure").show();
				$("#user_username").attr("disabled","disabled");
				$("#data_edit_title").text("编辑");


			}
		});	
	}
	/*编辑按钮点击*/
//	$("#btn_imgedit").click(function(){
//	if(table == "userdata"){
//	$("#edit_useradd_btn_sure").hide();
//	$("#edit_btn_sure").show();
//	}else if(table == "plants"){
//	$("#edit_plansadd_btn_sure").hide();
//	$("#edit_btn_sure").show();
//	}
//	});
}

/*编辑确认按键点击*/
$("#edit_btn_sure").click(function(){
	if(user.getuser_level < 2){
		bootbox.alert({
			title: "数据编辑提示",
			message: "用户权限不够",
			closeButton:false
		});
		return false;
	}
	let obj = {};
	let flag=true;
	console.log("edit_btn_sure被点击");		
	$("#xztb input").each(function() {
//		let str ="";
		let data_key ="";
		let data_value ="";
		data_key = $(this).attr('id');
		if(table=="plants"){
			data_key = data_key.slice(6);//去除plant_name的 前六个字符 留下name
		}else if (table == "userdata"){
			data_key = data_key.slice(5);
			obj["level"]= $("#xztb select").val();
		}else {
			bootbox.alert({
				title: "数据编辑提示",
				message: "找不到表",
				closeButton:false
			});
			flag=false;
			return false;
		};
		data_value= $(this).val();
//		str =$(this).attr('id')+":"+ $(this).val();
//		将数据保存到josn对象中
		obj[data_key]=data_value;
//		console.log("str："+str);
	});
	if(!flag){
		return false;
	}
	obj["nocache"] = new Date().getTime();
	console.log(obj);
//	$("#xztb").find("input").val();
	if(table=="plants"){
		$.ajaxSettings.async = false;
		$.post("DataServlet?action=editdata",obj,
				function(data) {
			if(data==1){
				bootbox.alert({
					title: "提示",
					message: "更新成功",
					closeButton:false
				})
//				$("#xztb input").val("");
				$("#edit_btn_cancel").trigger("click");
				$("#search_btn").trigger("click");
			}else{
				bootbox.alert({
					title: "提示",
					message: data,
					closeButton:false
				})
			}
		});
		$.ajaxSettings.async = true;
	}else if (table == "userdata"){
//		alert("进入表判断");
		$.ajaxSettings.async = false;
		$.post("IndexServlet?action=edituser",obj,
				function(data) {
			if(data==1){
				bootbox.alert({
					title: "提示",
					message: "更新成功",
					closeButton:false
				})
//				$("#xztb input").val("");
				$("#edit_btn_cancel").trigger("click");
				$("#search_btn").trigger("click");
			}else{
				bootbox.alert({
					title: "提示",
					message: data,
					closeButton:false
				})
			}
		});
		$.ajaxSettings.async = true;

		/*	$.post("IndexServlet?action=checkUser&username=" + obj.username + "&nocache=" + new Date().getTime(), 
				function(data){
			if(data==1){}else{
//				alert(data);
				bootbox.alert({
					title: "提示",
					message: data,
					closeButton:false
				})
				$("#user_username").focus();
			}
		});*/
		
	}else {
		bootbox.alert({
			title: "数据添加提示",
			message: "找不到表",
			closeButton:false
		});
		return false;
	};
});
/*添加按键点击*/
$("#data_add_btn").click(function(){		
//	alert("添加被点击")
	if(user.getuser_level < 2){
		bootbox.alert({
			title: "提示",
			message: "暂无添加操作权限！",
			closeButton:false
		});
		return false;
	}
//	$("#search_btn").click(function(){
	if(table == "userdata"){
		$("#edit_useradd_btn_sure").show();
		$("#edit_btn_sure").hide();
		$("#user_username").removeAttr("disabled");
		$("#data_edit_title").text("添加");
	}else if(table == "plants"){
		$("#edit_plansadd_btn_sure").show();
		$("#edit_btn_sure").hide();
//		$("#plant_name").attr("disabled","disabled");	
		$("#plant_name").removeAttr("disabled");
		$("#data_edit_title").text("添加");
	}
//	console.log("data_add_btn被点击1");
//	$("#btn_imgedit").trigger("click");
	$("#xztb").find("input").val("");
});
$("#edit_btn_sure").click(function(){
	if(user.getuser_level < 2){
		bootbox.alert({
			title: "提示",
			message: user.getuser_level+"没有植物数据添加操作权限！",
			closeButton:false
		});
		return;
	}
});
//添加植物，按键点击
$("#edit_plansadd_btn_sure").click(function(){
	if(user.getuser_level < 2){
		bootbox.alert({
			title: "提示",
			message: user.getuser_level+"没有植物数据添加操作权限！",
			closeButton:false
		});
		return;
	}
	/*可以优化，重复代码*/
	let obj = {};
	console.log("edit_plansadd_btn_sure添加确认按钮被点击");		
	let flag=true;
	$("#xztb input").each(function() {
//		let str ="";
		let data_key ="";
		let data_value ="";
		data_key = $(this).attr('id');
		if(table=="plants"){
			data_key = data_key.slice(6);//去除plant_name的 前六个字符 留下name
		}else if (table == "userdata"){
			data_key = data_key.slice(5);
			bootbox.alert({
				title: "数据添加提示",
				message: "错误：userdata表，植物插入按钮",
				closeButton:false
			});
			flag=false;
			return false;
		}else {
			bootbox.alert({
				title: "数据添加提示",
				message: "找不到表",
				closeButton:false
			});
			flag=false;
			return false;
		};
		data_value= $(this).val();
//		str =$(this).attr('id')+":"+ $(this).val();
		if(!data_value){
			bootbox.alert({
				title: "数据添加提示",
				message: data_key+"不能为空，请填写完整信息",
				closeButton:false
			});
//			each 中return 有时候无效，添加flag
			flag=false;
			return false;
		}
//		将数据保存到josn对象中
		obj[data_key]=data_value;
//		console.log("str："+str);

	});
	if(!flag){
		return false;
	}
	if(table=="plants"){
		$.ajaxSettings.async = false;
		$.post("DataServlet?action=inserdata",obj,
				function(data){
			bootbox.alert({
				title: "数据添加提示",
				message:data,
				closeButton:false
			});
			$("#xztb input").val("");
			$("#edit_btn_cancel").trigger("click");
			$("#search_btn").trigger("click");
		});
		$.ajaxSettings.async = true;
	}else if (table == "userdata"){
		bootbox.alert({
			title: "数据添加提示",
			message:"数据表加载错误",
			closeButton:false
		});
		return
	}

});

//$(".modal-footer button").click(function(){
//let _this = $(this);

//console.log(_this.attr("id"));
//});
//添加用户，按键点击
$("#edit_useradd_btn_sure").click(function(){
	if(user.getuser_level < 3){
		bootbox.alert({
			title: "提示",
			message: user.getuser_level+"没有用户添加操作权限！",
			closeButton:false
		});
		return;
	}
	let obj = {};
	console.log("edit_useradd_btn_sure添加确认按钮被点击");		
	let flag=true;
	$("#xztb input").each(function() {
//		let str ="";
		let data_key ="";
		let data_value ="";
		data_key = $(this).attr('id');
		if(table=="plants"){
			data_key = data_key.slice(6);//去除plant_name的 前六个字符 留下name
			bootbox.alert({
				title: "数据添加提示",
				message: "错误：plants表，用户插入按钮",
				closeButton:false
			});
			flag=false;
			return false;
		}else if (table == "userdata"){
			data_key = data_key.slice(5);
		}else {
			bootbox.alert({
				title: "数据添加提示",
				message: "找不到表",
				closeButton:false
			});
			flag=false;
			return false;
		};
		data_value= $(this).val();
//		str =$(this).attr('id')+":"+ $(this).val();
		if(!data_value){
			bootbox.alert({
				title: "数据添加提示",
				message: data_key+"不能为空，请填写完整信息",
				closeButton:false
			});
//			each 中return 有时候无效，添加flag
			flag=false;
			return false;
		}
//		将数据保存到josn对象中
		obj[data_key]=data_value;
//		console.log("str："+str);

	});
	if(!flag){
		return false;
	}
	obj["level"]= $("#xztb select").val();
	obj["miyao"]= "";
	obj["nocache"] = new Date().getTime();
	console.log(obj);
	if(table=="plants"){

	}else if (table == "userdata"){
//		alert("进入表判断");
		$.ajaxSettings.async = false;

		$.post("IndexServlet?action=register",obj,
				function(data) {
			if(data==1){
				bootbox.alert({
					title: "提示",
					message: "添加成功",
					closeButton:false
				})
				$("#xztb input").val("");
				$("#edit_btn_cancel").trigger("click");
				$("#search_btn").trigger("click");
			}else{
				bootbox.alert({
					title: "提示",
					message: data,
					closeButton:false
				})
			}
		});	
//		$.post("IndexServlet?action=checkUser&username=" + obj.username + "&nocache=" + new Date().getTime(), 
//		function(data){
//		if(data==1){}else{
////		alert(data);
//		bootbox.alert({
//		title: "提示",
//		message: data,
//		closeButton:false
//		})
//		$("#user_username").focus();
//		}
//		});
		$.ajaxSettings.async = true;
	}else {
		bootbox.alert({
			title: "数据添加提示",
			message: "找不到表",
			closeButton:false
		});
		return false;
	};


});



//初始化分页
function initpage(){
	$(".pp-pagination").MyPaging({
		size: 8,
		total: 0,
		current: 1,
		prevHtml: "← 上一页",
		nextHtml: "下一页→",
		layout: "first, prev, pager, next, end",
		jump: function () {
			var _this = this;

			// 模拟ajax获取数据
//			setTimeout(function () {
			var res = getData({
				size: _this.size,
				current: _this.current
			},activetable())
			if(res.seachdata_seachVal==''){
				setTbody(res.list,activetable());
				_this.setTotal(res.total);
			}else {
				setTbody(res.seachdata_list,activetable());
				_this.setTotal(res.seachdata_total);
			}
			// 必须调用
//			}, 300);
		}
	});
};

$("#search_btn").click(function(){
//	$("#search_btn").click(function(){
	console.log("查询！");
	initpage();
});
$("#reset_btn").click(function(){
//	$("#search_btn").click(function(){
	$('.Ktext').val("") //查询框清空
	$("#search_btn").trigger("click")
});


//重新排序
/*$("#reorder_btn").click(function(){
	if(activebutton =="btn_imgdata"){
		table=imgdata;
	}else if(activebutton =="btn_userdata"){
		table=userdata;
	}
	$.get("DataServlet?action=reorder&table="+table+"&nocache="
			+ new Date().getTime(), function(data) {
//		alert(data);
		bootbox.alert({
			title: "提示",
			message: data,
			closeButton:false
		})
		$("#search_btn").trigger("click")
	});

});*/
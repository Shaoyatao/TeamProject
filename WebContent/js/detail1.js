var activebutton = "btn_example";
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
})
function getuser(){
	$.get("IndexServlet?action=getuser&nocache="+ new Date().getTime(),function(data){
//		window.location ="manage.html";
//		alert(data);
		console.log("用户:"+data);
		var arr=data.split(";");
		result =arr[0];
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
			if(level==1){

			}else if(level==2){

			}
		}
	});	
//	return level;
	return {
		getuser_name: result,
		getuser_level: level
	}
}


function show(activebtn) {
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
}


/*表格显示*/
function getData(params,activebutton) {
	var data=[];
//	console.log("params:"+params+";activebutton:"+activebutton);
	$.ajaxSettings.async = false;
	var activedata = activebutton.replace("btn_","");
	if(activedata =="userdata"|| activedata =="imgdata"){
		$.get("DataServlet?action=query&table="+activedata +"&nocache=" + new Date().getTime(), 
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
					if(activebutton=='btn_userdata'){
						var optionval=$("#show_userdata .T-sort>option:selected").val();
						var seachVal=$('#show_userdata .Ktext').val().trim()

					}else if(activebutton=='btn_imgdata'){
						var optionval=$("#show_imgdata .T-sort>option:selected").val();
						var seachVal=$('#show_imgdata .Ktext').val().trim()
					}
//					console.log($(".T-sort>option").val());
					var seachclo=optionval.slice(5);
					switch(seachclo) {
					case 'id':
						seachcloVal=item.id;
						break;
					case 'name':
						seachcloVal=item.name;
						break;
					case 'pwd':
						seachcloVal=item.pwd;
						break;
					case 'level':
						seachcloVal=item.level;
						break;
					case 'filename':
						seachcloVal=item.filename.replace(/_/g,":");
						break;
					case 'barcodeType':
						seachcloVal=item.barcodeType;
						break;
					case 'barcodeData':
						seachcloVal=item.barcodeData;
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
function setTbody (arr,activebutton) {
	var user = getuser()
	var html = "";
	if(arr.length==0){
		$(".pp-manageuser #show_tbody").html(html);
		$(".pp-managehistory #show_tbody").html(html);
		return
	}
	if(activebutton =="btn_imgdata"){
		for (var i = 0; i < arr.length; i++) {
			var item = arr[i];
			/*字符替换*/
//			$.ajaxSettings.async = false;
			var falename=item.filename.replace(/_/g,":");
			var time = item.time.replace(/_/g,":");
			if(user.getuser_level==2){
				html += "<tr><td>" + item.id + "</td><td>" + falename + "</td><td>" + item.barcodeType + "</td><td>" + item.barcodeData + "</td><td>" + time + "</td><td><button  type='button' class='btn btn-link' data-imgid='"+item.id+"' data-toggle='modal' data-target='#exampleModal'>查看</button><button type='button' class='btn btn-link' id='btn_imgremove' data-imgid='"+item.id+"'>删除</button></td></tr>";
			}else{
				html += "<tr><td>" + item.id + "</td><td>" + falename + "</td><td>" + item.barcodeType + "</td><td>" + item.barcodeData + "</td><td>" + time + "</td><td><button type='button' class='btn btn-link' data-imgid='"+item.id+"' data-toggle='modal' data-target='#exampleModal'>查看</button></td></tr>";
			}
			/*console.log(html);*/
			$(".pp-managehistory #show_tbody").html(html);
//			$.ajaxSettings.async = true;
		}
//		$("#btn_imgremove").click(function(){
//			alert("1");
//			
//		});
		$("#show_tbody button").click(function(){
			//删除按键
			if($(this).attr("id")=="btn_imgremove"){
				var id = $(this).data("imgid")
//				alert("11"+$(this).data("imgid"));
				$.get("DataServlet?action=dataremove&removeid=" +id+"&table=imgdata&nocache="
						+ new Date().getTime(), function(data) {
//					alert(data);
					bootbox.alert({
						title: "提示",
						message: data,
						closeButton:false
					})
					$("#search_btn").trigger("click")
				});
			}
			//查看按键
			for (var i = 0; i < arr.length; i++) {
				var img_id=$(this).data("imgid")
				var item = arr[i];
				if(img_id==item.id){
					$("#img_path").attr('src',item.img_path)
					$("#iamge_path").attr('src',item.image_path)
				}
			}
		});	
	}
	//用户表
	else if(activebutton =="btn_userdata"){
		for (var i = 0; i < arr.length; i++) {
			var item = arr[i];
			if(user.getuser_level==2){
				$("#th_user").show();
//				html += "<tr><td>" + item.id + "</td><td>" + item.name + "</td><td>" + item.level + "</td><td>" + item.time + "</td><td><button  type='button' id='btn_usredit' class='btn btn-link' data-usrid='"+item.id+"' data-toggle='modal' data-target='#userModal'>编辑</button><button type='button' class='btn btn-link' id='btn_usrremove' data-usrid='"+item.id+"'>删除</button></td></tr>";
				html += "<tr><td>" + item.id + "</td><td>" + item.name + "</td><td>" + item.level + "</td><td>" + item.time + "</td><td><button type='button' class='btn btn-link' id='btn_usrremove' data-usrid='"+item.id+"'>删除</button></td></tr>";
			}else{
				$("#th_user").hide();
				html += "<tr><td>" + item.id + "</td><td>" + item.name + "</td><td>" + item.level + "</td><td>" + item.time + "</td></tr>";
			}
			
			/*console.log(html);*/
			$(".pp-manageuser #show_tbody").html(html);
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
				//删除按键
				if($(this).attr("id")=="btn_usrremove"){
					var id = $(this).data("usrid")
//					alert("11"+$(this).data("usrid"));
					$.get("DataServlet?action=dataremove&removeid=" +id+"&table=userdata&nocache="
							+ new Date().getTime(), function(data) {
//						alert(data);
						bootbox.alert({
							title: "提示",
							message: data,
							closeButton:false
						})
						$("#search_btn").trigger("click")
					});
				}
			});	
			
			
		}
	}
}

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
			},activebutton)
			if(res.seachdata_seachVal==''){
				setTbody(res.list,activebutton);
				_this.setTotal(res.total);
			}else {
				setTbody(res.seachdata_list,activebutton);
				_this.setTotal(res.seachdata_total);
			}
			// 必须调用
//			}, 300);
		}
	});
}
$(".search_btn").on("click", function(e) {
//$("#search_btn").click(function(){
	console.log("查询！");
	initpage();
	e.preventDefault();
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
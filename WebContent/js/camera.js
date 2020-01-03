function changepic() {
//	$("#imgPreview").css("display", "none");
	$("#imgPreview").hide();
	var reads = new FileReader();
	f = document.getElementById('chooseImage').files[0];
	reads.readAsDataURL(f);
	reads.onload = function(e) {
		document.getElementById('plantimg').src = this.result;
		$("#plantimg").show();
		$("#saveFilebtn").attr("disabled", false);
		$("#saveFilebtn").css('cursor','pointer');
		$("#plantsbefloading").show();
		$(".plantsimginfo").hide();
		$("#plantsbefloading>h5").text("暂无结果");	
	};
}

var saveFile = function(){
	$("#plantsloading").show();
	$(".plantsimginfo").hide();
	 var form=document.getElementById("chooseImage").files[0];
	var reader = new FileReader();
	reader.readAsDataURL(form);
	reader.onload = function(){
//		console.log(reader.result);
		let imgdata = reader.result.split(",")[1]  //　这样才是完整的数据
//		$.ajaxSettings.async = false;
		$.post("PlantRecognition", { "img": imgdata }, function (data) {
//			alert(data);
			let _html ="";
			console.log("data"+data);
			let plantdata = $.parseJSON(data)
			if(plantdata.result){
				$("#plantsbefloading").hide();
				$("#plantsloading").hide();
				for (let a of plantdata.result){
					_html +='<li class="plantsimginfo" style="display:flex;justify-content: space-between;font-size:1.5rem;"><span>名称:'+a.name+'</span><br><span>概率：'+a.score.toFixed(3)+'</span></li>';
					console.log("_html"+_html);
				}
				$("#plantresult").append(_html);
			}else {
				alert("错误："+plantdata.error_msg);
			}
//			console.log("plantdata.result"+plantdata.result);


//			$("#plantcontain").
		}, "text");
//		$.ajaxSettings.async = true;
	};

//	console.log(formdata);
//	var imgData = canvas1.toDataURL();
//	var base64Data = imgData.substr(22);

//	console.log(base64Data);

};

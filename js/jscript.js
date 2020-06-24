window.onload=function(){
	var ali=document.getElementById("menu").getElementsByTagName("li"),
	//获得主菜单div12的数组
	    adiv21=document.getElementById("div21").getElementsByTagName("div"),
	//获得副菜单容器div21组成的数组
		adiv211=document.getElementById("jbcz").getElementsByTagName("li"),
	//获得基本操作菜单div211的数组
		adiv212=document.getElementById("jbcx").getElementsByClassName("li1"),
	//获得基本查询菜单div212的第一级功能数组
		adiv212li2=document.getElementById("jbcx").getElementsByClassName("li2"),
	//获得基本查询菜单div212的各功能容器数组
	    adiv212li3=document.getElementById("jbcx").getElementsByClassName("li3"),
	//获得基本查询菜单div212的第二级功能数组
	    adiv213=document.getElementById("lycx").getElementsByClassName("li1"),
	//获得旅游查询菜单div213的第一级功能数组
	    adiv213li2=document.getElementById("lycx").getElementsByClassName("li2"),
	//获得旅游查询菜单div213的各功能容器数组
	    adiv213li3=document.getElementById("lycx").getElementsByClassName("li3"),
	//获得旅游查询菜单div213的旅游景点功能数组
	    adiv213li4=document.getElementById("lycx").getElementsByClassName("li4"),
	//获得旅游查询菜单div213的最佳路径分析功能数组
	    adiv213li5=document.getElementById("lycx").getElementsByClassName("li5"),
	//获得旅游查询菜单div213的旅行商分析功能数组
	    adiv214=document.getElementById("jycx").getElementsByTagName("li");
	//获得救援查询菜单div214的数组
//111111111111

chushijs();

	//利用主菜单div12控制功能菜单div21的切换
    ali[0].style.backgroundColor='black';
	ali[0].style.color='white';
	for(var i=0;i<ali.length;i++){
		ali[i].setAttribute("number",i);
		ali[i].onclick=function(){
			var n=this.getAttribute("number");
			for(var j=0;j<ali.length;j++){
				//切换功能后对其余功能页的背景和字体颜色以及左侧导航栏做一个颜色重置
				adiv21[j].style.display='none';
				ali[j].style.backgroundColor='rgba(151,147,147,1.00)';
				ali[j].style.color='black';
				 
			}
			  
			adiv21[n].style.display='inline-block';
			ali[n].style.backgroundColor='black';
			ali[n].style.color='white';
			  
			getService();
			qcadivnli2();
            qcadivnli3();
            clearMap();
            clearjs();
			inputjs(n);
			  
		}
		
		 
	}

	//基本操作
	for(var i=0;i<adiv211.length;i++){
		adiv211[i].setAttribute("number",i);
		adiv211[i].onclick=function(){
			var n=this.getAttribute("number");
			for(var j=0;j<adiv211.length;j++){
				adiv211[j].style.backgroundColor='#FFFFF0';
			}
			adiv211[n].style.backgroundColor='rgba(117,113,113,1.00)';

			if(n==0){
			    // 放大
		        mapenlarge();          
			}
			else if(n==1){
			    // 缩小
            	mapreduce();
			}
			else if(n==2){
				//平移
			    mapPan();
			}
			else if(n==3){
				//距离量算
				distanceMeasure();
			}
			else  if(n==4){
				areaMeasure();
			}
			else{
				//清除量算
				clearFeatures();
				adiv211[n].style.backgroundColor='#FFFFF0'
			}
		}
	}
		  
	//基本查询
	for(var i=0;i<adiv212.length;i++){
		adiv212[i].setAttribute("number",i);
		adiv212[i].onclick=function(){
			var n=this.getAttribute("number");
			for(var j=0;j<adiv212.length;j++){
				adiv212[j].style.backgroundColor='#FFFFF0';
				adiv212li2[j].style.display="none";
				}
			adiv212[n].style.backgroundColor='rgba(117,113,113,1.00)';
			adiv212li2[n].style.display="block";
			for(var k=0;k<adiv212li3.length;k++){
				adiv212li3[k].setAttribute("number",k);
				adiv212li3[k].onclick=function(){
					var m=this.getAttribute("number");
					var infowin = null;
					for(var j=0;j<adiv212li3.length;j++){
						adiv212li3[j].style.color='#696969';
						adiv212li3[j].style.listStylePosition='inside';
					}
					adiv212li3[m].style.color='rgba(117,113,113,1.00)';
					if(m==0){
						
						closeInfoWin();
						drawHospital1();
				 	
					}
					else if(m==1){
						closeInfoWin();
						drawHospital2();
					}
					else if(m==3){
						closeInfoWin();
						drawFactory1 ();
					}
					else if(m==4){
						closeInfoWin();
						drawFactory2 ();
					}
					else if(m==6){
						closeInfoWin();
						drawGeometry2();
					}
					else if(m==7){
						closeInfoWin();
						drawGeometry1();
					}
					else{
						closeInfoWin();
						markerLayer.clearMarkers();
						vectorLayer.removeAllFeatures();
						clearqueryResultPanel();
					}
		    	}
			}
		}
	}
		
	//旅游查询
	for(var i=0;i<adiv213.length;i++){
		adiv213[i].setAttribute("number",i);
		adiv213[i].onclick=function(){
			var n=this.getAttribute("number");
			for(var j=0;j<adiv213.length;j++){
				adiv213[j].style.backgroundColor='#FFFFF0';
				adiv213li2[j].style.display="none";
			}
			adiv213[n].style.backgroundColor='rgba(117,113,113,1.00)';
			adiv213li2[n].style.display="block";
			//旅游景点
			for(var k=0;k<adiv213li3.length;k++){
				adiv213li3[k].setAttribute("number",k);
				adiv213li3[k].onclick=function(){
					var m=this.getAttribute("number");
					for(var j=0;j<adiv213li3.length;j++){
						adiv213li3[j].style.color='#696969';
						adiv213li3[j].style.listStylePosition='inside';
					}
					adiv213li3[m].style.color='rgba(117,113,113,1.00)';
				
				 	if(m==0)
				 	{
				 		getFeaturesByIDs1();
						map.removePopup(popup);
				 		
				 	}
				 	else if(m==1)
				 	{
				 		getFeaturesByIDs2();
				 		map.removePopup(popup);
				 	}
				 	else if(m==2)
				 	{
				 		
				 		getFeaturesByIDs3();
				 		map.removePopup(popup);

				 	}
				 	else if(m==3)
				 	{
				 		
				 		getFeaturesByIDs4();
				 		map.removePopup(popup);
				 	}
				 	else if(m==4)
				 	{
				 		
				 		getFeaturesByIDs5();
				 		map.removePopup(popup);
					}
					else if(m==5)
				 	{
				 		
				 		getFeaturesByIDs6();
				 		map.removePopup(popup);
					}
					else if(m==6)
				 	{
				 		
				 		getFeaturesByIDs7();
				 		map.removePopup(popup);
				 	}
					 
					 
				 
		        }
			}

			//最佳路径分析
			for(var k=0;k<adiv213li4.length;k++){
			  	adiv213li4[k].setAttribute("number",k);
			  	adiv213li4[k].onclick=function(){
			 		var m=this.getAttribute("number");
			 		for(var j=0;j<adiv213li4.length;j++){
				 		adiv213li4[j].style.color='#696969';
				 		adiv213li4[j].style.listStylePosition='inside';
				 	}
			    	adiv213li4[m].style.color='rgba(117,113,113,1.00)';
					if (m==0){
						selectPoints();
				 		drawCompleted(e);
				 		onFeatureSelect(feature);
					}
					else if (m==1){
				 		findPath();
				 		processCompleted(e);
				 		allScheme(result);
				 		addPathGuideItems(result);
					}
					else {
						clearElements();
					}
		        }
			}
			//旅行商分析
			for(var k=0;k<adiv213li5.length;k++){
			  	adiv213li5[k].setAttribute("number",k);
			  	adiv213li5[k].onclick=function(){
			 		var m=this.getAttribute("number");
			 		for(var j=0;j<adiv213li5.length;j++){
				 		adiv213li5[j].style.color='#696969';
				 		adiv213li5[j].style.listStylePosition='inside';
				 	}
			     	adiv213li5[m].style.color='rgba(117,113,113,1.00)';
				 	if (m==0){
				 		selectPoints();
				 		drawCompleted(e);
				 		onFeatureSelect(feature);
				 	}
					else if (m==1){
				 		findTSPPaths();
				 		processCompleted2(findTSPPathsEventArgs);
				 		allScheme2(result);
				 		addPathGuideItems(result);
				 	}
				 	else{clearElements();}
		        }
			}
		}
	}
		
	//救援查询
	for(var i=0;i<adiv214.length;i++){
		adiv214[i].setAttribute("number",i);
		adiv214[i].onclick=function(){
			var n=this.getAttribute("number");
			for(var j=0;j<adiv214.length;j++){
				adiv214[j].style.backgroundColor='#FFFFF0';
			}
			adiv214[n].style.backgroundColor='rgba(117,113,113,1.00)';
			if(n==0){
			    selectEventPoint();
			  	drawCompleted(drawGeometryArgs);
			}
			else if(n==1){
			    findClosestFacilities();
			    processCompleted(findClosestFacilitiesEventArgs);
			}
			else{
				clearElements();
			}
		}
	}
		  

	//===================================================
 	//清除markers和popup
 	function mpclear(){
 		for(i=0;i<adiv213li3.length;i++){
 			map.removePopup(popup);
 			map.removePopup(markers);
 		}
 	}
   	//清除popup
   	function pclear(){
   		for(i=0;i<adiv213li3.length;i++){
   		map.removePopup(popup);
   		}
   	}

	//初始化引用js
	function chushijs(){
   		var inc="js/basicOperation.js";
   		var script = document.createElement("script");
        	script.src = inc;
        	script.type="text/javascript";
        	document.getElementsByTagName("head")[0].appendChild(script);
  	}
	//插入js自动加到head的末尾
	function inputjs(n){
  	 	var inc;
   		if(n==0){
  	 		var inc="js/basicOperation.js";
  	 	}
   		else if(n==1){
   			var inc="js/basicQuery.js";
   		}
  	 	else if(n==2){
  	 		var inc="js/touristAttraction.js";
  	 	}
   		else if(n==3){
  	 		var inc="js/rescueInquiry.js";
 	  	}
 	  	else if(n==4){
 	  		var inc="js/bus.js";
 	  	}
  	 	else if(n==5){
  	 		var inc="js/weather.js";
		}

  	 	var script = document.createElement("script");
   	 script.src = inc;
   	 script.type="text/javascript";
    	document.getElementsByTagName("head")[0].appendChild(script);
	}
	
	//删除js
	function clearjs(){
		var s=document.getElementsByTagName("script");
   		document.getElementsByTagName("head")[0].removeChild(s[s.length-1]);
	}  
	//++++++++++++++++++++++++++++++++++++++3.11+++++++
	//放大缩小类级别背景色改变模型函数
	function quchuadivn(adivn){
   		for(var i=0;i<adivn.length;i++){
   			adivn[i].style.backgroundColor="#FFFFF0";
   		}
	}

	function getService(){
   		quchuadivn(adiv211);
		quchuadivn(adiv212);
		quchuadivn(adiv213);
		quchuadivn(adiv214);
	}

	//医院公园类级别背景色改变模型函数
	function quchuadivnli2(adivnli2){
   		for(var i=0;i<adivnli2.length;i++){
   			adivnli2[i].style.display="none";
   		}
	}

	function qcadivnli2(){
   		quchuadivnli2(adiv212li2);
		quchuadivnli2(adiv213li2);
	}

	//医院公园字迹模块类级别凸显改变模型函数
	function quchuadivnli3(adivnli3){
   		for(var i=0;i<adivnli3.length;i++){
   			adivnli3[i].style.color='#696969';
			adivnli3[i].style.listStylePosition='inside';
   		}
	}

	function qcadivnli3(){
   		quchuadivnli3(adiv212li3);
    	quchuadivnli3(adiv213li3);
    	quchuadivnli3(adiv213li4);
    	quchuadivnli3(adiv213li5);
	}
   
	function adivn(adivn){
   		for(var i=0;i<adivn.length;i++){
   			adivn[i].setAttribute("number",i);
   			adivn[i].onclick=function(){
   				var n=this.getAttribute("number");
   				quchuadivn(adivn);
   				adivn[n].style.backgroundColor="rgba(117,113,113,1.00)";
   				return n;
   			}
   		}
	}
   
   
	function clearMap(){
		var test1=document.getElementsByClassName('smMap');
		for(var i=0;i<test1[0].children.length;i++){
			test1[0].children[i].style.display="none";
		}
	}
  
}

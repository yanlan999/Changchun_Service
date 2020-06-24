var map, local, layer, vectorLayer, control, queryBounds, drawPolygon1,
drawPolygon,markerLayer,marker,drawHospital1,drawHospital2,drawFactory1,
drawFactory2,infowin=null,result=null, resultTable = "",
           style = {
				strokeColor: "black",
				strokeWidth: 8,
				strokeOpacity:1,
				pointerEvents: "visiblePainted",
				fillColor: "yellow",
				fillOpacity: 0.5				
			};
             url="http://localhost:8090/iserver/services/map-changchun/rest/maps/长春市区图";//地图链接
            function init2(){
                map = new SuperMap.Map("map",{controls: [
                    new SuperMap.Control.LayerSwitcher(),//图层选择控件
                    new SuperMap.Control.ScaleLine(),//比例尺控件
                    new SuperMap.Control.PanZoomBar(),
                    new SuperMap.Control.Navigation({//导航控件
                        dragPanOptions: {
                            enableKinetic: true
                        }
                    })]
                });
                // 加载鹰眼控件
            map.addControl(new SuperMap.Control.OverviewMap());
            
				//初始化TiledDynamicRESTLayer时该图层发送获取地图，状态的请求，根据响应信息初始化图层参数，添加图层。
                layer = new SuperMap.Layer.TiledDynamicRESTLayer("长春市区图", url, {transparent: true, cacheEnabled: true},{maxResolution:"auto"});
                layer.events.on({"layerInitialized":addLayer});
                vectorLayer = new SuperMap.Layer.Vector("Vector Layer");//新建一个vectorLayer的矢量图层
                markerLayer = new SuperMap.Layer.Markers("Markers");//创建一个有标签的图层
                //学校矩形
				//绘制要素类。通过事件处理器 Handler可以在vector图层上绘制点、线、面等要素,
                //通过 active 和 deactive 两个方法，实现动态的激活和注销。
                drawPolygon = new SuperMap.Control.DrawFeature(vectorLayer, SuperMap.Handler.Polygon);
				//监听事件
            	drawPolygon.events.on({"featureadded": drawCompleted2});
            	map.addControl(drawPolygon);
                //学校圆
                drawPolygon1 = new SuperMap.Control.DrawFeature(vectorLayer, SuperMap.Handler.RegularPolygon,{handlerOptions:{sides:50}});
                drawPolygon1.events.on({"featureadded": drawCompleted1});
                map.addControl(drawPolygon1);
                //医院矩形
                drawPolygondrawHospital1 = new SuperMap.Control.DrawFeature(vectorLayer, SuperMap.Handler.Polygon);     
            	drawPolygondrawHospital1.events.on({"featureadded": drawCompleteddrawHospital1});
            	map.addControl(drawPolygondrawHospital1);
                //医院圆
                drawPolygondrawHospital2 = new SuperMap.Control.DrawFeature(vectorLayer, SuperMap.Handler.RegularPolygon,{handlerOptions:{sides:50}});
                drawPolygondrawHospital2.events.on({"featureadded": drawCompleteddrawHospital2});
                map.addControl(drawPolygondrawHospital2);
                //公园矩形
                drawPolygondrawFactory1 = new SuperMap.Control.DrawFeature(vectorLayer, SuperMap.Handler.Polygon);     
            	drawPolygondrawFactory1.events.on({"featureadded": drawCompleteddrawFactory1});
            	map.addControl(drawPolygondrawFactory1);
                //公园圆
                drawPolygondrawFactory2 = new SuperMap.Control.DrawFeature(vectorLayer, SuperMap.Handler.RegularPolygon,{handlerOptions:{sides:50}});
                drawPolygondrawFactory2 .events.on({"featureadded": drawCompleteddrawFactory2 });
                map.addControl(drawPolygondrawFactory2 );




            }

            function addLayer() {
                map.addLayers([layer, vectorLayer, markerLayer]);
              map.setCenter(new SuperMap.LonLat(5136.71 ,-4159.16),1);       
            }
            //学校
    		 function drawGeometry1() {
            //先清除上次的显示结果
            vectorLayer.removeAllFeatures();
            markerLayer.clearMarkers();  
            drawPolygon1.activate();
        }
 		 	function drawGeometry2() {
            //先清除上次的显示结果
            vectorLayer.removeAllFeatures();
            markerLayer.clearMarkers();
            drawPolygon.activate();

        }
 		 	//医院
 		 	//矩形
	 		function drawHospital1() {
            //先清除上次的显示结果
            vectorLayer.removeAllFeatures();
            markerLayer.clearMarkers();  
            drawPolygondrawHospital1.activate();
  	   }      
  	   		//圆
 		 	function drawHospital2() {
            //先清除上次的显示结果
            vectorLayer.removeAllFeatures();
            markerLayer.clearMarkers();
            drawPolygondrawHospital2.activate();

        }
 		 	//公园
 		 	//矩形
	 		function drawFactory1 () {
            //先清除上次的显示结果
            vectorLayer.removeAllFeatures();
            markerLayer.clearMarkers();  
            drawPolygondrawFactory1.activate();
  	   }      
  	   		//圆
 		 	function drawFactory2 () {
            //先清除上次的显示结果
            vectorLayer.removeAllFeatures();
            markerLayer.clearMarkers();
            drawPolygondrawFactory2.activate();

        }

			//学校圆
			function drawCompleted1(evnetArg){
			drawPolygon1.deactivate();

		    // 获取绘制的对象，并显示在vector图层上
			var feature = new SuperMap.Feature.Vector();//矢量要素
            feature.geometry = evnetArg.feature.geometry,
            feature.style = style;
            vectorLayer.addFeatures(feature);
			
			// 设置查询参数
            var queryParam, queryByGeometryParameters, queryByGeoService;
            //FilterParameter 必设 name（查询地图图层名）
            queryParam = new SuperMap.REST.FilterParameter({//过滤条件
                name: "School@Changchun",
                fields:["SmID","name"]
            }),
			//QueryByGeometryParameters 参数必设	queryParams
            queryByGeometryParameters = new SuperMap.REST.QueryByGeometryParameters({
                queryParams: [queryParam],
				geometry:feature.geometry,
				spatialQueryMode: SuperMap.REST.SpatialQueryMode.INTERSECT//空间查询模式枚举，此处为相交
            }),

            queryByGeoService = new SuperMap.REST.QueryByGeometryService(url, {//查询服务类
                eventListeners: {"processCompleted": processCompleted, "processFailed": processFailed}});
            queryByGeoService.processAsync(queryByGeometryParameters);
        }
			//学校矩形
			function drawCompleted2(evnetArg){
			drawPolygon.deactivate();

		    // 获取绘制的对象，并显示在vector图层上
			var feature = new SuperMap.Feature.Vector();
            feature.geometry = evnetArg.feature.geometry,
            feature.style = style;
            vectorLayer.addFeatures(feature);
			
			// 设置查询参数
            var queryParam, queryByGeometryParameters, queryByGeoService;
            //FilterParameter 必设 name（查询地图图层名）
            queryParam = new SuperMap.REST.FilterParameter({
                name: "School@Changchun",
                fields:["SmID","name"]
            }),
			//QueryByGeometryParameters 参数必设	queryParams
            queryByGeometryParameters = new SuperMap.REST.QueryByGeometryParameters({
                queryParams: [queryParam],
				geometry:feature.geometry,
				spatialQueryMode: SuperMap.REST.SpatialQueryMode.INTERSECT
            }),

            queryByGeoService = new SuperMap.REST.QueryByGeometryService(url, {
                eventListeners: {"processCompleted": processCompleted, "processFailed": processFailed}});
            queryByGeoService.processAsync(queryByGeometryParameters);
        }
			//医院矩形
			function drawCompleteddrawHospital1(evnetArg){
			drawPolygondrawHospital1.deactivate();

		    // 获取绘制的对象，并显示在vector图层上
			var feature = new SuperMap.Feature.Vector();
            feature.geometry = evnetArg.feature.geometry,
            feature.style = style;
            vectorLayer.addFeatures(feature);
			
			// 设置查询参数
            var queryParam, queryByGeometryParameters, queryByGeoService;
            //FilterParameter 必设 name（查询地图图层名）
            queryParam = new SuperMap.REST.FilterParameter({
                name: "Hospital@Changchun",
                fields:["SmID","name"]
            }),
			//QueryByGeometryParameters 参数必设	queryParams
            queryByGeometryParameters = new SuperMap.REST.QueryByGeometryParameters({
                queryParams: [queryParam],
				geometry:feature.geometry,
				spatialQueryMode: SuperMap.REST.SpatialQueryMode.INTERSECT
            }),

            queryByGeoService = new SuperMap.REST.QueryByGeometryService(url, {
                eventListeners: {"processCompleted": processCompleted, "processFailed": processFailed}});
            queryByGeoService.processAsync(queryByGeometryParameters);
        }
			//医院圆
			function drawCompleteddrawHospital2(evnetArg){
			drawPolygondrawHospital2.deactivate();

		    // 获取绘制的对象，并显示在vector图层上
			var feature = new SuperMap.Feature.Vector();
            feature.geometry = evnetArg.feature.geometry,
            feature.style = style;
            vectorLayer.addFeatures(feature);
			
			// 设置查询参数
            var queryParam, queryByGeometryParameters, queryByGeoService;
            //FilterParameter 必设 name（查询地图图层名）
            queryParam = new SuperMap.REST.FilterParameter({
                name: "Hospital@Changchun",
                fields:["SmID","name"]
            }),
			//QueryByGeometryParameters 参数必设	queryParams
            queryByGeometryParameters = new SuperMap.REST.QueryByGeometryParameters({
                queryParams: [queryParam],
				geometry:feature.geometry,
				spatialQueryMode: SuperMap.REST.SpatialQueryMode.INTERSECT
            }),

            queryByGeoService = new SuperMap.REST.QueryByGeometryService(url, {
                eventListeners: {"processCompleted": processCompleted, "processFailed": processFailed}});
            queryByGeoService.processAsync(queryByGeometryParameters);
        }
			//工厂矩形
			function drawCompleteddrawFactory1(evnetArg){
			drawPolygondrawFactory1.deactivate();

		    // 获取绘制的对象，并显示在vector图层上
			var feature = new SuperMap.Feature.Vector();
            feature.geometry = evnetArg.feature.geometry,
            feature.style = style;
            vectorLayer.addFeatures(feature);
			
			// 设置查询参数
            var queryParam, queryByGeometryParameters, queryByGeoService;
            //FilterParameter 必设 name（查询地图图层名）
            queryParam = new SuperMap.REST.FilterParameter({
                name: "Park@Changchun",
                fields:["SmID","name"]
            }),
			//QueryByGeometryParameters 参数必设	queryParams
            queryByGeometryParameters = new SuperMap.REST.QueryByGeometryParameters({
                queryParams: [queryParam],
				geometry:feature.geometry,
				spatialQueryMode: SuperMap.REST.SpatialQueryMode.INTERSECT
            }),

            queryByGeoService = new SuperMap.REST.QueryByGeometryService(url, {
                eventListeners: {"processCompleted": processCompleted, "processFailed": processFailed}});
            queryByGeoService.processAsync(queryByGeometryParameters);
        }
			//企业圆
			function drawCompleteddrawFactory2(evnetArg){
			drawPolygondrawFactory2.deactivate();

		    // 获取绘制的对象，并显示在vector图层上
			var feature = new SuperMap.Feature.Vector();
            feature.geometry = evnetArg.feature.geometry,
            feature.style = style;
            vectorLayer.addFeatures(feature);
			
			// 设置查询参数
            var queryParam, queryByGeometryParameters, queryByGeoService;
            //FilterParameter 必设 name（查询地图图层名）
            queryParam = new SuperMap.REST.FilterParameter({
                name: "Park@Changchun",
                fields:["SmID","name"]
            }),
			//QueryByGeometryParameters 参数必设	queryParams
            queryByGeometryParameters = new SuperMap.REST.QueryByGeometryParameters({
                queryParams: [queryParam],
				geometry:feature.geometry,
				spatialQueryMode: SuperMap.REST.SpatialQueryMode.INTERSECT
            }),

            queryByGeoService = new SuperMap.REST.QueryByGeometryService(url, {
                eventListeners: {"processCompleted": processCompleted, "processFailed": processFailed}});
            queryByGeoService.processAsync(queryByGeometryParameters);
        }
            function processCompleted(queryEventArgs) {
                 result = queryEventArgs.result;

			//显示查找到的矢量要素
			if (result && result.totalCount>0) {
					
					for	(var i = 0;	i < result.recordsets.length; i++) {											
						if (result.recordsets[i].features) {
							var arrFields = new Array();
							var intFieldCount = result.recordsets[i].fields.length;
							resultTable += "<table align='left' style='width: 250px' border=''>";
							var strTableHead = ""; 
							// 将字段名称列于表格首行
							for (var n = 0;n < intFieldCount;n++)
							{ 										
										var fieldName = result.recordsets[i].fields[n];
										strTableHead += "<td>";
										strTableHead += fieldName;
										strTableHead += "</td>";
										arrFields.push(fieldName);
							}
							resultTable += "<tr>" + strTableHead + "</tr>";
							for(var	k=0;k<result.recordsets[i].features.length;k++){
								// 获取Geometry 将其显示在Markers Layer上。
								var feature =  result.recordsets[i].features[k];
								var point = result.recordsets[i].features[k].geometry;
								 var lonLat = new SuperMap.LonLat(point.x, point.y);
                                size = new SuperMap.Size(44, 33),
                                offset = new SuperMap.Pixel(-(size.w/2), -size.h),
                                icon = new SuperMap.Icon("theme/images/marker.png", size, offset);
								marker=new SuperMap.Marker(new SuperMap.LonLat(point.x, point.y),icon);
                                marker.sm_capital = feature.attributes.name;
                                marker.sm_capital1 = feature.attributes.SmID;
                                marker.events.on({
                                    "click":openInfoWin,
                                    "scope": marker
                                });
								markerLayer.addMarker(marker); 
//								markerLayer.addMarker(new SuperMap.Marker(new SuperMap.LonLat(point.x, point.y), icon));

								resultTable += "<tr>";
								for(var	j=0;j<intFieldCount;j++){
									resultTable += "<td>";
									var fName =arrFields[j]
									resultTable += feature.attributes[fName];
									resultTable += "</td>";
								}
								resultTable += "</tr>";
							}
							resultTable += "</table>";
						}
					}
				}
				else{
							resultTable = "<p>无查询结果！</p>";
				}
                document.getElementById("queryResultPanel").innerHTML = resultTable;
                resultTable="";
             
            }

            function openInfoWin(){
                closeInfoWin();
                var marker = this;
                var lonlat = marker.getLonLat();
                var contentHTML = "<div style='font-size:.8em; opacity: 0.8; overflow-y:hidden;'>";
                contentHTML += "<div>"+marker.sm_capital1+"</div></div>";
                contentHTML += "<div>"+marker.sm_capital+"</div></div>";
                var size = new SuperMap.Size(0, 33);
                var offset = new SuperMap.Pixel(0, -size.h);
                var icon = new SuperMap.Icon("marker.png", size, offset);
				//具有指向和边框的浮动弹窗
                var popup = new SuperMap.Popup.FramedCloud("popwin",
                        new SuperMap.LonLat(lonlat.lon,lonlat.lat),
                        null,
                        contentHTML,
                        icon,
                        true);

                  infowin = popup;
                map.addPopup(popup);
                
            }
            function closeInfoWin(){
                if(infowin){
                    try{
                        infowin.hide();
                        infowin.destroy();
                    }
                    catch(e){}
                }
                
            }
            function processFailed(e) {
                alert(e.error.errorMsg);
            }

//			清除函数
            function clearqueryResultPanel() {
            	resultTable="";
                document.getElementById("queryResultPanel").innerHTML = resultTable;
            }
            
            init2();

var map, layer,themeLayer,drawPoint,vectorLayer,markerLayer,layer3,
        nodeArray = [], pathTime, i = 0, j = 0;
        var styleGuidePoint = {
                pointRadius: 10,
                externalGraphic: "images/step_trans.png"
            },
            styleGuideLine = {
                strokeColor: "#25FF25",
                strokeWidth: 6,
                fill: false
            };

		var isFirst = true;

		var style = {
                strokeColor: "#304DBE",
                strokeWidth: 3,
                pointerEvents: "visiblePainted",
                fill: false
            };
			var map, local, layer, vectorLayer,select;

		 // 设置访问的GIS服务地址
         
          url1 = "http://localhost:8090/iserver/services/map-changchun/rest/maps/长春市区图";
    	  url2 = "http://localhost:8090/iserver/services/transportationanalyst-sample/rest/networkanalyst/RoadNet@Changchun";
        
         function init3() {
			// 呈现分析结果图层
			vectorLayer =  new SuperMap.Layer.Vector("vectorLayer");
			// 用于显示绘制的站点的图层
			markerLayer = new SuperMap.Layer.Markers("markerLayer");
			
			drawPoint = new SuperMap.Control.DrawFeature(vectorLayer, SuperMap.Handler.Point);
			select = new SuperMap.Control.SelectFeature(vectorLayer, {onSelect: onFeatureSelect, onUnselect: onFeatureUnselect});
			drawPoint.events.on({ "featureadded": drawCompleted });

			// 创建地图对象 
            map = new SuperMap.Map("map", { controls: [
                    new SuperMap.Control.LayerSwitcher(),
                    new SuperMap.Control.ScaleLine(),
                    new SuperMap.Control.PanZoomBar(),
                    new SuperMap.Control.Navigation({
                        dragPanOptions: {
                            enableKinetic: true
                        }
                    }),
                    drawPoint,
                    select], units: "m"
                });
			// 加载鹰眼控件
            map.addControl(new SuperMap.Control.OverviewMap());
            
			// 创建图层对象
            layer3=layer = new SuperMap.Layer.TiledDynamicRESTLayer("changchun", url1, {transparent: true, cacheEnabled: true}, {maxResolution:"auto"});           
			//向map添加图层
			layer.events.on({"layerInitialized": addLayer}); 			
			
        }

		// 加载图层
        function addLayer() {
			// 向Map添加图层
            map.addLayers([layer,vectorLayer,markerLayer]);
            map.setCenter(new SuperMap.LonLat(5136.71 , -4159.16), 0.8);
        }
        
        
      
			
		function getFeaturesByIDs1(){
        	markers = new SuperMap.Layer.Markers( "Markers" );
			map.addLayer(markers);
			var size = new SuperMap.Size(44,33);
			var offset = new SuperMap.Pixel(-(size.w/2), -size.h);
			var icon = new SuperMap.Icon('theme/images/marker.png', size, offset);
			
			var marker = new SuperMap.Marker(new SuperMap.LonLat(4598,-4568),icon);
			markers.addMarker(marker);
			
			
			marker.events.on({
				"click":openInfoWin1,
				"scope": marker
			});
        }
        function openInfoWin1(){
			var marker = this;
			var lonlat = marker.getLonLat();
			popup = new SuperMap.Popup(
                    "chicken",
                    marker.getLonLat(),
                    new SuperMap.Size(220,140),
                    
                    '<img src="./images/朝阳公园.jpg">',
                    true,
                    null
            );
            popup.autoSize = true;

            infowin = popup;
            //添加弹窗到map图层
            map.addPopup(popup);
		}	
        function getFeaturesByIDs2(){
        	markers = new SuperMap.Layer.Markers( "Markers" );
			map.addLayer(markers);
			var size = new SuperMap.Size(44,33);
			var offset = new SuperMap.Pixel(-(size.w/2), -size.h);
			var icon = new SuperMap.Icon('theme/images/marker.png', size, offset);
			
			var marker = new SuperMap.Marker(new SuperMap.LonLat(4519,-5482),icon);
			markers.addMarker(marker);
			
			//var marker = new SuperMap.Marker(lonlat,icon);
			marker.events.on({
				"click":openInfoWin2,
				"scope": marker
			});
        }
        function openInfoWin2(){
			var marker = this;
			var lonlat = marker.getLonLat();
			popup = new SuperMap.Popup(
                    "chicken",
                    marker.getLonLat(),
                    new SuperMap.Size(220,140),
                    '<img src="./images/南湖公园.jpg">',
                    true,
                    null
            );
            popup.autoSize = true;

            infowin = popup;
            //添加弹窗到map图层
            map.addPopup(popup);
             
        }
        function getFeaturesByIDs3(){
        	markers = new SuperMap.Layer.Markers( "Markers" );
			map.addLayer(markers);
			var size = new SuperMap.Size(44,33);
			var offset = new SuperMap.Pixel(-(size.w/2), -size.h);
			var icon = new SuperMap.Icon('theme/images/marker.png', size, offset);
			
			var marker = new SuperMap.Marker(new SuperMap.LonLat(1587,-5499),icon);
			markers.addMarker(marker);
			
			
			marker.events.on({
				"click":openInfoWin3,
				"scope": marker
			});
        }
        function openInfoWin3(){
			var marker = this;
			var lonlat = marker.getLonLat();
			popup = new SuperMap.Popup(
                    "chicken",
                    marker.getLonLat(),
                    new SuperMap.Size(220,140),
                    '<img src="./images/岱山公园.jpg">',
                    true,
                    null
            );
            popup.autoSize = true;

            infowin = popup;
            //添加弹窗到map图层
            map.addPopup(popup);
		}
        
        function getFeaturesByIDs4(){
        	markers = new SuperMap.Layer.Markers( "Markers" );
			map.addLayer(markers);
			var size = new SuperMap.Size(44,33);
			var offset = new SuperMap.Pixel(-(size.w/2), -size.h);
			var icon = new SuperMap.Icon('theme/images/marker.png', size, offset);
			
			var marker = new SuperMap.Marker(new SuperMap.LonLat(5456,-4175),icon);
			markers.addMarker(marker);
			
			//var marker = new SuperMap.Marker(lonlat,icon);
			marker.events.on({
				"click":openInfoWin4,
				"scope": marker
			});
        }
        function openInfoWin4(){
			var marker = this;
			var lonlat = marker.getLonLat();
			
			popup = new SuperMap.Popup(
                    "chicken",
                    marker.getLonLat(),
                    new SuperMap.Size(220,140),
                    '<img src="./images/儿童公园.jpg">',
                    true,
                    null
            );
            popup.autoSize = true;

            infowin = popup;
            //添加弹窗到map图层
            map.addPopup(popup);

		}
        
        
        function getFeaturesByIDs5(){
        	markers = new SuperMap.Layer.Markers( "Markers" );
			map.addLayer(markers);
			var size = new SuperMap.Size(44,33);
			var offset = new SuperMap.Pixel(-(size.w/2), -size.h);
			var icon = new SuperMap.Icon('theme/images/marker.png', size, offset);
			
			var marker = new SuperMap.Marker(new SuperMap.LonLat(7007,-4435),icon);
			markers.addMarker(marker);
			
			
			marker.events.on({
				"click":openInfoWin5,
				"scope": marker
			});
        }
        function openInfoWin5(){
			var marker = this;
			var lonlat = marker.getLonLat();
			popup = new SuperMap.Popup(
                    "chicken",
                    marker.getLonLat(),
                    new SuperMap.Size(220,140),
                    '<img src="./images/西游记宫.jpg">',
                    true,
                    null
            );
            popup.autoSize = true;

            infowin = popup;
            //添加弹窗到map图层
            map.addPopup(popup);
            
        }
        function getFeaturesByIDs6(){
        	markers = new SuperMap.Layer.Markers( "Markers" );
			map.addLayer(markers);
			var size = new SuperMap.Size(44,33);
			var offset = new SuperMap.Pixel(-(size.w/2), -size.h);
			var icon = new SuperMap.Icon('theme/images/marker.png', size, offset);
			
			var marker = new SuperMap.Marker(new SuperMap.LonLat(6216,-3010),icon);
			markers.addMarker(marker);
			
			
			marker.events.on({
				"click":openInfoWin6,
				"scope": marker
			});
        }
        function openInfoWin6(){
			var marker = this;
			var lonlat = marker.getLonLat();
			popup = new SuperMap.Popup(
                    "chicken",
                    marker.getLonLat(),
                    new SuperMap.Size(220,140),
                    '<img src="./images/伪皇宫.jpg">',
                    true,
                    null
            );
            popup.autoSize = true;

            infowin = popup;
            //添加弹窗到map图层
            map.addPopup(popup);
            
        }
        function getFeaturesByIDs7(){
        	markers = new SuperMap.Layer.Markers( "Markers" );
			map.addLayer(markers);
			var size = new SuperMap.Size(44,33);
			var offset = new SuperMap.Pixel(-(size.w/2), -size.h);
			var icon = new SuperMap.Icon('theme/images/marker.png', size, offset);
			
			var marker = new SuperMap.Marker(new SuperMap.LonLat(4598,-4687),icon);
			markers.addMarker(marker);
			
			
			marker.events.on({
				"click":openInfoWin7,
				"scope": marker
			});
        }
        function openInfoWin7(){
			var marker = this;
			var lonlat = marker.getLonLat();
			popup = new SuperMap.Popup(
                    "chicken",
                    marker.getLonLat(),
                    new SuperMap.Size(220,140),
                    '<img src="./images/水上大世界.jpg">',
                    true,
                    null
            );
            popup.autoSize = true;

            infowin = popup;
            //添加弹窗到map图层
            map.addPopup(popup);
            
		}
       
       function selectPoints() {
                clearElements();
                drawPoint.activate();
            }
            function drawCompleted(drawGeometryArgs) {
                var point = drawGeometryArgs.feature.geometry,
                        size = new SuperMap.Size(44, 33),
                        offset = new SuperMap.Pixel(-(size.w / 2), -size.h),
                        icon = new SuperMap.Icon("images/marker2.png", size, offset);
                markerLayer.addMarker(new SuperMap.Marker(new SuperMap.LonLat(point.x, point.y), icon));
                nodeArray.push(point);
            }

            //选中时显示路径指引信息
            function onFeatureSelect(feature) {
                if(feature.attributes.description) {
                    popup = new SuperMap.Popup("chicken",
                            feature.geometry.getBounds().getCenterLonLat(),
                            new SuperMap.Size(200,30),
                            "<div style='font-size:.8em; opacity: 0.8'>" + feature.attributes.description + "</div>",
                            null, false);
                    feature.popup = popup;
                    map.addPopup(popup);
                }
                if(feature.geometry.CLASS_NAME != "SuperMap.Geometry.Point"){
                    feature.style = styleGuideLine;
                    vectorLayer.redraw();
                }
            }

            //清除要素时调用此函数
            function onFeatureUnselect(feature) {
                map.removePopup(feature.popup);
                feature.popup.destroy();
                feature.popup = null;
                if(feature.geometry.CLASS_NAME != "SuperMap.Geometry.Point"){
                    feature.style = style;
                }
                vectorLayer.redraw();

            }

            function findPath() {
                drawPoint.deactivate();
                var findPathService, parameter, analystParameter, resultSetting;
                resultSetting = new SuperMap.REST.TransportationAnalystResultSetting({
                    returnEdgeFeatures: true,
                    returnEdgeGeometry: true,
                    returnEdgeIDs: true,
                    returnNodeFeatures: true,
                    returnNodeGeometry: true,
                    returnNodeIDs: true,
                    returnPathGuides: true,
                    returnRoutes: true
                });
                analystParameter = new SuperMap.REST.TransportationAnalystParameter({
                    resultSetting: resultSetting,
                    weightFieldName: "length"
                });
                parameter = new SuperMap.REST.FindPathParameters({
                    isAnalyzeById: false,
                    nodes: nodeArray,
                    hasLeastEdgeCount: false,
                    parameter: analystParameter
                });
                if (nodeArray.length <= 1) {
                    alert("站点数目有误");
                }
                findPathService = new SuperMap.REST.FindPathService(url2, {
                    eventListeners: { "processCompleted": processCompleted }
                });
                findPathService.processAsync(parameter);
            }
            
            
            
            function findTSPPaths() {
                drawPoint.deactivate();
                var findTSPPathsService, parameter, analystParameter, resultSetting;
                resultSetting = new SuperMap.REST.TransportationAnalystResultSetting({
                    returnEdgeFeatures: true,
                    returnEdgeGeometry: true,
                    returnEdgeIDs: true,
                    returnNodeFeatures: true,
                    returnNodeGeometry: true,
                    returnNodeIDs: true,
                    returnPathGuides: true,
                    returnRoutes: true
                });
                analystParameter = new SuperMap.REST.TransportationAnalystParameter({
                    resultSetting: resultSetting,
                    weightFieldName: "length"
                });
                parameter = new SuperMap.REST.FindTSPPathsParameters({
                    isAnalyzeById: false,
                    nodes: nodeArray,
                    endNodeAssigned: false,
                    parameter: analystParameter
                });
                if (nodeArray.length <= 1) {
                    alert("站点数目有误");
                }
                findTSPPathsService = new SuperMap.REST.FindTSPPathsService(url2, {
                    eventListeners: { "processCompleted": processCompleted2 }
                });
                findTSPPathsService.processAsync(parameter);
            }
            
            
            
            function processCompleted(e) {
                var result = e.result;
                allScheme(result);
            }
            function allScheme(result) {
                if (i < result.pathList.length) {
                    addPath(result);
                } else {
                    i = 0;
                    //线绘制完成后会绘制关于路径指引点的信息
                    addPathGuideItems(result);
                }
            }
            //以动画效果显示分析结果
            function addPath(result) {
                if (j < result.pathList[i].route.components.length) {
                    var pathFeature = new SuperMap.Feature.Vector();
                    var points = [];
                    for (var k = 0; k < 2; k++) {
                        if (result.pathList[i].route.components[j + k]) {
                            points.push(new SuperMap.Geometry.Point(result.pathList[i].route.components[j + k].x, result.pathList[i].route.components[j + k].y));
                        }
                    }
                    var curLine = new SuperMap.Geometry.LinearRing(points);
                    pathFeature.geometry = curLine;
                    pathFeature.style = style;
                    vectorLayer.addFeatures(pathFeature);
                    //每隔0.001毫秒加载一条弧段
                    pathTime = setTimeout(function () { addPath(result); }, 0.001);
                    j++;
                } else {
                    clearTimeout(pathTime);
                    j = 0;
                    i++;
                    allScheme(result);
                }
            }

            function addPathGuideItems(result){
                vectorLayer.removeAllFeatures();
                //显示每个pathGuideItem和对应的描述信息
                for(var k = 0; k < result.pathList.length; k++){
                    var pathGuideItems = result.pathList[i].pathGuideItems, len = pathGuideItems.length;
                    for(var m = 0; m < len; m++){
                        var guideFeature = new SuperMap.Feature.Vector();
                        guideFeature.geometry = pathGuideItems[m].geometry;
                        guideFeature.attributes = {description: pathGuideItems[m].description};
                        if(guideFeature.geometry.CLASS_NAME === "SuperMap.Geometry.Point"){
                            guideFeature.style = styleGuidePoint;
                        }
                        else{
                            guideFeature.style = style;
                        }
                        vectorLayer.addFeatures(guideFeature);
                    }
                }
                select.activate();
            }
            
            function processCompleted2(findTSPPathsEventArgs) {
                result = findTSPPathsEventArgs.result;
                allScheme2(result);
            }
            function allScheme2(result) {
                if (i < result.tspPathList.length) {
                    addPath2(result);
                } else {
                    i = 0;
                }
            }
            //以动画效果显示分析结果
            function addPath2(result) {
                if (j < result.tspPathList[i].route.components[0].components.length) {
                    var pathFeature = new SuperMap.Feature.Vector();
                    var points = [];
                    for (var k = 0; k < 2; k++) {
                        if (result.tspPathList[i].route.components[0].components[j + k]) {
                            points.push(new SuperMap.Geometry.Point(result.tspPathList[i].route.components[0].components[j + k].x, result.tspPathList[i].route.components[0].components[j + k].y));
                        }
                    }
                    var curLine = new SuperMap.Geometry.LinearRing(points);
                    pathFeature.geometry = curLine;
                    pathFeature.style = style;
                    vectorLayer.addFeatures(pathFeature);

                    //每隔0.01毫秒加载一条弧段
                    pathTime = setTimeout(function () { addPath2(result); }, 0.01);
                    j++;
                } else {
                    clearTimeout(pathTime);
                    j = 0;
                    i++;
                    allScheme2(result);
                }
            }

            function clearElements() {
                n = 0;
                i = 0;
                j = 0;
                nodeArray = [];
                select.deactivate();
                if(vectorLayer.selectedFeatures.length > 0) {
                    map.removePopup(vectorLayer.selectedFeatures[0].popup);
                }
                vectorLayer.removeAllFeatures();
                markerLayer.clearMarkers();
            }
   //+++++++++++++++

   init3();
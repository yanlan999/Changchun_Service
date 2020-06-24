var layer1;//
var map, local, layer, drawLine, lineLayer,drawPolygon, polygonLayer;
var url = "http://localhost:8090/iserver/services/map-changchun/rest/maps/长春市区图";
style = {
            strokeColor: "#304DBE",
            strokeWidth: 2,
            pointerEvents: "visiblePainted",
            fillColor: "#304DBE",
            fillOpacity: 0.8
       	};
function init(){
           //新建线矢量图层
            lineLayer = new SuperMap.Layer.Vector("lineLayer");
            //对线图层应用样式style（前面有定义）
            lineLayer.style = style;
            
            //新建面矢量图层
            polygonLayer = new SuperMap.Layer.Vector("polygonLayer");
            //对面图层应用样式style（前面有定义）
            polygonLayer.style = style;
            
            //创建画线控制，图层是lineLayer;这里DrawFeature(图层,类型,属性)；multi:true在将要素放入图层之前是否现将其放入几何图层中
            drawLine = new SuperMap.Control.DrawFeature(lineLayer, SuperMap.Handler.Path, { multi: true });
			/*注册featureadded事件,触发drawCompleted()方法,例如注册"loadstart"事件的单独监听
            events.on({ "loadstart": loadStartListener });*/
            drawLine.events.on({"featureadded": drawCompleted});
            
			//创建画面控制，图层是polygonLayer
            drawPolygon = new SuperMap.Control.DrawFeature(polygonLayer, SuperMap.Handler.Polygon);
            drawPolygon.events.on({"featureadded": drawCompletedArea});
            
            //定义layer图层，TiledDynamicRESTLayer：分块动态 REST 图层
           layer1=layer = new SuperMap.Layer.TiledDynamicRESTLayer("Changchun", url, { transparent: true, cacheEnabled: true }, { maxResolution: "auto" });
            //为图层初始化完毕添加addLayer()事件
            layer.events.on({"layerInitialized":addLayer});
            //初始化鹰眼控件类
			overviewmap = new SuperMap.Control.OverviewMap();
			//属性minRectSize：鹰眼范围矩形边框的最小的宽度和高度。默认为8pixels
			overviewmap.minRectSize = 8;
            map = new SuperMap.Map("map",{controls: [
                new SuperMap.Control.LayerSwitcher(),
                new SuperMap.Control.ScaleLine(),
                new SuperMap.Control.PanZoomBar(),
                new SuperMap.Control.Navigation({
                    dragPanOptions: {
                        enableKinetic: true
                    }}),
                drawLine,drawPolygon]
            });
          //初始化版权控件类
				attribution = new SuperMap.Control.Attribution();

				layerWorld = new SuperMap.Layer.TiledDynamicRESTLayer("World", url); //获取World地图服务地址
				layerWorld.events.on({
					"layerInitialized": addLayer
				});
				
		}
         
     

		// 加载图层
        function addLayer() {		   
			// 向Map添加图层
            map.addLayers([layer, lineLayer,  polygonLayer]);
			//map.addLayer(layer);
			map.addControl(overviewmap);
			layer.attribution = "powered by <a target='_blank' href='http://www.supermap.com/cn" + "'>SuperMap</a> |detail in <a style='white-space: nowrap' target='_blank' href='" + url + "'>ChangChun</a>";
			map.addControl(attribution);
            map.setCenter(new SuperMap.LonLat(5136.71 , -4159.16), 0.8);
            
        }

		// 绘制线段结束后触发函数，获取绘制的线段，并执行量算
		function drawCompleted(drawGeometryArgs){
			//停止画面控制
			drawLine.deactivate();
			//获得图层几何对象
			var geometry = drawGeometryArgs.feature.geometry,
			measureParam = new SuperMap.REST.MeasureParameters(geometry), /* MeasureParameters：量算参数类。 客户端要量算的地物间的距离或某个区域的面积*/
			myMeasuerService = new SuperMap.REST.MeasureService(url); //量算服务类，该类负责将量算参数传递到服务端，并获取服务端返回的量算结果
			myMeasuerService.events.on({ "processCompleted": measureCompleted });
			//对MeasureService类型进行判断和赋值，当判断出是LineString时设置MeasureMode.DISTANCE，否则是MeasureMode.AREA
			myMeasuerService.measureMode = SuperMap.REST.MeasureMode.DISTANCE;
			myMeasuerService.processAsync(measureParam); //processAsync负责将客户端的量算参数传递到服务端。
		}

		function drawCompletedArea(drawGeometryArgs) {
            //停止画面控制
            drawPolygon.deactivate();
            //获得图层几何对象
            var geometry = drawGeometryArgs.feature.geometry,
                measureParam = new SuperMap.REST.MeasureParameters(geometry), /* MeasureParameters：量算参数类。 客户端要量算的地物间的距离或某个区域的面积*/
                myMeasuerService = new SuperMap.REST.MeasureService(url); //量算服务类，该类负责将量算参数传递到服务端，并获取服务端返回的量算结果
            myMeasuerService.events.on({ "processCompleted": measureCompletedArea});
			//对MeasureService类型进行判断和赋值，当判断出是LineString时设置MeasureMode.DISTANCE，否则是MeasureMode.AREA
			myMeasuerService.measureMode = SuperMap.REST.MeasureMode.AREA;
			myMeasuerService.processAsync(measureParam); //processAsync负责将客户端的量算参数传递到服务端。
        }
		
		//距离量算
		function distanceMeasure(){
			clearFeatures();
			drawLine.activate();
		}

		// 获取距离量算结果
		function measureCompleted(measureEventArgs){
			var distance = measureEventArgs.result.distance;
			var unit = measureEventArgs.result.unit;
			alert("量算结果:"+distance + "米");
		}
		
		//面积测量结束调用事件
        function measureCompletedArea(measureEventArgs) {
            var area = measureEventArgs.result.area;
            var unit = measureEventArgs.result.unit;
            alert("量算结果:"+ area + "平方米");
        }
		
		//量算失败触发函数
		function processFailed(MeasureEventArgs){
		   alert("失败");
		}

		// 面积量算
		function areaMeasure(){
			clearFeatures();
            drawPolygon.activate();
		}
		
		//消除距离量算结果
		function clearFeatures(){
			lineLayer.removeAllFeatures();
			polygonLayer.removeAllFeatures();
		}
		//放大 ，在当前缩放级别的基础上放大一级。
		function mapenlarge()
		{
		map.zoomIn();
		}
		//缩小，在当前缩放级别的基础上缩小一级。
		function mapreduce()
		{
		map.zoomOut();
		}
		//平移 ，根据指定的屏幕像素（-20，-8）值平移地图
		function mapPan()
		{
		map.pan(-20,-8);
		}
	//++++++++++++++++++++++++++++++++++++++++++
	function mapclear1(){
	map.removeLayer(layer1);
		
	}
	function mapopen1(){
		map.addLayer(layer3);
	}

	init();
	
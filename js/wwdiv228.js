
var featuresOrigin = [];
var map, local, layer, pointLayer, drawPoint, lineLayer, markerLayer, vector, select;
var pointArray = [];
var styleDraw = {
	strokeColor: "#304DBE",
	strokeWidth: 2,
	pointerEvents: "visiblePainted",
	fillColor: "#304DBE",
	fillOpacity: 0.8,
	pointRadius: 6
};
style = {
	strokeColor: "#304DBE",
	strokeWidth: 2,
	pointerEvents: "visiblePainted",
	fillColor: "#304DBE",
	fillOpacity: 0.8
};

var style_green = {
	strokeColor: "#FFF",
	strokeOpacity: 1,
	strokeWidth: 2,
	pointRadius: 6,
	pointerEvents: "visiblePainted",
	fillColor: '#545BF4'
};

var style_green1 = {
	strokeColor: "#FFF",
	strokeOpacity: 1,
	strokeWidth: 2,
	pointRadius: 6,
	pointerEvents: "visiblePainted",
	fillColor: '#50E7F8'
};

var style_green2 = {
	strokeColor: "#FFF",
	strokeOpacity: 1,
	strokeWidth: 2,
	pointRadius: 6,
	pointerEvents: "visiblePainted",
	fillColor: '#0C9CFE'
};
var style1 = {
	fillColor: '#F00',
	fillOpacity: 0.6,
	strokeWidth: 0
};

var style2 = {
	fillColor: '#0F0',
	fillOpacity: 0.6,
	strokeWidth: 0
};

var style3 = {
	fillColor: '#00F',
	fillOpacity: 0.6,
	strokeWidth: 0
};

url = "http://localhost:8090/iserver/services/map-changchun/rest/maps/长春市区图";

function init6() {
	//新建点矢量图层
	pointLayer = new SuperMap.Layer.Vector("pointLayer");
	//对点图层应用样式styleDraw（前面有定义）
	pointLayer.style = styleDraw;
	drawPoint = new SuperMap.Control.DrawFeature(pointLayer, SuperMap.Handler.Point);
	drawPoint.events.on({
		"featureadded": drawCompleted
	});
	//新建线矢量图层
	lineLayer = new SuperMap.Layer.Vector("lineLayer");
	//对线图层应用样式styleDraw（前面有定义）
	lineLayer.style = styleDraw;

	//定义layer图层，TiledDynamicRESTLayer：分块动态 REST 图层
	layer = new SuperMap.Layer.TiledDynamicRESTLayer("China", url, {
		transparent: true,
		cacheEnabled: true
	}, {
		maxResolution: "auto",
		useCanvas: false
	});
	//为图层初始化完毕添加addLayer()事件
	layer.events.on({
		"layerInitialized": addLayer
	});
	map = new SuperMap.Map("map", {
		controls: [
			new SuperMap.Control.LayerSwitcher(),
			new SuperMap.Control.OverviewMap(),
			new SuperMap.Control.ScaleLine(),
			new SuperMap.Control.PanZoomBar(),
			new SuperMap.Control.Navigation({
				dragPanOptions: {
					enableKinetic: true
				}
			}), drawPoint
		]
	});
}

function addLayer() {
	map.addLayers([layer, pointLayer, lineLayer]);
	map.setCenter(new SuperMap.LonLat(5136.71 , -4159.16), 1);
}
//绘制点
function createPoint() {
	drawPoint.activate();
}
//绘制B样条线
function createBLine() {
	if(pointArray.length < 2) {
		alert("请绘制至少两个点！");
		return -1;
	}
	drawPoint.deactivate()
	var geo1 = SuperMap.Geometry.LineString.createBspline(pointArray, 10);
	var vector1 = new SuperMap.Feature.Vector(
		geo1, {},
		styleDraw
	);
	lineLayer.addFeatures([vector1]);
}

function drawCompleted(drawGeometryArgs) {
	var feature = drawGeometryArgs.feature;
	var geometry = feature.geometry;
	//将每次绘制的点存起来
	pointArray.push(geometry);

	//停止画点面控制
	//drawPoint.deactivate();
}
//移除整个图层要素
function clearAllFeatures() {
	pointArray = [];
	pointLayer.removeAllFeatures();
	lineLayer.removeAllFeatures();
}

this.win = new InforWindow_z({
	"map": map
});

function InforWindow_z(param) {
	var t = this;
	t.infowin = null;
	t.map = null;
	t.init = function(param) {
		for(var key in param) {
			t[key] = param[key];
		}
	}
	t.open = function(feature, data) {
		t.close();
		t.create(feature, data);
	}
	t.create = function(feature, data) {
		var contentHTML = "<div style='font-size:.8em; opacity: 0.8; overflow-y:hidden;'>" +
			"<span style='font-weight: bold; font-size: 18px;'>详细信息</span><br>";
		contentHTML += "公司名称：" + data.name + "<br>";
		contentHTML += "公司地址：" + data.informition + "</div>";
		//初始化一个弹出窗口，当某个地图要素被选中时会弹出此窗口，用来显示选中地图要素的属性信息
		var popup = new SuperMap.Popup.FramedCloud("chicken",
			feature.marker.lonlat,
			null,
			contentHTML,
			null,
			true);
		feature.popup = popup;
		map.addPopup(popup);
		t.infowin = popup;
	}
	t.close = function() {
		if(t.infowin) {
			try {
				t.infowin.hide();
				t.infowin.destroy();
			} catch(e) {}
		}
	}
	t.init(param);
}

function mapToImg1() {
	MapToImg && MapToImg.excute(map);
}
   
//+++++++++++++++++++++
init6();
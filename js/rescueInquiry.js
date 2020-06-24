			var local, map, layer, vectorLayer, markerLayer1,
				markerLayer2, drawPoint, eventPoint, n = 0,
				facilityPoints = [
					new SuperMap.Geometry.Point(6000, -5500),
					new SuperMap.Geometry.Point(5500, -2500),
					new SuperMap.Geometry.Point(2500, -3500)
				],
				style = {
					strokeColor: "#304DBE",
					strokeWidth: 3,
					pointerEvents: "visiblePainted",
					fill: false
				},
				url1 = "http://localhost:8090/iserver/services/map-changchun/rest/maps/长春市区图"
				url2 = "http://localhost:8090/iserver/services/transportationanalyst-sample/rest/networkanalyst/RoadNet@Changchun";
			
			function init4() {
				vectorLayer = new SuperMap.Layer.Vector("Vector Layer");
				drawPoint = new SuperMap.Control.DrawFeature(vectorLayer, SuperMap.Handler.Point);
				drawPoint.events.on({
					"featureadded": drawCompleted
				});
				map = new SuperMap.Map("map", {
					controls: [
						new SuperMap.Control.LayerSwitcher(),
						new SuperMap.Control.ScaleLine(),
						new SuperMap.Control.PanZoomBar(),
						new SuperMap.Control.Navigation({
							dragPanOptions: {
								enableKinetic: true
							}
						}),
						drawPoint
					],
					units: "m"
				});
				// 加载鹰眼控件
            	map.addControl(new SuperMap.Control.OverviewMap());
            
				layer = new SuperMap.Layer.TiledDynamicRESTLayer("Changchun", url1, {
					transparent: true,
					cacheEnabled: true
				}, {
					maxResolution: "auto"
				});
				layer.events.on({
					"layerInitialized": addLayer
				});
				markerLayer1 = new SuperMap.Layer.Markers("Markers");
				markerLayer2 = new SuperMap.Layer.Markers("Markers");

				var size = new SuperMap.Size(44, 40),
					offset = new SuperMap.Pixel(-(size.w / 2), -size.h),
					icon1 = new SuperMap.Icon("theme/images/hospital.png", size, offset),
					icon2 = new SuperMap.Icon("theme/images/hospital.png", size, offset),
					icon3 = new SuperMap.Icon("theme/images/hospital.png", size, offset);
				markerLayer1.addMarker(new SuperMap.Marker(new SuperMap.LonLat(6000, -5500), icon1));
				markerLayer1.addMarker(new SuperMap.Marker(new SuperMap.LonLat(5500, -2500), icon2));
				markerLayer1.addMarker(new SuperMap.Marker(new SuperMap.LonLat(2500, -3500), icon3));
			}

			function addLayer() {
				map.addLayers([layer, vectorLayer, markerLayer1, markerLayer2]);
				map.setCenter(new SuperMap.LonLat(5136.71 , -4159.16), 1);
			}

			function selectEventPoint() {
				clearElements();
				drawPoint.activate();
			}

			function drawCompleted(drawGeometryArgs) {
				var point = drawGeometryArgs.feature.geometry,
					size = new SuperMap.Size(44, 33),
					offset = new SuperMap.Pixel(-(size.w / 2), -size.h),
					icon = new SuperMap.Icon("theme/images/marker.png", size, offset);
				markerLayer2.addMarker(new SuperMap.Marker(new SuperMap.LonLat(point.x, point.y), icon));
				eventPoint = point;
				n++;
				if(n >= 1) {
					drawPoint.deactivate();
				}
			}

			function findClosestFacilities() {
				drawPoint.deactivate();
				if(!eventPoint) {
					alert("请选择事件点！");
					return;
				}
				var findClosestFacilitiesService, parameter, analystParameter, resultSetting;
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
					
				});
				parameter = new SuperMap.REST.FindClosestFacilitiesParameters({
					event: eventPoint,
					expectFacilityCount: 1,
					isAnalyzeById: false,
					facilities: facilityPoints,
					parameter: analystParameter
				});
				findClosestFacilitiesService = new SuperMap.REST.FindClosestFacilitiesService(url2, {
					eventListeners: {
						"processCompleted": processCompleted
					}
				});
				findClosestFacilitiesService.processAsync(parameter);
			}

			function processCompleted(findClosestFacilitiesEventArgs) {
				var result = findClosestFacilitiesEventArgs.result,
					features = [];
				if(result.facilityPathList) {
					for(var i = 0, facilityPathList = result.facilityPathList, len = facilityPathList.length; i < len; i++) {
						var feature = new SuperMap.Feature.Vector();
						feature.geometry = facilityPathList[i].route;
						feature.style = style;
						features.push(feature);
					}
				}
				vectorLayer.addFeatures(features);
			}

			function clearElements() {
				eventPoint = null;
				n = 0;
				markerLayer2.clearMarkers();
				vectorLayer.removeAllFeatures();
			}
			init4();
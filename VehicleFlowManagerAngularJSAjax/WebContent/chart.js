(function() {
	var app = angular.module('transportApp');

	var ChartController = function($scope, $http) {

		var url = "http://localhost:7001/VehicleFlowManagerSpringMVC/webservice";

		// $scope.listOfOptions = ['Status', 'Shipping Requester Location ID'];
		var names;
		$http.get(url).then(function(response) {
			names = response.data;
			chartChange(names);
			//app.element(document.querySelector('scroll')).addClass("highlight");

		});
		// var chartselect="status"

		$scope.optionClick = function() {
			chartChange(names);
		}

		$scope.chartselect = "status";

		var chartChange = function(names) {
			var chartselect = $scope.chartselect;
			// chartSelection.setpiechart(names);
			setpiechart(names, chartselect);
		};

		/*
		 * $scope.optionClick=function(names){ var
		 * chartselect=$scope.chartselect; // chartSelection.setpiechart(names);
		 * setpiechart(names, chartselect); } var
		 * optionClick=$scope.optionClick;
		 */

		var setpiechart = function(names, chartselect) {

			var counterShippingDestination = 0;

			/*if (chartselect == "status") {

				var counterPending = 0;
				var counterApproved = 0;
				var counterDenied = 0;
				var counterReceived = 0;

				for (var i = 0; i < names.length; i++) {

					if (chartselect = "status") {
						console.log(names[i].status);

						if (names[i].status === "Approved") {
							counterApproved++;
						}
						if (names[i].status === "Denied") {
							counterDenied++;
						}
						if (names[i].status === "Pending") {
							counterPending++;
						}
						if (names[i].status === "Received") {
							counterReceived++;
						}
					}

				}

				$scope.data = [ {
					key : "Approved",
					y : 1 && counterApproved
				}, {
					key : "Denied",
					y : 2 && counterDenied
				}, {
					key : "Pending",
					y : 9 && counterPending
				}, {
					key : "Received",
					y : 7 && counterReceived
				} ];
			}*/

			var myArray = new Array();

			if (chartselect == "status" || chartselect == "currentLocationId"
					|| chartselect == "shippingLocationId") {

				if (chartselect == "status") {
					for (var i = 0; i < names.length; i++) {

						myArray[i] = names[i].status

					}
				}

				if (chartselect == "currentLocationId") {
					for (var i = 0; i < names.length; i++) {

						myArray[i] = names[i].current_location_id

					}
				}
				if (chartselect == "shippingLocationId") {
					for (var i = 0; i < names.length; i++) {

						myArray[i] = names[i].shipping_location_id

					}
				}

				// Use the regular Set constructor to transform an Array into a
				// Set
				var mySet = new Set(myArray);

				// The values() method returns a new Iterator object that
				// contains the values for each element in the Set object in
				// insertion order.
				var setIter = mySet.values();
				// Have to make a second iterator because if you use
				// setIter.next().value, its permanent changes so you have to a
				// new one.
				var setIterSecond = mySet.values();

				var myMap = new Map();

				for (var i = 0; i < mySet.size; i++) {

					myMap.set(setIter.next().value, 0);

				}

				for (var i = 0; i < names.length; i++) {

					if (myMap.has(myArray[i])) {
						myMap.set(myArray[i], myMap.get(myArray[i]) + 1);
					}

				}

				var objectArray = new Array();
				for (var i = 0; i < mySet.size; i++) {

					var nextElement = setIterSecond.next().value;
					var myObject = {
						key : nextElement,
						y : myMap.get(nextElement)
					};
					objectArray[i] = myObject;
				}

				$scope.data = objectArray;
				console.log(objectArray);
			}

			if (chartselect == null) {

				$scope.data = [ {
					key : "One",
					y : 1
				}, {
					key : "Two",
					y : 2
				}, {
					key : "Three",
					y : 9
				}, {
					key : "Four",
					y : 7
				}, {
					key : "Five",
					y : 4
				}, {
					key : "Six",
					y : 3
				}, {
					key : "Seven",
					y : .5
				} ];

			}
		}

		$scope.options = {
			chart : {
				type : 'pieChart',
				height : 450,
				donut : true,
				x : function(d) {
					return d.key;
				},
				y : function(d) {
					return d.y;
				},
				showLabels : true,

				pie : {
					startAngle : function(d) {
						return d.startAngle / 2 - Math.PI / 2
					},
					endAngle : function(d) {
						return d.endAngle / 2 - Math.PI / 2
					}
				},
				duration : 500,
				legend : {
					margin : {
						top : 5,
						right : 70,
						bottom : 5,
						left : 0
					}
				}
			}
		};

	};

	app.controller("ChartController", [ "$scope", "$http", ChartController ]);

}());
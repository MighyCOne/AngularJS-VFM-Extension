//This is now the main js file for the application. 
//Routing through views happens here.
(function() {

	// Dependency injection should only happen this one time when using ngRoute
	var app = angular.module("transportApp", [ "ngRoute", "nvd3" ]);

	// routing rules
	app.config(function($routeProvider) {

		$routeProvider.when("/main", {
			templateUrl : "chart.html",
			controller : "ChartController"
		}).when("/main-2", {
			templateUrl : "table.html",
			controller : "MainController"
		}).otherwise({
			redirectTo : "/main"
		});
	});
	
	app.directive('scroll', function () {      
		 
	    return {
	    restrict : 'C',
	        link: function(scope, element) {
	            element.bind("click" , function(e){
	                 element.parent().find("li").removeClass("highlight");
	                 element.addClass("highlight");
	            });     
	        }
	    }
	});

	var SwitchController = function($scope, $location) {

		$scope.changeViewToGraph = function(element) {
			$location.path("/main");
			//angular.element( '<li ng-click="changeViewToGraph()" class="un-highlight">Graph</li>' ).toggleClass("highlight");
			//angular.element( '<li ng-click="changeViewToGraph()" class="un-highlight">Graph</li>' ).removeClass("un-highlight");
			/*var e=angular.element(document.querySelector('graphCss'))
			e.removeClass("un-highlight");*/
			
		};
		
		$scope.changeViewToTable = function() {
			$location.path("/main-2");
			angular.element( '<li ng-click="changeViewToTable()" class="un-highlight">Table</li>').toggleClass("highlight");

		};

	};


	app.controller("SwitchController", [ "$scope", "$location",
			SwitchController ]);

}());
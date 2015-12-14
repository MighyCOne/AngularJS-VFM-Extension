(function() {
	var app = angular.module("transportApp");
	
	var MainController=function($scope,$http){
		var url = "http://localhost:7001/VehicleFlowManagerSpringMVC/webservice";
		
		var returnNames= function(response){
			$scope.names = response.data;
			angular.element.addClass("highlight");
		}		
		$http.get(url).then(returnNames);
		
		//The sort could be improved
		$scope.requestSortOrder = "";
	};

	app.controller("MainController", ["$scope","$http", MainController]) ;

}());

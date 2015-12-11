(function(){

	angular
		.module('flightBooking')
		.factory('FlightListingService', ['$q', 'FlightSearchService', FlightListingService])
		.directive('flightListing', [flightListingDirective]);


	function FlightListingService($q, FlightSearchService){

		var listing = [
			{depart: '07:05', from: 'New Delhi', duration: '25h 25m', arrival: '23:00',
			to: 'New York', airline: {name: 'British Airways', code: 'BA-256'}, price:'41966'}
		];

		return {
			getListing: getListing,
			getCitiesList: FlightSearchService.getCitiesList
		};

		function getListing(){
			return $q.when(listing);
		}
	}

	function FlightListingController($scope, FlightListingService) {
		var self = this;
		self.listing = [];
		self.init = init;

		function init(){
			self.filterBySearch = filterBySearch;
			FlightListingService.getListing().then(function(data){
				self.listing = data;
			})
			FlightListingService.getCitiesList().then(function(data){
				self.cities = angular.copy(data);
				console.log('cities', data);
			})
		}

		function filterBySearch(){
			var data = self.filterData;
			var listing = (self.listing).filter(function(item){
				var flag = true;
				Object.keys(data || {}).forEach(function(objKey){
					if(item[objKey]){
						var regex = new RegExp(item[objKey], 'gi');
						if(!regex.test(data[objKey])){
							flag = flag === false ? false : false
						}
					}
				});
				return flag;
			});
			return listing;
			
		}
	}

	function flightListingDirective(){
		return {
			restrict: 'E',
			templateUrl: 'src/components/flight-listing/flight-listing.tpl.html',
			controller: ['$scope', 'FlightListingService', FlightListingController],
			controllerAs: 'flightListing',
			bindToController: {
				filterData: '='
			},
			compile: function(){
				return postLink;
			}
		};

		function postLink(scope, element, attrs, ctrl){
			ctrl.init();
		}
	}

})()
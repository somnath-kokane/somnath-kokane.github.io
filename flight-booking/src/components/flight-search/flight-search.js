(function(){

    angular
        .module('flightBooking')
        .factory('FlightSearchService', ['$q', FlightSearchService])
        .directive('flightSearch', [flightSearchDirective]);

    function flightSearchDirective($rootScope){
        return {
            restrict: 'E',
            templateUrl: 'src/components/flight-search/flight-search.tpl.html',
            controller: ['$scope', 'FlightSearchService', FlightSearchController],
            controllerAs: 'flightSearch',
            bindToController: {
                onSearch: '&',
                data: '=model'
            },
            compile: function(){
                return postLink;
            }
        };

        function postLink(scope, element, attrs, ctrl){
            ctrl.init();
        }
    }

    function FlightSearchController($scope, FlightSearchService){
        var self = this;
        self.init = init;
    
        function init(){
            self.data = self.data || {};
            self.minDate = new Date();
            self.showReturnDate = true;
            self.onSubmit = onSubmit;
            FlightSearchService.getCitiesList().then(function(data){
                self.cities = data;
            })
        }

        function onSubmit(data){
            self.onSearch && self.onSearch(data);
        }
    }

    function FlightSearchService($q){
        return {
            getCitiesList: getCitiesList
        };

        function getCitiesList(){
            return $q.when([
                {name: 'Pune'},
                {name: 'Mumbai'},
                {name: 'New Delhi'},
                {name: 'New York'}
            ]);
        }
    }

})()
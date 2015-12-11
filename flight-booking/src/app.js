(function(){

    angular
        .module('flightBooking', ['ngMaterial', 'ui.router'])
        .config(['$stateProvider', config])
        .run(['$rootScope', '$state', run])
        .controller('HomeController', ['$scope', '$state', 'FlightSearchService', HomeController])
        .controller('ListingController', ['$scope', '$state', 'FlightSearchService', ListingController])

    function config($stateProvider){
        $stateProvider
            .state('flightSearch', {
                url: '/search',
                templateUrl: 'src/views/home.tpl.html',
                controller: 'HomeController',
                controllerAs: 'vm'
            })
            .state('flightListing', {
                url: '/listing',
                templateUrl: 'src/views/flight-booking.tpl.html',
                controller: 'ListingController',
                controllerAs: 'vm'
            })
    }

    function run($rootScope, $state){
        $rootScope.brand = 'Flight Booking';
        $state.go('flightSearch');
    }

    function ListingController($scope, $state, FlightSearchService){
        var vm = this;

        init();

        function init(){
            vm.data = FlightSearchService.filterData || {};
            $scope.$on('$destroy', onDestroy);
        }

        function onInit(event, data){
            console.log('data.e', data);
        }

        function onDestroy(){
            $state.current.data = {};
        }
    }

    function HomeController($scope, $state, FlightSearchService){
        var vm = this;

        init();

        function init(){
            vm.data = FlightSearchService.filterData || {};
            vm.onSearch = onSearch;
        }

        function onSearch(data){
            FlightSearchService.filterData = angular.copy(data);
            $state.go('flightListing');
        }
    }


})()

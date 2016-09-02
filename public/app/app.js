var nodeGrowthApp = angular.module('nodeGrowth', ['ngRoute']);

nodeGrowthApp.config(function ($routeProvider) {
    $routeProvider
    .when("/rooms", {
        templateUrl: '/app/components/rooms/templates/rooms.html',
        controller: 'roomsCtrl'
    })
    .when("/settings", {
        templateUrl: '/app/components/settings/templates/settings.html'
    })
    .otherwise({ redirectTo: '/rooms' });
});

nodeGrowthApp.controller('globalCtrl', function ($scope, $location) {
    window.$scope = $scope;
    $scope.settings = {
        rooms: {
        },
        ui: {
            rooms: {
                view: 'tile',
                viewIcon: 'fa-list'
            }
        }
    }

    $scope.hourOptions = [
        { name: "01", value: 1 },
        { name: "02", value: 2 },
        { name: "03", value: 3 },
        { name: "04", value: 4 },
        { name: "05", value: 5 },
        { name: "06", value: 6 },
        { name: "07", value: 7 },
        { name: "08", value: 8 },
        { name: "09", value: 9 },
        { name: "10", value: 10 },
        { name: "11", value: 11 },
        { name: "12", value: 12 },
        { name: "13", value: 13 },
        { name: "14", value: 14 },
        { name: "15", value: 15 },
        { name: "16", value: 16 },
        { name: "17", value: 17 },
        { name: "18", value: 18 },
        { name: "19", value: 19 },
        { name: "20", value: 20 },
        { name: "21", value: 21 },
        { name: "22", value: 22 },
        { name: "23", value: 23 }
    ];

    $scope.minuteOptions = [
        { name: "00", value: 0 },
        { name: "15", value: 15 },
        { name: "30", value: 30 },
        { name: "45", value: 45 },
    ];

    $scope.isOnPage = function (viewLocation) {
        return viewLocation === $location.path();
    };
});

nodeGrowthApp.controller('topNavBarCtrl', function ($scope, $location) {

    $scope.showRooms = function (e) {
        console.log("rooms", e);
    }

    $scope.showSettings = function (e) {
        console.log("settings", e);
    }

    $('.nav a').click(function () {
        $('.navbar-collapse').collapse('hide');
    });
});

nodeGrowthApp.controller('roomsCtrl', function ($scope) {

    $.get('/api/rooms').done(function(data){
        $scope.settings.rooms = data;
    });

    function weeks_between(date1, date2) {
        // The number of milliseconds in one week
        var ONE_WEEK = 1000 * 60 * 60 * 24 * 7;
        // Convert both dates to milliseconds
        var date1_ms = date1.getTime();
        var date2_ms = date2.getTime();
        // Calculate the difference in milliseconds
        var difference_ms = Math.abs(date1_ms - date2_ms);
        // Convert back to weeks and return hole weeks
        return Math.floor(difference_ms / ONE_WEEK);
    }
});



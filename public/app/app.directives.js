var app = angular.module('nodeGrowth');

app.directive('topNavBar', function () {
    return {
        templateUrl: '/app/shared/topNavBar/topNavBar.html'
    };
});

app.directive('roomsFooter', function () {
    return {
        restrict: 'E',
        templateUrl: '/app/components/rooms/templates/roomsFooter.html',
        controller: ['$scope', function ($scope) {
            $scope.toggleView = function () {

                if ($scope.settings.ui.rooms.view == 'tile'){
                    $scope.settings.ui.rooms.view = 'list';
                    $scope.settings.ui.rooms.viewIcon = 'fa-list';
                }
                else {
                    $scope.settings.ui.rooms.view = 'tile';
                    $scope.settings.ui.rooms.viewIcon = 'fa-list-alt';
                }
            }
            
        }]
    };
});

app.directive('roomTile', function () {
    return {
        templateUrl: '/app/components/rooms/templates/roomTile.html',
        //scope: {
        //    roomIndex: '=index'
        //},
        controller: ['$scope', function ($scope) {
            $scope.currentView = "icons";

            $scope.showIcons = function () {
                $scope.currentView = "icons";
            };

            $scope.showLights = function () {
                $scope.currentView = "lights";
            };

            $scope.showFans = function () {
                $scope.currentView = "fans";
            };

            $scope.showPumps = function () {
                $scope.currentView = "pumps";
            };

            $scope.showTemperatures = function () {
                $scope.currentView = "temperatures";
            };

            $scope.showHumidity = function () {
                $scope.currentView = "humidty";
            };

            $scope.showCo2 = function () {
                $scope.currentView = "co2";
            };

            $scope.showReservoirs = function () {
                $scope.currentView = "reservoirs";
            };

            $scope.switchLight = function (light){
                light.isOn = !light.isOn;
            }

            $scope.updateRoom = function () {
                console.log("Updating Room" + $scope.$index);
                $.post('/api/rooms/' + $scope.$index, $scope.settings.rooms[$scope.$index]).then(function(data){
                    console.log(data);
                })

            }
        }]
    };
});

app.directive('roomTileIconsMenu', function () {
    return {
        templateUrl: '/app/components/rooms/templates/roomTileIconsMenu.html'
    };
});

app.directive('roomTileLightsMenu', function () {
    return {
        templateUrl: '/app/components/rooms/templates/roomTileLightsMenu.html',
        controller: ['$scope', function ($scope) {
            $scope.roomIndex = $scope.$parent.$parent.$index;
            $scope.roomArray = $scope.$parent.$parent.$parent.$parent.settings.rooms;

            $scope.selectedLight = null;

            $scope.cancelEditLight = function () {
                $scope.selectedLight = null;
            }

            $scope.deleteLight = function () {
                $('#lightDeleteModal').on('hidden.bs.modal', function (e) {
                    $scope.selectedLight = null;
                    $scope.$apply();
                });
                $('#lightDeleteModal').modal('toggle');
            }

            $scope.showDetails = function (index){
                $scope.selectedLight = $scope.settings.rooms[index];
            }

            $scope.switchLight = function (light) {
                light.isOn = !light.isOn;
                $scope.updateServer();
            }
        }]
    };
});

app.directive('lightsOverview', function () {
    return {
        templateUrl: '/app/components/rooms/templates/lightsOverview.html',
        controller: ['$scope', function ($scope) {
                    }]
    };
});

app.directive('lightsList', function () {
    return {
        templateUrl: '/app/components/rooms/templates/lightsList.html',
        controller: ['$scope', function ($scope) {
        }]
    };
});

app.directive('lightsSchedule', function () {
    return {
        templateUrl: '/app/components/rooms/templates/lightsSchedule.html',
        controller: ['$scope', function ($scope) {
        }]
    };
});

app.directive('lightsDetails', function () {
    return {
        templateUrl: '/app/components/rooms/templates/lightsDetails.html',
        controller: ['$scope', function ($scope) {
            $scope.update = $scope.$parent.$parent.$parent.updateRoom;
            $scope.updateName = function(){
                $scope.update();
            }
            $scope.updateType = function(){
                $scope.update();
            }
        }]
    };
});

app.directive('lightsToggleModal', function() {
    return {
        templateUrl: '/app/components/rooms/templates/lightsToggleModal.html'
    };
});

app.directive('settings', function () {
    return {
        templateUrl: '/app/components/settings/templates/settings.html'
    };
});

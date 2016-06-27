angular
.module('app')
    .config(['uiGmapGoogleMapApiProvider', MapConfig])
    .controller('MapCtrl', ['$scope','uiGmapIsReady', MapCtrl]);

function MapConfig(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyC-oU23c5cX9AgO1UDvpD_SHZ84q9rFjLU',
        v: '3.24', //defaults to latest 3.X anyhow
        libraries: 'weather,geometry,visualization'
    });
}

function MapCtrl($scope, uiGmapIsReady) {
    var mc = this;

    mc.setPlace = setPlace;
    mc.closeMap = closeMap;
    
    mc.close = false;

    uiGmapIsReady.promise(1).then(function (instances) {
        instances.forEach(function(inst) {
            var map = inst.map;
            console.log(map);
            var uuid = map.uiGmap_id;
            console.log(uuid);
            var mapInstanceNumber = inst.instance; // Starts at 1.
            console.log(mapInstanceNumber);
        });
    });

    $scope.limitMarker = true;

    $scope.mapWork = {
        center : {
            latitude: 47.234489635299184, /*широта*/
            longitude: 39.69635009765625 /*долгота*/
        },
        zoom : 5,
        markers: [],
        control: {},
        events: {
            click: function (mapWork, eventName, originalEventArgs) {
                if ($scope.limitMarker) {
                    var e = originalEventArgs[0];
                    $scope.lat = e.latLng.lat();
                    $scope.lon = e.latLng.lng();
                    var marker = {
                        id: Date.now(),
                        coords: {
                            latitude: $scope.lat,
                            longitude: $scope.lon
                        },
                        options: { draggable: true },
                        events: {
                            dragend: function (marker) {
                                console.log('marker dragend');
                                $scope.lat = marker.getPosition().lat();
                                $scope.lon = marker.getPosition().lng();
                            }
                        }
                    };
                    $scope.mapWork.markers.push(marker);
                    $scope.$apply();

                    $scope.limitMarker  = false;
                }
            }
        }
    };

    $scope.mapActivity = {
        center : {
            latitude: 61.5240, /*широта*/
            longitude: 105.3188 /*долгота*/
        },
        zoom : 4,
        markers: $scope.lastMarkers,
        control: {}
    };

    // $timeout(function () {},0);

    $scope.windowOptions = { visible: false };

    $scope.onClick = function() {
        $scope.windowOptions.visible = !$scope.windowOptions.visible;
    };
    $scope.closeClick = function() {
        $scope.windowOptions.visible = false;
    };

    $scope.title = "Здесь освобождена новая книга!";

    function setPlace() {
        $scope.place = {
            'lat': $scope.lat,
            'lon': $scope.lon
        };
        console.log($scope.place);
        mc.close = false;
    }

    function closeMap() {
        $scope.mapWork.markers = [];
        console.log($scope.mapWork.markers);
        mc.close = false;
        $scope.limitMarker = true;
    }

}
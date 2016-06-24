angular
.module('app')
    .config(mapConfig)
    .controller('MapCtrl', ['$scope','uiGmapIsReady', MapCtrl]);

function mapConfig(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyC-oU23c5cX9AgO1UDvpD_SHZ84q9rFjLU',
        v: '3.24', //defaults to latest 3.X anyhow
        libraries: 'weather,geometry,visualization'
    });
}

function MapCtrl($scope, uiGmapIsReady) {
    mc = this;

    mc.setPlace = setPlace;
    mc.closeMap = closeMap;
    
    mc.close = false;

    uiGmapIsReady.promise(1).then(function (instances) {
    });

    $scope.limitMarker = true;

    $scope.mapWork = {
        center : {
            latitude: 61.5240, /*широта*/
            longitude: 105.3188 /*долгота*/
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
                            dragend: function (marker, eventName, args) {
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

    uiGmapIsReady.promise(1).then(function (instances) {
        $scope.mapActivity = instances[0].map;
    });

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
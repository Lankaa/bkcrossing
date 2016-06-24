/**
 * Created by lanka on 27.05.16.
 */

angular
    .module('app')
    .directive("dropDown", dropDown);

//Директива выпадающего меню
    function dropDown() {
        return {
            restrict: "E",
            templateUrl: "dropdown.html",
            scope: {
                signOut: '&',
                name: '=',
                $state: '='
            },
            link: function(scope) {
                scope.listVisible = false;

                scope.show = function() {
                    scope.listVisible = scope.listVisible != true;
                };

                // scope.$on('click', function(){
                //     scope.listVisible = false;
                //     console.log('caught event broadcasted from $rootScope')
                // });
            }
        }
    }
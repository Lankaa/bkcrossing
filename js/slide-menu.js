/**
 * Created by lanka on 26.05.16.
 */
angular
    .module('app')
    .run(run)
    .controller('MenuCtrl', ['$scope', '$rootScope', MenuCtrl])
    
    .directive('menu', function () {
       return {
           restrict: 'E',
           template: '<div ng-class="{show: visible, left: left}"><ng-transclude></ng-transclude></div>',
           transclude: true,
           scope: { visible: '='}
       };
    })
    
    .directive('menuItem', function () {
       return {
           restrict: 'E',
           template: '<div ng-click="navigate()"></div>',
           transclude: true,
           scope: { hash: '@'},
           link: function ($scope) {
               $scope.navigate = function () {
                   window.location.hash = $scope.hash;
               }
           }
       }
    });

function run($rootScope) {
    angular.element(document).on('keyup', function (e) {
        if (e.keyCode === 27)
            $rootScope.$broadcast("escapePressed", e.target);
    });
    angular.element(document).on('click', function (e) {
        $rootScope.$broadcast('documentClicked', e.target);
    });
}

function MenuCtrl($scope, $rootScope) {
    var mc = this;
    
    mc.showMenu = showMenu;
    mc.close = close;
    
    $scope.menuVisible = false;

    function close() {
        $scope.menuVisible = false;
    }

    function showMenu() {
        $scope.menuVisible = true;
        // target.stopPropagation();

    }

    $rootScope.$on('documentClicked', _close);
    $rootScope.$on('escapePressed', _close);

    function _close() {
        $scope.$apply(function () {
            mc.close();
        });
    }
}
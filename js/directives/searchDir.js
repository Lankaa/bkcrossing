angular
.module('app')
    .directive('search', search);

function search() {
    return {
        restrict: 'E',
        templateUrl: 'search.html',
        scope: {
            $state: '='
            // searchSimple: '&'
        },
        link: function (scope, elem, attrs) {
            scope.searchVisible = false;

            scope.open = function() {
                // scope.searchVisible = scope.searchVisible != true;
                scope.$state.go('search');
            };
            
            // scope.query = { query: ''};
            //
            // elem.bind('keyup', function(event) {
            //     var code = event.keyCode;
            //     if (code == 13) {
            //         event.preventDefault();
            //         scope.$apply(attrs.search);
            //         scope.searchSimple({query: scope.query.query});
            //
            //     }
            // });
        }
    }
}
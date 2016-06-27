angular
    .module('app')
    .directive('bodyDir', ['$rootScope', bodyDir]);

     function bodyDir($rootScope){
        return {
            restrict: 'A',
            link: function(scope, element){
                element.bind('click', function(){
                    $rootScope.$broadcast('click');
                });

                var event = new Event('click');
                document.body.dispatchEvent(event);
            }
        };
     }
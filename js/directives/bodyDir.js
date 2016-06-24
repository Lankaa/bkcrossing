angular
    .module('app')

.directive('bodyDir',function($rootScope){
    return {
        restrict: 'A',
        link: function(scope, element, attrs){
            element.bind('click', function(){
                $rootScope.$broadcast('click');
            });

            var event = new Event('click');
            document.body.dispatchEvent(event);
        }
    };
})
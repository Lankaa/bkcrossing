angular.module('test', ['angularFileUpload'])

.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    // $httpProvider.defaults.headers.common['Access-Control-Allow-Headers'] = '*, X-Requested-With, content-type, Status, status';
}
])

.controller('testCtrl', ['$scope', '$http', 'FileUploader',
    function ($scope, $http, FileUploader) {
        
        $scope.uploader = new FileUploader();

        $scope.testUpload = function () {

        }
}]);

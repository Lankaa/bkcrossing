angular
.module('app')
.factory('GetFactory', ['$http', GetFactory]);

function GetFactory($http) {
    return {
        getData: function (url) {
            return $http({
                method: 'GET',
                url: url
            })
                .then(function (res) {
                    return res;
                }, function (res) {
                    return res;
                })
        }
    }
}
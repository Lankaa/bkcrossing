/**
 * Created by lanka on 28.05.16.
 */

angular
    .module('app')
    .factory('QueryFactory', ['$http', '$httpParamSerializer', QueryFactory]);

    function QueryFactory($http , $httpParamSerializer) {
        return {
            promise: function (url, data) {
                return $http({
                    method: 'POST',
                    url: url,
                    data: $httpParamSerializer(data),
                    headers : {'Content-Type': 'application/x-www-form-urlencoded'}
                })
                    .then(function (res) {
                        return res;
                    }, function (res) {
                        return res;
                    });
            }
        }
    }


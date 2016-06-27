angular
.module('app')
.controller('ChooseCtrl', ['$scope', 'GetFactory', ChooseCtrl]);

function ChooseCtrl($scope, GetFactory) {
    
    $scope.getGenre = function () {
        var url = 'http://api.bkcrossing.tk/v1/genre';
        GetFactory.getData(url)
            .then(function (res) {
                $scope.genre = res.data;
                console.log($scope.genre);
            }, function (res) {
                console.log(res.data);
                alert('Упс, что-то пошло не так...жанры')
            })
    };
    
    $scope.getCity = function () {
        var url = 'http://api.bkcrossing.tk/v1/city';
        GetFactory.getData(url)
            .then(function (res) {
                $scope.city = res.data;
                console.log($scope.city);
            }, function (res) {
                console.log(res.data);
                alert('Упс, что-то пошло не так...город')
            })
    }
    
}
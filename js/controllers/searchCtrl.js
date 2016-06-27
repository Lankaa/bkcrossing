angular
.module('app')
.controller('SearchCtrl', ['$scope', 'QueryFactory', '$state', SearchCtrl]);

function SearchCtrl($scope, QueryFactory, $state) {
    var sc = this;
    sc.search = search;
    
    $scope.search = { };

    function search(options) {
        var url = 'http://api.bkcrossing.tk/v1/book/search';
        var data = {
            query: options,
            idb: $scope.search.idb,
            isbn: $scope.search.isbn,
            name: $scope.search.name,
            writer: $scope.search.writer,
            genre: $scope.search.genre,
            descript: $scope.search.descript
        };
        console.log(data);
        $state.go('search');
        QueryFactory.promise(url, data).then(function (res) {
            switch (res.status) {
                case 200:
                {
                    $scope.searchSuc = res.data;
                    delete searchMes;
                    break;
                }
                case 204:
                {
                    $scope.searchMes = 'Ничего не найдено!';
                    delete searchSuc;
                    break;
                }
            }
        })
    }
}
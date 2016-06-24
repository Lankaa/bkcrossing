/**
 * Created by lanka on 27.05.16.
 */

angular
    .module('app')
    .controller('BookCtrl', ['$scope', '$interval', 'QueryFactory', '$timeout', BookCtrl]);

function BookCtrl($scope, $interval, QueryFactory, $timeout) {
    var bc = this;
    bc.addNewBook = addNewBook;
    bc.release = release;
    bc.take = take;
    bc.lastReleased = lastReleased;
    // bc.myBooks = myBooks;

    //      LOAD LAST RELEASE BOOKS
    angular.element().ready( bc.lastReleased );
    $interval( function () {
        $timeout (function () {
            bc.lastReleased()
        }, 0);
    } , 300000);
    
    $scope.add = { 'token': localStorage.token };
    $scope.free = { 'token': localStorage.token };
    $scope.myShelf = { 'token': localStorage.token };
    $scope.releasingBook = {};
    $scope.takeBook = {};
    
    //      ADD NEW BOOKS
    function addNewBook() {
        var url = 'http://api.bkcrossing.tk/v1/book/add';
        var data = $scope.add;
        QueryFactory.promise(url, data).then(function (res) {
            if ($scope.errAdd != undefined) {
                delete $scope.errAdd;
            }
            else { delete $scope.sucAdd;}
            switch (res.status) {
                case 201: {
                    $scope.sucAdd = res.data.idb;
                    $scope.add = {};
                    break;
                }
                case 409: {
                    $scope.errAdd = 'Такая книга уже существует';
                    break;
                }
                case 400: $scope.errAdd = 'Книга не добавлена';

            }
        });
    }
    
    //      RELEASE BOOKS
    function release(releaseBook, lat, lon, descript) {
        var url = 'http://api.bkcrossing.tk/v1/book/release';
        var data = {
            'token': localStorage.token,
            'idb': releaseBook,
            'descript': descript,
            'lat': lat,
            'lon': lon
        };
        QueryFactory.promise(url, data).then(function (res) {
            if ($scope.errRel != ' ') {
                delete $scope.errRel;
            }
            else { delete $scope.sucRel; }
            $scope.limitMarker = true;
            if (res.status === 200) {
                $scope.releasingBook = {};
                $scope.sucRel = 'Книга успешно отпущена!';
            }
            else {
                $scope.errRel = 'Книга не отпущена';
            }
        });
    }
    
    //      TAKE BOOKS
    function take(takeBook) {
        var url = 'http://api.bkcrossing.tk/v1/book/take';
        var data = {
            'token': localStorage.token,
            'idb': takeBook
        };
        if (angular.isDefined(data)) {
            QueryFactory.promise(url, data).then(function (res) {
                if ($scope.errTake != undefined) {
                    delete $scope.errTake;
                }
                else { delete $scope.sucTake;}
                if (res.status === 200) {
                    $scope.sucTake = 'Книга успешно взята';
                    $timeout(function () {
                        delete ($scope.sucTake)
                    }, 3000);
                    $timeout(function () {
                        bc.lastReleased();
                    }, 0);
                }
                else $scope.errTake = 'Кто-то уже взял эту книгу';
            })
        }
        else $scope.errTake = 'Вы ничего не ввели';
    }

    function lastReleased() {
        var url = 'http://api.bkcrossing.tk/v1/book/free';
        var data = $scope.free;
        QueryFactory.promise(url, data).then( function (res) {
            if(res.status === 200) {
                $scope.bookInfo = res.data;
                parseMarkers(res.data);
            }
            else console.log(res.data);
        });
    }

    $scope.myBooks = function () {
        var url = 'http://api.bkcrossing.tk/v1/user/shelf';
        var data = $scope.myShelf;
        QueryFactory.promise(url, data).then( function (res) {
            if(res.status === 200) {
                $scope.myBookInfo = res.data;
            }
            else $scope.myBookInfoErr = '';
        });
    };

    $scope.lastMarkers = [];
    console.log($scope.lastMarkers);

    function parseMarkers(book) {
        var markers = [];

        for(var i in book){
            markers.push(parseMarker(book[i]));
        }
        console.log(markers);
        return $scope.lastMarkers = markers;
    }
    
    function parseMarker(book) {
        console.log(book);
        return {
            id: book.idb,
            title: book.name,
            latitude: book.coords.lat,
            longitude: book.coords.lon
        }
    }
}
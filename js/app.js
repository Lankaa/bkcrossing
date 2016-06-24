(function () {
    angular
        .module('app', ['ui.router', 'ngAnimate', 'uiGmapgoogle-maps'])
        .config(config);

        function config($stateProvider, $urlRouterProvider) {
            
            $urlRouterProvider.otherwise('/home');

            $stateProvider
                .state('index', {
                    url: '/home',
                    templateUrl: 'views/main.html'
                })
                .state('work', {
                    url: '/work',
                    templateUrl: 'views/work.html',
                    controller: function ($scope) {
                        $scope.getGenre();
                    }
                })
                .state('activity', {
                    url: '/activity',
                    templateUrl: 'views/activity.html',
                    controller: function () {

                    }
                })
                .state('about', {
                    url: '/about',
                    templateUrl: 'views/about.html'
                })
                .state('update', {
                    url: '/editProfile',
                    templateUrl: 'views/edit.html',
                    controller: function ($scope, $state) {
                        if(localStorage.token == undefined) {
                            $state.go('index');
                        }
                        else $scope.getCity();
                    }
                })
                .state('my', {
                    url: '/myBooks',
                    templateUrl: 'views/shelf.html',
                    controller: function ($scope, $state) {
                        if(localStorage.token == undefined) {
                            $state.go('index');
                        }
                        else $scope.myBooks();
                    }
                })
                .state('last', {
                    url: '/lastReleased',
                    templateUrl: 'views/lastReleased.html'
                })
                .state('search', {
                    url: '/search',
                    templateUrl: 'views/search.html',
                    controller: function ($scope) {
                        $scope.getGenre();
                    }
                })
        }
})();
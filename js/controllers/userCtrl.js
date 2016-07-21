angular
.module('app')
.controller('UserCtrl', ['$scope', 'QueryFactory', '$state', UserCtrl]);

function UserCtrl($scope, QueryFactory, $state) {
    var uc = this;
    
    uc.edit = edit;
    uc.reg = reg;
    uc.auth = auth;
    uc.login = login;
    uc.logout = logout;
    
    uc.switchIn = false;
    uc.switchUp = false;
    
    $scope.$state = $state;
    $scope.user = {};
    $scope.password1 = {};
    $scope.editProfile = {};
    $scope.editPass = {};
    $scope.form = false;
    $scope.sign = {};

    if (localStorage.token) {
        angular.element(document).ready( uc.auth );
    }

    function edit(lastName, firstName, city, login, email, pass) {
        var url = 'http://api.bkcrossing.tk/v1/user/update';
        var data = {
            token: localStorage.token,
            lasName: lastName,
            firstName: firstName,
            city: city,
            login: login,
            email: email,
            pass: pass
        };
        QueryFactory.promise (url, data)
            .then(function (res) {
                if ($scope.errEdit != undefined) {
                    delete $scope.errEdit;
                }
                else { delete $scope.sucEdit;}
                if (res.status === 200) {
                    $scope.sucEdit = 'Данные успешно изменены';
                }
                else $scope.errEdit = 'Данные не изменены';
            })
    }
    
    function reg() {
        var url = 'http://api.bkcrossing.tk/v1/user';
        var data = $scope.user;
        QueryFactory.promise(url, data)
            .then(function (res) {
                if ($scope.mes != undefined) {
                    delete $scope.mes;
                }
                else { delete $scope.suc;}

                switch (res.status){
                    case 201:
                        $scope.suc = 'Вы успешно зарегистрированы!';
                        uc.login($scope.user.login, $scope.user.password);
                        $scope.user = {};
                        $scope.password1 = {};
                        break;
                    case 400:
                        $scope.mes = 'Некорректные данные';
                        break;
                    case 409:
                        $scope.mes = 'Логин занят';
                        break;
                    case 404:
                        $scope.mes = 'Без лажи - нет гранжа!';
                        break;
                }
            })
    }

    function auth() {
        if (localStorage.token) {
            var url = 'http://api.bkcrossing.tk/v1/user/auth';
            var data = { 'token': localStorage.token };
            var cool = QueryFactory.promise(url, data);
            cool
                .then(function (res) {
                    switch (res.status) {
                        case 200: {
                            $scope.name = res.data.login;
                            $scope.auth = res.data;
                            $scope.sign = {};
                            break;
                        }
                        case 404: {
                            // $scope.errLogin = 'Ошибка сервера';
                            break;
                        }
                    }
                });
        }
    }

    function login(login, pass) {
        var url = 'http://api.bkcrossing.tk/v1/user/signin';
        var data = {
            login: login,
            password: pass
        };

        QueryFactory.promise(url, data)
            .then(function (res) {
                switch (res.status) {
                    case 200: {
                        delete $scope.errLogin;
                        localStorage.token = res.data.token;
                        uc.auth();
                        uc.switchIn = false;
                        uc.switchUp = false;
                        break;
                    }
                    case 400: {
                        $scope.errLogin = 'Некорректные данные';
                        break;
                    }
                    case 404: {
                        $scope.errLogin = 'Ошибка сервера';
                        break;
                    }
                }
            })
    }

    function logout() {
        var url = 'http://api.bkcrossing.tk/v1/user/signout';
        var data =  {  'token': localStorage.token };

        QueryFactory.promise(url, data)
            .then(function (res) {
                // TODO: code of error and success
                if(res.status === 200) {
                    localStorage.clear();
                    delete $scope.name;
                    if($state.is('my') || $state.is('update')) {
                        $state.go('index');
                    }
                }
                else $scope.err = 'Ошибка сервера';
            })
    }
}
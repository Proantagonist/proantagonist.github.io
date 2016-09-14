var app = angular.module('mainApp', ['ui.router', 'angular.filter', 'projectorList']);

app.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('default', {
            url: '/?projector1&projector2&step&inverted',
            templateUrl: 'applicationPartial.html',
            controller: 'mainController'
        })

    //    .state('update', {
    //        url: '/update/:guid',
    //        templateUrl: baseUrl + 'Admin/Users/Accounts/adminUsersDetailsPartial.html',
    //        controller: 'adminUsersController'
    //    })

});
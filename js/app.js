/**
 * Created by GS on 2/18/2017.
 */
var azaleaaRoot = angular.module('azaleaaRoot', ['ngRoute','ui.router','ngStorage']);


/*azaleaaRoot.config(function($routeProvider){
    $routeProvider
        .when('/home',{
            templateUrl:'pages/home.html',
            controller:'authController'
        })

        .when('/login',{
            templateUrl:'pages/landing.html',
            controller:'authController'
        })
});*/

azaleaaRoot.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/landing');
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'pages/home.html',
            controller: 'homeController',
            authFlag: true
        })
        .state('landing',{
            url:'/landing',
            templateUrl:'pages/landing.html',
            controller:'authController'
        })
    ;

});

/*azaleaaRoot.run(function ($rootScope, $state, AuthService) {
    $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
        if (toState.authFlag && !AuthService.isAuthenticated()){
            $state.transitionTo("login");
            event.preventDefault();
        }
    });
});*/

azaleaaRoot.service('AuthService', function($q, $http,$localStorage) {
    var self= this;
    this.user ='';

            this.setUser =function(_user){
                self.user = _user;
            },
            this.getUser = function getUser()
            {
                return self.user;
            }


});


azaleaaRoot.controller('authController', ['$scope','$filter','$http','$location','$state','$rootScope','AuthService',contollerFunct]);
azaleaaRoot.controller('homeController', ['$scope','$filter','$http','$location','$state','$rootScope','AuthService',homeControllerFunct]);




function contollerFunct($scope,$filter,$http,$location,$state,$rootScope,AuthService){
    $rootScope.gmail ={
        username:'Guest',
        email:''
    }

    $scope.googleLogin = function(){
        var params ={
            'clientid':'557541505759-si4vmvm7fqa9asso75kankggqf01i4l7.apps.googleusercontent.com',
            'cookiepolicy':'single_host_origin',
            'callback':$scope.googleSigin,
            'approvalprompt':'force',
            'scope':'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.profile.emails.read'

        }
       var result = gapi.auth.signIn(params);
    }

    $scope.googleSigin = function(result){
        if(result['status']['signed_in']) {
            var request = gapi.client.plus.people.get(
                {
                    'userId': 'me'
                }
            );
            request.execute(function(resp){
               AuthService.setUser(resp.displayName);
               $state.go('home');
            });

        }
    }
}

function homeControllerFunct($scope,$filter,$http,$location,$state,$rootScope,AuthService){
        console.log(AuthService.getUser());
        $rootScope.gmail.username = AuthService.getUser();

}
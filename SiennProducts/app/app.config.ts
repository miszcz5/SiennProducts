/// <reference path="app.module.ts" />
module App {
    "use strict";

    function config(
        $urlRouterProvider,
        $httpProvider: ng.IHttpProvider
    ) {
        $urlRouterProvider.otherwise("/products");
        $httpProvider.interceptors.push(Login.Common.AuthInterceptorService.factory);
    }

    ngModule.config([
        "$urlRouterProvider",
        "$httpProvider",
        config
    ]);

    var serviceBase = "http://recruits.siennsoft.com/api/";
    ngModule.constant("app.serviceSettings",
        {
            url: serviceBase
        });
}
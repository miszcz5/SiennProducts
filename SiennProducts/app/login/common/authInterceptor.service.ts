/// <reference path="common.module.ts" />
module App.Login.Common {
    "use strict";

    export class AuthInterceptorService implements ng.IHttpInterceptor {
        static factory($q: ng.IQService, $location: ng.ILocationService, $localStorage): AuthInterceptorService {
            return new AuthInterceptorService($q, $location, $localStorage);
        }

        constructor(
            private $q: ng.IQService,
            private $location: ng.ILocationService,
            private $localStorage
        ) {
        }

        request = (config: ng.IRequestConfig): ng.IRequestConfig => {
            config.headers = config.headers || {};

            if (this.$localStorage.currentUser) {
                config.headers.Authorization = `Bearer ${this.$localStorage.currentUser.token}`;
            }

            return config;
        };

        responseError = <T>(response: ng.IHttpPromiseCallbackArg<T>): ng.IPromise<ng.IHttpResponse<T>> => {
            if (response.status === 401) {
                this.$location.path("/login");
            }

            return this.$q.when(response);
        };
    }

    ngModule.service("app.login.common.authInterceptorService",
        [
            "$q",
            "$location",
            "$localStorage",
            AuthInterceptorService
        ]);
}
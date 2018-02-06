/// <reference path="common.module.ts" />
module App.Login.Common {
    "use strict";

    export interface IAuthService {
        login(username: string, password: string): ng.IPromise<boolean>;
        logout(): void;
    }

    export class Service implements IAuthService {
        constructor(private readonly $http: ng.IHttpService, private readonly $localStorage, private serviceSettings) {}

        login(userName: string, password: string): ng.IPromise<boolean> {
            const data = `UserName=${userName}&Password=${password}`;
            const settings = { headers: { 'Content-Type': "application/x-www-form-urlencoded" } };

            return this.$http.post(this.serviceSettings.url + "Jwt", data, settings)
                .then((response: any) => {
                    return this.canLogin(userName, response.data);
                });
        }

        logout(): void {
            delete this.$localStorage.currentUser;
            this.$http.defaults.headers.common.Authorization = "";
        }

        private canLogin(userName: string, data: any): boolean {
            if (data.access_token) {
                this.$localStorage.currentUser = { username: userName, token: data.access_token };
                this.$http.defaults.headers.common.Authorization = `Bearer ${data.access_token}`;
                return true;
            } else {
                return false;
            }
        }
    }

    ngModule.service("app.login.common.authenticationService",
        [
            "$http",
            "$localStorage",
            "app.serviceSettings",
            Service
        ]);
}
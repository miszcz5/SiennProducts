/// <reference path="login.module.ts" />
module App.Login {
    "use strict";

    export interface IScope extends ng.IScope {
        model: Model,
        ctrl: IController;
    }

    export class Model {
        userName: string;
        password: string;
        error: string;
        loading: boolean;
    }

    export interface IController {
        login(): void
    }

    export class Controller implements IController {

        private model = new Model();

        constructor(
            $scope: IScope,
            private $location,
            private authenticationService: Common.IAuthService
        ) {
            $scope.model = this.model;
            $scope.ctrl = this;
            authenticationService.logout();
        }

        login(): void {
            this.authenticationService.login(this.model.userName, this.model.password).then((result: boolean) => {
                if (result) {
                    this.$location.path("/products");
                } else {
                    this.model.error = "Invalid credentials";
                    this.model.loading = false;
                }
            });
        }
    }

    ngModule.controller("app.login.controller",
        [
            "$scope",
            "$location",
            "app.login.common.authenticationService",
            Controller
        ]);
}
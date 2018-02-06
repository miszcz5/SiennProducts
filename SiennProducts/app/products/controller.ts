/// <reference path="products.module.ts" />
module App.Products {
    "use strict";

    export interface IScope extends ng.IScope {
        model: Model,
        ctrl: IController;
    }

    export class Model {
        products: IProductVm[];
    }

    export interface IController {
        logout(): void;
    }

    export class Controller implements IController {

        private model = new Model();

        constructor(
            $scope: IScope,
            private $location,
            private readonly products
        ) {
            $scope.model = this.model;
            $scope.ctrl = this;

            this.model.products = products;
        }

        logout(): void {
            this.$location.path("/login");
        }
    }

    ngModule.controller("app.products.controller",
        [
            "$scope",
            "$location",
            "resolved.products",
            Controller
        ]);
}
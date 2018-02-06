module App {
    "use strict";

    export var ngModule = angular.module("app",
        [
            "ui.router",
            "ngMessages",
            "ngStorage",
            "app.login",
            "app.products"
        ]);
}
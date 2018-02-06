module App.Login {
    "use strict";

    export class LoginState implements angular.ui.IState {

        url= "/login";
        templateUrl= "app/login/view.html";
        controller = "app.login.controller";
    }

    ngModule.config([
        "$stateProvider",
        ($stateProvider: angular.ui.IStateProvider) => {
            $stateProvider.state("login", new LoginState());
        }
    ]);
}
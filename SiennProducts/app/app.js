var App;
(function (App) {
    "use strict";
    App.ngModule = angular.module("app", [
        "ui.router",
        "ngMessages",
        "ngStorage",
        "app.login",
        "app.products"
    ]);
})(App || (App = {}));
var App;
(function (App) {
    "use strict";
    function config($urlRouterProvider, $httpProvider) {
        $urlRouterProvider.otherwise("/products");
        $httpProvider.interceptors.push(App.Login.Common.AuthInterceptorService.factory);
    }
    App.ngModule.config([
        "$urlRouterProvider",
        "$httpProvider",
        config
    ]);
    var serviceBase = "http://recruits.siennsoft.com/api/";
    App.ngModule.constant("app.serviceSettings", {
        url: serviceBase
    });
})(App || (App = {}));
var App;
(function (App) {
    var Products;
    (function (Products) {
        "use strict";
        Products.ngModule = angular.module("app.products", [
            "app.products.common"
        ]);
    })(Products = App.Products || (App.Products = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Products;
    (function (Products) {
        "use strict";
        var Model = (function () {
            function Model() {
            }
            return Model;
        }());
        Products.Model = Model;
        var Controller = (function () {
            function Controller($scope, $location, products) {
                this.$location = $location;
                this.products = products;
                this.model = new Model();
                $scope.model = this.model;
                $scope.ctrl = this;
                this.model.products = products;
            }
            Controller.prototype.logout = function () {
                this.$location.path("/login");
            };
            return Controller;
        }());
        Products.Controller = Controller;
        Products.ngModule.controller("app.products.controller", [
            "$scope",
            "$location",
            "resolved.products",
            Controller
        ]);
    })(Products = App.Products || (App.Products = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Products;
    (function (Products) {
        "use strict";
        var ProductsState = (function () {
            function ProductsState() {
                this.url = "/products";
                this.templateUrl = "app/products/view.html";
                this.controller = "app.products.controller";
                this.resolve = {
                    "resolved.products": [
                        "app.products.common.productsService",
                        function (productsService) {
                            return productsService.getProducts().then(function (r) {
                                return r;
                            });
                        }
                    ]
                };
            }
            return ProductsState;
        }());
        Products.ProductsState = ProductsState;
        Products.ngModule.config([
            "$stateProvider",
            function ($stateProvider) {
                $stateProvider.state("products", new ProductsState());
            }
        ]);
    })(Products = App.Products || (App.Products = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Products;
    (function (Products) {
        var Common;
        (function (Common) {
            "use strict";
            Common.ngModule = angular.module("app.products.common", []);
        })(Common = Products.Common || (Products.Common = {}));
    })(Products = App.Products || (App.Products = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Products;
    (function (Products) {
        var Common;
        (function (Common) {
            "use strict";
            var Service = (function () {
                function Service($http, serviceSettings) {
                    this.$http = $http;
                    this.serviceSettings = serviceSettings;
                }
                Service.prototype.getProducts = function () {
                    return this.$http.get(this.serviceSettings.url + "products").then(function (results) { return results.data; });
                };
                return Service;
            }());
            Common.Service = Service;
            Common.ngModule.service("app.products.common.productsService", [
                "$http",
                "app.serviceSettings",
                Service
            ]);
        })(Common = Products.Common || (Products.Common = {}));
    })(Products = App.Products || (App.Products = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Login;
    (function (Login) {
        "use strict";
        Login.ngModule = angular.module("app.login", [
            "app.login.common"
        ]);
    })(Login = App.Login || (App.Login = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Login;
    (function (Login) {
        "use strict";
        var Model = (function () {
            function Model() {
            }
            return Model;
        }());
        Login.Model = Model;
        var Controller = (function () {
            function Controller($scope, $location, authenticationService) {
                this.$location = $location;
                this.authenticationService = authenticationService;
                this.model = new Model();
                $scope.model = this.model;
                $scope.ctrl = this;
                authenticationService.logout();
            }
            Controller.prototype.login = function () {
                var _this = this;
                this.authenticationService.login(this.model.userName, this.model.password).then(function (result) {
                    if (result) {
                        _this.$location.path("/products");
                    }
                    else {
                        _this.model.error = "Invalid credentials";
                        _this.model.loading = false;
                    }
                });
            };
            return Controller;
        }());
        Login.Controller = Controller;
        Login.ngModule.controller("app.login.controller", [
            "$scope",
            "$location",
            "app.login.common.authenticationService",
            Controller
        ]);
    })(Login = App.Login || (App.Login = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Login;
    (function (Login) {
        "use strict";
        var LoginState = (function () {
            function LoginState() {
                this.url = "/login";
                this.templateUrl = "app/login/view.html";
                this.controller = "app.login.controller";
            }
            return LoginState;
        }());
        Login.LoginState = LoginState;
        Login.ngModule.config([
            "$stateProvider",
            function ($stateProvider) {
                $stateProvider.state("login", new LoginState());
            }
        ]);
    })(Login = App.Login || (App.Login = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Login;
    (function (Login) {
        var Common;
        (function (Common) {
            "use strict";
            Common.ngModule = angular.module("app.login.common", []);
        })(Common = Login.Common || (Login.Common = {}));
    })(Login = App.Login || (App.Login = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Login;
    (function (Login) {
        var Common;
        (function (Common) {
            "use strict";
            var Service = (function () {
                function Service($http, $localStorage, serviceSettings) {
                    this.$http = $http;
                    this.$localStorage = $localStorage;
                    this.serviceSettings = serviceSettings;
                }
                Service.prototype.login = function (userName, password) {
                    var _this = this;
                    var data = "UserName=" + userName + "&Password=" + password;
                    var settings = { headers: { 'Content-Type': "application/x-www-form-urlencoded" } };
                    return this.$http.post(this.serviceSettings.url + "Jwt", data, settings)
                        .then(function (response) {
                        return _this.canLogin(userName, response.data);
                    });
                };
                Service.prototype.logout = function () {
                    delete this.$localStorage.currentUser;
                    this.$http.defaults.headers.common.Authorization = "";
                };
                Service.prototype.canLogin = function (userName, data) {
                    if (data.access_token) {
                        this.$localStorage.currentUser = { username: userName, token: data.access_token };
                        this.$http.defaults.headers.common.Authorization = "Bearer " + data.access_token;
                        return true;
                    }
                    else {
                        return false;
                    }
                };
                return Service;
            }());
            Common.Service = Service;
            Common.ngModule.service("app.login.common.authenticationService", [
                "$http",
                "$localStorage",
                "app.serviceSettings",
                Service
            ]);
        })(Common = Login.Common || (Login.Common = {}));
    })(Login = App.Login || (App.Login = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Login;
    (function (Login) {
        var Common;
        (function (Common) {
            "use strict";
            var AuthInterceptorService = (function () {
                function AuthInterceptorService($q, $location, $localStorage) {
                    var _this = this;
                    this.$q = $q;
                    this.$location = $location;
                    this.$localStorage = $localStorage;
                    this.request = function (config) {
                        config.headers = config.headers || {};
                        if (_this.$localStorage.currentUser) {
                            config.headers.Authorization = "Bearer " + _this.$localStorage.currentUser.token;
                        }
                        return config;
                    };
                    this.responseError = function (response) {
                        if (response.status === 401) {
                            _this.$location.path("/login");
                        }
                        return _this.$q.when(response);
                    };
                }
                AuthInterceptorService.factory = function ($q, $location, $localStorage) {
                    return new AuthInterceptorService($q, $location, $localStorage);
                };
                return AuthInterceptorService;
            }());
            Common.AuthInterceptorService = AuthInterceptorService;
            Common.ngModule.service("app.login.common.authInterceptorService", [
                "$q",
                "$location",
                "$localStorage",
                AuthInterceptorService
            ]);
        })(Common = Login.Common || (Login.Common = {}));
    })(Login = App.Login || (App.Login = {}));
})(App || (App = {}));
//# sourceMappingURL=app.js.map
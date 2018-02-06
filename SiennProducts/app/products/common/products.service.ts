module App.Products.Common {
    "use strict";

    export interface IProductsService {
        getProducts();
    }

    export class Service implements IProductsService {

        constructor(
            private $http: ng.IHttpService,
            private serviceSettings
        ) {
        }

        getProducts() {
            return this.$http.get(this.serviceSettings.url + "products").then(results => results.data);
        }
    }

    ngModule.service("app.products.common.productsService",
        [
            "$http",
            "app.serviceSettings",
            Service
        ]);
}
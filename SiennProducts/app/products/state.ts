module App.Products {
    "use strict";

    export class ProductsState implements angular.ui.IState {

        url= "/products";
        templateUrl= "app/products/view.html";
        controller = "app.products.controller";
        resolve = {
            "resolved.products": [
                "app.products.common.productsService",
                (productsService: Common.IProductsService) => {
                    return productsService.getProducts().then(r => {
                        return r;
                    });
                }
            ],
        }
    }

    ngModule.config([
        "$stateProvider",
        ($stateProvider: angular.ui.IStateProvider) => {
            $stateProvider.state("products", new ProductsState());
        }
    ]);
}
app.controller('productsController', function ($scope, $mdDialog, $mdToast, productsFactory) {

    // show toast message
    $scope.showToast = function (message) {
        $mdToast.show(
            $mdToast.simple()
                .textContent(message)
                .hideDelay(3000)
                .position("top right")
        );
    }

    // read products
    $scope.readProducts = function () {

        // use products factory
        productsFactory.readProducts().then(function successCallback(response) {
            console.log(response.data);
            $scope.products = response.data;
        }, function errorCallback(response) {
            $scope.showToast("Unable to read record.");
        });

    }

    $scope.showConfirm = function (Description, Id, Value, Amount) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
            .title('Order confirmation')
            .htmlContent("<b>Product Type : </b>" + Description +
                "</br><b>Identify :</b> " + Id +
                "</br><b>Price :</b> " + Value +
                "</br><b>Amount :</b> " + Amount +
                "</br><b>Total pay:</b> " + parseFloat(Value) * parseFloat(Amount))
            .ariaLabel('Lucky day')
            .targetEvent()
            .ok('Pay Now')
            .cancel('Remove order');

        $mdDialog.show(confirm).then(function () {
            $scope.status = 'Order Confirmed.';

            const SellerId = "seller-1";
            const CustomerId = "customer-2";

            productsFactory.CreateOrder(SellerId, CustomerId, Id, Value, Amount).then(function successCallback(response) {

                console.log(response.data);
                $scope.showToast("Order done");

                // Pay for the purchase
                productsFactory.PayNow(Value * Amount, "Pay").then(function successCallback(response) {

                    console.log(response.data);
                    $scope.showToast("Money transferred");
    
                }, function errorCallback(response) {
                    $scope.showToast("Payment fail, process discard.");
                });

            }, function errorCallback(response) {
                $scope.showToast("Order fail, process discard.");
            });

            productsFactory.CreateFee(SellerId, CustomerId, Value * Amount * 0.05).then(function successCallback(response) {

                console.log(response.data);
                $scope.showToast("Fee done");

                // Pay for the purchase
                productsFactory.PayNow(Value * Amount * 0.05, "Fee").then(function successCallback(response) {

                    console.log(response.data);
                    $scope.showToast("Fee money transferred");
    
                }, function errorCallback(response) {
                    $scope.showToast("Fee moeny fail, process discard.");
                });

            }, function errorCallback(response) {
                $scope.showToast("Fee fail, process discard.");
            });
            
        }, function () {
            $scope.status = 'Order canceled.';
        });

        $scope.readProducts();
    };

    // show toast message
    $scope.showToast = function (message) {
        $mdToast.show(
            $mdToast.simple()
                .textContent(message)
                .hideDelay(3000)
                .position("top right")
        );
    }
});
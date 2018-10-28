app.factory("productsFactory", function ($http) {

    var factory = {};

    // read all products
    factory.readProducts = function () {
        return $http({
            method: 'GET',
            url: 'http://maya-api.azurewebsites.net/products'
        });
    };

    // create Fee
    factory.CreateFee = function (SellerId, CustomerId, Fee) {
        return $http({
            method: 'POST',
            data: {
                "SellerId": SellerId,
                "CustomerId": CustomerId,
                "Fee": Fee
            },
            url: 'http://maya-api.azurewebsites.net/fees'
        });
    };


    // create order
    factory.CreateOrder = function (SellerId, CustomerId, ProductId, Value, Amount) {
        return $http({
            method: 'POST',
            data: {
                "Id": "2",
                "SellerId": SellerId,
                "CustomerId": CustomerId,
                "products": [
                    {
                        "ProductId": ProductId,
                        "ProductValue": Value,
                        "ProductAmount": Amount
                    }
                ]
            },
            url: 'http://maya-api.azurewebsites.net/orders'
        });
    };

    // create product
    factory.PayNow = function (Total, TransactionType) {

        console.log("money pay start")
        console.log(Total * 100000000000000000);
        return $http({
            method: 'POST',
            data: {
                "Balance": "",
                "GasPrice": "",
                "TransactionCount": "",
                "Value": Total * 100000000000000000,
                "TransactionType": TransactionType
            },
            url: 'http://maya-api.azurewebsites.net/ethers'
        });

        console.log("money pay end")
    };

    return factory;
});
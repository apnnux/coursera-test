(function (){
    'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyListController)
.controller('AlreadyBoughtController', AlBoughtListController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyListController.$inject = [ 'ShoppingListCheckOffService' ];
function ToBuyListController (ShoppingListCheckOffService){
    var toBuy = this;

    toBuy.items = ShoppingListCheckOffService.getToBuy();

    toBuy.name = "";
    toBuy.quantity = "";

    toBuy.addItem = function (){
        ShoppingListCheckOffService.addItem(toBuy.name, toBuy.quantity);
    };

    toBuy.buyItem = function (index){
        ShoppingListCheckOffService.buyItem(index);
    }

};

AlBoughtListController.$inject = ['ShoppingListCheckOffService'];
function AlBoughtListController (ShoppingListCheckOffService){
    var alBought = this;

    alBought.items = ShoppingListCheckOffService.getBought();
};

function ShoppingListCheckOffService  () {
    var service = this;

    var toBuy = [
        {name: 'Cookies', quantity: 10},
        {name: 'Milk', quantity: 4},
        {name: 'Water', quantity: 2},
        {name: 'Fish', quantity: 7},
        {name: 'Paper', quantity: 22}
    ];

    var bought = [];

    service.addItem = function (itName, itQuantity) {
        var item = {
            name: itName,
            quantity: itQuantity
        };

        toBuy.push(item);
    }

    service.buyItem = function (index){
        bought.push(toBuy[index]);
        toBuy.splice(index, 1);
    }

    service.getToBuy = function (){
        return toBuy;
    }

    service.getBought = function (){
        return bought;
    }
};

})();
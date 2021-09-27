(function (){
    'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItems);

function FoundItems(){
    var ddo = {
        templateUrl: 'foundItems.html',
        scope: {
            items: '<',
            error: '<'
        },
        controller: 'NarrowItDownController',
        controllerAs: 'narrow',
        bindToController: true
    };

    return ddo;
}

NarrowItDownController.$inject = [ 'MenuSearchService' ];
function NarrowItDownController (MenuSearchService){
    var narrow = this;

    narrow.items = MenuSearchService.getList();

    narrow.short_name = "";
    narrow.error = MenuSearchService.getError();
    narrow.desc = ""

    narrow.search = function (){
        MenuSearchService.clearList();
        MenuSearchService.search(narrow.desc, narrow.error)
        .then(function () {
            narrow.error = MenuSearchService.getError();
        });
    };

    narrow.delete = function(index){
        MenuSearchService.delete(index);
    }

};
MenuSearchService.$inject = ['$http']
function MenuSearchService  ($http) {
    var service = this;

    service.list = [];
    service.error = false;

    service.delete = function(index){
        service.list.splice(index, 1);
    }

    service.clearList = function (){
        service.list.splice(0, service.list.length);
    }

    service.search = function (desc){
        return $http({
            method: 'GET',
            url: 'https://davids-restaurant.herokuapp.com/menu_items.json'
        }).then(function success(resp){
            if(desc.length <= 0){
                service.error = true;
                return;
            }
            resp.data.menu_items.forEach(element => {
                if (element.description.includes(desc)){
                    service.newObj = {
                        short_name: element.short_name,
                        description: element.description
                    }
                    service.list.push(service.newObj);
                }
            });
            if(service.list.length <= 0)    service.error = true;
            else service.error = false;
        }, function error(resp){

        });
        
    }

    service.getError = function (){
        return service.error;
    }

    service.getList = function (){
        return service.list;
    }

    
};

})();
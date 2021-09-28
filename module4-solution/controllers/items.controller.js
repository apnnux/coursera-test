(function () {
    'use strict';
    
    angular.module('MenuApp')
    .controller('ItemsController', ItemsController);
    
    // Version with resolving to 1 item based on $stateParams in route config
    ItemsController.$inject = ['MenuDataService', 'itemsCat'];
    function ItemsController(MenuDataService, itemsCat) {
      var items = this;
      items.item = MenuDataService.getCatList();
      
    }
    
    })();
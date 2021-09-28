(function () {
    "use strict";
    
    angular.module('common')
    .service('SingupService', SingupService);
    
    
    SingupService.$inject = ['$http', 'ApiPath'];
    function SingupService($http, ApiPath) {
      var service = this;
        service.user = [];
      service.getError = function (short) {
        return $http.get(ApiPath + '/menu_items/'+short+'.json').then(function (response) {
            console.log(response)
          return false;
        }, function(error){
            return true;
        });
      };

      service.getImg = function () {
        return $http.get(ApiPath + '/menu_items/'+this.user.short_name+'.json').then(function (response) {
          return response.data;
        }, function(error){
            return true;
        });
      };
    
    
      service.saveData = function (user) {
          service.user = user;
      }

      service.getUser = function(){
          return service.user;
      }
    
    }
    
    
    
})();
    
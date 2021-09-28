(function () {
    "use strict";
    
    angular.module('public')
    .controller('MyInfoController', MyInfoController);
    
    MyInfoController.$inject = ['SingupService'];
    function MyInfoController(SingupService) {
      var info = this;
      info.menuItem=null;
      SingupService.getImg().then(function(res){
        info.menuItem = res;
      });
      info.user = SingupService.getUser();
      info.size = Object.keys(info.user).length;
      console.log(info.user)
    }
    
    
})();
(function () {
    "use strict";
    
    angular.module('public')
    .controller('SingupController', SingupController);
    
    SingupController.$inject = ['SingupService'];
    function SingupController(SingupService) {
      var singup = this;
      singup.errorMenu = false;
      singup.finish = false;
      singup.submit = function (){
          SingupService.saveData(singup.user);
          SingupService.getError(singup.user.short_name).then(function(resp){
              singup.errorMenu = resp;
              singup.finish = !resp;
          });
      }
    }
    
    
})();
    
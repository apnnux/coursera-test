(function (){
    'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', MainFunction);

MainFunction.$inject = [ '$scope' ];
function MainFunction ($scope){
    $scope.status = "";
    $scope.class = "";
    $scope.result = "";
    $scope.check = function () {
        const item = $scope.status.split(',');
        let voidElement = 0;
        item.forEach(element => {
            if (element.trim() === '')
                voidElement++;
        });
        if (item.length - voidElement === 0){
            $scope.result = "Please enter data first";
            $scope.class = "error";
        }else{ 
            $scope.class = "good";
            if (item.length - voidElement <= 3)
                $scope.result = "Enjoy!";
            else
                $scope.result = "Too Much!";
        }
    }
}

})();
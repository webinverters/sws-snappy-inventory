/**
 * Master Controller
 */

angular.module('RDash')
    .controller('MasterCtrl', ['$scope', 'localStorageService', MasterCtrl]);

function MasterCtrl($scope, localStorageService) {
    /**
     * Sidebar Toggle & Cookie Control
     */
    var mobileView = 992;

    $scope.getWidth = function() {
        return window.innerWidth;
    };

    $scope.$watch($scope.getWidth, function(newValue, oldValue) {
        if (newValue >= mobileView) {
            if (angular.isDefined(localStorageService.get('toggle'))) {
                $scope.toggle = !localStorageService.get('toggle') ? false : true;
            } else {
                $scope.toggle = true;
            }
        } else {
            $scope.toggle = false;
        }

    });

    $scope.toggleSidebar = function() {
      $scope.toggle = !$scope.toggle;
      localStorageService.set('toggle', $scope.toggle);
    };

    window.onresize = function() {
        $scope.$apply();
    };
}
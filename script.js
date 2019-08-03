angular.module('Airofarm', ['ngMaterial', 'ngMessages'])

  .run(['$rootScope', '$http', function ($rootScope, $http) {
    $http.get('https://raw.githubusercontent.com/3ehzad/prc/master/ipsetting.json?_=' + Date.now(), { cache: false }).then(function (data) {
      $rootScope.ip = data.data;
      // $rootScope.espip = $rootScope.ip[0].espip;
      $rootScope.espip = 'http://192.168.1.11/'
      // $rootScope.devip = $rootScope.ip[0].devip;
      $rootScope.devip = "http://192.168.1."
    });
  }])

  .controller('minerstatusController', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {
    $scope.psuStatus = function () {
      $http.get($rootScope.espip + 'PSU_STATUS', { cache: false }).then(function (data) {
        $scope.minerstatus = data.data;
        // $window.location.reload();
      });
  }
    // run commands
    $scope.psuRUN = function () {
      $http.get($rootScope.espip + 'MINER_RUN').then(function (response) {
        $scope.psuresponse = response.data;
      });
    }
    $scope.psuSTOP = function () {
      $http.get($rootScope.espip + 'MINER_STOP').then(function (response) {
        $scope.psuresponse = response.data;
      }, function (data) {
        $window.location.reload();
      });
    }
    $scope.psuALLON = function () {
      $http.get($rootScope.espip + 'MINERALL_ON').then(function (response) {
        $scope.psuresponse = response.data;
      }, function (data) {
        $window.location.reload();
      });
    }
    $scope.modemRESET = function () {
      $http.get($rootScope.espip + 'MODEMRESET').then(function (response) {
        $scope.modemresponse = response.data;
      }, function (data) {
        $window.location.reload();
      });
    }
    $scope.camOFF = function () {
      $http.get($rootScope.espip + 'CAMOFF').then(function (response) {
        $scope.camresponse = response.data;
      }, function (data) {
        $window.location.reload();
      });
    }
    $scope.camRESET = function () {
      $http.get($rootScope.espip + 'CAMRESET').then(function (response) {
        $scope.camresponse = response.data;
      }, function (data) {
        $window.location.reload();
      });
    }
  }])
  .controller('deviceController', ['$scope', '$rootScope', '$http', '$mdDialog', '$window', '$location', '$timeout', function ($scope, $rootScope, $http, $mdDialog, $window, $location, $timeout) {
    $scope.isLoading = true;
    $http.get('https://raw.githubusercontent.com/3ehzad/prc/master/devicelist.json?_=' + Date.now(), { cache: false }).then(function (data) {
      $scope.devicelist = data.data;
      $scope.isLoading = false;
    });
    $scope.customFilter = function (data) {
      if ($scope.filterItem !== undefined) {
        if ($scope.filterItem.name === data.name) {
          return true;
        }
        if ($scope.filterItem.type === data.type) {
          return true;
        }
        if ($scope.filterItem.os === data.os) {
          return true;
        }
        else {
          return false;
        }
      } else {
        return true;
      }
    };
    $scope.clearFilter = function () {
      $window.location.reload();
    }
    $scope.relayStatus = function () {
    $http.get($rootScope.espip + 'RELAY_STATUS', { cache: false }).then(function (data) {
        $rootScope.relaystatus = data.data;
      });
    }
    /* start dialog */
    $scope.status = '  ';
    $scope.relaySwitch = function (ev, index) {
      $mdDialog.show({
        locals: { dataToPass: $scope.devicelist[index] },
        controller: devController,
        templateUrl: 'dialog.tmpl.html',
        parent: angular.element(document.querySelector('#popupContainer')),
        targetEvent: ev,
        clickOutsideToClose: true,
        fullscreen: false,
        preserveScope: true
      })
    };
    function devController($scope, $mdDialog, dataToPass, $window) {
      $scope.device = dataToPass;
      $scope.hide = function () {
        $mdDialog.hide();
      };

      $scope.relayON = function (relay) {
        $http.get($rootScope.espip + 'RELAYON_' + relay).then(function (response) {
          $scope.relayresponse = response.data;
        });
      }
      $scope.relayOFF = function (relay) {
        $http.get($rootScope.espip + 'RELAYOFF_' + relay).then(function (response) {
          $scope.psrelayresponseustatus = response.data;

        });
      }
      $scope.manage = function (uid) {
        $window.open($rootScope.devip + uid, '_blank');
      };
    }
    /* end dialog */
  }])
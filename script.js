angular.module('Airofarm', ['ngMaterial', 'ngMessages'])

  .run(['$rootScope', '$http', function ($rootScope, $http) {
    $http.get('https://raw.githubusercontent.com/3ehzad/prc/master/ipsetting.json?_=' + Date.now(), { cache: false }).then(function (data) {
      $rootScope.ip = data.data;
      //local
      // $rootScope.espip = 'http://192.168.1.11/'
      // $rootScope.devip = "http://192.168.1."
      //online
      $rootScope.espip = $rootScope.ip[0].espip;
      $rootScope.devip = $rootScope.ip[0].devip;
    });
    // $http.get('scheduletime.json', { cache: false }).then(function (data) {
    $http.get('https://raw.githubusercontent.com/3ehzad/prc/master/scheduletime.json?_=' + Date.now(), { cache: false }).then(function (data) {
      $rootScope.scheduletime = data.data;
    });
  }])

  .controller('minerstatusController', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {
    $scope.psuStatus = function () {
      $http.get('psustatus.json', { cache: false }).then(function (data) {
        // $http.get($rootScope.espip + 'PSU_STATUS', { cache: false }).then(function (data) {
        $scope.minerstatus = data.data;
        $scope.lastcheck = Date.now();
      });
    }
    // run commands
    $scope.psuRUN = function () {
      console.log("schedule run!")
      $http.get($rootScope.espip + 'MINER_RUN').then(function (response) {
        $scope.psuresponse = response.data;
      });
    }
    $scope.psuSTOP = function () {
      console.log("schedule stop!")
      $http.get($rootScope.espip + 'MINER_STOP').then(function (response) {
        $scope.psuresponse = response.data;
      });
    }
    $scope.psuALLON = function () {
      $http.get($rootScope.espip + 'MINERALL_ON').then(function (response) {
        $scope.psuresponse = response.data;
      });
    }
    $scope.psuALLOFF = function () {
      $http.get($rootScope.espip + 'MINERALL_OFF').then(function (response) {
        $scope.psuresponse = response.data;
      });
    }
    $scope.modemRESET = function () {
      $http.get($rootScope.espip + 'MODEMRESET').then(function (response) {
        $scope.modemresponse = response.data;
      });
    }
    $scope.camOFF = function () {
      $http.get($rootScope.espip + 'CAMOFF').then(function (response) {
        $scope.camresponse = response.data;
      });
    }
    $scope.camRESET = function () {
      $http.get($rootScope.espip + 'CAMRESET').then(function (response) {
        $scope.camresponse = response.data;
      });
    }
    // Schedule off setting
    $scope.scheduleEnableoff = function () {
      var now = new Date();
      var millisTill10 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), $rootScope.scheduletime.off_h, $rootScope.scheduletime.off_m, 0, 0) - now;
      if (millisTill10 < 0) {
        millisTill10 += 86400000; // it's after 10am, try 10am tomorrow.
      }
      $scope.millisTill10 = millisTill10;
      setTimeout(function () { $scope.psuSTOP() }, millisTill10);
    }
    // Schedule on setting
    $scope.scheduleEnableon = function () {
      var now = new Date();
      var millisTill10 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), $rootScope.scheduletime.on_h, $rootScope.scheduletime.on_m, 0, 0) - now;
      if (millisTill10 < 0) {
        millisTill10 += 86400000; // it's after 10am, try 10am tomorrow.
      }
      $scope.millisTill10 = millisTill10;
      setTimeout(function () { $scope.psuRUN() }, millisTill10);
    }
    // end Scheduling setting
  }])
  .controller('deviceController', ['$scope', '$rootScope', '$http', '$mdDialog', '$window', '$location', '$timeout', function ($scope, $rootScope, $http, $mdDialog, $window, $location, $timeout) {
    $scope.isLoading = true;
    $http.get('https://raw.githubusercontent.com/3ehzad/prc/master/devicelist.json?_=' + Date.now(), { cache: false }).then(function (data) {
      $scope.devicelist = data.data;
      // $rootScope.minerlist = $scope.devicelist;
      $scope.isLoading = false;
      var str = JSON.stringify($scope.devicelist)
      $scope.rCount = (str.match(/\"R\"/g) || []).length;
      $scope.sCount = (str.match(/\"S\"/g) || []).length;
      $scope.tCount = (str.match(/\"T\"/g) || []).length;
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
        if ($scope.filterItem.phase === data.phase) {
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
      // get device stats from antmonitor api
      // $http.get('stats.json', { cache: false }).then(function (data) {
      $http.get('http://localhost:5000/192.168.1.' + $scope.device.uid + '/stats', { cache: false }).then(function (data) {
        $scope.stats = data.data;
        if ($scope.stats.STATS[0].Type == "Antminer S11") {
          $scope.fan1 = $scope.stats.STATS[1].fan1;
          $scope.fan2 = $scope.stats.STATS[1].fan2;
          $scope.temp1 = Math.max($scope.stats.STATS[1].temp3_1, $scope.stats.STATS[1].temp3_2, $scope.stats.STATS[1].temp3_3)
          $scope.temp2 = Math.max($scope.stats.STATS[1].temp2_1, $scope.stats.STATS[1].temp2_2, $scope.stats.STATS[1].temp2_3);
        }
        else {
          $scope.fan1 = $scope.stats.STATS[1].fan5;
          $scope.fan2 = $scope.stats.STATS[1].fan6;
          $scope.temp1 = Math.max($scope.stats.STATS[1].temp6, $scope.stats.STATS[1].temp7, $scope.stats.STATS[1].temp8)
          $scope.temp2 = Math.max($scope.stats.STATS[1].temp2_6, $scope.stats.STATS[1].temp2_7, $scope.stats.STATS[1].temp2_8);
        }
        $scope.th5 = Number($scope.stats.STATS[1]["GHS 5s"] / 1000).toFixed(2);
        $scope.thav = Number($scope.stats.STATS[1]["GHS av"] / 1000).toFixed(2);
      });

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
    $scope.getTemp = function () {
      for (var i = 0; i < $scope.devicelist.length; i++) {
        if ($scope.devicelist[i].uid == "IP" || $scope.devicelist[i].uid == "IP*" || $scope.devicelist[i].uid == 129) {
          $scope.ipvalid = "invalid";
        } else {
          $http.get('http://localhost:5000/192.168.1.' + $scope.devicelist[i].uid + '/stats', { cache: false }).then(function (data) {
            $scope.stats = data.data;
            if ($scope.stats.STATS[0].Type == "Antminer S11") {
              $scope.temprature = Math.max($scope.stats.STATS[1].temp3_1, $scope.stats.STATS[1].temp3_2, $scope.stats.STATS[1].temp3_3);
              // console.log($scope.temprature);
              if ($scope.temprature >= 80) {
                console.log($scope.stats.IP)
                $scope.temp = "high";
              } else {
                $scope.mode = "normal";
              }
            }
            else if ($scope.stats.STATS[0].Type == "braiins-am1-s9") {
              $scope.temprature = Math.max($scope.stats.STATS[1].temp2_6, $scope.stats.STATS[1].temp2_7, $scope.stats.STATS[1].temp2_8);
              // console.log($scope.temprature);
              if ($scope.temprature >= 80) {
                console.log($scope.stats.IP)
                $scope.temp = "high";
              } else {
                $scope.mode = "normal";
              }
            }
          });
        }
      }
    }
  }])
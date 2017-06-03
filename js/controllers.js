angular.module('tonyinterface.controllers', [])
.controller('FetchController', ['$scope', '$http', '$templateCache',
  function($scope, $http, $templateCache) {
    $scope.method = 'GET';
    $scope.url = 'VMCMD?command=$Event.RunTimeline("Test Timeline 1")&rand=983274';

    $scope.fetch = function() {
      $scope.code = null;
      $scope.response = null;

      $http({method: $scope.method, url: $scope.url, cache: $templateCache}).
        then(function(response) {
          $scope.status = response.status;
          $scope.data = response.data;
        }, function(response) {
          $scope.data = response.data || "Request failed";
          $scope.status = response.status;
      });
    };

    $scope.VMRunTimeline = function(timelineName) {
        console.log("Running Timeline: " + timelineName);
        $scope.method = 'GET';
        // $Event.RunTimeline("Random Lightning")
        $scope.url = 'VMCMD?command=$Event.RunTimeline("' + timelineName + '")&rand='+parseInt(Math.random()*999999999);
        $scope.fetch();
    }

    $scope.VMRunCueButton = function(groupName, cueButtonName) {
        console.log("Running Cue Button: " + cueButtonName);
        $scope.method = 'GET';
        // $Project.CueList:RunCueButton("New Group 1", "Random Lightning")
        $scope.url = 'VMCMD?command=$Project.CueList:RunCueButton("' + groupName + '","' + cueButtonName + '")&rand='+parseInt(Math.random()*999999999);
        $scope.fetch();
    }
    $scope.VMSetVCSSliderLevel = function(sliderName, sliderValue) {
        console.log("Set VCS Slider Level: " + sliderName); // $Project.VCS:SetSliderLevel("VCS_004", 75)
        $scope.method = 'GET';
        $scope.url = 'VMCMD?command=$Project.VCS:SetSliderLevel("' + sliderName + '",' + sliderValue + ')&rand='+parseInt(Math.random()*999999999);
        $scope.fetch();
    }
  }]);
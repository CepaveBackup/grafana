define([
  'angular',
],
function (angular) {
  'use strict';

  var module = angular.module('grafana.controllers');

  module.controller('ResetPasswordCtrl', function($scope, contextSrv, backendSrv, $location) {

    contextSrv.sidemenu = false;
    $scope.formModel = {};
    $scope.mode = 'send';

    if ($location.search().code) {
      $scope.mode = 'reset';
    }

    $scope.sendResetEmail = function() {
      if (!$scope.sendResetForm.$valid) {
        return;
      }
      backendSrv.post('/api/user/password/send-reset-email', $scope.formModel).then(function() {
        $scope.mode = 'email-sent';
      });
    };

    $scope.submitReset = function() {
      if (!$scope.resetForm.$valid) { return; }

      if ($scope.formModel.newPassword !== $scope.formModel.confirmPassword) {
        $scope.appEvent('alert-warning', ['New passwords do not match', '']);
        return;
      }

      backendSrv.post('/api/user/password/send-reset-email', $scope.formModel).then(function() {
        $location.path('login');
      });
    };

  });

});
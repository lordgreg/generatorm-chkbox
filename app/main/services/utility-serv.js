'use strict';
angular.module('main')
.service('Utility', function ($ionicLoading) {
  this.opt = {
    startTime: null
  };
  this.showLoading = function () {
    $ionicLoading.show({template: '<ion-spinner></ion-spinner>'});
  };
  this.hideLoading = function () {
    $ionicLoading.hide();
  };
  this.startTimer = function () {
    this.opt.startTime = new Date().getTime();
  };
  this.endTimer = function () {
    return ((this.opt.startTime) ? new Date().getTime() - this.opt.startTime : null);
  };
});

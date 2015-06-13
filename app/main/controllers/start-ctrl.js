'use strict';
angular.module('main')
.controller('StartCtrl', function (Utility, $timeout, $scope) {

  // bind data from service
  // this.someData = Start.someData;
  this.entries = [];
  this.entriesView = [];
  this.numEntriesToCreate = 5000;
  this.numEntriesToAdd = 25;
  var self = this;

  $scope.$on('$stateChangeSuccess', function () {
    console.log('START');
    self.loadMore();
  });

  /**
   * generate more entries
   */
  this.generateEntries = function () {
    var names = ['Gregor', 'Mathias', 'Roland', 'Jonas', 'Marco'];
    var obj = {};

    for (var i = 0; i < self.numEntriesToCreate; i++) {
      obj = {'id': Math.random() + Math.random() * 10000, 'name': names[Math.floor(Math.random() * names.length)]};
      self.entries.push(obj);
    }
  };

  this.clearEntries = function () {
    self.entries = [];
  };

  this.toggleAll = function () {
    self.startLoading();

    console.log(self.checkedAll);

    // we wait for spinner to appear (500ms), then start..
    $timeout(function () {
      for (var i = 0; i < self.entriesView.length; i++) {
        self.entriesView[i].checked = self.checkedAll;
      }

      self.finishedLoading();

    }, 500);
  };

  this.loadMore = function () {
    if (self.canLoadMore()) {
      // self.startLoading();
      $timeout(function () {
        self.entriesView = self.entriesView.concat(
          self.entries.slice(self.entriesView.length, self.entriesView.length + self.numEntriesToAdd) // exact items from our original entries
        );

        $scope.$broadcast('scroll.infiniteScrollComplete');
        // self.finishedLoading();
      }, 500);
    }
    //
  };

  this.canLoadMore = function () {
    return (self.entriesView < self.entries) ? true : false;
  };

  this.startLoading = function () {
    Utility.startTimer();
    Utility.showLoading();
  };

  this.finishedLoading = function () {
    $timeout(function () {
      Utility.hideLoading();
      console.log('execution took ' + Utility.endTimer() + 'ms.');
    });
  };

  console.log('init. creating ' + self.numEntriesToCreate + ' entries');
  self.generateEntries();

});

'use strict';

angular.module('NoteApp')
  .filter('moment', function () {
    return function (input) {
      return moment(input).calendar();
    };
  });

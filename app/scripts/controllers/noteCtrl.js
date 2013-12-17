'use strict';

angular.module('NoteApp')
  .controller('NoteCtrl', function ($scope, $routeParams, $location, Notes) {

  	var id = $routeParams.id;

  	Notes.get(id).then(function(note){
      $scope.title = note.title;
      $scope.text = note.text;
      $scope.isDone = true;
    }, function(){
      $location.url('/');
    });

  	function save(cb){
      Notes.get(id).then(function(note){
        note.text = $scope.text;
        note.title = $scope.title;
        note.updated = new Date();
        Notes.update(note).then(function(){
          cb();
        });
      });
  	}

    $scope.needSave = function() {
      $scope.isDone = false;
    }

    $scope.done = function(){
      save(function(){
        $scope.isDone = true;
      });
    }

    $scope.back = function(){
      if(!$scope.isDone){
        save(function(){
          $location.url('/');
        });
      }else{
        $location.url('/');
      }
    }
  });
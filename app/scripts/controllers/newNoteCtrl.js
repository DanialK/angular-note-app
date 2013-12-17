'use strict';

angular.module('NoteApp')
  .controller('NewNoteCtrl', function ($scope, $routeParams, $location, Notes) {

    $scope.isDone = true;

    function save (cb) {
      var text = $scope.text;
      var title = $scope.title;
      if(text || title){
        var newNote = {
          title : title,
          text : text,
          date : new Date
        }
        Notes.add(newNote).then(function(note){
          if(cb)
            cb(note);
        });
      }
    }

    $scope.needSave = function() {
      $scope.isDone = false;
    }

    $scope.done = function(){
      save(function(note){
        $location.url('note/'+note.id);
        $location.replace();
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
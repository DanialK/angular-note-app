'use strict';

angular.module('NoteApp')
  .controller('NotesCtrl', function ($scope, Notes) {
  
    $scope.notes = [];

    Notes.all().then(function(res){
      $scope.notes = res.rows.map(function(note){
        return note.doc;
      });
    });

  	$scope.edit = function(){
  		$scope.deleting = true;
  	}

  	$scope.finish = function(){
  		$scope.deleting = false;
  	}

    $scope.delete = function(note){
      Notes.remove(note._id).then(function(){
        for (var i = 0; i < $scope.notes.length; i++) {
          if($scope.notes[i]._id === note._id){
            $scope.notes.splice(i, 1);
          }
        };
      })
    }

  });

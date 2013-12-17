'use strict';

angular.module('NoteApp')
  .factory('Notes', function ($rootScope, $q,  pouchdb) {

    var addNote = function(note){
      var deferred = $q.defer();
      pouchdb.post(note, function(err, res){
        $rootScope.$apply(function(){
          if(err){
            deferred.reject(err);
          }else{
            deferred.resolve(res);
          }
        });
      });
      return deferred.promise;
    }

    var updateNote = function(note){
      var deferred = $q.defer();
      pouchdb.put(note, function(err, res){
        $rootScope.$apply(function() {
          if(err){
            deferred.reject(err);
          }else{
            deferred.resolve(res);
          }
        });
      });
      return deferred.promise;
    }

    var removeNote = function(id){
      var deferred = $q.defer();
      pouchdb.get(id, function(err, note){
        $rootScope.$apply(function() {
          if (err) {
            deferred.reject(err);
          } else {
            pouchdb.remove(note, function(err, res) {
              $rootScope.$apply(function() {
                if (err) {
                  deferred.reject(err);
                } else {
                  deferred.resolve(res);
                }
              });
            });
          }
        });
      });
      return deferred.promise;
    }

    var getNote = function(id){
      var deferred = $q.defer();
      pouchdb.get(id, function(err, note){
        $rootScope.$apply(function() {
          if(err){
            deferred.reject(err);
          }else{
            deferred.resolve(note);
          }          
        });
      });
      return deferred.promise;
    }

    var getNotes = function(){
      var deferred = $q.defer();
      pouchdb.allDocs({include_docs: true},function(err, notes){
        $rootScope.$apply(function() {
          if(err){
            deferred.reject(err);
          }else{
            deferred.resolve(notes);
          }        
        });
      });
      return deferred.promise;
    }

    return {
      add : addNote,
      get : getNote,
      all : getNotes,
      remove: removeNote,
      update : updateNote
    }
  });

'use strict';

angular.module('NoteApp')
  .factory('pouchdb', function () {
  	var db = new PouchDB('meminder');
  	// Maybe connecting to a couchdb client
	// var remoteCouch = 'URL';
	// db.replicate.to(remoteCouch, {continuous: true} );
	// db.replicate.from(remoteCouch, {continuous: true} );
	return db;
  });

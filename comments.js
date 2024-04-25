// Create web server
// Run server
// Get comments
// Add comments
// Delete comments
// Update comments

// Require modules
var http = require('http');
var fs = require('fs');
var url = require('url');
var querystring = require('querystring');
var comments = require('./comments');

// Create server
http.createServer(function(req, res) {
  // Parse request
  var parsedUrl = url.parse(req.url);
  var parsedQuery = querystring.parse(parsedUrl.query);
  var path = parsedUrl.pathname;

  // Get comments
  if (path === '/comments' && req.method === 'GET') {
    comments.get(function(err, data) {
      if (err) {
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end(err);
        return;
      }

      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(data);
    });

  // Add comments
  } else if (path === '/comments' && req.method === 'POST') {
    var body = '';
    req.on('data', function(chunk) {
      body += chunk;
    });
    req.on('end', function() {
      var data = querystring.parse(body);
      comments.add(data.comment, function(err) {
        if (err) {
          res.writeHead(500, {'Content-Type': 'text/plain'});
          res.end(err);
          return;
        }

        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Comment added');
      });
    });

  // Delete comments
  } else if (path === '/comments' && req.method === 'DELETE') {
    comments.delete(parsedQuery.id, function(err) {
      if (err) {
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end(err);
        return;
      }

      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('Comment deleted');
    });

  // Update comments
  } else if (path === '/comments' && req.method === 'PUT') {
    var body = '';
    req.on('data', function(chunk) {
      body += chunk;
    });
    req.on('end', function() {
      var data = querystring.parse(body);
      comments.update(parsedQuery.id, data.comment, function(err) {
        if (err) {
          res.writeHead(500, {'Content-Type': 'text
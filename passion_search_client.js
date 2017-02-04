'use strict';

var _ = require('lodash');
var rp = require('request-promise');
var PASSION_ENDPOINT = 'https://www.holidaycheck.de/svc/review-search-api/passion';
var REVIEW_ENDPOINT = 'https://www.holidaycheck.de/svc/review-search-api/review'
var TENANT = 'passion_alexa';

function PassionSearchClient() {};

  PassionSearchClient.prototype.getPassion = function(passion) {
  };

PassionSearchClient.prototype.requestsPassion = function(passion) {
  return this.getPassion(passion).then(
    function(response) {
      console.log('success - received passion info for ' + passion);
      return response.body.aggregations;
    }
  );
};

PassionSearchClient.prototype.getPassion = function(passion) {
  var options = {
    method: 'GET',
    uri: PASSION_ENDPOINT,
    qs: {
      tenant: TENANT,
      destLimit: 3,
      hotelLimit: 3,
      query: passion
    },
    resolveWithFullResponse: true,
    json: true
  };
  return rp(options);
};

PassionSearchClient.prototype.getDestinationReviews = function(passion, destUUID) {
  var options = {
    method: 'GET',
    uri: REVIEW_ENDPOINT,
    qs: {
      tenant: TENANT,
      limit: 3,
      query: passion,
      destUUID: destUUID
    },
    resolveWithFullResponse: true,
    json: true
  };
  return rp(options);
};




module.exports = PassionSearchClient;

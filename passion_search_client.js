'use strict';

var _ = require('lodash');
var rp = require('request-promise');
var ENDPOINT = 'https://www.holidaycheck.de/svc/review-search-api/passion'

function PassionSearchClient() {};

  PassionSearchClient.prototype.getPassion = function(passion) {
  };

PassionSearchClient.prototype.requestsPassion = function(passion) {
  return this.getPassion(passion).then(
    function(response) {
      console.log('success - received passion info for ' + passion);
      return response.body;
    }
  );
};

PassionSearchClient.prototype.getPassion = function(passion) {
  var options = {
    method: 'GET',
    uri: ENDPOINT,
    qs: {
      tenant: 'passion_alexa', // -> uri + '?access_token=xxxxx%20xxxxx'
      destLimit: 3,
      hotelLimit: 3,
      query: passion
    },
    resolveWithFullResponse: true,
    json: true
  };
  return rp(options);
};




module.exports = PassionSearchClient;

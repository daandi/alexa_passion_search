'use strict';

var _ = require('lodash');
var rp = require('request-promise');
var PASSION_ENDPOINT = 'https://www.holidaycheck.de/svc/review-search-api/passion';
var REVIEW_ENDPOINT = 'https://www.holidaycheck.de/svc/review-search-api/review'
var TENANT = 'passion_alexa';

function PassionSearchClient() {};

PassionSearchClient.prototype.getPassion = function(passion) {
};

PassionSearchClient.prototype.passionInfo = function(passion) {
  return this.getPassion(passion).then(
    function(response) {
      console.log('success - received passion info for ' + passion);
      var aggs = response.body.aggregations;
      var helper = {
        passion : passion,
        hotels : aggs.hotels.map(function(hotel){return hotel.name;}).toString(),
        regions: aggs.regions.map(function(region){return region.name;}).toString()
      }

      return 'Die beliebtesten Reiseziele zum ' + passion + ' sind ' + helper.regions +
      '. Die besten Hotels zum ' + passion + ' sind ' + helper.hotels + '.' ;
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

PassionSearchClient.prototype.getDestinationReviews = function(passion, destUUIDs) {
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

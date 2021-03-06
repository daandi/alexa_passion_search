'use strict';
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;
chai.config.includeStack = true;
var _ = require('lodash');

function pickNameAndId(entity) {
  return _.pick(entity,['name','id']);
}

var PassionSearchClient = require('../lib/passion_search_client');

describe('PassionSearchClient', function(){
  var subject = new PassionSearchClient();
  var passion = 'schnorcheln';

  describe('#getPassions', function(){
    it('returns a list of hotels', function() {
      var hotels = subject.getPassion(passion).then( function(obj){
        return _.map(obj.body.aggregations.hotels,pickNameAndId);
      });
      return expect(hotels).to.eventually.deep.include.members([
        {
          "name": "Hotel Tropitel Oasis",
          "id": "1c61daa2-7d0c-3b48-bcf2-76a9ed31093f"},
        {
          "name": "Lahami Bay Beach Resort & Gardens",
          "id": "5f2ae53c-ee3f-393a-9657-377ce73a62d9"}
        ]);
    });

    it('returns a list of regions', function() {
      var regions = subject.getPassion(passion).then( function(obj){
        return _.map(obj.body.aggregations.regions,pickNameAndId);
      });
      return expect(regions).to.eventually.deep.include.members([
        { name: 'Hurghada/Safaga',
          id: '32d07466-3777-3444-a0c8-c9f6c0537d11'},
        { name: 'Marsa Alam/El Quseir',
          id: 'ab21632a-310f-3bdc-b6cc-f04d9d87b7e1'},
        { name: 'Malediven',
          id: '465741da-03ce-31f6-bac1-4e5e5f72da55'}
        ]);
    });
  });

  describe('#passionInfo', function(){
    var passion = 'rodeln'
    it('returns requested passion', function() {
      var res = subject.passionInfo(passion).then(function(obj){
        return obj;
      });
      return expect(res).to.eventually.equal('Die beliebtesten Reiseziele zum rodeln sind Tirol,Bayern,Salzburger Land. Die besten Hotels zum rodeln sind Alpeiner Nature Resort Tirol,Hotel Gutjahr,Familienresort Reslwirt.')
    });
  })
});

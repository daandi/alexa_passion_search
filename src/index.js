'use strict';
var Alexa = require('alexa-sdk');
var PassionSearchClient= require('./lib/passion_search_client.js');
var psc = new PassionSearchClient();

var APP_ID = "reise planer";

var languageStrings = {
    "de-DE": {
        "translation": {
            "SKILL_NAME" : "Holidaycheck Passion Search",
            "HELP_MESSAGE" : "Sage Wo kann ich am besten wandern oder Ich möchte schnorcheln ",
            "HELP_REPROMPT" : "Wie kann ich dir helfen?",
            "STOP_MESSAGE" : "Ich hoffe ich konnte dir helfen das perfekte Reiseziel zu finden"
        }
    }
};

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('AMAZON.HelpIntent');
    },
    'GetPassion': function () {
        var passion = this.event.request.intent.slots.PASSION;
        var that = this;
        console.log(passion);
        psc.passionInfo(passion.value).then(function(passionResult){
          console.log(passionResult);
          that.emit(':tellWithCard', passionResult, that.t("SKILL_NAME"), passionResult);
        })
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = this.t("HELP_MESSAGE");
        var reprompt = this.t("HELP_MESSAGE");
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t("STOP_MESSAGE"));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t("STOP_MESSAGE"));
    }
};

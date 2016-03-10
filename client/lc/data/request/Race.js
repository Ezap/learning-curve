goog.provide('lc.data.request.Race');

goog.require('prestans.net.HttpMethod');
goog.require('prestans.rest.json.Request');
goog.require('lc.data.model.Race');


lc.data.request.Race.fetchAll = function(racecourseId) {
    var config_ = {
        identifier: "RaceFetchAll",
        httpMethod: prestans.net.HttpMethod.GET,
        responseModel: lc.data.model.Race,
        isArray: true,
        urlFormat: "/racecourse/%i/race",
        urlArgs: [racecourseId]
    };
    return new prestans.rest.json.Request(config_);
};


lc.data.request.Race.fetchSingle = function(racecourseId, raceID) {
    var config_ = {
        identifier: "RaceFetchSingle",
        httpMethod: prestans.net.HttpMethod.GET,
        responseModel: lc.data.model.Race,
        isArray: false,
        urlFormat: "/racecourse/%i/race/%i",
        urlArgs: [racecourseId, raceID]
    };
    return new prestans.rest.json.Request(config_);
};


lc.data.request.Race.create = function(racecourseId, race, opt_filter) {
    if (!goog.isDefAndNotNull(opt_filter)) var opt_filter = new lc.data.filter.Race(true);
    var config_ = {
        identifier: "RaceCreate",
        httpMethod: prestans.net.HttpMethod.POST,
        requestModel: race,
        requestFilter: opt_filter,
        responseModel: prestans.rest.json.Response.EMPTY_BODY,
        urlFormat: "/racecourse/%i/race",
        urlArgs: [racecourseId]
    };
    return new prestans.rest.json.Request(config_);
};


lc.data.request.Race.delete = function(racecourseId, raceID) {
    var config_ = {
        identifier: "RaceDelete",
        httpMethod: prestans.net.HttpMethod.DELETE,
        responseModel: prestans.rest.json.Response.EMPTY_BODY,
        urlFormat: "/racecourse/%i/race/%i",
        urlArgs: [racecourseId, raceId]
    };
    return new prestans.rest.json.Request(config_);
};
goog.provide('lc.data.request.Racecourse');

goog.require('prestans.net.HttpMethod');
goog.require('prestans.rest.json.Request');
goog.require('lc.data.model.Racecourse');


lc.data.request.Racecourse.fetchAll = function() {
    var config_ = {
        identifier: "RacecourseFetchAll",
        httpMethod: prestans.net.HttpMethod.GET,
        responseModel: lc.data.model.Racecourse,
        isArray: true,
        urlFormat: "/racecourse"
    };
    return new prestans.rest.json.Request(config_);
};


lc.data.request.Racecourse.fetchSingle = function(racecourseId) {
    var config_ = {
        identifier: "RacecourseFetchSingle",
        httpMethod: prestans.net.HttpMethod.GET,
        responseModel: lc.data.model.Racecourse,
        isArray: false,
        urlFormat: "/racecourse/%i",
        urlArgs: [racecourseId]
    };
    return new prestans.rest.json.Request(config_);
};


lc.data.request.Racecourse.create = function(racecourse, opt_filter) {
    if (!goog.isDefAndNotNull(opt_filter)) var opt_filter = new lc.data.filter.Racecourse(true);
    var config_ = {
        identifier: "RacecourseCreate",
        httpMethod: prestans.net.HttpMethod.POST,
        requestModel: racecourse,
        requestFilter: opt_filter,
        responseModel: prestans.rest.json.Response.EMPTY_BODY,
        urlFormat: "/racecourse",
    };
    return new prestans.rest.json.Request(config_);
};


lc.data.request.Racecourse.delete = function(racecourseId) {
    var config_ = {
        identifier: "RacecourseDelete",
        httpMethod: prestans.net.HttpMethod.DELETE,
        responseModel: prestans.rest.json.Response.EMPTY_BODY,
        urlFormat: "/racecourse/%i",
        urlArgs: [racecourseId]
    };
    return new prestans.rest.json.Request(config_);
};
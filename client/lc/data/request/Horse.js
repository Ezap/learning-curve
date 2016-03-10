goog.provide('lc.data.request.Horse');

goog.require('prestans.net.HttpMethod');
goog.require('prestans.rest.json.Request');
goog.require('lc.data.model.Horse');


lc.data.request.Horse.fetchAll = function(racecourseId, raceId) {
	var config_ = {
		identifier: "HorseFetchAll",
		httpMethod: prestans.net.HttpMethod.GET,
		responseModel: lc.data.model.Horse,
		isArray: true,
		urlFormat: "/racecourse/%i/race/%i/horse",
		urlArgs: [racecourseId, raceId]
	};
	return new prestans.rest.json.Request(config_);
};


lc.data.request.Horse.fetchSingle = function(racecourseId, raceId, horseId) {
	var config_ = {
		identifier: "HorseFetchSingle",
		httpMethod: prestans.net.HttpMethod.GET,
		responseModel: lc.data.model.Horse,
		isArray: false,
		urlFormat: "/racecourse/%i/race/%i/horse/%i",
		urlArgs: [racecourseId, raceId, horseId]

	};
	return new prestans.rest.json.Request(config_);
};


lc.data.request.Horse.create = function(racecourseId, raceId, horse, opt_filter) {
    if (!goog.isDefAndNotNull(opt_filter)) var opt_filter = new lc.data.filter.Horse(true);

	var config_ = {
		identifier: "HorseCreate",
		httpMethod: prestans.net.HttpMethod.POST,
		requestModel: horse,
		requestFilter: opt_filter,
		responseModel: prestans.rest.json.Response.EMPTY_BODY,
		urlFormat: "/racecourse/%i/race/%i/horse",
		urlArgs: [racecourseId, raceId]
	};
	return new prestans.rest.json.Request(config_);

};


lc.data.request.Horse.delete = function(bandId, albumId, trackId) {
	var config_ = {
		identifier: "HorseDelete",
		httpMethod: prestans.net.HttpMethod.DELETE,
		responseModel: prestans.rest.json.Response.EMPTY_BODY,
		urlFormat: "/racecourse/%i/race/%i/horse/%i",
		urlArgs: [bandId, albumId, trackId]
	};
	return new prestans.rest.json.Request(config_);
};
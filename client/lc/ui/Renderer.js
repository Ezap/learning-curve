goog.provide('lc.ui.Renderer');

goog.require('goog.dom.classlist');
goog.require('goog.ui.Component');

goog.require('lc.ui.racecourse.Renderer');
goog.require('lc.ui.race.Renderer');
goog.require('lc.ui.horse.Renderer');

goog.require('lc');

/**
* @constructor
* @extends {goog.ui.Component}
* @suppress {undefinedVars}
*/

lc.ui.Renderer = function() {


};

goog.inherits(lc.ui.Renderer, goog.ui.Component);

lc.ui.Renderer.prototype.canDecorate = function() {
	return true;
};

lc.ui.Renderer.prototype.enterDocument = function() {
	
    goog.base(this, 'enterDocument');

	var element_ = this.getElement();

    var rowDiv_ = this.getDomHelper().createDom(goog.dom.TagName.DIV);
    goog.dom.classlist.add(rowDiv_, goog.getCssName("row"));
    rowDiv_.innerHtml = 'Hello world';
    /*
    this.getDomHelper().appendChild(element_, rowDiv_);

    var racecourse_ = new lc.ui.racecourse.Renderer(this.getDomHelper());
    racecourse_.render(rowDiv_);

    this.getHandler().listen(racecourse_, lc.ui.racecourse.Renderer.EventType.SELECTED, function(event) {
        race_.setRacecourse_(event.getRacecourse());
        race_.fetchAll_();
        console.log("Inside race listener");
    });

    this.getHandler().listen(racecourse_, lc.ui.racecourse.Renderer.EventType.FALLBACK, function(event) {
        race_.renderFallback_();
        console.log("Inside race fallback listener");
    });

    var race_ = new lc.ui.race.Renderer(this.getDomHelper());
    race_.render(rowDiv_);

    this.getHandler().listen(race_, lc.ui.race.Renderer.EventType.SELECTED, function(event) {
        horse_.setRacecourse(event.getRacecourse());
        horse_.setRace(event.getRace());
        horse_.fetchAll_();
        console.log("Inside horse listener");
    });

    this.getHandler().listen(race_, lc.ui.race.Renderer.EventType.FALLBACK, function(event) {
        horse_.renderFallback_();
        console.log("Inside horse fallback listener");
    });


    var horse_ = new lc.ui.horse.Renderer(this.getDomHelper());
    horse_.render(rowDiv_);


};

lc.ui.Renderer.prototype.exitDocument = function() {
	goog.base(this, 'exitDocument');

};

/**
* Start the application
*/
goog.events.listen(window, goog.events.EventType.LOAD, function() {

	var appUI_ = new lc.ui.Renderer();

	goog.dom.removeChildren(document.body);
	appUI_.decorate(document.body);
});
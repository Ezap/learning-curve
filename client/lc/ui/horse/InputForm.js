goog.provide('lc.ui.horse.InputForm');

goog.require('goog.ui.Component');
goog.require('lc.ui.horse.Renderer');

goog.require('goog.events');
goog.require('goog.events.EventTarget');


/**
 * @constructor
 * @extends {goog.ui.Component}
 * @param {goog.dom.DomHelper=} opt_domHelper
 */
lc.ui.horse.InputForm = function(opt_domHelper) {
    goog.base(this, opt_domHelper);
};
goog.inherits(lc.ui.horse.InputForm, goog.ui.Component, goog.events.EventTarget);

lc.ui.horse.InputForm.prototype.racecourse_ = null;
lc.ui.horse.InputForm.prototype.race_ = null;

lc.ui.horse.InputForm.prototype.setRacecourse_ = function(racecourse) {
    this.racecourse_ = racecourse;
};

lc.ui.horse.InputForm.prototype.setRace_ = function(race) {
    this.race_ = race;
};

/**
 * @override
 */
lc.ui.horse.InputForm.prototype.createDom = function() {
    this.decorateInternal(this.getDomHelper().createDom(goog.dom.TagName.FORM));
};

/**
 * @override
 */
lc.ui.horse.InputForm.prototype.decorateInternal = function(element) {
    lc.ui.horse.InputForm.superClass_.decorateInternal.call(this, element);
    goog.dom.classlist.add(element, goog.getCssName("form-inline"));
};

/**
 * @override
 */
lc.ui.horse.InputForm.prototype.enterDocument = function() {
    goog.base(this, 'enterDocument');

    var element_ = this.getElement();

    // Stop Submit from being fired
    this.getHandler().listen(element_, goog.events.EventType.SUBMIT, function(event) {
        event.preventDefault();
    });

    console.log("Inside horse InputForm");

    var formGroup_ = this.getDomHelper().createDom(goog.dom.TagName.DIV);
    goog.dom.classlist.add(formGroup_, goog.getCssName("form-group"));
    this.getDomHelper().appendChild(element_, formGroup_);

    var formLabel_ = this.getDomHelper().createDom(goog.dom.TagName.LABEL);
    formLabel_.setAttribute("for", "inputHorse");
    formLabel_.textContent = "Horse";
    this.getDomHelper().appendChild(formGroup_, formLabel_);

    var formInput_ = this.getDomHelper().createDom(goog.dom.TagName.INPUT);
    goog.dom.classlist.add(formInput_, goog.getCssName("form-control"));
    formInput_.setAttribute("type", "text");
    formInput_.setAttribute("id", "inputhorse");
    formInput_.setAttribute("placeholder", "horse Name");
    this.getDomHelper().appendChild(formGroup_, formInput_);

    var formButton_ = this.getDomHelper().createDom(goog.dom.TagName.BUTTON);
    goog.dom.classlist.add(formButton_, goog.getCssName("btn"));
    goog.dom.classlist.add(formButton_, goog.getCssName("btn-default"));
    formButton_.setAttribute("type", "submit");
    formButton_.textContent = "Add Horse";
    formButton_.setAttribute("disabled", "disabled");
    this.getDomHelper().appendChild(element_, formButton_);

    this.getHandler().listen(formInput_, goog.events.EventType.INPUT, function(event) {
        if(formInput_.value == "") {
            formButton_.setAttribute("disabled", "disabled");
        }
        else {
            formButton_.removeAttribute("disabled");
        };
    });

    this.getHandler().listen(formButton_, goog.events.EventType.CLICK, function(event) {
        event.preventDefault();
        this.addhorse_(this.band_.getId(), this.Race_.getId(), formInput_.value);
        formInput_.value = "";
        formButton_.setAttribute("disabled", "disabled");
    });
    
};

lc.ui.horse.InputForm.prototype.addhorse_ = function(racecourseId, raceId, horseName) {

    var horse_ = new lc.data.model.horse();
    horse_.setName(horseName);

    lc.GLOBALS.API_CLIENT.dispatchRequest(
        lc.data.request.Horse.create(racecourseId, raceId, horse_),
        goog.bind(function(response) {
            console.log("Horse Added");
            this.eventDispatcher_(horse_);
        }, this),
        goog.bind(function(response) {
            console.log("Fail");
        }, this));

};

lc.ui.horse.InputForm.prototype.eventDispatcher_ = function(horse_) {
    this.dispatchEvent({
        type: "horse_input",
        target: horse_
    });
    console.log("inside eventDispatcher");
};
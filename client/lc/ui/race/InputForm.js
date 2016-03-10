goog.provide('lc.ui.race.InputForm');

goog.require('goog.ui.Component');
goog.require('lc.ui.race.Renderer');

goog.require('goog.events');
goog.require('goog.events.EventTarget');


/**
 * @constructor
 * @extends {goog.ui.Component}
 * @param {goog.dom.DomHelper=} opt_domHelper
 */
lc.ui.race.InputForm = function(opt_domHelper) {
    goog.base(this, opt_domHelper);
};
goog.inherits(lc.ui.race.InputForm, goog.ui.Component, goog.events.EventTarget);

lc.ui.race.InputForm.prototype.racecourse_ = null;

lc.ui.race.InputForm.prototype.setRacecourse_ = function(racecourse) {
    this.racecourse_ = racecourse;
};
/**
 * @override
 */
lc.ui.race.InputForm.prototype.createDom = function() {
    this.decorateInternal(this.getDomHelper().createDom(goog.dom.TagName.FORM));
};

/**
 * @override
 */
lc.ui.race.InputForm.prototype.decorateInternal = function(element) {
    lc.ui.race.InputForm.superClass_.decorateInternal.call(this, element);
    goog.dom.classlist.add(element, goog.getCssName("form-inline"));
};

/**
 * @override
 */
lc.ui.race.InputForm.prototype.enterDocument = function() {
    goog.base(this, 'enterDocument');

    var element_ = this.getElement();

    // Stop Submit from being fired
    this.getHandler().listen(element_, goog.events.EventType.SUBMIT, function(event) {
        event.preventDefault();
    });

    console.log("Inside race InputForm");

    var formGroup_ = this.getDomHelper().createDom(goog.dom.TagName.DIV);
    goog.dom.classlist.add(formGroup_, goog.getCssName("form-group"));
    this.getDomHelper().appendChild(element_, formGroup_);

    var formLabel_ = this.getDomHelper().createDom(goog.dom.TagName.LABEL);
    formLabel_.setAttribute("for", "inputRace");
    formLabel_.textContent = "Race";
    this.getDomHelper().appendChild(formGroup_, formLabel_);

    var formInput_ = this.getDomHelper().createDom(goog.dom.TagName.INPUT);
    goog.dom.classlist.add(formInput_, goog.getCssName("form-control"));
    formInput_.setAttribute("type", "text");
    formInput_.setAttribute("id", "inputRace");
    formInput_.setAttribute("placeholder", "Race Name");
    this.getDomHelper().appendChild(formGroup_, formInput_);

    var formButton_ = this.getDomHelper().createDom(goog.dom.TagName.BUTTON);
    goog.dom.classlist.add(formButton_, goog.getCssName("btn"));
    goog.dom.classlist.add(formButton_, goog.getCssName("btn-default"));
    formButton_.setAttribute("type", "submit");
    formButton_.textContent = "Add Race";
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
        this.addRace_(this.racecourse_.getId(), formInput_.value);
        formInput_.value = "";
        formButton_.setAttribute("disabled", "disabled");
    });
    
};

lc.ui.race.InputForm.prototype.addRace_ = function(racecourseId, raceName) {

    var race_ = new lc.data.model.Race();
    race_.setName(raceName);

    lc.GLOBALS.API_CLIENT.dispatchRequest(
        lc.data.request.Race.create(racecourseId, race_),
        goog.bind(function(response) {
            console.log("Race Added");
            this.eventDispatcher_(race_);
        }, this),
        goog.bind(function(response) {
            console.log("Fail");
        }, this));

};

lc.ui.race.InputForm.prototype.eventDispatcher_ = function(race_) {
    this.dispatchEvent({
        type: "race_input",
        target: race_
    });
    console.log("inside eventDispatcher");
};
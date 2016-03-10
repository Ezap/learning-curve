goog.provide('lc.ui.racecourse.InputForm');

goog.require('goog.ui.Component');
goog.require('lc.ui.racecourse.Renderer');

goog.require('goog.events');
goog.require('goog.events.EventTarget');


/**
 * @constructor
 * @extends {goog.ui.Component}
 * @param {goog.dom.DomHelper=} opt_domHelper
 */
lc.ui.racecourse.InputForm = function(opt_domHelper) {
    goog.base(this, opt_domHelper);
};
goog.inherits(lc.ui.racecourse.InputForm, goog.ui.Component, goog.events.EventTarget);

/**
 * @override
 */
lc.ui.racecourse.InputForm.prototype.createDom = function() {
    this.decorateInternal(this.getDomHelper().createDom(goog.dom.TagName.FORM));
};

/**
 * @override
 */
lc.ui.racecourse.InputForm.prototype.decorateInternal = function(element) {
    lc.ui.racecourse.InputForm.superClass_.decorateInternal.call(this, element);
    goog.dom.classlist.add(element, goog.getCssName("form-inline"));
};

/**
 * @override
 */
lc.ui.racecourse.InputForm.prototype.enterDocument = function() {
    goog.base(this, 'enterDocument');

    var element_ = this.getElement();

    // Stop Submit from being fired
    this.getHandler().listen(element_, goog.events.EventType.SUBMIT, function(event) {
        event.preventDefault();
    });

    console.log("Inside racecourse InputForm");

    var formGroup_ = this.getDomHelper().createDom(goog.dom.TagName.DIV);
    goog.dom.classlist.add(formGroup_, goog.getCssName("form-group"));
    this.getDomHelper().appendChild(element_, formGroup_);

    var formLabel_ = this.getDomHelper().createDom(goog.dom.TagName.LABEL);
    formLabel_.setAttribute("for", "inputRacecourse");
    formLabel_.textContent = "Racecourse";
    this.getDomHelper().appendChild(formGroup_, formLabel_);

    var formInput_ = this.getDomHelper().createDom(goog.dom.TagName.INPUT);
    goog.dom.classlist.add(formInput_, goog.getCssName("form-control"));
    formInput_.setAttribute("type", "text");
    formInput_.setAttribute("id", "inputRacecourse");
    formInput_.setAttribute("placeholder", "Racecourse Name");
    this.getDomHelper().appendChild(formGroup_, formInput_);

    var formButton_ = this.getDomHelper().createDom(goog.dom.TagName.BUTTON);
    goog.dom.classlist.add(formButton_, goog.getCssName("btn"));
    goog.dom.classlist.add(formButton_, goog.getCssName("btn-default"));
    formButton_.setAttribute("type", "submit");
    formButton_.setAttribute("disabled", "disabled");
    formButton_.textContent = "Add Racecourse";
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
        this.addRacecourse_(formInput_.value);
        formInput_.value = "";
        formButton_.setAttribute("disabled", "disabled");
    });
    
};

lc.ui.racecourse.InputForm.prototype.addRacecourse_ = function(racecourseName) {

    var racecourse_ = new lc.data.model.Racecourse();
    racecourse_.setName(racecourseName);

    lc.GLOBALS.API_CLIENT.dispatchRequest(
        lc.data.request.Racecourse.create(racecourse_),
        goog.bind(function(response) {
            console.log("Racecourse Added");
            this.eventDispatcher_(racecourse_);
        }, this),
        goog.bind(function(response) {
            console.log("Fail");
        }, this));

};

lc.ui.racecourse.InputForm.prototype.eventDispatcher_ = function(racecourse_) {
    this.dispatchEvent({
        type: "racecourse_input",
        target: racecourse_
    });
    console.log("inside eventDispatcher");
};
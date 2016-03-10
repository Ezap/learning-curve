goog.provide('lc.ui.race.Renderer');

goog.require('goog.ui.Component');
goog.require('lc.ui.race.InputForm');
goog.require('lc.data.request.Race');

goog.require('goog.events');


/**
 * @constructor
 * @extends {goog.ui.Component}
 * @param {goog.dom.DomHelper=} opt_domHelper
 */
lc.ui.race.Renderer = function(opt_domHelper) {
    goog.base(this, opt_domHelper);
};
goog.inherits(lc.ui.race.Renderer, goog.ui.Component);

lc.ui.race.Renderer.prototype.InputForm_ = null;
lc.ui.race.Renderer.prototype.tbody_ = null;
lc.ui.race.Renderer.prototype.selectedRace_ = null;
lc.ui.race.Renderer.prototype.selectedRaceCell_ = null;
lc.ui.race.Renderer.prototype.selectedRacecourse_ = null;

/**
 * @enum {string}
 */
lc.ui.race.Renderer.EventType = {
    SELECTED: goog.events.getUniqueId('lc'),
    FALLBACK: goog.events.getUniqueId('lc')
};

/**
 * @override
 */
lc.ui.race.Renderer.prototype.createDom = function() {
    this.decorateInternal(this.getDomHelper().createDom(goog.dom.TagName.DIV));
};

/**
 * @override
 */
lc.ui.race.Renderer.prototype.decorateInternal = function(element) {
    lc.ui.race.Renderer.superClass_.decorateInternal.call(this, element);
    goog.dom.classlist.add(element, goog.getCssName("col-md-4"));
};

/**
 * @override
 */
lc.ui.race.Renderer.prototype.enterDocument = function() {
    console.log("Inside enterDocument");
    goog.base(this, 'enterDocument');

    var element_ = this.getElement();

    console.log("Inside Race renderer");

    var heading_ = this.getDomHelper().createDom(goog.dom.TagName.H1);
    heading_.textContent = "Races";
    this.getDomHelper().appendChild(element_, heading_);

    this.InputForm_ = new lc.ui.race.InputForm(this.getDomHelper());
    this.InputForm_.render(element_);

    goog.events.listen(this.InputForm_, "race_input", goog.bind(this.fetchAll_, this, this.selectedRacecourse_));

    var table_ = this.getDomHelper().createDom(goog.dom.TagName.TABLE);
    goog.dom.classlist.add(table_, goog.getCssName("table"));
    goog.dom.classlist.add(table_, goog.getCssName("table-hover"));
    this.getDomHelper().appendChild(element_, table_);

    this.tbody_ = this.getDomHelper().createDom(goog.dom.TagName.TBODY);
    this.getDomHelper().appendChild(table_, this.tbody_);


    var loading_ = this.getDomHelper().createDom(goog.dom.TagName.P);
    loading_.textContent = "Loading...";
    this.getDomHelper().appendChild(this.tbody_, loading_);

};


lc.ui.race.Renderer.prototype.fetchAll_ = function() {
    console.log("Inside fetchAll");
    console.log(this.selectedRacecourse_);
    this.InputForm_.setRacecourse_(this.selectedRacecourse_);
    this.selectedRace_ = null;
    lc.GLOBALS.API_CLIENT.dispatchRequest(
        lc.data.request.Race.fetchAll(this.selectedRacecourse_.getId()),
        goog.bind(function(response) {
            console.log(response.getUnpackedBody());
            this.setModel(response.getUnpackedBody());
            this.renderRaces_();
        }, this),
        goog.bind(function(response) {
            console.log("Fail fetchAll");
        }, this));
};


lc.ui.race.Renderer.prototype.createRaceCell_ = function(race) {
    console.log("Inside createRaceCell");
    var tableRow_ = this.getDomHelper().createDom(goog.dom.TagName.TR);

    var tableCell_ = this.getDomHelper().createDom(goog.dom.TagName.TD);
    tableCell_.setAttribute("id", race.getId());
    tableCell_.textContent = race.getName();
    this.getDomHelper().appendChild(tableRow_, tableCell_);

    var tableButtonCell_ = this.getDomHelper().createDom(goog.dom.TagName.TD);
    this.getDomHelper().appendChild(tableRow_, tableButtonCell_);

    var tableCellButton_ = this.getDomHelper().createDom(goog.dom.TagName.BUTTON);
    goog.dom.classlist.add(tableCellButton_, goog.getCssName("close"));
    tableCellButton_.setAttribute("type", "button");
    tableCellButton_.setAttribute("aria-label", "Close");
    this.getDomHelper().appendChild(tableButtonCell_, tableCellButton_);

    var tableCellButtonSpan_ = this.getDomHelper().createDom(goog.dom.TagName.SPAN);
    tableCellButtonSpan_.setAttribute("aria-hiddem", "true");
    tableCellButtonSpan_.textContent = "×";
    this.getDomHelper().appendChild(tableCellButton_, tableCellButtonSpan_);

    this.getHandler().listen(tableCellButtonSpan_, goog.events.EventType.CLICK, function(event) {
        event.preventDefault();
        console.log(race.getId());
        lc.GLOBALS.API_CLIENT.dispatchRequest(
            lc.data.request.Race.delete(this.selectedRacecourse_.getId(), racecourse.getId()),
            goog.bind(function(response) {
                console.log("Race Deleted");
                if(this.selectedRacecourse_.getId() == racecourse.getId())
                    this.selectedRace_ = null;
                this.fetchAll_();
            }, this),
            goog.bind(function(response) {
                console.log("Fail delete");
            }, this));

    });
    this.getHandler().listen(tableCell_, goog.events.EventType.CLICK, function(event) {
        event.preventDefault();
        console.log("Clicked " + race.getName());
        this.selectRace_(tableRow_, race);
    });

    return tableRow_;
};


lc.ui.race.Renderer.prototype.renderRaces_ = function() {
    console.log("Inside renderRaces");
    this.getDomHelper().removeChildren(this.tbody_);

    var races_ = (this.getModel());

    if(races_.isEmpty()) {
        this.renderFallback_();
    }
    else {
        if(goog.isNull(this.selectedRace_))
                this.selectedRace_ = races_.objectAtIndex(0);

        goog.iter.forEach(races_, function(race) {
            var tr_ = this.createRaceCell_(race);
            this.getDomHelper().appendChild(this.tbody_, tr_);

            if(this.selectedRace_.getId() == race.getId())
                this.selectRace_(tr_, race);

        }, this);
    };
};

lc.ui.race.Renderer.prototype.selectRace_ = function(raceCell, race) {
    console.log("Inside selectRace");
    if(goog.isDefAndNotNull(this.selectedRaceCell_))
        goog.dom.classlist.remove(this.selectedRaceCell_, goog.getCssName("success"));
    this.selectedRaceCell_ = raceCell;
    goog.dom.classlist.add(this.selectedRaceCell_, goog.getCssName("success"));

    this.selectedRace_ = race;

    this.dispatchEvent(new lc.ui.race.Renderer.SelectedEvent(
        lc.ui.race.Renderer.EventType.SELECTED,
        this.selectedRacecourse_,
        race,
        this)
    );
};

lc.ui.race.Renderer.prototype.renderFallback_ = function() {
    this.getDomHelper().removeChildren(this.tbody_);
    var fallback_ = this.getDomHelper().createDom(goog.dom.TagName.P);
    fallback_.textContent = "No Races";
    this.getDomHelper().appendChild(this.tbody_, fallback_);

    this.dispatchEvent(new lc.ui.race.Renderer.SelectedEvent(
        lc.ui.race.Renderer.EventType.FALLBACK,
        this.selectedRacecourse_,
        this.selectedRace_,
        this)
    );
};

lc.ui.race.Renderer.prototype.setRacecourse_ = function(racecourse) {
    this.selectedRacecourse_ = racecourse;
};

/**
 * @constructor
 * @extends {goog.events.Event}
 * @param {!string} type
 * @param {!lc.data.model.Racecourse} racecourse
 * @param {!lc.data.model.Race} race
 * @param {goog.ui.Component=} opt_target
 */
lc.ui.race.Renderer.SelectedEvent = function(type, racecourse, race, opt_target) {
    goog.events.Event.call(this, type, opt_target);
    console.log("Inside Click Dispatch");
    /**
     * @type {!lc.data.model.Race}
     * @private
     */
    this.race_ = race;
    this.racecourse_ = racecourse;
};
goog.inherits(lc.ui.race.Renderer.SelectedEvent, goog.events.Event);

/**
 * @return {!lc.data.model.Race}
 */
lc.ui.race.Renderer.SelectedEvent.prototype.getRace = function() {
    return this.race_;
};

/**
 * @return {!lc.data.model.Racecourse}
 */
lc.ui.race.Renderer.SelectedEvent.prototype.getRacecourse = function() {
    return this.racecourse_;
};
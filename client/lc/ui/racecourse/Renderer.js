goog.provide('lc.ui.racecourse.Renderer');

goog.require('goog.ui.Component');
goog.require('lc.ui.racecourse.InputForm');
goog.require('lc.data.request.Racecourse');

goog.require('goog.events');

/**
 * @constructor
 * @extends {goog.ui.Component}
 * @param {goog.dom.DomHelper=} opt_domHelper
 */
lc.ui.racecourse.Renderer = function(opt_domHelper) {
    goog.base(this, opt_domHelper);
};
goog.inherits(lc.ui.racecourse.Renderer, goog.ui.Component);


lc.ui.racecourse.Renderer.prototype.tbody_ = null;
lc.ui.racecourse.Renderer.prototype.selectedRacecourse_ = null;
lc.ui.racecourse.Renderer.prototype.selectedRacecourseCell_ = null;

/**
 * @enum {string}
 */
lc.ui.racecourse.Renderer.EventType = {
    SELECTED: goog.events.getUniqueId('lc'),
    FALLBACK: goog.events.getUniqueId('lc')
};

/**
 * @override
 */
lc.ui.racecourse.Renderer.prototype.createDom = function() {
    this.decorateInternal(this.getDomHelper().createDom(goog.dom.TagName.DIV));
};

/**
 * @override
 */
lc.ui.racecourse.Renderer.prototype.decorateInternal = function(element) {
    lc.ui.racecourse.Renderer.superClass_.decorateInternal.call(this, element);
    goog.dom.classlist.add(element, goog.getCssName("col-md-4"));
};

/**
 * @override
 */
lc.ui.racecourse.Renderer.prototype.enterDocument = function() {
    console.log("Inside enterDocument");
    goog.base(this, 'enterDocument');

    var element_ = this.getElement();

    console.log("Inside Racecourse renderer");

    var heading_ = this.getDomHelper().createDom(goog.dom.TagName.H1);
    heading_.textContent = "racecourses";
    this.getDomHelper().appendChild(element_, heading_);

    var InputForm_ = new lc.ui.racecourse.InputForm(this.getDomHelper());
    InputForm_.render(element_);

    goog.events.listen(InputForm_, "racecourse_input", goog.bind(this.fetchAll_, this));

    var table_ = this.getDomHelper().createDom(goog.dom.TagName.TABLE);
    goog.dom.classlist.add(table_, goog.getCssName("table"));
    goog.dom.classlist.add(table_, goog.getCssName("table-hover"));
    this.getDomHelper().appendChild(element_, table_);

    this.tbody_ = this.getDomHelper().createDom(goog.dom.TagName.TBODY);
    this.getDomHelper().appendChild(table_, this.tbody_);

    this.fetchAll_();
};

lc.ui.racecourse.Renderer.prototype.fetchAll_ = function() {
    console.log("Inside fetchAll");
    this.selectedRacecourse_ = null;
    lc.GLOBALS.API_CLIENT.dispatchRequest(
        lc.data.request.Racecourse.fetchAll(),
        goog.bind(function(response) {
            console.log(response.getUnpackedBody());
            this.setModel(response.getUnpackedBody());
            this.renderRacecourses_();
        }, this),
        goog.bind(function(response) {
            console.log("Fail fetchAll");
        }, this));
};


lc.ui.racecourse.Renderer.prototype.createRacecourseCell_ = function(racecourse) {
    console.log("Inside createRacecourseCell");
    var tableRow_ = this.getDomHelper().createDom(goog.dom.TagName.TR);

    var tableCell_ = this.getDomHelper().createDom(goog.dom.TagName.TD);
    tableCell_.setAttribute("id", racecourse.getId());
    tableCell_.textContent = racecourse.getName();
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
        console.log(racecourse.getId());
        lc.GLOBALS.API_CLIENT.dispatchRequest(
            lc.data.request.Racecourse.delete(racecourse.getId()),
            goog.bind(function(response) {
                console.log("Racecourse Deleted");
                if(this.selectedRacecourse_.getId() == racecourse.getId())
                    this.selectedRacecourse_ = null;
                this.fetchAll_();
            }, this),
            goog.bind(function(response) {
                console.log("Fail delete");
            }, this));

    });
    this.getHandler().listen(tableCell_, goog.events.EventType.CLICK, function(event) {
        event.preventDefault();
        console.log("Clicked " + racecourse.getName());
        this.selectRacecourse_(tableRow_, racecourse);
    });

    return tableRow_;
};


lc.ui.racecourse.Renderer.prototype.renderRacecourses_ = function() {
    console.log("Inside renderRacecourses");
    this.getDomHelper().removeChildren(this.tbody_);

    var racecourses_ = (this.getModel());

    if(racecourses_.isEmpty()) {
        this.renderFallback_();
    }
    else {
        if(goog.isNull(this.selectedRacecourse_))
                this.selectedRacecourse_ = racecourses_.objectAtIndex(0);

        goog.iter.forEach(racecourses_, function(racecourse) {
            var tr_ = this.createRacecourseCell_(racecourse);
            this.getDomHelper().appendChild(this.tbody_, tr_);

            if(this.selectedRacecourse_.getId() == racecourse.getId())
                this.selectRacecourse_(tr_, racecourse);

        }, this);
    };
};

lc.ui.racecourse.Renderer.prototype.selectRacecourse_ = function(racecourseCell, racecourse) {
    console.log("Inside selectRacecourse");
    if(goog.isDefAndNotNull(this.selectedRacecourseCell_))
        goog.dom.classlist.remove(this.selectedRacecourseCell_, goog.getCssName("success"));
    this.selectedRacecourseCell_ = racecourseCell;
    goog.dom.classlist.add(this.selectedRacecourseCell_, goog.getCssName("success"));

    this.selectedRacecourse_ = racecourse;

    this.dispatchEvent(new lc.ui.racecourse.Renderer.SelectedEvent(
        lc.ui.racecourse.Renderer.EventType.SELECTED,
        racecourse,
        this)
    );
};

lc.ui.racecourse.Renderer.prototype.renderFallback_ = function() {
    this.getDomHelper().removeChildren(this.tbody_);
    var fallback_ = this.getDomHelper().createDom(goog.dom.TagName.P);
    fallback_.textContent = "No racecourses";
    this.getDomHelper().appendChild(this.tbody_, fallback_);

    this.dispatchEvent(new lc.ui.racecourse.Renderer.SelectedEvent(
        lc.ui.racecourse.Renderer.EventType.FALLBACK,
        this.selectedRacecourse_,
        this)
    );
};

/**
 * @constructor
 * @extends {goog.events.Event}
 * @param {!string} type
 * @param {!lc.data.model.Racecourse} racecourse
 * @param {goog.ui.Component=} opt_target
 */
lc.ui.racecourse.Renderer.SelectedEvent = function(type, racecourse, opt_target) {
    goog.events.Event.call(this, type, opt_target);
    console.log("Inside Click Dispatch");
    /**
     * @type {!lc.data.model.Racecourse}
     * @private
     */
    this.racecourse_ = racecourse;

};
goog.inherits(lc.ui.racecourse.Renderer.SelectedEvent, goog.events.Event);

/**
 * @return {!lc.data.model.Racecourse}
 */
lc.ui.racecourse.Renderer.SelectedEvent.prototype.getRacecourse = function() {
    return this.racecourse_;
};
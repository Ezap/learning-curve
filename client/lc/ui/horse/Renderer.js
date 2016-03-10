goog.provide('lc.ui.horse.Renderer');

goog.require('goog.ui.Component');
goog.require('lc.ui.horse.InputForm');
goog.require('lc.data.request.Horse');

goog.require('goog.events');


/**
 * @constructor
 * @extends {goog.ui.Component}
 * @param {goog.dom.DomHelper=} opt_domHelper
 */
lc.ui.horse.Renderer = function(opt_domHelper) {
    goog.base(this, opt_domHelper);
};
goog.inherits(lc.ui.horse.Renderer, goog.ui.Component);

lc.ui.horse.Renderer.prototype.InputForm_ = null;
lc.ui.horse.Renderer.prototype.tbody_ = null;
lc.ui.horse.Renderer.prototype.selectedHorse_ = null;
lc.ui.horse.Renderer.prototype.selectedHorseCell_ = null;
lc.ui.horse.Renderer.prototype.selectedRacecourse_ = null;
lc.ui.horse.Renderer.prototype.selectedRace_ = null;
/**
 * @override
 */
lc.ui.horse.Renderer.prototype.createDom = function() {
    this.decorateInternal(this.getDomHelper().createDom(goog.dom.TagName.DIV));
};

/**
 * @override
 */
lc.ui.horse.Renderer.prototype.decorateInternal = function(element) {
    lc.ui.horse.Renderer.superClass_.decorateInternal.call(this, element);
    goog.dom.classlist.add(element, goog.getCssName("col-md-4"));
};

/**
 * @override
 */
lc.ui.horse.Renderer.prototype.enterDocument = function() {
    console.log("Inside enterDocument");
    goog.base(this, 'enterDocument');

    var element_ = this.getElement();

    console.log("Inside Horse renderer");

    var heading_ = this.getDomHelper().createDom(goog.dom.TagName.H1);
    heading_.textContent = "Horses";
    this.getDomHelper().appendChild(element_, heading_);


    this.InputForm_ = new lc.ui.horse.InputForm(this.getDomHelper());
    this.InputForm_.render(element_);

    goog.events.listen(this.InputForm_, "horse_input", goog.bind(this.fetchAll_, this, this.band_, this.album_));


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

lc.ui.horse.Renderer.prototype.fetchAll_ = function() {
    console.log("Inside horse fetchAll");
    console.log(this.selectedRacecourse_);
    console.log(this.selectedRace_);
    this.selectedHorse_ = null;
    this.InputForm_.setRacecourse_(this.selectedBand_);
    this.InputForm_.setRace_(this.selectedAlbum_);
    lc.GLOBALS.API_CLIENT.dispatchRequest(
        lc.data.request.Horse.fetchAll(this.selectedRacecourse_.getId(), this.selectedRace_.getId()),
        goog.bind(function(response) {
            console.log(response.getUnpackedBody());
            this.setModel(response.getUnpackedBody());
            this.renderHorses_();
        }, this),
        goog.bind(function(response) {
            console.log("Fail fetchAll");
        }, this));
};


lc.ui.horse.Renderer.prototype.createHorseCell_ = function(horse) {
    console.log("Inside createHorseCell");
    var tableRow_ = this.getDomHelper().createDom(goog.dom.TagName.TR);

    var tableCell_ = this.getDomHelper().createDom(goog.dom.TagName.TD);
    tableCell_.setAttribute("id", horse.getId());
    tableCell_.textContent = horse.getName();
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
        console.log(track.getId());
        lc.GLOBALS.API_CLIENT.dispatchRequest(
            lc.data.request.Horse.delete(this.selectedRacecourse_.getId(), this.selectedRace_.getId(), track.getId()),
            goog.bind(function(response) {
                console.log("Horse Deleted");
                if(this.selectedHorse_.getId() == horse.getId()) {
                    this.selectedHorse_ = null;
                    console.log("got here");
                }
                console.log(this.selectedHorse_);
                this.fetchAll_();
            }, this),
            goog.bind(function(response) {
                console.log("Fail delete");
            }, this));

    });
    this.getHandler().listen(tableCell_, goog.events.EventType.CLICK, function(event) {
        event.preventDefault();

        this.selectTrack_(tableRow_, track);
    });

    return tableRow_;
};


lc.ui.horse.Renderer.prototype.renderHorses_ = function() {
    console.log("Inside renderHorses");
    this.getDomHelper().removeChildren(this.tbody_);

    var horses_ = (this.getModel());

    if(tracks_.isEmpty()) {
        this.renderFallback_();
    }
    else {
        if(goog.isNull(this.selectedHorse_))
                this.selectedHorse_ = horses_.objectAtIndex(0);

        goog.iter.forEach(horses_, function(horse) {
            var ho_ = this.createTrackCell_(horse);
            this.getDomHelper().appendChild(this.tbody_, ho_);

            if(this.selectedHorse_.getId() == horse.getId())
                this.selectHorse_(ho_, horse);

        }, this);
    };
};

lc.ui.horse.Renderer.prototype.selectHorse_ = function(horseCell, horse) {
    console.log("Inside selectHorse");
    if(goog.isDefAndNotNull(this.selectedHorseCell_))
        goog.dom.classlist.remove(this.selectedHorseCell_, goog.getCssName("success"));
    this.selectedHorseCell_ = horseCell;
    goog.dom.classlist.add(this.selectedHorseCell_, goog.getCssName("success"));

    this.selectedTrack_ = track;
};

lc.ui.horse.Renderer.prototype.renderFallback_ = function() {
    this.getDomHelper().removeChildren(this.tbody_);
    var fallback_ = this.getDomHelper().createDom(goog.dom.TagName.P);
    fallback_.textContent = "No Horses";
    this.getDomHelper().appendChild(this.tbody_, fallback_);
};


lc.ui.horse.Renderer.prototype.setRacecourse = function(band) {
    this.selectedBand_ = band;
};

lc.ui.horse.Renderer.prototype.setRace = function(album) {
    this.selectedAlbum_ = album;
};
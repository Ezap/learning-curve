// This file was autogenerated by depswriter.py.
// Please do not edit.
goog.addDependency('../../../lc/data/filter/Base.js', ['lc.data.filter.Base'], ['goog.json', 'goog.object', 'lc', 'prestans.types.Filter'], false);
goog.addDependency('../../../lc/data/filter/Horse.js', ['lc.data.filter.Horse'], ['goog.json', 'goog.object', 'lc', 'prestans.types.Filter'], false);
goog.addDependency('../../../lc/data/filter/Race.js', ['lc.data.filter.Race'], ['goog.json', 'goog.object', 'lc', 'prestans.types.Filter'], false);
goog.addDependency('../../../lc/data/filter/Racecourse.js', ['lc.data.filter.Racecourse'], ['goog.json', 'goog.object', 'lc', 'prestans.types.Filter'], false);
goog.addDependency('../../../lc/data/model/Base.js', ['lc.data.model.Base'], ['goog.json', 'lc', 'lc.data.filter.Base', 'prestans.types.Model', 'prestans.types.Model.AttributeChangedEvent', 'prestans.types.Model.EventType', 'prestans.types.String'], false);
goog.addDependency('../../../lc/data/model/Horse.js', ['lc.data.model.Horse'], ['goog.json', 'lc', 'lc.data.filter.Horse', 'prestans.types.Model', 'prestans.types.Model.AttributeChangedEvent', 'prestans.types.Model.EventType', 'prestans.types.String'], false);
goog.addDependency('../../../lc/data/model/Race.js', ['lc.data.model.Race'], ['goog.json', 'lc', 'lc.data.filter.Race', 'prestans.types.Model', 'prestans.types.Model.AttributeChangedEvent', 'prestans.types.Model.EventType', 'prestans.types.String'], false);
goog.addDependency('../../../lc/data/model/Racecourse.js', ['lc.data.model.Racecourse'], ['goog.json', 'lc', 'lc.data.filter.Racecourse', 'prestans.types.Model', 'prestans.types.Model.AttributeChangedEvent', 'prestans.types.Model.EventType', 'prestans.types.String'], false);
goog.addDependency('../../../lc/data/request/Horse.js', ['lc.data.request.Horse'], ['lc.data.model.Horse', 'prestans.net.HttpMethod', 'prestans.rest.json.Request'], false);
goog.addDependency('../../../lc/data/request/Race.js', ['lc.data.request.Race'], ['lc.data.model.Race', 'prestans.net.HttpMethod', 'prestans.rest.json.Request'], false);
goog.addDependency('../../../lc/data/request/Racecourse.js', ['lc.data.request.Racecourse'], ['lc.data.model.Racecourse', 'prestans.net.HttpMethod', 'prestans.rest.json.Request'], false);
goog.addDependency('../../../lc/lc.js', ['lc'], ['prestans.rest.json.Client'], false);
goog.addDependency('../../../lc/ui/Renderer.js', ['lc.ui.Renderer'], ['goog.dom.classlist', 'goog.ui.Component', 'lc', 'lc.ui.horse.Renderer', 'lc.ui.race.Renderer', 'lc.ui.racecourse.Renderer'], false);
goog.addDependency('../../../lc/ui/horse/InputForm.js', ['lc.ui.horse.InputForm'], ['goog.events', 'goog.events.EventTarget', 'goog.ui.Component', 'lc.ui.horse.Renderer'], false);
goog.addDependency('../../../lc/ui/horse/Renderer.js', ['lc.ui.horse.Renderer'], ['goog.events', 'goog.ui.Component', 'lc.data.request.Horse', 'lc.ui.horse.InputForm'], false);
goog.addDependency('../../../lc/ui/race/InputForm.js', ['lc.ui.race.InputForm'], ['goog.events', 'goog.events.EventTarget', 'goog.ui.Component', 'lc.ui.race.Renderer'], false);
goog.addDependency('../../../lc/ui/race/Renderer.js', ['lc.ui.race.Renderer'], ['goog.events', 'goog.ui.Component', 'lc.data.request.Race', 'lc.ui.race.InputForm'], false);
goog.addDependency('../../../lc/ui/racecourse/InputForm.js', ['lc.ui.racecourse.InputForm'], ['goog.events', 'goog.events.EventTarget', 'goog.ui.Component', 'lc.ui.racecourse.Renderer'], false);
goog.addDependency('../../../lc/ui/racecourse/Renderer.js', ['lc.ui.racecourse.Renderer'], ['goog.events', 'goog.ui.Component', 'lc.data.request.Racecourse', 'lc.ui.racecourse.InputForm'], false);
goog.addDependency('../../../prestans/net/HttpMethod.js', ['prestans.net.HttpMethod'], ['prestans'], false);
goog.addDependency('../../../prestans/prestans.js', ['prestans'], [], false);
goog.addDependency('../../../prestans/rest/json/Client.js', ['prestans.rest.json.Client', 'prestans.rest.json.Client.Event'], ['goog.events.Event', 'goog.events.EventTarget', 'goog.net.XhrManager', 'goog.string', 'prestans', 'prestans.rest.json.Response'], false);
goog.addDependency('../../../prestans/rest/json/Request.js', ['prestans.rest.json.Request'], ['goog.array', 'goog.string', 'goog.string.format', 'prestans', 'prestans.types.Filter', 'prestans.types.Model'], false);
goog.addDependency('../../../prestans/rest/json/Response.js', ['prestans.rest.json.Response'], ['prestans', 'prestans.types.Array'], false);
goog.addDependency('../../../prestans/types/Array.js', ['prestans.types.Array'], ['goog.array', 'goog.events.Event', 'goog.events.EventTarget', 'goog.iter', 'goog.iter.Iterator', 'goog.iter.StopIteration', 'goog.json', 'prestans', 'prestans.types.Boolean', 'prestans.types.Float', 'prestans.types.Integer', 'prestans.types.Model', 'prestans.types.String'], false);
goog.addDependency('../../../prestans/types/Boolean.js', ['prestans.types.Boolean'], ['prestans'], false);
goog.addDependency('../../../prestans/types/DataURLFile.js', ['prestans.types.DataURLFile'], ['prestans'], false);
goog.addDependency('../../../prestans/types/Date.js', ['prestans.types.Date'], ['goog.date.Date', 'prestans'], false);
goog.addDependency('../../../prestans/types/DateTime.js', ['prestans.types.DateTime'], ['goog.date.DateTime', 'goog.date.UtcDateTime', 'prestans'], false);
goog.addDependency('../../../prestans/types/Filter.js', ['prestans.types.Filter'], ['prestans'], false);
goog.addDependency('../../../prestans/types/Float.js', ['prestans.types.Float'], ['goog.array', 'prestans'], false);
goog.addDependency('../../../prestans/types/Integer.js', ['prestans.types.Integer'], ['goog.array', 'goog.string.format', 'prestans'], false);
goog.addDependency('../../../prestans/types/Model.js', ['prestans.types.Model', 'prestans.types.Model.AttributeChangedEvent', 'prestans.types.Model.EventType'], ['goog.events.Event', 'goog.events.EventTarget', 'prestans'], false);
goog.addDependency('../../../prestans/types/String.js', ['prestans.types.String'], ['goog.array', 'prestans'], false);
goog.addDependency('../../../prestans/types/Time.js', ['prestans.types.Time'], ['goog.date.DateTime', 'goog.i18n.DateTimeFormat', 'goog.i18n.DateTimeParse', 'prestans'], false);

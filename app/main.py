#!/usr/bin/env python
#
# Copyright 2007 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
import webapp2
import lc.models
import lc.page.handlers
import prestans.rest
import lc.rest.handlers

# for loading the page - wsgi, gateway between app and browser
app = webapp2.WSGIApplication([
    ('/', lc.page.handlers.MainHandler)
], debug=True)

# for prestans, rest, handling database and communication
api = prestans.rest.RequestRouter(routes=[
		#(r'/[0-9]+)', lc.rest.handlers.DefaultHandler),
		(r'/api/racecourse', lc.rest.handlers.RestRacecourseCollectionHandler),
	    (r'/api/racecourse/(\d+)', lc.rest.handlers.RestRacecourseEntityHandler),
	    (r'/api/racecourse/(\d+)/race', lc.rest.handlers.RestRaceCollectionHandler),
	    (r'/api/racecourse/(\d+)/race/(\d+)', lc.rest.handlers.RestRaceEntityHandler),
	    (r'/api/racecourse/(\d+)/race/(\d+)/horse', lc.rest.handlers.RestHorseCollectionHandler),
	    (r'/api/racecourse/(\d+)/race/(\d+)/horse/(\d+)', lc.rest.handlers.RestHorseEntityHandler)
	],
	serializers=[prestans.serializer.JSON()],
	default_serializer=prestans.serializer.JSON(),
	deserializers=[prestans.deserializer.JSON()],
	default_deserializer=prestans.deserializer.JSON(),
	charset='utf-8',
	application_name='learning-curve',
	logger=None,
	debug=True)

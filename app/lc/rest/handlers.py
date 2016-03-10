import prestans.rest
import prestans.http
import prestans.parser
import prestans.types
import prestans.provider.auth
import prestans.ext.appengine
import prestans.ext.data.adapters.ndb

import lc.rest.models
import lc.models
import lc.rest.adapters

from google.appengine.api import users

#prestans



racecourse_filter = prestans.parser.AttributeFilter.from_model(model_instance=lc.rest.models.Racecourse(), default_value=False)
racecourse_filter.name = True

class RestRacecourseCollectionHandler(prestans.rest.RequestHandler):
	__parser_config__ = prestans.parser.Config(
		GET=prestans.parser.VerbConfig(
			response_attribute_filter_default_value=True,
			response_template=prestans.types.Array(element_template=lc.rest.models.Racecourse())
			),
		POST=prestans.parser.VerbConfig(
			body_template=lc.rest.models.Racecourse(),
			request_attribute_filter=racecourse_filter,
			response_template=None
			)
		)

	def get(self):
		racecourses = lc.models.Racecourse.query()

		self.response.body = prestans.ext.data.adapters.ndb.adapt_persistent_collection(
			racecourses,
			lc.rest.models.Racecourse
		)

		self.response.status = prestans.http.STATUS.OK

	def post(self):
		request = self.request.parsed_body
		racecourse = lc.models.Racecourse(
			name=request.name
		)
		racecourse.put()
		self.response.status = prestans.http.STATUS.NO_CONTENT

class RestRacecourseEntityHandler(prestans.rest.RequestHandler):

	__parser_config__ = prestans.parser.Config(
		GET=prestans.parser.VerbConfig(
			response_attribute_filter_default_value=True,
			response_template=lc.rest.models.Racecourse()
		)
	)

	def get(self, racecourse_id):
		racecourse = lc.models.Racecourse.get_by_key(racecourse_id)
		if racecourse is None:
			raise prestans.exception.NotFound("Racecourse")

		self.response.http_status = prestans.http.STATUS.OK
		self.response.body = lc.rest.models.Racecourse(name=racecourse.name)

	def delete(self, racecourse_id):
		racecourse = lc.models.Racecourse.get_by_key(racecourse_id)
		if racecourse is None:
			raise prestans.exception.NotFound("Racecourse")
		lc.models.ndb.delete_multi(lc.models.ndb.Query(ancestor=racecourse.key).iter(keys_only=True))


class RestRaceCollectionHandler(prestans.rest.RequestHandler):
	__parser_config__ = prestans.parser.Config(
		GET=prestans.parser.VerbConfig(
			response_attribute_filter_default_value=True,
			response_template=prestans.types.Array(element_template=lc.rest.models.Race())
		),
		POST=prestans.parser.VerbConfig(
			body_template=lc.rest.models.Race(),
			response_template=None
		)
	)

	def get(self, racecourse_id):
		racecourse = lc.models.Racecourse.get_by_key(racecourse_id)
		if racecourse is None:
			raise prestans.exception.NotFound("Racecourse")

		self.response.status = prestans.http.STATUS.OK
		self.response.body = prestans.ext.data.adapters.ndb.adapt_persistent_collection(
				lc.models.Race.query(ancestor=racecourse.key).fetch(),
				lc.rest.models.Race
				)


	def post(self, racecourse_id):
		request = self.request.parsed_body
		racecourse = lc.models.Racecourse.get_by_key(racecourse_id)
		race = lc.models.Race(
			name=request.name,
			parent=racecourse.key
		)
		race.put()
		self.response.status = prestans.http.STATUS.NO_CONTENT

class RestRaceEntityHandler(prestans.rest.RequestHandler):

	__parser_config__ = prestans.parser.Config(
		GET=prestans.parser.VerbConfig(
			response_attribute_filter_default_value=True,
			response_template=lc.rest.models.Race()
		)
	)

	def get(self, racecourse_id, race_id):
		race = lc.models.Race.get_by_key(racecourse_id, race_id)
		if race is None:
			raise prestans.exception.NotFound("Race")

		self.response.http_status = prestans.http.STATUS.OK
		self.response.body = lc.rest.models.Race(name=race.name)

	def delete(self, racecourse_id, race_id):
		race = lc.models.Race.get_by_key(racecourse_id, race_id)
		if race is None:
			raise prestans.exception.NotFound("Race")
		lc.models.ndb.delete_multi(lc.models.ndb.Query(ancestor=race.key).iter(keys_only=True))

class RestHorseCollectionHandler(prestans.rest.RequestHandler):
	__parser_config__ = prestans.parser.Config(
		GET=prestans.parser.VerbConfig(
			response_attribute_filter_default_value=True,
			response_template= prestans.types.Array(element_template=lc.rest.models.Horse())
		),
		POST=prestans.parser.VerbConfig(
			body_template=lc.rest.models.Horse(),
			response_template=None
		)
	)

	def get(self, racecourse_id, race_id):
		race = lc.models.Race.get_by_key(racecourse_id, race_id)
		if race is None:
			raise prestans.exception.NotFound("Race")
		
		self.response.status = prestans.http.STATUS.OK
		self.response.body = prestans.ext.data.adapters.ndb.adapt_persistent_collection(
			lc.models.Horse.query(ancestor=race.key).fetch(),
			lc.rest.models.Horse
		)

	def post(self, racecourse_id, race_id):
		request = self.request.parsed_body
		race = lc.models.Race.get_by_key(racecourse_id, race_id)
		horse = lc.models.Horse(
			name=request.name, 
			parent=race.key
		)
		horse.put()

		self.response.status = prestans.http.STATUS.NO_CONTENT


class RestHorseEntityHandler(prestans.rest.RequestHandler):

	__parser_config__ = prestans.parser.Config(
		GET=prestans.parser.VerbConfig(
			response_attribute_filter_default_value=True,
			response_template=lc.rest.models.Horse()
		)
	)

	def get(self, racecourse_id, race_id, horse_id):
		horse = lc.models.Horse.get_by_key(racecourse_id, race_id, horse_id)
		if horse is None:
			raise prestans.exception.NotFound("Horse")
		
		self.response.body = lc.rest.models.Horse(name=horse.name)
		self.response.http_status = prestans.http.STATUS.OK

	def delete(self, racecourse_id, race_id, horse_id):
		horse = lc.models.Horse.get_by_key(racecourse_id, race_id, horse_id)
		if horse is None:
			raise prestans.exception.NotFound("Horse")

		horse.key.delete()
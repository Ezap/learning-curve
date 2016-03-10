from google.appengine.ext import ndb

import prestans.ext.data.adapters
import prestans.ext.data.adapters.ndb

class  Base(ndb.Model):
	@property
	def id(self):
		return self.key.id()

class Horse(Base):
	name = ndb.StringProperty()

	@classmethod
	def make_key(self, racecourse_id, race_id, horse_id):
		horse_key = ndb.Key("Racecourse", int(racecourse_id),"Race", int(race_id) , "Horse", int(horse_id))
		return horse_key

	@classmethod
	def get_by_key(self, racecourse_id, race_id, horse_id):
		return self.make_key(racecourse_id, race_id, horse_id).get()

class Race(Base):
	name = ndb.StringProperty()

	@classmethod
	def make_key(self, racecourse_id, race_id):
		race_key = ndb.Key("Racecourse", int(racecourse_id), "Race", int(race_id))
		return race_key

	@classmethod
	def get_by_key(self, racecourse_id, race_id):
		return self.make_key(racecourse_id, race_id).get()


class Racecourse(Base):
	name = ndb.StringProperty()

	@classmethod
	def make_key(self, racecourse_id):
		racecourse_key = ndb.Key("Racecourse", int(racecourse_id))
		return racecourse_key

	@classmethod
	def get_by_key(self, racecourse_id):
		return self.make_key(racecourse_id).get()
import prestans.types

class Base(prestans.types.Model):
    id = prestans.types.String(required=False)

class Horse(Base):
    name = prestans.types.String(required=True)

class Race(Base):
    name = prestans.types.String(required=True)

class Racecourse(Base):
    name = prestans.types.String(required=True)
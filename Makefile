COMPILER = /usr/local/closure/bin/compiler-latest.jar

CLOSURE = closure-library
CLOSUREBUILDER=$(CLOSURE)/closure/bin/build/closurebuilder.py
DEPSWRITER=$(CLOSURE)/closure/bin/build/depswriter.py

PRIDE = pride

GSS_COMPILER = /usr/local/closure/bin/closure-stylesheets-latest.jar
JAVA=/Library/Java/JavaVirtualMachines/jdk1.8.0_51.jdk/Contents/Home/bin/java
GSS_PROPERTY_EXCEPTION = --allowed-unrecognized-property text-size-adjust --allowed-unrecognized-property tap-highlight-color --allowed-unrecognized-property user-select --allowed-unrecognized-property appearance --allowed-unrecognized-property user-drag --allowed-unrecognized-property -moz-user-drag
PROJ_NAME = lc

COMPILATION_LEVEL = ADVANCED
WARNING_LEVEL = VERBOSE

deps:
	@echo "Generating Closure dependencies using depswriter..."
	cd client/; python $(DEPSWRITER) --root_with_prefix="prestans ../../../prestans" --root_with_prefix="$(PROJ_NAME) ../../../$(PROJ_NAME)" > $(PROJ_NAME)-deps.js

clean:
	[ -d alembic ] && rm alembic/versions/*
	[ -d build ] && rm -rf build
	rm -f client/$(PROJ_NAME)-deps.js
	@echo "all clear! start re-buidling :)"

stubs:
	$(PRIDE) gen --template closure.model -m app/$(PROJ_NAME)/rest/models.py -n $(PROJ_NAME).data.model -fn $(PROJ_NAME).data.filter -o client/$(PROJ_NAME)/data/model
	$(PRIDE) gen --template closure.filter -m app/$(PROJ_NAME)/rest/models.py -n $(PROJ_NAME).data.filter -o client/$(PROJ_NAME)/data/filter

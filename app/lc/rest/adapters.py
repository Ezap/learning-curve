import prestans
import lc.models
import lc.rest.models


# Register the persistent model to adapt to the Band rest model, also
# ensure that Album is registered for the children models to adapt
prestans.ext.data.adapters.registry.register_adapter(
    prestans.ext.data.adapters.ndb.ModelAdapter(
        rest_model_class=lc.rest.models.Racecourse,
        persistent_model_class=lc.models.Racecourse
    )
)

prestans.ext.data.adapters.registry.register_adapter(
    prestans.ext.data.adapters.ndb.ModelAdapter(
        rest_model_class=lc.rest.models.Race,
        persistent_model_class=lc.models.Race
    )
)

prestans.ext.data.adapters.registry.register_adapter(
    prestans.ext.data.adapters.ndb.ModelAdapter(
        rest_model_class=lc.rest.models.Horse,
        persistent_model_class=lc.models.Horse
    )
)
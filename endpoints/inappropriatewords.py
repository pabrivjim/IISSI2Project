from silence.decorators import endpoint

###############################################################################

@endpoint(
    route="/inappropriatewords",
    method="GET",
    sql="SELECT word FROM inappropriatewords"
)

def get_all():
    pass

###############################################################################
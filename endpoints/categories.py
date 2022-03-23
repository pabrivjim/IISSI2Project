from silence.decorators import endpoint

###############################################################################

@endpoint(
    route="/categories",
    method="GET",
    sql="SELECT * FROM categories"
)

def get_all():
    pass

###############################################################################

@endpoint(
    route="/categories/$category",
    method="GET",
    sql="SELECT * FROM categories C where C.name = $category"
)

def get_ByName():
    pass

###############################################################################

@endpoint(
    route="/categories",
    method="POST",
    sql="INSERT INTO Categories (name) VALUES ($name)",
    description="Creates a new categorie",
    auth_required=True,
)
def create(name):
    pass

###############################################################################
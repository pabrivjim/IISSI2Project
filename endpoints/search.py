from silence.decorators import endpoint


@endpoint(
    route="/all/photos/$query",
    method="GET",
    sql="SELECT * FROM photos P WHERE (P.title LIKE $query)"
)

def get_all_photos():
    pass

###############################################################################
@endpoint(
    route="/all/users/$query",
    method="GET",
    sql="SELECT * FROM users U WHERE (U.firstName LIKE $query OR U.lastName LIKE $query OR U.username LIKE $query)"
)

def get_all_users():
    pass

###############################################################################
@endpoint(
    route="/all/categories/$query",
    method="GET",
    sql="SELECT C.name, P.* FROM categories C, photoscategories PC, photos P WHERE(PC.categoryId = C.categoryId and C.name = $query AND P.photoId = PC.photoId)"
)

def get_all_categories():
    pass

###############################################################################
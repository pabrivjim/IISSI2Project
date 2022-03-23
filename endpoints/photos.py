from silence.decorators import endpoint

###############################################################################

@endpoint(
    route="/photos",
    method="GET",
    sql="SELECT * FROM Photos"
)

def get_all():
    pass
###############################################################################

@endpoint(
    route="/photos/recent",
    method="GET",
    sql="SELECT * FROM photos P WHERE P.visibility = 'Public' ORDER BY P.date desc"
)

def get_all_publics():
    pass

###############################################################################

@endpoint(
    route="/photos/$photoId",
    method="GET",
    sql="SELECT * FROM Photos WHERE photoId = $photoId"
)

def get_by_id():
    pass

###############################################################################NO LE PASAMOS DATE PARA QUE PILLE EL CURRENT DE SQL

@endpoint(
    route="/photos",
    method="POST",
    sql="INSERT INTO Photos (title, description, url, visibility, userId) VALUES ($title, $description, $url, $visibility, $userId)",
    description="Creates a new photo",
    auth_required=True,
)
def create(title, description, url, visibility, userId):
    pass

###############################################################################

@endpoint(
    route="/photos/$photoId",
    method="PUT",
    sql="UPDATE Photos SET title = $title, description = $description, url = $url, visibility = $visibility WHERE photoId = $photoId",
    description="Updates an existing photo",
    auth_required=True,
)
def update(title, description, url, visibility):
    pass

###############################################################################

@endpoint(
    route="/photos/$photoId",
    method="DELETE",
    sql="DELETE FROM Photos WHERE photoId = $photoId",
    description="Removes a photo",
    auth_required=True,
)
def delete():
    pass

###############################################################################

@endpoint(
    route="/photos/$photoId/rating",
    method="GET",
    sql="SELECT AVG(R.value) as rating, P.* FROM ratings R, photos P WHERE R.photoId = $photoId and P.photoId = $photoId;"
)

def get_by_id_rating():
    pass

###############################################################################
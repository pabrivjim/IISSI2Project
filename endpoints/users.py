from silence.decorators import endpoint


@endpoint(
    route="/users",
    method="GET",
    sql="SELECT * FROM Users"
)

def get_all():
    pass

###############################################################################

@endpoint(
    route="/users/$userId",
    method="GET",
    sql="SELECT * FROM Users WHERE userId = $userId"
)
def get_by_id():
    pass

###############################################################################

@endpoint(
    route="/users/$userId/myPhotos",
    method="GET",
    sql="SELECT * FROM Photos WHERE userId = $userId",
    auth_required=True,
)
def get_myPhotos_by_id():
    pass

###############################################################################

@endpoint(
    route="/users/$userId/photos",
    method="GET",
    sql="SELECT * FROM Photos WHERE userId = $userId and visibility = 'Public'"
)
def get_photos_by_id():
    pass

###############################################################################

@endpoint(
    route="/users/put/$userId",
    method="PUT",
    sql="UPDATE users SET firstName = $firstName, lastName = $lastName, telephone = $telephone, email = $email, username = $username, avatarUrl = $avatarUrl WHERE userId = $userId",
    description="Updates your profile",
    auth_required=True,
)
def update(firstName, lastName, telephone, email, username, avatarUrl):
    pass

###############################################################################
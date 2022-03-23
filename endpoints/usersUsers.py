from silence.decorators import endpoint


@endpoint(
    route="/usersusers",
    method="GET",
    sql="SELECT * FROM UsersUsers"
)

def get_all():
    pass

###############################################################################

@endpoint(
    route="/usersusers/$userId/user",
    method="GET",
    # sql="SELECT (Select COUNT(*) FROM usersusers WHERE userSource = $userId) AS Following, (Select COUNT(*) FROM usersusers WHERE userTarget = $userId) AS Followers FROM usersusers;"
    # sql= "SELECT * FROM (SELECT U.avatarUrl as userTargetAvatar, U.userId AS userIdTarget, U.username AS userNameTarget FROM (SELECT * from usersusers UU, users U WHERE (UU.userSource = $userId) AND U.userId = UU.userTarget) U) Q1, (select * from usersusers UU, users U WHERE (UU.userSource = $userId or UU.userTarget = $userId) AND (U.userId = $userId)) Q2;"
    # Este endpoint es bastante lioso, basicamente lo que hago es obtener la gente a la que sigue el usuario Y
    # La gente que le sigue a este. Pueda parecer que hay información duplicada pero realmente no es así del todo
    # Basicamente todas las columnas del userId (firstName, username etc son todas iguales)
    # Luego tenemos otra que es userTargetAvatar que devuelve la foto del target, es decir, 

    # Hay que revisar el endpoint tiene información irrelevante y duplicada
    #sql= "SELECT * FROM (SELECT U.avatarUrl as userTargetAvatar, U.userId AS userIdTarget, U.username AS userNameTarget FROM (SELECT * from usersusers UU, users U WHERE (UU.userSource = $userId) AND U.userId = UU.userTarget) U) Q1, (select * from usersusers UU, users U WHERE (UU.userSource = $userId or UU.userTarget = $userId) AND (U.userId = $userId)) Q2;"
    sql = "SELECT UU.userSource, UU.userTarget, U.username, U.userId, U.avatarUrl, P.photoId, P.url  FROM usersusers UU, photos P, users U WHERE UU.userSource = $userId AND UU.userTarget = P.userId AND U.userId = P.userId AND P.visibility = 'Public'"
)
def get_by_id_user():
    pass

###############################################################################

@endpoint(
    route="/usersusers/$userId/follows",
    method="GET",
    # sql="SELECT (Select COUNT(*) FROM usersusers WHERE userSource = $userId) AS Following, (Select COUNT(*) FROM usersusers WHERE userTarget = $userId) AS Followers FROM usersusers;"
    sql= "SELECT (Select COUNT(*) FROM usersusers WHERE userSource = $userId) AS Following, (Select COUNT(*) FROM usersusers WHERE userTarget = $userId) AS Followers, U.* FROM usersusers, users U WHERE U.userId = $userId;"
)
def get_by_id_follows():
    pass

###############################################################################

@endpoint(
    route="/usersusers/$userId/userFollow",
    method="GET",
    sql= """SELECT * FROM usersusers UU, users U WHERE (UU.userSource = $userId) AND (U.userId = UU.userTarget) 
    UNION select * from usersusers UU, users U WHERE (UU.userSource = $userId) AND (U.userId = $userId);"""
)
def get_by_id_userFollow():
    pass

###############################################################################

@endpoint(
    route="/usersusers/$userSource/$userTarget",
    method="DELETE",
    sql="DELETE FROM usersusers WHERE (userSource = $userSource and userTarget = $userTarget)",
    description="Removes a following",
    auth_required=True,
)
def delete():
    pass

###############################################################################

@endpoint(
    route="/usersusers",
    method="POST",
    sql="INSERT INTO usersusers (userSource, userTarget) VALUES ($userSource, $userTarget)",
    description="Creates a new photo",
    auth_required=True,
)
def create(userSource, userTarget):
    pass

###############################################################################
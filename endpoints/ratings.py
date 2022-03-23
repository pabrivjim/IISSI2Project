from silence.decorators import endpoint

############################################################################### hacemos as USER simplemente por comidad ya que UserID lo uso como el user logado

@endpoint(
    route="/ratings/$photoId/",
    method="GET",
    sql="SELECT U.userId as user FROM ratings R NATURAL JOIN users U WHERE R.photoId = $photoId"
)

def get_by_photoId():
    pass

############################################################################### hacemos as USER simplemente por comidad ya que UserID lo uso como el user logado

@endpoint(
    route="/ratings/$photoId/$userId",
    method="GET",
    sql="SELECT * FROM ratings R WHERE R.photoId = $photoId AND R.userId = $userId"
)

def get_by_photoId():
    pass

############################################################################### NO LE PASAMOS DATE PARA QUE PILLE EL CURRENT DE SQL
  
@endpoint(
    route="/ratings",
    method="POST",
    sql="INSERT INTO ratings (value, userId, photoId) VALUES ($value, $userId, $photoId)",
    description="Creates a new Rating",
    auth_required = False,
)
def create(value, photoId, userId):
    pass

###############################################################################
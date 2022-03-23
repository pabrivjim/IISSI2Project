from silence.decorators import endpoint

###############################################################################

@endpoint(
    route="/trendings/followedUsers",
    method="GET",
    sql="SELECT COUNT(*) AS C, U.* FROM usersusers UU NATURAL JOIN users U WHERE U.userId = UU.userTarget GROUP BY UU.userTarget ORDER BY C DESC LIMIT 5"
)

def get_followedUsers():
    pass


###############################################################################

@endpoint(
    route="/trendings/bestRatings",
    method="GET",
    sql="SELECT U.firstName, U.lastName, U.username,P.*, SUM(R.value)/COUNT(*) AS C FROM ratings R, photos P, users U WHERE (P.photoId = R.photoId AND P.userId = U.userId AND P.date >= DATE_SUB(CURRENT_TIMESTAMP (), INTERVAL 7 DAY) AND P.visibility = 'Public' )  GROUP BY R.photoId ORDER BY C DESC limit 5"
)

def get_bestRatingsPhotos():
    pass


###############################################################################

@endpoint(
    route="/trendings/mostComments",
    method="GET",
    sql="SELECT U.username, P.*, COUNT(*) AS C FROM comments C, photos P, users U WHERE (P.photoId = C.photoId AND U.userId = P.userId AND P.date >= DATE_SUB(CURRENT_TIMESTAMP (), INTERVAL 7 DAY)) GROUP by C.photoId LIMIT 5"
)

def get_mostComments():
    pass


###############################################################################

@endpoint(
    route="/trendings/averageRatingUser",
    method="GET",
    sql="SELECT U.*, SUM(R.value)/COUNT(*) AS C FROM ratings R, photos P, users U WHERE (P.photoId = R.photoId AND P.userId = U.userId) GROUP BY U.userId order BY C DESC LIMIT 5;"
)

def get_bestAverageUsers():
    pass


###############################################################################

@endpoint(
    route="/trendings/mostUsedCategory",
    method="GET",
    sql="SELECT COUNT(*) AS C, P.*, PC.photoCategoryId, C.name FROM photos P, photoscategories PC, categories C WHERE (PC.categoryId = C.categoryId AND P.photoId = PC.photoId) GROUP BY PC.categoryId ORDER BY C DESC LIMIT 5"
)

def get_mostCategoryUsed():
    pass


###############################################################################
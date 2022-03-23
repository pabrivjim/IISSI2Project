from silence.decorators import endpoint

###############################################################################

@endpoint(
    route="/photos/$photo/comments",
    method="GET",
    sql="""SELECT * FROM comments C NATURAL JOIN users U WHERE C.photoId = $photo ORDER BY(
            SELECT IFNULL(sum(UC.VALUE),0)
                AS c FROM userscomments UC WHERE UC.commentId = C.commentId) desc;"""
)

def get_byId():
    pass

############################################################################### NO LE PASAMOS DATE PARA QUE PILLE EL CURRENT DE SQL
  
@endpoint(
    route="/comments",
    method="POST",
    sql="INSERT INTO Comments (text, photoId, userId) VALUES ($text, $photoId, $userId)",
    description="Creates a new Comment",
    auth_required = True,
)
def create(text, date, photoId, userId):
    pass

###############################################################################

@endpoint(
    route="/comments/$commentId",
    method="DELETE",
    sql="DELETE FROM Comments WHERE commentId = $commentId",
    description="Removes a Comment",
    auth_required = True,
)
def delete():
    pass
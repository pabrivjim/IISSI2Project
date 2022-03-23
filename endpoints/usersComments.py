from silence.decorators import endpoint

############################################################################### REQUISITO A+

@endpoint(
    route="/userscomments/$commentId/",
    method="GET",
    sql="SELECT sum(UC.VALUE) AS c FROM userscomments UC WHERE UC.commentId = $commentId"
)

def get_all():
    pass

###############################################################################  

@endpoint(
    route="/userscomments",
    method="POST",
    sql="INSERT INTO userscomments (userId, commentId, value) VALUES ($userId, $commentId, $value)",
    description="Creates a new Comment",
    auth_required = False,
)
def create(userId, commentId, value):
    pass

###############################################################################

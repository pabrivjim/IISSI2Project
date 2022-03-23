from silence.decorators import endpoint
###############################################################################

@endpoint(
    route="/photosCategories",
    method="POST",
    sql="INSERT INTO photosCategories (categoryId, photoId) VALUES ($categoryId, $photoId)",
    description="Creates a new entry in photoscategories (asociar foto)",
    auth_required=True,
)
def create(categoryId, photoId):
    pass

###############################################################################

@endpoint(
    route="/photosCategories/$photoId",
    method="GET",
    sql="SELECT C.categoryId, C.name FROM categories C, photoscategories PC WHERE C.categoryId = PC.categoryId AND PC.photoId = $photoId"
)

def get_by_id():
    pass

###############################################################################

@endpoint(
    route="/photosCategories/$photoId/$categoryId",
    method="DELETE",
    sql="DELETE FROM photoscategories WHERE (photoId = $photoId AND categoryId = $categoryId)",
    description="Removes a photo",
    auth_required=True,
)
def delete():
    pass

###############################################################################
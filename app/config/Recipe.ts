const Recipe = {
    endpoints: {
        getAllRecipesByUserId: (userId: number) => `/api/get-all-recipes-by-user-id/${userId}`,
        getAllRecipesByOtherUser: (userId: number) => `/api/get-all-recipes-by-other-user/${userId}`,
        getRecipeById: (recipeId: number) => `/api/recipe/${recipeId}`,
        deleteRecipe: (recipeId: number) => `/api/recipe/${recipeId}`,
        editRecipe: (recipeId: number) => `/api/recipe/edit/${recipeId}`,
        createRecipe: '/api/recipe/create'
    }
}


export default Recipe
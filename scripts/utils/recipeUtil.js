export function getIngredientList(recipes) {
    let arrayIngredients = [];
    recipes.forEach((recipe) => {
        recipe.ingredients.forEach((ingredientKey) => {
            arrayIngredients.push(ingredientKey.ingredient.toLowerCase());
        });
    });
    return arrayIngredients;
}
export function getApplianceList(recipes) {
    let arrayAppliances = [];
    recipes.forEach((recipe) => {
        arrayAppliances.push(recipe.appliance);
    });
    return arrayAppliances;
}

export function getUstensileList(recipes) {
    let arrayUstensils = [];
    recipes.forEach((recipe) => {
        recipe.ustensils.forEach((ustensilKey) => {
            arrayUstensils.push(ustensilKey.replace(/[^a-z]/gi, ""));
        });
    });
    return arrayUstensils;
}

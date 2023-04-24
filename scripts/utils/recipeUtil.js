export function getIngredientList(recipes) {
    const targetTags = document.querySelectorAll(".tag.target.ingredients");
    let arrayIngredients = [];
    recipes.forEach((recipe) => {
        recipe.ingredients.forEach((ingredientKey) => {
            if (targetTags) {
                if (
                    !Array.from(targetTags).find((tag) => {
                        return tag.textContent
                            .toLowerCase()
                            .includes(ingredientKey.ingredient.toLowerCase());
                    })
                )
                    arrayIngredients.push(
                        ingredientKey.ingredient.toLowerCase()
                    );
            } else {
                arrayIngredients.push(ingredientKey.ingredient.toLowerCase());
            }
        });
    });
    return arrayIngredients;
}
export function getApplianceList(recipes) {
    const targetTags = document.querySelectorAll(".tag.target.appliances");
    let arrayAppliances = [];
    recipes.forEach((recipe) => {
        if (
            !Array.from(targetTags).find((tag) => {
                return tag.textContent
                    .toLowerCase()
                    .includes(recipe.appliance.toLowerCase());
            })
        )
            arrayAppliances.push(recipe.appliance);
    });
    return arrayAppliances;
}

export function getUstensileList(recipes) {
    const targetTags = document.querySelectorAll(".tag.target.ustensiles");
    let arrayUstensils = [];
    recipes.forEach((recipe) => {
        recipe.ustensils.forEach((ustensilKey) => {
            if (
                !Array.from(targetTags).find((tag) => {
                    return tag.textContent
                        .toLowerCase()
                        .includes(ustensilKey.toLowerCase());
                })
            )
                arrayUstensils.push(ustensilKey.replace(/[(]\d[)]/gi, ""));
        });
    });
    return arrayUstensils;
}

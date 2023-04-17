import { recipes } from "../data/recipes.js";

export function mainSearch(searchInput) {
    let searchArray = [];
    recipes.forEach((recipe) => {
        if (
            recipe.name.toLowerCase().includes(searchInput) ||
            recipe.ingredients.find((ingredients) => {
                return ingredients.ingredient
                    .toLowerCase()
                    .includes(searchInput);
            }) ||
            recipe.description.toLowerCase().includes(searchInput)
        )
            searchArray.push(recipe);
    });

    return searchArray;
}

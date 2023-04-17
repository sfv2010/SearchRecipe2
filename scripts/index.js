import { recipes } from "./data/recipes.js";
import { recipesFactory } from "./factories/recipesFactory.js";
import { searchInMainBar } from "./utils/searchInMainBar.js";
import { openCloseList } from "./utils/openCloseList.js";
import { displayTag } from "./utils/displayTag.js";
import { searchByInputKeyword } from "./utils/searchByInputKeyword.js";

//Function to capitalize first letter
function capitalize(array) {
    for (let i = 0; i < array.length; i++) {
        array[i] = array[i].charAt(0).toUpperCase() + array[i].slice(1);
    }
}
//display recipes cards
export function displayMainData(recipes) {
    const main = document.querySelector("main");
    recipes.forEach((recipe) => {
        const recipeInfo = recipesFactory(recipe);
        const recipeCardDOM = recipeInfo.getRecipeCardDOM();
        main.appendChild(recipeCardDOM);
    });
}
//Loop through the recipes array and create a list for each
//list Ingredient
export function displayIngredientData(recipes) {
    const listTags = document.querySelectorAll(".tag.target.ingredients");
    const ulIngredient = document.querySelector(".ulIngredient");
    let arrayIngredients = [];
    recipes.forEach((recipe) => {
        recipe.ingredients.forEach((ingredientKey) => {
            if (
                !Array.from(listTags).find((tag) => {
                    return tag.textContent
                        .toLowerCase()
                        .includes(ingredientKey.ingredient.toLowerCase());
                })
            )
                arrayIngredients.push(ingredientKey.ingredient.toLowerCase());
        });
    });
    capitalize(arrayIngredients);
    let sortIngredients = [...new Set(arrayIngredients)].sort();
    ulIngredient.textContent = "";
    sortIngredients.forEach((ingredient) => {
        const listRecipe = document.createElement("li");
        listRecipe.classList.add("listRecipe");
        listRecipe.classList.add("ingredients");
        listRecipe.textContent = ingredient;
        listRecipe.tabIndex = "0";
        ulIngredient.appendChild(listRecipe);
    });
    displayTag(recipes, "ingredients");
}
//list Appliance
export function displayApplianceData(recipes) {
    const listTags = document.querySelectorAll(".tag.target.appliances");
    const ulAppliance = document.querySelector(".ulAppliance");
    let arrayAppliances = [];
    recipes.forEach((recipe) => {
        if (
            !Array.from(listTags).find((tag) => {
                return tag.textContent
                    .toLowerCase()
                    .includes(recipe.appliance.toLowerCase());
            })
        )
            arrayAppliances.push(recipe.appliance);
    });
    console.log(listTags);
    let sortAppliances = [...new Set(arrayAppliances)].sort();
    ulAppliance.textContent = "";
    sortAppliances.forEach((appliance) => {
        const listRecipe = document.createElement("li");
        listRecipe.classList.add("listRecipe");
        listRecipe.classList.add("appliances");
        listRecipe.textContent = appliance;
        listRecipe.tabIndex = "0";
        ulAppliance.appendChild(listRecipe);
    });
    displayTag(recipes, "appliances");
}
export function displayUstensileData(recipes) {
    const listTags = document.querySelectorAll(".tag.target.ustensiles");
    const ulUstensile = document.querySelector(".ulUstensile");
    let arrayUstensils = [];
    console.log(listTags);

    recipes.forEach((recipe) => {
        recipe.ustensils.forEach((ustensil) => {
            if (
                !Array.from(listTags).find((tag) => {
                    return tag.textContent
                        .toLowerCase()
                        .includes(ustensil.toLowerCase());
                })
            )
                arrayUstensils.push(ustensil.replace(/[(]\d[)]/gi, ""));
        });
    });
    //list Ustensile
    capitalize(arrayUstensils);
    let sortUstensiles = [...new Set(arrayUstensils)].sort();
    ulUstensile.textContent = "";
    sortUstensiles.forEach((ustensile) => {
        const listRecipe = document.createElement("li");
        listRecipe.classList.add("listRecipe");
        listRecipe.classList.add("ustensiles");
        listRecipe.textContent = ustensile;
        listRecipe.tabIndex = "0";
        ulUstensile.appendChild(listRecipe);
    });
    displayTag(recipes, "ustensiles");
}

//Function to get and display recipe data
displayMainData(recipes);
displayIngredientData(recipes);
displayApplianceData(recipes);
displayUstensileData(recipes);
searchByInputKeyword();
searchInMainBar(recipes);
openCloseList();

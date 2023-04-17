import { recipes } from "./data/recipes.js";
import { recipesFactory } from "./factories/recipesFactory.js";
import { keywordSearchFactory } from "./factories/keywordSearchFactory.js";
import {
    getIngredientList,
    getApplianceList,
    getUstensileList,
} from "./utils/recipeUtil.js";
import { mainSearch } from "./utils/mainSearch.js";
import { tagSearch } from "./utils/tagSearch.js";
function displayMainData(recipes) {
    const main = document.querySelector("main");
    const noFound = document.createElement("div");
    if (recipes.length === 0) {
        noFound.textContent =
            " Aucune recette ne correspond à votre critère… vous pouvez chercher  « tarte aux pommes », « poisson », etc.";
        noFound.classList.add("noFound");
        main.appendChild(noFound);
    } else {
        noFound.textContent = "";
        recipes.forEach((recipe) => {
            const recipeInfo = recipesFactory(recipe);
            const recipeCardDOM = recipeInfo.getRecipeCardDOM();
            main.appendChild(recipeCardDOM);
        });
    }
}

const input = document.querySelector("#search");
input.addEventListener("search", function (e) {
    const searchInput = e.target.value.toLowerCase();
    const main = document.querySelector("main");
    const searchContainer = document.querySelector(".searchContainer");
    main.textContent = "";
    searchContainer.textContent = "";
    if (searchInput.length >= 3) {
        displayMainData(mainSearch(searchInput));
        displayKeywordSearch(mainSearch(searchInput));
    } else {
        displayMainData(recipes);
        displayKeywordSearch(recipes);
    }
});
let keywordIngredient;
let keywordAppliance;
let keywordUstensile;
function displayKeywordSearch(recipes) {
    const searchContainer = document.querySelector(".searchContainer");
    // keywordSearchFactory工場で作った機能をfactoryKeywordSearch変数へ代入
    const factoryKeywordSearch = keywordSearchFactory();

    //-----------Ingredient-----------
    //変数から工場でreturnしたcreateを呼び、青色ボタンを製造するための情報を引数で渡す。
    keywordIngredient = factoryKeywordSearch.create(
        "Ingredient",
        "ingredients",
        "Ingredients",
        getIngredientList(recipes)
    );
    //createでreturnしたgetDOMを呼び、青色ボタンのDOMを製造。
    const keywordIngredientDOM = keywordIngredient.getDOM();
    searchContainer.appendChild(keywordIngredientDOM);

    //ボタンを押したというdropDownOpen通知を受け取る。（keywordIngredientDOM＝searchByKeyword：大元のdiv）
    keywordIngredientDOM.addEventListener("dropDownOpen", () => {
        keywordAppliance.closeDropDown();
        keywordUstensile.closeDropDown();
    });

    //-----------Appliance-----------
    keywordAppliance = factoryKeywordSearch.create(
        "Appliance",
        "appliances",
        "Appareils",
        getApplianceList(recipes)
    );
    const keywordApplianceDOM = keywordAppliance.getDOM();
    searchContainer.appendChild(keywordApplianceDOM);
    keywordApplianceDOM.addEventListener("dropDownOpen", () => {
        keywordIngredient.closeDropDown();
        keywordUstensile.closeDropDown();
    });
    //-----------Ustensile-----------
    keywordUstensile = factoryKeywordSearch.create(
        "Ustensile",
        "ustensiles",
        "Ustensiles",
        getUstensileList(recipes)
    );
    const keywordUstensileDOM = keywordUstensile.getDOM();
    searchContainer.appendChild(keywordUstensileDOM);
    keywordUstensileDOM.addEventListener("dropDownOpen", () => {
        keywordIngredient.closeDropDown();
        keywordAppliance.closeDropDown();
    });
}
displayMainData(recipes);
displayKeywordSearch(recipes);

const searchDiv = document.querySelectorAll(".searchByKeyword");

//リストを押したというselectList通知を受け取る
searchDiv.forEach((ulListItem) => {
    ulListItem.addEventListener("selectList", (e) => {
        const searchByTag = e.detail.textContent;
        console.log(searchByTag);
        if (e.detail.classList.value === "listRecipe ingredients") {
            createTag("ingredients", searchByTag);
        } else if (e.detail.classList.value === "listRecipe appliances") {
            createTag("appliances", searchByTag);
        } else if (e.detail.classList.value === "listRecipe ustensiles") {
            createTag("ustensiles", searchByTag);
        }
        const getTargetTags = [];
        const targets = document.querySelectorAll(".target");
        targets.forEach((target) => {
            getTargetTags.push(target.textContent.toLowerCase());
        });
        console.log(getTargetTags);
        const main = document.querySelector("main");
        //const searchContainer = document.querySelector(".searchContainer");
        //searchContainer.textContent = "";
        main.textContent = "";
        displayMainData(tagSearch(getTargetTags));
        keywordIngredient.updateRecipe(
            getIngredientList(tagSearch(getTargetTags))
        );
        const tags = document.querySelectorAll(".tag");
        tags.forEach((tag) => {
            tag.addEventListener("click", closeTag);
            tag.addEventListener("keydown", (e) => {
                if (e.key === "Escape" || e.key === "Enter") {
                    closeTag(e);
                }
            });
        });
    });

    //Create tag
    function createTag(className, searchByTag) {
        const tagsContainer = document.querySelector(".tagsContainer");
        const tagRecipe = document.createElement("span");
        tagRecipe.classList.add("tag");
        tagRecipe.textContent = searchByTag;
        tagRecipe.tabIndex = "0";
        tagRecipe.classList.add("target");
        tagRecipe.classList.add(className);
        tagsContainer.appendChild(tagRecipe);
        return tagRecipe;
    }
    //Close tag
    function closeTag(e) {
        e.target.remove();
    }
});

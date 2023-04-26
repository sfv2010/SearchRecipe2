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
//mainのレシピデータ情報を表示する関数
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
//もしすでにタグインプットに入力されている文字があれば空にする関数
function emptyInput() {
    const inputByTags = document.querySelectorAll(".searchBox");
    if (inputByTags) {
        inputByTags.forEach((inputTag) => {
            inputTag.value = "";
        });
    }
}

//mainインプットバーによるサーチ機能結果を画面に表示する関数
const input = document.querySelector("#search");
input.addEventListener("keyup", function (e) {
    const searchInput = e.target.value.toLowerCase();
    const main = document.querySelector("main");
    main.textContent = "";

    //mainのインプットに文字を入力する時、すでにタグインプットに文字が入力されていたら削除する。
    emptyInput();

    //もしsearchinputに入力した文字が3文字以上の場合はmainSearchの結果を、それ以外はrecipeのデータを渡す
    const searchResults =
        searchInput.length >= 3 ? mainSearch(searchInput) : recipes;
    //mainのレシピデータ表示
    displayMainData(searchResults);

    ////----
    // const searchContainer = document.querySelector(".searchContainer");
    // searchContainer.textContent = "";
    // displayKeywordSearch(searchResults);
    ////------------------------------------------------------------------

    //オプション検索リストの表示
    ////-----------------
    const searchOptionsLists = [
        { keyword: keywordIngredient, getList: getIngredientList },
        { keyword: keywordAppliance, getList: getApplianceList },
        { keyword: keywordUstensile, getList: getUstensileList },
    ];
    for (const option of searchOptionsLists) {
        const list = option.getList(searchResults);
        option.keyword.updateRecipe(list);
    }
    ////------------------------------------------------------------------
});

//オプション検索リスト
let keywordIngredient;
let keywordAppliance;
let keywordUstensile;
//オプション検索リストを表示する関数
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
    //console.log(keywordIngredient);
    //createでreturnしたgetDOMを呼び、青色ボタンのDOMを製造。
    const keywordIngredientDOM = keywordIngredient.getDOM();
    searchContainer.appendChild(keywordIngredientDOM);

    //ボタンを押したというdropDownOpen通知を受け取る。（keywordIngredientDOM＝<div className="searchByKeyword"></div>：大元のdiv）
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
//初期画面表示
displayMainData(recipes);
displayKeywordSearch(recipes);

//レシピのフィルタリングを行う関数
function filterRecipesByTags() {
    //リストの中からアイテムを選択すると同じアイテム名のタグが生成され、targetというクラス名が追加されるので、それを探してgetTargetTags配列に追加する。
    const getTargetTags = [];
    const targets = document.querySelectorAll(".target");
    targets.forEach((target) => {
        getTargetTags.push(target.textContent.toLowerCase());
    });
    const filterReciesBygetTag = tagSearch(getTargetTags);
    //mainの表示レシピを一旦からにする。
    const main = document.querySelector("main");
    main.textContent = "";
    displayMainData(filterReciesBygetTag);

    keywordIngredient.updateRecipe(getIngredientList(filterReciesBygetTag));
    keywordAppliance.updateRecipe(getApplianceList(filterReciesBygetTag));
    keywordUstensile.updateRecipe(getUstensileList(filterReciesBygetTag));
}
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

    tagRecipe.addEventListener("click", closeTag);
    tagRecipe.addEventListener("keydown", (e) => {
        if (e.key === "Escape" || e.key === "Enter") {
            closeTag(e);
        }
    });
}
//Close tag
function closeTag(e) {
    e.target.remove();
    filterRecipesByTags();
}

//リストを押したというselectList通知を受け取ってタグを生成し、表示画面を切り替える
const searchDivs = document.querySelectorAll(".searchByKeyword");
searchDivs.forEach((searchDiv) => {
    searchDiv.addEventListener("selectList", (e) => {
        const searchByTag = e.detail.textContent;
        if (e.detail.classList.value === "listRecipe ingredients") {
            createTag("ingredients", searchByTag);
        } else if (e.detail.classList.value === "listRecipe appliances") {
            createTag("appliances", searchByTag);
        } else if (e.detail.classList.value === "listRecipe ustensiles") {
            createTag("ustensiles", searchByTag);
        }
        emptyInput();
        filterRecipesByTags();
    });
});

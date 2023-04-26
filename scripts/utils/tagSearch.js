import { recipes } from "../data/recipes.js";
import { mainSearch } from "./mainSearch.js";

// 1つのタグに合致するレシピデータを探して返す関数
function findRecipesByTag(tag, recipes) {
    //引数として受け取ったrecipesをフィルターしてrecipe.ingredientsの中のitem.ingredientとtagに一致したものを新しい配列として返す。
    const result = recipes.filter((recipe) => {
        return (
            recipe.ingredients.find((item) => {
                return item.ingredient
                    .toLowerCase()
                    .includes(tag.toLowerCase());
            }) ||
            recipe.appliance.toLowerCase().includes(tag) ||
            recipe.ustensils.find((ustensil) => {
                return ustensil.toLowerCase().includes(tag);
            })
        );
    });
    return result;
    // }
}

//  選択したタグをすべて持つレシピデータを返す関数
export function tagSearch(searchTags) {
    const input = document.querySelector("#search");
    // 初期値はすべてのレシピデータだが、もしmainインプット検索に値が入っており、それに基づいた検索結果がすでに表示されていれば、そのレシピを初期値にする。
    const recipesToSearch = input.value ? mainSearch(input.value) : recipes;
    let resultRecipes = recipesToSearch;
    searchTags.forEach((tag) => {
        // 結果をresultRecipesに入れる
        resultRecipes = findRecipesByTag(tag, resultRecipes);
    });
    return resultRecipes;
    // }
}

// export function tagSearch(searchTags) {
//     const input = document.querySelector("#search");
//     const recipesToSearch = input.value ? mainSearch(input.value) : recipes;

//     const resultRecipes = searchTags.reduce((result, tag) => {
//       return findRecipesByTag(tag, result);
//     }, recipesToSearch);

//     return resultRecipes;
//   }

// export function tagSearch(tagArray) {
//     let itemArray = [];
//     tagArray.forEach((tag) => {
//         const searchResult = recipes.filter((recipe) => {
//             //console.log(recipe);
//             let result;
//             if (itemArray.length > 0) {
//                 console.log("itemArray1", itemArray);
//                 itemArray.forEach((item) => {
//                     result = item.ingredients.find((item) => {
//                         return item.ingredient
//                             .toLowerCase()
//                             .includes(tag.toLowerCase());
//                     });
//                 });
//                 itemArray.push(recipe);
//             } else {
//                 result = recipe.ingredients.find((item) => {
//                     return item.ingredient
//                         .toLowerCase()
//                         .includes(tag.toLowerCase());
//                 });
//                 itemArray.push(recipe);
//             }

//             return !!result;
//         });
//         console.log(" itemArray2", itemArray);
//         console.log("searchResult", searchResult);
//         itemArray = searchResult;
//     });
//     console.log("itemArray3", itemArray);

//     return itemArray;
// }

// もっと短く書くときは以下
// return recipes.filter((recipe) => recipe.ingredients.find((item) => item.ingredient.toLowerCase().includes(tag.toLowerCase())))

// let itemArray = [];

// recipes.forEach((tag, recipe) => {
//     if (
//         recipe.ingredients.find((ingredients) => {
//             return ingredients.ingredient.toLowerCase().includes(tag);
//             // return Array.from(ingredients.ingredient.toLowerCase()).some(
//             //     (item) =>
//             //         tagArray.every((tagArray) => item.includes(tagArray))
//             // );
//         }) ||
//         recipe.appliance.toLowerCase().includes(tag) ||
//         recipe.ustensils.find((ustensil) => {
//             return ustensil.toLowerCase().includes(tag);
//         })
//     )
//         itemArray.push(recipe);
//     return itemArray;
// });

// export function tagSearch(searchTags) {
//     /*
//      * resultRecipes >> 検索対象のレシピデータの配列
//      * @type {Array}
//      */
//     let resultRecipes = recipes; // 初期値はすべてのレシピデータ

//     searchTags.forEach((tag) => {
//         // 結果をresultRecipesに入れる
//         resultRecipes = findRecipesByTag(tag, resultRecipes);
//     });

//     return resultRecipes;
// }

// if (
//     !Array.from(tagArray).find((tag) => {
//         return tag.textContent
//             .toLowerCase()
//             .includes(ingredients.ingredient.toLowerCase());
//     })
// )
//-----------------
// tagArray.forEach((tag) => {
//     const searchResult = recipes.filter((recipe) => {
//         //console.log(recipe);
//         let result;
//         if (itemArray.length > 0) {
//             console.log("0", itemArray);
//             itemArray.forEach((item) => {
//                 result = item.ingredients.find((item) => {
//                     return item.ingredient
//                         .toLowerCase()
//                         .includes(tag.toLowerCase());
//                 });
//             });
//         } else {
//             result = recipe.ingredients.find((item) => {
//                 return item.ingredient
//                     .toLowerCase()
//                     .includes(tag.toLowerCase());
//             });
//         }

//         return !!result;
//     });
//     console.log("1", itemArray);
//     console.log("2", searchResult);
//     console.log("tag", tagArray);
//     itemArray = searchResult;
// });
// console.log("3", itemArray);

// tagArray.forEach((tag) => {
//     const searchResult = recipes.filter((recipe) => {
//         //console.log(recipe);
//         let result;
//         if (itemArray.length > 0) {
//             console.log("0", itemArray);
//             itemArray.forEach((item) => {
//                 result = item.ingredients.find((item) => {
//                     return item.ingredient
//                         .toLowerCase()
//                         .includes(tag.toLowerCase());
//                 });
//             });
//         } else {
//             result = recipe.ingredients.find((item) => {
//                 return item.ingredient
//                     .toLowerCase()
//                     .includes(tag.toLowerCase());
//             });
//         }

//         return result;
//     });
//     console.log("1", itemArray);
//     console.log("2", searchResult);
//     itemArray = searchResult;
// });
// console.log("3", itemArray);

///--------------------------------
// recipes.forEach((recipe) => {
//     if (itemArray.length > 0) {
//         itemArray.forEach((item) => {
//             //console.log("item", item.ingredients);
//             item.ingredients.find((items) => {
//                 // console.log("items", items.ingredient);
//                 return items.ingredient
//                     .toLowerCase()
//                     .includes(tag.toLowerCase());
//             });
//         });
//         itemArray.push(recipe);
//     } else {
//         recipe.ingredients.find((ingredients) => {
//             return ingredients.ingredient
//                 .toLowerCase()
//                 .includes(tag.toLowerCase());
//             // return Array.from(ingredients.ingredient.toLowerCase()).some(
//             //     (item) =>
//             //         tagArray.every((tagArray) => item.includes(tagArray))
//             // );
//         }) ||
//             recipe.appliance.toLowerCase().includes(tag.toLowerCase()) ||
//             recipe.ustensils.find((ustensil) => {
//                 return ustensil.toLowerCase().includes(tag.toLowerCase());
//             });
//         itemArray.push(recipe);
//     }

//     console.log(itemArray.length);
// });

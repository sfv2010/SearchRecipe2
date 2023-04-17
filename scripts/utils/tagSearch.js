import { recipes } from "../data/recipes.js";
export function tagSearch(tagArray) {
    let itemArray = [];

    tagArray.forEach((tag) => {
        const searchResult = recipes.filter((recipe) => {
            //console.log(recipe);
            let result;
            if (itemArray.length > 0) {
                console.log("0", itemArray);
                itemArray.forEach((item) => {
                    result = item.ingredients.find((item) => {
                        return item.ingredient
                            .toLowerCase()
                            .includes(tag.toLowerCase());
                    });
                });
            } else {
                result = recipe.ingredients.find((item) => {
                    return item.ingredient
                        .toLowerCase()
                        .includes(tag.toLowerCase());
                });
            }

            return !!result;
        });
        console.log("1", itemArray);
        console.log("2", searchResult);
        itemArray = searchResult;
    });
    console.log("3", itemArray);
    // recipes.forEach((recipe) => {
    //     if (
    //         recipe.ingredients.find((ingredients) => {
    //             return ingredients.ingredient.toLowerCase().includes(tagArray);
    //             // return Array.from(ingredients.ingredient.toLowerCase()).some(
    //             //     (item) =>
    //             //         tagArray.every((tagArray) => item.includes(tagArray))
    //             // );
    //         }) ||
    //         recipe.appliance.toLowerCase().includes(tagArray) ||
    //         recipe.ustensils.find((ustensil) => {
    //             return ustensil.toLowerCase().includes(tagArray);
    //         })
    //     )
    //         itemArray.push(recipe);
    // });
    return itemArray;
}
// if (
//     !Array.from(tagArray).find((tag) => {
//         return tag.textContent
//             .toLowerCase()
//             .includes(ingredients.ingredient.toLowerCase());
//     })
// )

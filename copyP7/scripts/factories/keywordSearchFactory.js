//import { mainSearch } from "../utils/mainSearch.js";
//keywordSearchFactory工場は製造する機能だけを提供する。
export function keywordSearchFactory() {
    //ボタン共通部分の製造
    function create(name, className, buttonName, dataList) {
        //DOMを作って持っておくので、工場の中で使うことができる。呼ばれたら渡せるようにする。
        const listCardDOM = getListCardDOM();
        setOpenCloseList(listCardDOM);
        //DOMの製造
        function getListCardDOM() {
            const searchByKeyword = document.createElement("div");
            searchByKeyword.classList.add("searchByKeyword");

            const button = document.createElement("button");
            button.classList.add(className);
            button.classList.add(`button${name}`);
            button.textContent = buttonName;

            const dropDown = document.createElement("div");
            dropDown.classList.add("dropDown");
            dropDown.id = `dropDown${name}`;

            const input = document.createElement("input");
            input.classList.add("searchBox");
            input.classList.add(className);
            input.id = `input${name}`;
            input.type = "search";
            input.placeholder = `Rechercher un ${name}`;
            input.ariaLabel = `search with ${name}`;

            const img = document.createElement("img");
            img.src = "assets/upChevron.svg";
            img.alt = "fermeture de list";
            img.classList.add("imgUp");
            img.id = `imgUp${name}`;
            img.tabIndex = "0";

            const ulList = getDataList(name, className, dataList);

            searchByKeyword.appendChild(button);
            searchByKeyword.appendChild(dropDown);
            dropDown.appendChild(input);
            dropDown.appendChild(img);
            dropDown.appendChild(ulList);

            return searchByKeyword;
        }

        function openList() {
            const button = listCardDOM.querySelector(`.button${name}`);
            const dropDown = listCardDOM.querySelector(`#dropDown${name}`);
            //CustomEventで子供から親（window）へ”dropDownOpen”したよと通知を飛ばせるようにする
            const dropDownOpenEvent = new CustomEvent("dropDownOpen");
            button.style.display = "none";
            dropDown.style.display = "block";
            //dispatchEventでボタンを押して開いたらdropDownOpenEvent通知を飛ばせるように発生させる
            listCardDOM.dispatchEvent(dropDownOpenEvent);
        }
        function closeList() {
            const button = listCardDOM.querySelector(`.button${name}`);
            const dropDown = listCardDOM.querySelector(`#dropDown${name}`);
            button.style.display = "block";
            dropDown.style.display = "none";
        }
        function setOpenCloseList() {
            const button = listCardDOM.querySelector(`.button${name}`);
            const imgUp = listCardDOM.querySelector(`#imgUp${name}`);
            if (button) {
                button.addEventListener("click", () => openList());
            }
            if (imgUp) {
                imgUp.addEventListener("click", () => closeList());
                imgUp.addEventListener("keydown", (e) => {
                    if (e.key === "Escape" || e.key === "Enter") {
                        closeList(e);
                    }
                });
            }
        }
        //各ボタンを押すと表示されるリストを作成
        function capitalize(array) {
            for (let i = 0; i < array.length; i++) {
                array[i] = array[i].charAt(0).toUpperCase() + array[i].slice(1);
            }
        }
        function getDataList(name, className, dataList) {
            const ulList = document.createElement("ul");
            ulList.classList.add("dropDownUl");
            ulList.classList.add(className);
            ulList.classList.add(`ul${name}`);
            let sortDatalist = [...new Set(dataList)].sort();
            capitalize(sortDatalist);
            sortDatalist.forEach((data) => {
                const listRecipe = document.createElement("li");
                listRecipe.classList.add("listRecipe");
                listRecipe.classList.add(className);
                listRecipe.textContent = data;
                listRecipe.tabIndex = "0";
                ulList.appendChild(listRecipe);
            });
            return ulList;
        }
        //リスト一覧からアイテムを選択
        function selectList(e) {
            const targetListItem = e.target;
            const selectListEvent = new CustomEvent("selectList", {
                detail: targetListItem,
            });
            listCardDOM.dispatchEvent(selectListEvent);
        }
        const lists = listCardDOM.querySelectorAll(`.listRecipe.${className}`);
        lists.forEach((list) => {
            list.addEventListener("click", selectList);
            list.addEventListener("keydown", (e) => {
                if (e.key === "Enter") {
                    selectList(e);
                }
            });
        });

        //各ボタンのinput入力から検索
        const listName = {
            input: listCardDOM.querySelector(`#input${name}`),
            object: listCardDOM.querySelectorAll(`.listRecipe.${className}`),
        };
        function findInput(e, lists) {
            const searchInput = e.target.value;
            lists.object.forEach((list) => {
                if (
                    list.textContent
                        .toLowerCase()
                        .includes(searchInput.toLowerCase())
                ) {
                    list.classList.remove("hidden");
                } else {
                    list.classList.add("hidden");
                }
            });
        }
        listName.input.addEventListener("keyup", function (e) {
            findInput(e, listName);
        });

        // 工場ですでに作ってあるlistCardDOMを渡すためにreturnする。
        function getDOM() {
            return listCardDOM;
        }

        function updateRecipe(newRecipeList) {
            const ulList = document.querySelector(".dropDownUl");
            ulList.textContent = "";
            let sortDatalist = [...new Set(newRecipeList)].sort();
            capitalize(sortDatalist);
            sortDatalist.forEach((data) => {
                const listRecipe = document.createElement("li");
                listRecipe.classList.add("listRecipe");
                listRecipe.classList.add(className);
                listRecipe.textContent = data;
                listRecipe.tabIndex = "0";
                ulList.appendChild(listRecipe);
            });
            const lists = listCardDOM.querySelectorAll(
                `.listRecipe.${className}`
            );
            lists.forEach((list) => {
                console.log(list.textContent);
                list.addEventListener("click", selectList);
                list.addEventListener("keydown", (e) => {
                    if (e.key === "Enter") {
                        selectList(e);
                    }
                });
            });
        }
        //createのreturn
        return { getDOM, closeDropDown: closeList, updateRecipe };
    }
    return { create };
}

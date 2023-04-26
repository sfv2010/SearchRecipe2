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
            input.type = "text";
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

        function openDropDown() {
            const button = listCardDOM.querySelector(`.button${name}`);
            const dropDown = listCardDOM.querySelector(`#dropDown${name}`);
            //CustomEventで子供から親（window）へ”dropDownOpen”したよと通知を飛ばせるようにする
            const dropDownOpenEvent = new CustomEvent("dropDownOpen");
            button.style.display = "none";
            dropDown.style.display = "block";
            //dispatchEventでボタンを押して開いたらdropDownOpenEvent通知を飛ばせるように発生させる
            listCardDOM.dispatchEvent(dropDownOpenEvent);
        }
        function closeDropDown() {
            const button = listCardDOM.querySelector(`.button${name}`);
            const dropDown = listCardDOM.querySelector(`#dropDown${name}`);
            button.style.display = "block";
            dropDown.style.display = "none";
        }
        //ボタンの開け閉めを管理する関数
        //8行目でlistCardDOMという変数にDOM要素が代入されているので、それを引数として渡している。
        //関数内では、引数として受け取ったDOM要素を利用して、イベントリスナーを設定するために使用。
        function setOpenCloseList() {
            const button = listCardDOM.querySelector(`.button${name}`);
            const imgUp = listCardDOM.querySelector(`#imgUp${name}`);
            if (button) {
                button.addEventListener("click", () => openDropDown());
            }
            if (imgUp) {
                imgUp.addEventListener("click", () => closeDropDown());
                imgUp.addEventListener("keydown", (e) => {
                    if (e.key === "Escape" || e.key === "Enter") {
                        closeDropDown(e);
                    }
                });
            }
        }
        //最初の文字を大文字にする関数
        function capitalize(array) {
            for (let i = 0; i < array.length; i++) {
                array[i] = array[i].charAt(0).toUpperCase() + array[i].slice(1);
            }
        }

        //リストのそれぞれのアイテムを作成する関数
        function createListElement(className, textContent) {
            const listElement = document.createElement("li");
            listElement.classList.add("listRecipe");
            listElement.classList.add(className);
            listElement.textContent = textContent;
            listElement.tabIndex = "0";
            return listElement;
        }
        //各ボタンを押すと表示されるリストを作成する関数
        function getDataList(name, className, dataList) {
            const ulList = document.createElement("ul");
            ulList.classList.add("dropDownUl");
            ulList.classList.add(className);
            ulList.classList.add(`ul${name}`);
            let sortedDataList = [...new Set(dataList)].sort();
            capitalize(sortedDataList);
            sortedDataList.forEach((data) => {
                const listElement = createListElement(className, data);
                ulList.appendChild(listElement);
            });
            return ulList;
        }
        //表示されるリストアイテムを更新する関数
        function updateRecipe(newRecipeList) {
            const ulList = listCardDOM.querySelector(".dropDownUl");
            ulList.textContent = "";
            let sortedDataList = [...new Set(newRecipeList)].sort();
            capitalize(sortedDataList);
            sortedDataList.forEach((data) => {
                const listElement = createListElement(className, data);
                ulList.appendChild(listElement);
            });
            const lists = listCardDOM.querySelectorAll(
                `.listRecipe.${className}`
            );

            lists.forEach((list) => {
                list.addEventListener("click", selectList);
                list.addEventListener("keydown", (e) => {
                    if (e.key === "Enter") {
                        selectList(e);
                    }
                });
            });
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

        //各タグリストのinput入力から検索
        const inputTag = listCardDOM.querySelector(`#input${name}`);
        function findInput(e, lists) {
            const searchInput = e.target.value;
            lists.forEach((list) => {
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
        inputTag.addEventListener("keyup", function (e) {
            findInput(
                e,
                listCardDOM.querySelectorAll(`.listRecipe.${className}`)
            );
        });
        //<MEMO>objectとしてキーで取り出すと初期ページの時のみ作動するが、検索した後は再度使えない。
        // const listName = {
        // input:listCardDOM.querySelector(`#input${name}`);
        //     object: listCardDOM.querySelectorAll(`.listRecipe.${className}`),イベントの外で定義してるので初期値は変わらない
        // };
        // listName.input.addEventListener("keyup", function (e) {
        //     findInput(e, listName.object);
        //     // findInput(
        //     //     e,
        //     //     listCardDOM.querySelectorAll(`.listRecipe.${className}`)
        //     // );
        //     console.log(listName.object);
        // });
        //この書き方では、ListIngredientsには!!!当初に取得された要素で、後に追加された要素に更新されない!!!
        //そのため、findInput()が後に追加された要素に対しては機能しない.
        //よって、イベントの中でイベントが呼ばれるたびに定義しないといけない。

        // 工場ですでに作ってあるlistCardDOMを渡すためにreturnする。
        function getDOM() {
            return listCardDOM;
        }

        //createのreturn
        return { getDOM, closeDropDown, updateRecipe };
    }
    return { create };
}

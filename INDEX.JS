class ShoppingItem {
    static lastId = 1;
    constructor(itemName, itemDescription = '') {
        this._itemId = ShoppingItem.lastId++;
        this._itemName = itemName;
        this._itemDescription = itemDescription;
        this._isDeleted = false;
        this._isCompleted = false;
    }
    get itemId() {
        return this._itemId;
    }
    set itemName(itemName) {
        this._itemName = itemName;
    }
    get itemName() {
        return this._itemName;
    }
    set itemDescription(description) {
        this._itemDescription = description;
    }
    set isDeleted(value) {
        this._isDeleted = value;
    }
    set isCompleted(value) {
        this._isCompleted = value;
    }
    get isCompleted() {
        return this._isCompleted;
    }
    get isDeleted() {
        return this._isDeleted;
    }
}

const shoppingList = [];
const table_body = document.querySelector("#table-list tbody");
const checkbox = document.getElementById('hide_unhide_checkbox');
const label = document.getElementById('hide_unhide_label');

function renderItem(item) {
    const row = document.createElement("tr");
    row.classList.add("row-element");

    const itemNameElement = document.createElement("td");
    itemNameElement.textContent = item.itemName;

    const deleteButtonEle = document.createElement("td");
    deleteButtonEle.classList.add("button_parent");
    const deleteButton = document.createElement("button");
    deleteButton.dataset.id = item.itemId;
    deleteButton.classList.add("delete-btn");
    deleteButton.innerHTML = '<i class="fa fa-trash-o"></i>';

    deleteButtonEle.appendChild(deleteButton);
    row.appendChild(itemNameElement);
    row.appendChild(deleteButtonEle);

    if (item.isCompleted) {
        itemNameElement.classList.add("marked-class");
    }

    itemNameElement.addEventListener("click", function() {
        toggleCompletion(item, itemNameElement);
    });

    table_body.appendChild(row);
}

function render() {
    table_body.innerHTML = "";
    shoppingList.forEach(item => {
        const renderCondition = checkbox.checked ? !item.isDeleted && !item.isCompleted : !item.isDeleted;
        if (renderCondition) {
            renderItem(item);
        }
    });
}

function count() {
    const mc = shoppingList.filter(item => item.isCompleted && !item.isDeleted).length;
    const umc = shoppingList.filter(item => !item.isCompleted && !item.isDeleted).length;

    const markedSection = document.getElementById('info-1');
    const unmarkedSection = document.getElementById('info-2');

    markedSection.querySelector('p').textContent = mc;
    unmarkedSection.querySelector('p').textContent = umc;
}

function toggleCompletion(item, element) {
    item.isCompleted = !item.isCompleted;
    element.classList.toggle("marked-class");
    render();
    count();
}

function handleDelete(event) {
    const id = parseInt(event.target.dataset.id);
    const index = shoppingList.findIndex(item => item.itemId === id);
    if (index !== -1) {
        shoppingList[index].isDeleted = true;
        render();
        count();
    }
}

document.querySelector("#table-list tbody").addEventListener("click", function(event) {
    if (event.target.classList.contains("delete-btn")) {
        handleDelete(event);
    }
});

document.getElementById("add-item-input").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addItem();
    }
});

function addItem() {
    let addItemInput = document.getElementById("add-item-input");
    if (addItemInput.value === "") {
        alert("Please give proper input");
        return;
    }
    const index = shoppingList.findIndex(item => item.itemName === addItemInput.value);
    if (index !== -1) {
        alert("Please give another name");
        return;
    }
    const newItem = new ShoppingItem(addItemInput.value);
    shoppingList.unshift(newItem);
    addItemInput.value = "";
    render();
    count();
}

function hideItems() {
    label.textContent = checkbox.checked ? "Unhide the Marked Items" : "Hide the Marked Items";
    render();
    count();
}

checkbox.addEventListener('click', hideItems);

render();
count();

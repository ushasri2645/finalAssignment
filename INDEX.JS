class ShoppingItem{
    static lastId=1;
    constructor(itemName,itemDescription=''){
        this._itemId = ShoppingItem.lastId++;
        this._itemName = itemName;
        this._itemDescription = itemDescription;
        this._isDeleted = false;
        this._isCompleted = false;
    }
    get itemId(){
        return this._itemId;
    }
    set itemName(itemName){
        this._itemName = itemName;
    }
    get itemName(){
        return this._itemName;
    }
    set itemDescription(description){
        this._itemDescription = description;
    }
    set isDeleted(value){
        this._isDeleted = value;
    }
    set isCompleted(value){
        this._isCompleted = value;
    }
    get isCompleted(){
        return this._isCompleted;
    }
    get isDeleted(){
        return this._isDeleted;
    }

}
const shoppingList = [];
var table_body=document.querySelector("#table-list tbody")
var checkbox = document.getElementById('hide_unhide_checkbox');
var label = document.getElementById('hide_unhide_label');

function renderitem(item){
    console.log("renderitem")
    const row=document.createElement("tr");
    row.classList.add("row-element");
    
    const itemNameElement=document.createElement("td")
    itemNameElement.textContent = item.itemName;

    const deleteButtonEle = document.createElement("td");
    deleteButtonEle.classList.add("button_parent");
    const deleteButton = document.createElement("button");
    deleteButton.dataset.id = item.itemId;
    deleteButton.classList.add("delete-btn");
    deleteButton.innerHTML = '<i class="fa fa-trash-o"></i>';
    
    deleteButtonEle.appendChild(deleteButton);
    row.appendChild(itemNameElement);
    row.appendChild(deleteButtonEle)

    if (item.isCompleted) {
        itemNameElement.classList.add("marked-class");
    }

    itemNameElement.addEventListener("click", function() {
        toggleCompletion(item, itemNameElement);
    });
    table_body.appendChild(row);
}
 
function renderhide(){
    
    table_body.innerHTML = "";
    shoppingList.forEach(item=>{
        if(!item.isDeleted && !item.isCompleted){
            renderitem(item);
        }
    })
}

function render(){
    table_body.innerHTML = "";
    shoppingList.forEach(item=>{
        if(!item.isDeleted){
            renderitem(item);
        }
    })
}

function markedProductStatus(product){
    return product.isCompleted && !product.isDeleted; 
}
function unMarkedProductionStatus(product){
    return !product.isCompleted && !product.isDeleted;
}
function count(){
    const mc = shoppingList.filter(markedProductStatus).length;
    const umc = shoppingList.filter(unMarkedProductionStatus).length;

    const markedSection = document.getElementById('info-1');
    markedSection.innerHTML="";
    const unmarkedSection = document.getElementById('info-2');
    unmarkedSection.innerHTML="";
    
    const mHead = document.createElement('h3');
    const mPara = document.createElement('p');
    mHead.textContent = "Marked Items Count";
    mPara.textContent = mc;

    markedSection.appendChild(mHead);
    markedSection.appendChild(mPara);
    
    const unmHead = document.createElement('h3');
    const unmPara = document.createElement('p');
    unmHead.textContent = "UnMarked Items Count";
    unmPara.textContent =umc;

    unmarkedSection.appendChild(unmHead);
    unmarkedSection.appendChild(unmPara);
    
}


function conditioanlrendering(){
    if(!checkbox.checked){
        render();
        count();
    }
    else{
        renderhide();
        count();
    }
}
function toggleCompletion(item, element) {
    item.isCompleted = !item.isCompleted;
    element.classList.toggle("marked-class");
    conditioanlrendering();
    
}
function handleDelete(event) {
    const id = parseInt(event.target.dataset.id);
    const index = shoppingList.findIndex(item => item.itemId === id);
    if (index !== -1) {
        shoppingList[index].isDeleted=true;
        conditioanlrendering();
    }
 }

document.querySelector("#table-list tbody").addEventListener("click", function(event) {
    if(event.target.classList.contains("delete-btn")) {
      handleDelete(event);
    }
 });
document.getElementById("add-item-input").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        Additem();
    }
});
 function Additem(){
    let additeminput=document.getElementById("add-item-input");
    if(additeminput.value===""){
        alert("Please give proper input");
        return;
    }
    const index = shoppingList.findIndex(item => item.itemName === additeminput.value);
    if(index!==-1){
        alert("Please give another name");
        return;
    }
    const newItem = new ShoppingItem(additeminput.value);
    shoppingList.unshift(newItem);
    additeminput.value="";
    conditioanlrendering();
        
 }

// function hide(){
//     if(statusele.innerHTML === "Hide the Marked Items"){
//         statusele.innerHTML = "Unhide the Marked Items";
//         renderhide();
//         count();
//     }
//     else{
//         statusele.innerHTML = "Hide the Marked Items";
//         render();
//         count();
//     }
    
// }

function hide1() {
    
    if (checkbox.checked) {
        label.textContent = "Unhide the Marked Items";
        renderhide();
    } else {
        label.textContent = "Hide the Marked Items";
        render();
    }
    count();
}
 
render();
count();

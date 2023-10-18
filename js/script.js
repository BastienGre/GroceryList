var listElements = document.getElementById("list-element");
var closeButtons = document.getElementById("close");

if(listElements != null){
  listElements.addEventListener("click", (e) => checkItem(e));
}

if(closeButtons != null){
  closeButtons.addEventListener("click", (e) => close(e));
}

function addItem(){
  var newItem = document.createElement("div");
  var inputValue = document.getElementById("newItemName").value;

  if(inputValue != ''){
    var itemName = document.createTextNode(inputValue);
    var storeSelected = document.getElementById("store").value;
    var storeName = document.createTextNode(storeSelected);
    newItem.className = "list-element-container";
    var newSubItem = document.createElement("div");
    newSubItem.className = "list-element";
    newSubItem.id = "list-element";
    newSubItem.addEventListener("click", (e) => checkItem(e));

    var newItemName = document.createElement("span");
    newItemName.className = "item";
    newItemName.appendChild(itemName);
    newSubItem.appendChild(newItemName);
    var newStoreName = document.createElement("span");
    newStoreName.className = "store";
    newStoreName.appendChild(storeName);
    newSubItem.appendChild(newStoreName);
    newItem.appendChild(newSubItem);
    var newRemover = document.createElement("i");
    newRemover.className="close fa-solid fa-trash";
    newRemover.id="close";
    newRemover.addEventListener("click", (e) => close(e));
    newItem.appendChild(newRemover);

    var alreadyExistingStore = false;
    var storesListed = document.getElementsByClassName("store");
    if(storesListed != null){
      for(let i=0; i<storesListed.length; i++){  
        if(storesListed[i].innerHTML === storeName.textContent){
          console.log(storesListed[i] + storesListed[i].innerHTML);
          document.getElementById("list").insertBefore(newItem, storesListed[i].parentElement.parentElement);
          alreadyExistingStore = true
          return;
        }
      }
    } 

    if(!alreadyExistingStore){
      document.getElementById("list").appendChild(newItem);
    }
  }
  else{

  }
}

function checkItem(e){
  console.log("check");
  if (e.target.parentElement.className === 'list-element') {
    e.target.parentElement.classList.toggle('checked');
    e.target.parentElement.parentElement.classList.toggle('checked');
    var tgtParentChildren = e.target.parentElement.parentElement.childNodes;
    tgtParentChildren.forEach(item => {
      var clist = item.classList;
      if(clist != null){
        clist.forEach(classFromList => {
          if(classFromList === 'close'){
            item.classList.toggle('visible');
          }
        });
      }
    });
  }
}

function close(item){
  item.target.parentElement.remove();
}

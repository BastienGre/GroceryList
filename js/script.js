/* def stores */
const stores = ["No Preference", "Aldi", "Lidl", "Safeway", "Walmart", "Whole Foods"];
createStoreOptionSelect();

/* color indexer */
const colorRange = 4;
var colorIndex = 1;
var existingSublists = document.getElementsByClassName("sublist");
var tempIndexer = colorIndex;
if(existingSublists != 0){
  for(var i=0; i<existingSublists.length; i++){
    tempIndexer++;
    if(tempIndexer > colorRange){
      tempIndexer = 1;
    }
  }
  colorIndex = tempIndexer;
  console.log(colorIndex);
}

/* init lists */
for(var i=0; i<stores.length; i++){
  if(document.getElementsByName(stores[i])[0] != 0){
    updateStoreList(stores[i]);
  }
}

/* add listeners */
var listItems = document.getElementsByClassName("item");
var closeButtons = document.getElementsByClassName("close");
if(listItems != null){
  for(var i=0; i<listItems.length; i++){
    listItems[i].addEventListener("click", (e) => checkItem(e));
  }
}

if(closeButtons != null){
  for(var i=0; i<closeButtons.length; i++){
    closeButtons[i].addEventListener("click", (e) => close(e));
  }
}

function createStoreOptionSelect(){
  var selectRoot = document.getElementById("store");

  for(var i=0; i<stores.length; i++){
    var newStore = document.createElement("option");
    newStore.value = stores[i];
    newStore.appendChild(document.createTextNode(stores[i]));

    selectRoot.appendChild(newStore);
  }
}

function addItem(){
  var newItemValue = document.getElementById("newItemName").value;

  if(newItemValue != ''){

    /*  Create the new Item */
    var newListElement = document.createElement("li");
    var newItem = document.createElement("span");
    var newCloseIcon = document.createElement("i");

    newItem.className = "item";
    newItem.appendChild(document.createTextNode(newItemValue));
    newCloseIcon.className = "close fa-solid fa-trash";
    newCloseIcon.id = "close";
    newListElement.appendChild(newItem);
    newListElement.appendChild(newCloseIcon);

    /*  Check if the store is already listed  */
    var mainList = document.getElementById("list");
    var storeSelected = document.getElementById("store");
    var storeAlreadyListed = false;

    var allSublists = document.getElementsByClassName("sublist");

    if(allSublists != null){
      for(var i=0; i<allSublists.length; i++){
        if(allSublists[i].getAttribute("name") == storeSelected.value){
          var sublistChildren = allSublists[i].childNodes;

          if(sublistChildren != null){
            sublistChildren.forEach(child => {
              if(child.nodeName == "UL"){
                child.appendChild(newListElement);
                storeAlreadyListed = true;
              }
            });
          }
        }
      }
    }

    /* If not, add a new sublist  */
    if(!storeAlreadyListed){
      var newSublist = document.createElement("div");
      
      newSublist.className = "sublist color-0"+colorIndex;
      updateColorIndexer();
      newSublist.setAttribute("name", storeSelected.value);

      var newSublistHeader = document.createElement("header");
      newSublistHeader.className = "sublist-header";
      newSublistHeader.id = "sublist-header";
      var newStoreSpan = document.createElement("span");
      newStoreSpan.className = "sublist-store";
      newStoreSpan.appendChild(document.createTextNode(storeSelected.value));
      var newCompletionSpan = document.createElement("span");
      newCompletionSpan.className = "completion";
      newCompletionSpan.appendChild(document.createTextNode("tmp"));

      newSublistHeader.appendChild(newStoreSpan);
      newSublistHeader.appendChild(newCompletionSpan);
      newSublist.appendChild(newSublistHeader);

      var newUL = document.createElement("ul");
      newUL.appendChild(newListElement);
      newSublist.appendChild(newUL);
      mainList.appendChild(newSublist);
    }

    /* add listeners */
    newItem.addEventListener("click", (e) => checkItem(e));
    newCloseIcon.addEventListener("click", (e) => close(e));

    /* update completion list */
    updateStoreList(storeSelected.value);
  }
}

function checkItem(item){
  var tgtParentChildren = item.target.parentElement.childNodes;
  item.target.parentElement.classList.toggle('checked');
  tgtParentChildren.forEach(c => {
    var clist = c.classList;
    if(clist != null){
      clist.forEach(classFromList => {
        if(classFromList === 'close'){
          // Add delete button
          c.classList.toggle('visible');
        }else if(classFromList === 'item'){
          // Mark item as checked
          c.classList.toggle('checked');
          //updateList(item);
          updateStoreList(item.target.parentElement.parentElement.parentElement.getAttribute("name"));
        }
      });
    }
  });
}

function close(item){
  var storeName = item.target.parentElement.parentElement.parentElement.getAttribute('name');
  item.target.parentElement.remove();
  updateStoreList(storeName);
}

function updateColorIndexer(){
  if(colorIndex < colorRange){
    colorIndex++;
  }else{
    colorIndex = 1;
  }
}

function updateStoreList(storeName){
  var storeRoot = document.getElementsByName(storeName)[0];
  
  if(storeRoot != null){
    var sublistHeader = null;
    var sublistUL = null;

    var liCount = 0;
    var liChecked = 0;
    
    if(storeRoot.children != 0){
      storeRoot.childNodes.forEach(storeChild => {
        if(storeChild.tagName == 'UL'){
          sublistUL = storeChild;
        }else if(storeChild.tagName == 'HEADER'){
          sublistHeader = storeChild;
        }
      });

      /* Count how many items and how many items checked */
      if(sublistUL != null){
        sublistUL.childNodes.forEach(ulChild => {
          if(ulChild.tagName == 'LI'){
            if(ulChild.children.length != 0){
              var liclist = ulChild.children[0].classList;
              if(liclist != null){
                liclist.forEach(liclassFromList => {
                  if(liclassFromList === 'checked'){
                  liChecked++;
                  }
                });
              }
            }
            liCount++;
          }
        });
      }
    } 

    if(liCount > 0){
      /* Get the 'completion' text and update it */
      if(sublistHeader != null){
        sublistHeader.childNodes.forEach(headerChild => {
          if(headerChild.className == 'completion'){
            headerChild.innerHTML = '';
            headerChild.appendChild(document.createTextNode(liChecked+"/"+liCount));
          }
        });
      }
    }else{
      /* delete sublist if no more items */
      storeRoot.remove();
    }
  }
}
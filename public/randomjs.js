// Function to delete products
function deleteItem(e){
  
    // We isolate the product row by pulling the "currentTarget" of the
    // click event and then working backwards to the parent of its parent,
    // div with a class of "itemRow"
    var selectedRow = e.currentTarget.parentNode.parentNode;
  
    // We then work one level farther back by pulling the parent of the
    // div with a class of "itemRow", section element with id "items-list"
    var itemList = selectedRow.parentNode;
  
    // We then remove the "selectedRow" div element from the item list
    // using "removeChild"
    itemList.removeChild(selectedRow);
  }
  
  
  
  
  

  
  // All necessary code to create a new product as we wish.
  
      function createQuantityInput(){
  
        // First, we define what element we would like to create.
        var inputNode = document.createElement('input');
  
        // Then, we associate the needed class "quantity" with that element
        inputNode.className = "quantity";
  
        // We set an initial value of "0" for quantity, meaning that none of
        // those products are initially in the cart
        inputNode.value = "";
  
        // We return the fully-generated element to be used in "createNewItemRow"
        return inputNode;
      }
  
      function createDeleteButton(){
        
        // First, we define what element we would like to create.
        var div = document.createElement('div');
  
        // Then, we associate the needed class "quantity" with that element
        div.className = "item-delete col-xs-3";
  
        // Next, we create the delete button to be included in this element
        var buttonNode = document.createElement('button');
  
        // We assign a class, inner content, and an "onclick" behavior to the item,
        // referring back to the "deleteItem" function that we defined earlier
        buttonNode.className = "btn btn-delete";
  
        // We fill the button with content
        buttonNode.innerHTML = "Delete Team";
  
        // We assign the "onclick" behavior to the function that we defined earlier,
        // "deleteItem"
        buttonNode.onclick = deleteItem;
  
        // Finally, we connect the delete button to its container.
        div.appendChild(buttonNode);
  
        // We return the fully-generated HTML element to be used in "createNewItemRow"
        return div;
      }
  
      function createQuantityNode(){
  
        // First, we define what element we would like to create.
        var element = document.createElement('div');
  
        // Then, we associate the necessary class.
        element.className = "item-qty col-xs-3";
  
        // Next, we generate the label for the quantity input 
        var label = document.createElement('label');
  
        // We then place content describing this input inside
        label.innerHTML = "Team Name";
  
        // We then use the "createQuantityInput" function defined earlier
        // to generate the input portion of the div element. Notice how
        // we're abstracting specific tasks into other functions.
        var input = createQuantityInput();
  
        // We then attach the generated label and input to the parent element
        element.appendChild(label);
        element.appendChild(input);
  
        // We return the fully-generated HTML element to be used in "createNewItemRow"
        return element;
      }
  
      // Function to create the individual property divs for each item
      function createItemNode(dataType, itemData){
        
        // "itemData" can be the name of the item or it's price,
        // which is defaulted to "$0.00" if not supplied.
        itemData = itemData || "$0.00";
  
        // We then create a div element in which to store the product
        // node
        var element = document.createElement('div');
  
        // For each item node, we will create a span element to contain
        // the respective information about that node
        var span = document.createElement('span');
  
        // Here, we use "createTextNode" to generate content that will be
        // unique to each item.
        var textNode = document.createTextNode(itemData);
        
        // We then add the generated content within the span for each generated
        // item
        span.appendChild(textNode);
  
        // We then append the generated span element to the parent div element
        element.appendChild(span);
  
        // We then dynamically generate the class for each item node based
        // upon its data type.
        element.className = "item-" + dataType + " col-xs-2";
  
        // We return the fully-generated product node to be used in "createNewItemRow"
        return element;
      }
  
      // The function to generate a full item row
      function createNewItemRow(itemName, itemUnitPrice){
        
        // We create the parent div that will contain all the product nodes
        // and assign the class "item row" to it
        var itemRow = document.createElement('div');
        itemRow.className = "item row";
  
        // Here, we use all of the functions that we have defined earlier,
        // each of which handles one subtask for generating a parent product 
        // node. Notice that this makes the function far easier to read since
        // we're abstracting sub-tasks to other functions.
        var quantityNode = createQuantityNode();
        var button = createDeleteButton();
  
        // Finally, we append all the generated product nodes to the itemRow
        itemRow.appendChild(quantityNode);
        itemRow.appendChild(button);
  
        // We return the fully-generated item row
        return itemRow;
      }
  
      // The function to place a newly created product row in its appropriate
      // place.
      function createNewItem(){
  
        // We select the section containing all items generated using the class
        // "items-list"
        var itemsList = document.getElementById('items-list');
  
        // Here, we generate an HTMLCollection that consists of all item rows.
        // We then pull the length of the list.
        var itemRowsLength = itemsList.getElementsByClassName('item').length;
  
        // We dynamically determine the last item row by subtracting one from the
        // total length of items, yielding us the last item row.
        var lastItemRow = itemsList.getElementsByClassName('item')[itemRowsLength-1];
  
        
  
        // // We use "createNewItemRow" to generate a full product row based on
        // // the name and price specified
        // var itemRow = createNewItemRow(itemName, itemUnitPrice);
  
        // Finally, we append the fully generated item row to the last place
        // in the vertical list of items.

        function insertAfter(newNode, referenceNode) {
          referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
      }
var newItemRow2 = createNewItemRow()
      insertAfter(newItemRow2, lastItemRow)
      //   itemsList.insertBefore(itemRow, lastItemRow);
    }
  
  //
  
  // Code initially included to associate buttons with their respective DOM functions
  window.onload = function(){
    // var calculatePriceButton = document.getElementById('calc-prices-button');
    var createItemButton = document.getElementById('new-item-create');
    var deleteButtons = document.getElementsByClassName('btn-delete');
  
    // calculatePriceButton.onclick = getTotalPrice;
    
    // for(var i = 0; i<itemrow.length; i++){
    //   createItemButton[i].onclick = createNewItem
    // }

    createItemButton.onclick = createNewItem
  
    for(var i = 0; i<deleteButtons.length ; i++){
      deleteButtons[i].onclick = deleteItem;
    }
  };

  



  


let bagitemObjects;

onLoad();

function onLoad(){
    loadbagitemObjects();
    displayBagitems();
    displaybagsummary();
}

function displaybagsummary(){
    let bag_summary = document.querySelector('.bag-summary');

    let TotalItem=bagitemObjects.length;
    let totalMRP =0 ;
    let Totaldiscount =0;
    let convienianfees = 99

    bagitemObjects.forEach(bagitem => {
        totalMRP += bagitem.original_price;
        Totaldiscount += (bagitem.original_price) - (bagitem.current_price);
    });
    let finalpayment=0;
    if(TotalItem > 0){
        finalpayment = totalMRP - Totaldiscount + convienianfees;
    }else convienianfees = 0;
    bag_summary.innerHTML = `<div class="bag-details-container">
            <div class="price-header">PRICE DETAILS (${TotalItem} Items) </div>
            <div class="price-item">
              <span class="price-item-tag">Total MRP</span>
              <span class="price-item-value">₹${totalMRP}</span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Discount on MRP</span>
              <span class="price-item-value priceDetail-base-discount">-₹${Totaldiscount}</span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Convenience Fee</span>
              <span class="price-item-value">₹ ${convienianfees}</span>
            </div>
            <hr>
            <div class="price-footer">
              <span class="price-item-tag">Total Amount</span>
              <span class="price-item-value">₹ ${finalpayment}</span>
            </div>
          </div>
          <button class="btn-place-order">
            <div class="css-xjhrni">PLACE ORDER</div>
          </button>`;
}

function loadbagitemObjects(){
    console.log(bag_item);
    bagitemObjects = bag_item.map(itemId => {
        for ( let i=0;i < items.length ; i++){
            if(itemId == items[i].id){
                return items[i];
            }
        }
    });
    console.log(bagitemObjects);
}


function displayBagitems(){
    let containerEle = document.querySelector('.bag-items-container');
    let innerHTMLs = '';
    bagitemObjects.forEach(bagsitem => {
        innerHTMLs += generateitemHTML(bagsitem);
    })
    containerEle.innerHTML = innerHTMLs;
}

function removefrombag(itemId){
    bag_item = bag_item.filter(bagitemid => bagitemid != itemId); 
    localStorage.setItem('bag_item',JSON.stringify(bag_item));
    loadbagitemObjects();
    displayBagitems();
    displayBagitemcount();
    displaybagsummary();
}

function generateitemHTML(item){
    return `<div class="bag-item-container">
                <div class="item-left-part">
                <img class="bag-item-img" src="${item.image}">
                </div>
                <div class="item-right-part">
                <div class="company">${item.company}</div>
                <div class="item-name">${item.item_name}</div>
                <div class="price-container">
                    <span class="current-price">Rs.${item.current_price}</span>
                    <span class="original-price">Rs. ${item.original_price}</span>
                    <span class="discount-percentage">(${item.discount_percentage}% OFF)</span>
                </div>
                <div class="return-period">
                    <span class="return-period-days">${item.return_period}</span> return available
                </div>
                <div class="delivery-details">
                    Delivery by
                    <span class="delivery-details-days">${item.delivery_date}</span>
                </div>
                </div>

                <div class="remove-from-cart" onclick="removefrombag(${item.id});">X</div>
            </div>`;
}
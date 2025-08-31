
let bag_item;

onLoad();

function onLoad(){
    let bagItemstr = localStorage.getItem('bag_item');
    bag_item = bagItemstr ? JSON.parse(bagItemstr) : [];
    displayitems();
    displayBagitemcount();
}

function addtobag(itemID){
    bag_item.push(itemID);
    localStorage.setItem('bag_item',JSON.stringify(bag_item));
    displayBagitemcount();
}

function displayBagitemcount(){
    let bagitemcount = document.querySelector('.bag-item-count');
    if(bag_item.length>0){
        bagitemcount.style.visibility = 'visible';
        bagitemcount.innerText = bag_item.length;
    }
    else bagitemcount.style.visibility = 'hidden';
}

function displayitems(){
    let itemscontainer = document.querySelector('.items-container');
    if(!itemscontainer){
        return;
    }
    let innerHTML = '';
    items.forEach(item =>{
    innerHTML += `<div class="item-container">
                <img class="itemimg" src="${item.image}" alt="Item-image">
                    <div class="rating">
                        ${item.rating.stars}⭐ | ${item.rating.count}k
                    </div>
                        <div class="companyname ">${item.company}</div>
                        <div class="itemname">${item.item_name}</div>
                        <div class="price">
                            <span class="currentprice">Rs.${item.current_price}</span>
                            <span class="originalprice">Rs. ${item.original_price}</span>
                            <span class="discount">(${item.discount_percentage}% OFF)</span>
                        </div>
                <button class="btn-add-bag" onclick="addtobag(${item.id});" >Add to Bag</button>
            </div> `;
});


itemscontainer.innerHTML = innerHTML;
}





var content = document.getElementById("content");
var category = document.getElementById("category");
var form = document.getElementById("form");
var input = document.getElementById("input_field");
var show = document.getElementById("showcart");
var cart = document.getElementById("cart");
var total=document.getElementById('total_price');
var menu_laptop=document.getElementById('menu-laptop');
var itemcount=document.getElementById('itemcount');
// var showpopup=document.getElementById("showpopup");
var container1=document.getElementById("container1");
var presentAlert=document.getElementById("presentAlert");
var empty=document.getElementById("empty");

var products=JSON.parse(localStorage.getItem("products"))||[];
if(products.length<0){
  itemcount.innerHTML='0';
}
else{
  itemcount.innerHTML=products.length;
}
if(localStorage.getItem("products")){
  products.map((item) => {
    addNewItem(item);
  })
}

del();
function del(){
 if(products.length<1){
    empty.innerHTML=`<div class="emptycart">
                     <h2 class="text">Your cart is empty</h2>
                     <i class="fa-solid fa-cart-shopping fa-bounce"></i>
                      </div>`;
  }
  else if(products.length>1){
    empty.innerHTML='';
  }
  
  // else if(products.length>1){
  //   empty.classList.add("dele");
  // }

}


// var products=()=>{
// if(localStorage.getItem('products')){
//   return JSON.parse(localStorage.getItem('products'));
// }
// else{
//    localStorage.setItem("products",JSON.stringify(local));
// }
// }
// console.log(products());

// duplicate elements are filtering method

function isProductInLocalStorage(products) {
  const productsInStorage = JSON.parse(localStorage.getItem("products")) || [];
  return productsInStorage.some((p) => p.pid == products.pid);
}


//add to cart
function addToCart(add) {

  var product_id = add.previousElementSibling.innerHTML;
  var product_item = parseInt(add.nextElementSibling.children[1].value);
  var product_pri =add.previousElementSibling.previousElementSibling.innerHTML;
  var product_price=parseInt((product_pri.match(/\d+/g).map(Number)).join(''));
  var product_name = add.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML;
  var product_image=add.parentElement.parentElement.firstElementChild.src;
  var product_total_price=parseInt(product_item*product_price);
  console.log("product_id"+product_id+typeof(product_id));
  console.log("product_item"+product_item+typeof(product_item));
  console.log("product_price"+product_price+typeof(product_price));
  console.log("product_name"+product_name+typeof(product_name));
  console.log("product_image"+product_image+typeof(product_image));
  console.log("product_total_price"+product_total_price+typeof(product_total_price));
  // debugger;
  const obj = {
    pid: product_id,
    pname: product_name,
    pimage:product_image,
    pprice:product_price,
    pitem:product_item,
    ppricetotal:product_total_price
  }
 if(!isProductInLocalStorage(obj)){
  console.log(obj);
  products.push(obj);
  saveLocal(obj);
  addNewItem(obj);
  showAlert(`Added in cart`,'success');
 }
 else{
  showAlert("Alredy added in cart !",'warning');
 }

}

// saving in localStorage

function saveLocal(products) {
  localStorage.setItem("products", JSON.stringify(products));
}
fetch("index.json")
  .then((response) => response.json())
  .then((data) => {
    temp = data;
    displayAll();
  });

//serching products with search input 

form.addEventListener("submit", (e) => {
  e.preventDefault();
  var input_value = input.value;
  searchDisplay(input_value);
});

//Choosing category with select and using to onchange

category.addEventListener("change", function(){
  var val = this.value;
  if (val == "all") {
    displayAll();
  } else {
    display(val);
  }
});

//Displaing function for all products when page loaded.

function displayAll() {
  clearItems();
  temp.forEach((item) => {
    content.innerHTML += `<div class="col-6 col-md-4 col-lg-3 " data-aos="fade-up"
            data-aos-anchor-placement="top-bottom" data-aos-duration="1000" data-aos-easing="linear">
        <div class="card" >
          <img src="${item.image}" class="card-img-top" alt="...">
          <div class="card-body d-flex d-md-flex d-lg-block flex-column align-items-center justify-content-center">
            <p class="card-title fw-bold name">${item.name}</p>
            <p class="card-text price">Rs.${item.price}</p>
            <p class="card-text id d-none">${item.id}</p>
            <a class="btn btn-add btn-primary addtocart align-center" onclick="addToCart(this)">Add to cart</a>
            <div class="itemstyle float-end d-flex mt-2 mt-lg-0">
              <button class="btn btn-danger minus fw-bold fs-4 d-flex justify-content-center align-items-center " onclick="minus(this)">-</button>
              <input type="number" id="qtyInput"  max="10" value="1" class="input-text bg-white" disabled />
              <button class="btn btn-success add fw-bold fs-4 d-flex justify-content-center align-items-center" onclick="add(this)">+</button>
            </div>
          </div>
        </div>
      </div>`;
  });
}

//Displaing items with the category items

function display(category) {
  clearItems();
  temp.forEach((item) => {

    if (item.category == category) {
      content.innerHTML += `<div class="col-6 col-md-4 col-lg-3 " data-aos="fade-up"
      data-aos-anchor-placement="top-bottom" data-aos-duration="1000" data-aos-easing="linear">
  <div class="card" >
    <img src="${item.image}" class="card-img-top" alt="...">
    <div class="card-body d-flex d-md-flex d-lg-block flex-column align-items-center justify-content-center">
      <p class="card-title fw-bold name">${item.name}</p>
      <p class="card-text price">Rs.${item.price}</p>
      <p class="card-text id d-none">${item.id}</p>
      <a class="btn btn-add btn-primary addtocart align-center" onclick="addToCart(this)">Add to cart</a>
      <div class="itemstyle float-end d-flex mt-2 mt-lg-0">
        <button class="btn btn-danger minus fw-bold fs-4 d-flex justify-content-center align-items-center " onclick="minus(this)">-</button>
        <input type="number" id="qtyInput"  max="10" value="1" class="input-text bg-white" disabled />
        <button class="btn btn-success add fw-bold fs-4 d-flex justify-content-center align-items-center" onclick="add(this)">+</button>
      </div>
    </div>
  </div>
</div>`;
    }
  });
}
// clearing content for displaying different categories

function clearItems() {
  content.innerHTML = "";
}
//Displaying search items 

function searchDisplay(x) {
  clearItems();
  temp.map((item) => {
    var needMatch = item.name;
    var needMatchUpper1 = needMatch.toUpperCase();
    var needMatch2 = item.category;
    var needMatchUpper2 = needMatch2.toUpperCase();
    var needMatch3 = item.price.toString();
    var xUpperCase = x.toUpperCase();
    if (
      needMatchUpper1.includes(xUpperCase) ||
      needMatchUpper2.includes(xUpperCase) ||
      needMatch3.includes(xUpperCase)
    ) {
      content.innerHTML += `<div class="col-6 col-md-4 col-lg-3 " data-aos="fade-up"
            data-aos-anchor-placement="top-bottom" data-aos-duration="1000" data-aos-easing="linear">
        <div class="card" >
          <img src="${item.image}" class="card-img-top" alt="...">
          <div class="card-body d-flex d-md-flex d-lg-block flex-column align-items-center justify-content-center">
            <p class="card-title fw-bold name">${item.name}</p>
            <p class="card-text price">Rs.${item.price}</p>
            <p class="card-text id d-none">${item.id}</p>
            <a class="btn btn-add btn-primary addtocart align-center" onclick="addToCart(this)">Add to cart</a>
            <div class="itemstyle float-end d-flex mt-2 mt-lg-0">
              <button class="btn btn-danger minus fw-bold fs-4 d-flex justify-content-center align-items-center " onclick="minus(this)">-</button>
              <input type="number" id="qtyInput"  max="10" value="1" class="input-text bg-white" disabled/>
              <button class="btn btn-success add fw-bold fs-4 d-flex justify-content-center align-items-center" onclick="add(this)">+</button>
            </div>
          </div>
        </div>
      </div>`;
      console.log(x);
    }
    
  });
  input.value = "";
}



// showing cart items with toggle
function showMenu(){
  menu_laptop.classList.toggle("showing");
}
function showCart() {
  show.classList.toggle("displayCart");
}

function closecart(){
  show.classList.toggle("displayCart");

}


//Adding new items to the cart page



function addNewItem(obj) {
      let innerData=`
    <div class="row cartrow ">
      <div class="col-6 d-flex justify-content-start align-items-center p-1">
        <div class="first d-flex justify-content-center align-items-center">
          <img src="${obj.pimage}" alt="${obj.pname}" class="cartimage ">
          <p class="text text-white cartItemName">${obj.pname}</p>
        </div>
      </div>
      <div class="col-4 d-flex justify-content-evenly align-items-center ms-0 px-0">
       
        <div class="itemstyle float-end d-flex me-2">
                <button class="btn btn-danger minus fw-bold fs-4 d-flex justify-content-center align-items-center " onclick="cartMinus(this)">-</button>
                <p class="" id="${obj.pid}"></p>
                <input type="number" value="${obj.pprice}" class="d-none"> 
                <input type="number" id="change"  max="10" value="${obj.pitem}" class="input-text bg-white" disabled />
                <button class="btn btn-success add fw-bold fs-4 d-flex justify-content-center align-items-center" onclick="cartAdd(this)">+</button>
                <p class="" id="${obj.pid}"></p>
        </div>
        <p class="" id="${obj.pid}"></p>
        <a onclick="removeProduct(this)" class="mx-1"><i class="fa-solid fa-trash "></i></a>
      </div>
      <div class="col-2 d-flex justify-content-center align-items-center pe-3 p-0 m-0" >
          <p class="totalCost text-white p-0 m-0">₹${parseInt(obj.ppricetotal)}</p>
      </div>
      
    </div>`;
    // \u20B9
    cart.innerHTML +=innerData;
    saveLocal(products);
    if(products.length<0){
      itemcount.innerHTML='0';
    }
    else{
      itemcount.innerHTML=products.length;
    }

    totalDisplay();
    del();
  }

  
    // total amount displaying
   
    function totalDisplay(){
      var total_amount_initialization=0;
      products.map((pro) => {
        var price=parseInt(pro.ppricetotal);
        total_amount_initialization+=price;
      
    })
    total.innerHTML=`₹${total_amount_initialization}/-`;
  }
  

function showAlert(alert,x){
  setTimeout(() => {
    presentAlert.children[0].classList.add("invisible");
  }, 2000);
    presentAlert.innerHTML=`<p class="added text-center px-4 py-2 bg-${x}">${alert}</p>`;
}

//removing product from frontend

function removeProduct(rem){
  let elem=rem.previousElementSibling.id;
  products=products.filter((items)=>items.pid != elem);
  rem.parentElement.parentElement.remove();
  saveLocal(products);
  if(products.length<0){
    itemcount.innerHTML='0';
  }
  else{
    itemcount.innerHTML=products.length;
  }
  totalDisplay();
  del();
  showAlert("Removed from cart!",'danger');
}


function add(test) {
  var push=test.previousElementSibling;
  var value = parseInt(test.previousElementSibling.value);
  
  if (isNaN(value)) {
    value = 1;
  } 
  else if(value<5){
    value++;
  }

push.value=value;
}

function minus(test) {
  var pop=test.nextElementSibling;
  var value = parseInt(test.nextElementSibling.value);

  if (isNaN(value)) {
    value = 1;
  } else {
    if (value > 1) {
      value--;
    }
  }
  pop.value=value;
}


function cartAdd(test1) {
  var push=test1.previousElementSibling;
  var value = parseInt(test1.previousElementSibling.value);
  var item_id=test1.nextElementSibling.id;
  // var item_value = parseInt(test1.previousElementSibling.value);
  var item_price = parseInt(test1.previousElementSibling.previousElementSibling.value);
  var item_total_price_display = test1.parentElement.parentElement.nextElementSibling.children[0];
  
    if(value<10){
      value++;
      var item_total_price_value = parseInt(value*item_price);
      // console.log(item_id,value,item_price,item_total_price_value);
    }
    else{
      value=10;
      var item_total_price_value = parseInt(value*item_price);
      // console.log(item_id,value,item_price,item_total_price_value);
      alert("maximum quantity reached !!")
    }
    push.value=value;
    item_total_price_display.innerHTML='₹'+item_total_price_value;
    var prod_id=item_id;
    
 products = JSON.parse(localStorage.getItem('products')) || [];


const productIdToUpdate = prod_id; 
const updatedPrice = item_total_price_value;
const updatedItem = value;

const productIndex = products.findIndex((product) => product.pid === productIdToUpdate);
console.log(productIndex);

if (productIndex !== -1) {
  products[productIndex].ppricetotal = updatedPrice;
  products[productIndex].pitem = updatedItem;
  console.log('Product price updated successfully!');
} else {
  console.log('Product not found.');
}

localStorage.setItem('products', JSON.stringify(products));
totalDisplay();
}


function cartMinus(test1) {
  var push1=test1.nextElementSibling.nextElementSibling.nextElementSibling;
  var value1 = parseInt(test1.nextElementSibling.nextElementSibling.nextElementSibling.value);
  var item_id1=test1.nextElementSibling.id;
  // var item_value1 = parseInt(test1.previousElementSibling.value);
  var item_price1 = parseInt(test1.nextElementSibling.nextElementSibling.value);
  var item_total_price_display1 = test1.parentElement.parentElement.nextElementSibling.children[0];
  
  
  
    if (value1 > 1) {
      value1--;
      item_total_price_value1 = parseInt(value1*item_price1);
    }
    else{
      alert("minimum 1 quantity !!")
      item_total_price_value1 = parseInt(item_price1);
    
  }
  
  console.log(value1,item_id1,item_price1,item_total_price_display1);
  push1.value=value1;
  item_total_price_display1.innerHTML='₹'+item_total_price_value1;

  var prod_id1=item_id1;
  products = JSON.parse(localStorage.getItem('products')) || [];


const productIdToUpdate = prod_id1; 
const updatedPrice = item_total_price_value1;
const updatedItem = value1;

const productIndex = products.findIndex((product) => product.pid === productIdToUpdate);
console.log(productIndex);

if (productIndex !== -1) {
  products[productIndex].ppricetotal = updatedPrice;
  products[productIndex].pitem = updatedItem;
  console.log('Product price updated successfully!');
} else {
  console.log('Product not found.');
}

localStorage.setItem('products', JSON.stringify(products));
totalDisplay();
}

// function category1(){
//   clearItems();

// }

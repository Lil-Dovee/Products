{/* newProduct.innerHTML = '<img class="first-img" src="product-list-with-cart-main/product-list-with-cart-main/assets/images/image-waffle-desktop.jpg" alt=""> <button class="addCart "> <img src="product-list-with-cart-main/product-list-with-cart-main/assets/images/icon-add-to-cart.svg" alt="">  Add to Cart  </button> <div class="content">   <h3>${product.name}</h3>  <h2>${product.name}</h2> <div class="price">${products.price}</div> </div>' */}

{/* <h2> Your Cart (<span> {cart.quantity}</span>)</h2> <div class="name">{info.name}</div><div class="matter"><div class="times">1x</div><div class="description"><div class="current-price">{info.price}</div><div class="total-price">{info.price}</div></div><span class="cancel"><img src="product-list-with-cart-main/product-list-with-cart-main/assets/images/icon-remove-item.svg" alt=""></span></div> */}

let listProductHTML = document.querySelector('.productContainer');
let listCartHTML = document.querySelector(".listcart");
let cartContainerSpan = document.querySelector(".cart-container span")
let cartContainer = document.querySelector(".cart-container");
let orderSelected=document.querySelector(".checking-out")
let productContainers = [];
let carts = [];

const addDataToHTML = () => {
    listProductHTML.innerHTML='';
    if(productContainers.length > 0){
        productContainers.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.classList.add('product');
            newProduct.dataset.id = product.id;
            newProduct.innerHTML = `
                <img class="first-img" src="${product.image}" alt="">
                <button class="addCart">
                    <img src="/product-list-with-cart-main/product-list-with-cart-main/assets/images/icon-add-to-cart.svg" alt=""/>
                    Add to Cart
                </button>
                <div class="content">
                    <h3>${product.name}</h3>
                    <h2>${product.nameWithAddon}</h2>
                    <div class="price">${product.price.toFixed(2)}</div>
                </div>
            `;
            listProductHTML.appendChild(newProduct);
        })
    }
}
listProductHTML.addEventListener('click', (event) => {
    let postionClick = event.target;
    if(postionClick.classList.contains('addCart')){
        let product_id = postionClick.parentElement.dataset.id;
        addToCart(product_id);
    }
})
const addToCart = (product_id) => {
    let positionThisProductInCart = carts.findIndex((value) => value.product_id == product_id);
    if(carts.length <= 0){
        carts = [{
            product_id:product_id,
            quantity:1
        }]
    }else if(positionThisProductInCart < 0){
        carts.push({
            product_id:product_id,
            quantity:1
        });
    }else{
        carts[positionThisProductInCart].quantity = carts[positionThisProductInCart].quantity + 1;
    }
    // console.log(carts);
    addCartToHTML();
}

const addCartToHTML=() =>{
    // listCartHTML.style.display='none'
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    if(carts.length>0){
        carts.forEach(cart => {
            totalQuantity = totalQuantity + cart.quantity;
            let newCart = document.createElement('div');
            newCart.classList.add('product');
             let positionProduct=productContainers.findIndex((value)=> value.id == cart.product_id);
             let info = productContainers[positionProduct];
            newCart.innerHTML = `
             <div class="name">${info.nameWithAddon}</div>
                 <div class="matter">
                     <div class="times">${cart.quantity}x</div>
                     <div class="description">
                         <div class="current-price">$${info.price.toFixed(2)}</div>
                         <div class="total-price">$${info.price*cart.quantity.toFixed(2)}</div>
                     </div>
                     <button class="cancel" ><img src="product-list-with-cart-main/product-list-with-cart-main/assets/images/icon-remove-item.svg" alt=""></button>
                 </div>
             `;
         listCartHTML.appendChild(newCart);
        });
        
    }
    

     cartContainerSpan.innerHTML=totalQuantity;
     removecartContainer()
     displayorderSelected()
}

const removecartContainer=()=>{
    cartContainer.style.background='white'
    cartContainer.style.border='none'
}
const displayorderSelected=()=>{                        
    orderSelected.style.display='grid'
}


function openpopup(){
    const open = document.querySelector('.popup')
    open.style.display='block'
}
    

function closepopup(){
    const open = document.querySelector('.popup')
    open.style.display='none'
}


 



const initApp = () => {
        fetch('products.json')
        .then(response => response.json())
        .then(data => {
        productContainers = data;
        addDataToHTML();
    })
}
initApp();

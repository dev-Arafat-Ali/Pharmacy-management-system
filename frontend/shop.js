

  // 1. PRODUCT DATA
  const products =[
        {
          id: 1,name: "Paracetamol 500mg",price:  5, category :"pain-relief", image: "./images/med1.jpg"
        },

        { id: 2, name: "Atenolol 25mg", price:15,category :"malaria",image: "./images/med2.jpg"
        },

        { id: 3,name: "Nitromin Spray 4mg",price:  25,category:"vitamins",image: "./images/med3.jpg"
        },

        { id: 4,name: "Clarithromycin 500mg",price:13,category :"first-aid",image: "./images/med4.jpg"
        },

        { id: 5,name: "Amoxicillin 500mg",price:5,category :"baby-care",image: "./images/med5_amoxilini.jpg"
        },

        {id: 6,name: "Citalopram 20mg",price:9,category :"skin-care",image: "./images/med6.jpg"
        },

        { id: 8, name: "Vitamin C 1000mg", price: 10, category: "vitamins", image: "./images/med5_amoxilini.jpg", badge: "New" },
    { id: 9, name: "Vitamin D3 1000IU", price: 14, category: "vitamins", image: "./images/med6.jpg", badge: "New" },
    { id: 10, name: "Multivitamin Complex", price: 20, category: "vitamins", image: "./images/med5_amoxilini.jpg", badge: null },
    { id: 11, name: "Zinc Tablets 50mg", price: 9, category: "malaria", image: "./images/med6.jpg", badge: null },

  ]



  // 2. DOM ELEMENT REFERENCES

  const productsGrid = document.getElementById("productsGrid");
  const emptyState        = document.getElementById("productsEmptyState");

  const priceRange        = document.getElementById("priceRange");
  const priceRangeValue   = document.getElementById("priceRangeValue");
  const resultsCount      = document.getElementById("resultsCount");
 


  // 3. RENDER FUNCTION
  function displayProducts(items){
    productsGrid.innerHTML = ""
    let allCardsHTML= ""

    items.forEach((item) => {


      const cardsHTML = `
        <div class="product-card">
            <div class="badge new"  >New</div>
            <img src="${item.image}" alt="naproxen">
            <div class="product-info hover-card">
              <h4>${item.name} </h4>
              <span class="price">Ghs ${item.price}</span>
            </div>
            <button data-id="${item.id}" class="add-cart hover-card">&plus; Add to cart</button>
          </div>
          ` 
          allCardsHTML += cardsHTML
    });
    productsGrid.innerHTML = allCardsHTML
  }

  displayProducts(products)

  // ||Side Bar Categories

  const categoryButtons   = document.querySelectorAll("button.category-filter-btn");
  const allProudcts = document.querySelector(".allProducts")

  categoryButtons.forEach(button =>{
    button.addEventListener('click',()=>{
      const clickedButton = button.dataset.category;
      
      const filteredProducts = products.filter(product=> product.category===clickedButton);
      displayProducts(filteredProducts)
    })
    
  })

  const searchInput  = document.getElementById("shopSearchInput");

  searchInput.addEventListener("input",()=>{
  const searchItem = searchInput.value.toLowerCase().trim();
  
  const filteredProducts  = products.filter(product=>product.name.toLowerCase().includes(searchItem));
  
  displayProducts(filteredProducts)
    })


  // 5. SORTING products
  const sortSelect = document.getElementById("shopSortSelect");
sortSelect.addEventListener("change",()=>{
  const sortValue = sortSelect.value
  if(sortValue==="name-asc"){
    products.sort((a,b)=> a.name < b.name?-1: a.name>b.name?1 : 0);
  }
  else if(sortValue==="name-desc"){
    products.sort((a,b) => b.name<a.name?-1 : b.name>a.name? 1:0)
  }
  displayProducts(products)
})

// ADD TO CART   // the first parameter in the reduce function takes 2 arg, the 1st is the running total & 2nd is the current item
let cart = JSON.parse(localStorage.getItem("cart"))|| [];

const cartCount = document.getElementById("cartCount");

 
   
   function updateCart(){
   localStorage.setItem("cart",JSON.stringify(cart))

   const totalCount = cart.reduce((sum,item)=> sum + item.quantity,0)

     cartCount.textContent = totalCount
 }

productsGrid.addEventListener("click",(e)=>{
  if(e.target.classList.contains("add-cart")){
    const productId = Number(e.target.dataset.id)
    const product = products.find(item=>item.id===productId)
    
    const existAlready = cart.find(item=> item.id===productId)
  if(existAlready){
    existAlready.quantity += 1
    
  }else
    {
    cart.push({
      id:product.id,
      name:product.name,
      price:product.price,
      quantity:1
    })
  } 

updateCart()

}})
updateCart()
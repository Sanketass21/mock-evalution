let product = document.querySelector("#container")
let categoryData = document.querySelector("#category")
let Search = document.querySelector("#Search")
let Sort = document.querySelector("#Sort")
// Get your Data here 
async function getdata(searh){
    product.innerHTML = ""
 try {
  let res = await fetch(`https://fakestoreapi.com/products/${searh}`)
  let response = await res.json()
   
   ShowData(response)
   
 } catch (error) {
    console.log(error);
 }
}
getdata("")

// Here show your Data here on ui
function ShowData(data){
    product.innerHTML = ""
    console.log(data);
 data.map((item)=>{
    let div= document.createElement("div")
    div.innerHTML = ` <img src=${item.image} alt="">
    <p><span>Category : </span>${item.category}</p>
    <p><span>Title : </span>${item.title}</p>
    <p><span>Description : </span>${item.description}</p>
    <p><span>Price : </span>${item.price} ₹ </p>`

   
    product.append(div)
  
 })
}

// filter by category
categoryData.addEventListener('change', function(){
    let cata = categoryData.value
    if(cata=="All"){
 getdata("") 
    }else if(cata=="jewelery"){
        getdata("category/jewelery")   
    }
    else if(cata=="electronics"){
        getdata("category/electronics")   
    }
    else if(cata=="clothing"){
        getdata("category/men's clothing")   
    }
    else if(cata=="womenclothing"){
        getdata("category/women's clothing")   
    }
})


// search here 
Search.addEventListener('keypress', function(e){
    if(e.key=='Enter'){
        SearchData(Search.value)
    }
})

// filter Data according to category an title
async function SearchData(searchText){
    try {
        let res = await fetch("https://fakestoreapi.com/products")
        let response = await res.json()
        
       
        let data =  response.filter((item)=>item.category.toLowerCase()==searchText.toLowerCase() || item.title.toLowerCase()==searchText.toLowerCase)
         if(data){
            ShowData(data)
         }else{
            alert("No Data found")
         }
         
         
       } catch (error) {
          console.log(error);
       }
       
}

Sort.addEventListener("change", function(){
   SortData(Sort.value)
})
// Sorting of product according to price
async function SortData(searchText){
    try {
        let res = await fetch("https://fakestoreapi.com/products")
        let response = await res.json()
        if(searchText=="Asc"){
            let data = response.sort((a,b)=>b.price-a.price)
            ShowData(data)
        }
        else if(searchText=="Dsc"){
            let data = response.sort((a,b)=>a.price-b.price)
            ShowData(data)
        }else{
            ShowData(response)
        }
         
         
       } catch (error) {
          console.log(error);
       }
       
}
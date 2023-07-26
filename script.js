const productNameInput = document.querySelector("#productName");
const productPriceInput = document.querySelector("#productPrice");
const productDescription = document.querySelector("#productDescription");
const productCategory = document.querySelector("#productCategory");
const productQuantity = document.querySelector("#quantity");
const productTableResult = document.querySelector("#productsTable");
const addProductBtn = document.querySelector("#addProduct");
const clearAllBtn = document.querySelector("#clearAllBtn");
let productsArray = [];
let selectedRow = null;
let myIndex;
if (window.localStorage.getItem("products")) {
  productsArray = JSON.parse(window.localStorage.getItem("products"));
}
getProductsFromLocalStorage();

productTableResult.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete-btn")) {
    deleteProduct(e.target.parentElement.parentElement.getAttribute("data-id"));
    e.target.parentElement.parentElement.remove();
  }

  if (e.target.classList.contains("update-btn")) {
    onEdit(e.target.parentElement.parentElement);
    // updateProduct(e.target.parentElement.parentElement.getAttribute("data-id"));
    // let selectedTask = e.target.parentElement.parentElement;
    // productNameInput.value = selectedTask.children[1].innerHTML;
    // productPriceInput.value = selectedTask.children[2].innerHTML;
    // productCategory.value = selectedTask.children[3].innerHTML;
    // productDescription.value = selectedTask.children[4].innerHTML;
    // productQuantity.value = selectedTask.children[5].innerHTML;
    // e.target.parentElement.parentElement.remove();
  }
});

addProductBtn.addEventListener("click", checkInputs);
 function checkInputs () {
  if (
    productNameInput.value.trim() != "" &&
    productPriceInput.value.trim() != "" &&
    productDescription.value.trim() != "" &&
    productCategory.value.trim() != "" &&
    productQuantity.value.trim() != ""
  ) {
    addProductObject();
    addProductsToTable();
    clearInputs();
  } 
};


// addProductBtn.addEventListener("click", addProductObject);

  function addProductObject(){
    // if (
    //   productNameInput.value.trim() !== "" && productPriceInput.value.trim() !== "" && productDescription.value.trim() !== "" && productCategory.value.trim() !== "" && productQuantity.value.trim() !== ""
    // ) {
    const product = {
      id: Date.now(),
      productName: productNameInput.value,
      productPrice: productPriceInput.value,
      productCategory: productCategory.value,
      productDescription: productDescription.value,
      productQuantity: productQuantity.value,
    };
    productsArray.push(product);
    console.log(productsArray);
    addProductsToLocalStorage(productsArray);
    clearInputs();
    addProductsToTable();
    
    }
  // }
   





function addProductsToTable() {
  productTableResult.innerHTML = "";

  for (let i = 0; i < productsArray.length; i++) {
    productTableResult.innerHTML += `
      
      <tr data-id=${productsArray[i].id}>
        <td>${productsArray[i].id}</td>
        <td>${productsArray[i].productName}</td>
   
        <td>${productsArray[i].productPrice}</td>
  
        <td>${productsArray[i].productCategory}</td>
 
        <td>${productsArray[i].productDescription}</td>

        <td>${productsArray[i].productQuantity}</td>

        <td>
        <button class="update-btn" onclick=onEdit(${this})>Edit</button>  
        </td>
        <td>
        <button onclick=deleteProduct(${i}) class="delete-btn">Delete</button>
        </td>

        
    </tr>  
   
    

    `;
  }
}

function addProductsToLocalStorage(productsArray) {
  window.localStorage.setItem("products", JSON.stringify(productsArray));
}

function getProductsFromLocalStorage() {
  let data = window.localStorage.getItem("products");
  if (data) {
    let product = JSON.parse(data);
    addProductsToTable(product);
  }
}

function deleteProduct(productId) {
  productsArray = productsArray.filter((product) => product.id != productId);
  addProductsToLocalStorage(productsArray);
}

function onEdit(tr) {
  let selectedRow = tr;
  productNameInput.value = selectedRow.children[1].innerHTML;
  productPriceInput.value = selectedRow.children[2].innerHTML;
  productCategory.value = selectedRow.children[3].innerHTML;
  productDescription.value = selectedRow.children[4].innerHTML;
  productQuantity.value = selectedRow.children[5].innerHTML;
  document.getElementById("saveUpdate").innerHTML = ``;
  document.getElementById(
    "saveUpdate"
  ).innerHTML = `<button class="update-btn" onclick="updateProduct(${selectedRow.children[0].textContent})">Update</button>`;
}
function updateProduct(productId) {
  console.log(productId);
  updatedArray = [...productsArray].filter(
    (product) => product.id == productId
  );

  console.log(updatedArray);
  // console.log(updatedArray.indexOf(updatedArray[0].id));

  for (let i = 0; i < updatedArray.length; i++) {
    updatedArray[i].productName = productNameInput.value;
    updatedArray[i].productPrice = productPriceInput.value;
    updatedArray[i].productCategory = productCategory.value;
    updatedArray[i].productDescription = productDescription.value;
    updatedArray[i].productQuantity = productQuantity.value;
  }
  document.getElementById("saveUpdate").innerHTML = ``;
  document.getElementById(
    "saveUpdate"
  ).innerHTML = `<button id="addProduct" onclick="checkInputs()">Add Product</button>
    <button id="clearAllBtn" onclick="clearAllProducts()">Clear All Products</button>`;

  addProductsToTable();

  clearInputs();
  addProductsToLocalStorage(productsArray);
}
function clearInputs() {
  productNameInput.value = "";
  productPriceInput.value = "";
  productCategory.value = "";
  productDescription.value = "";
  productQuantity.value = "";
  selectedRow = null;
}

function searchProducts(term) {
  let cartoona = ``;
  for (let i = 0; i < productsArray.length; i++) {
    if (
      productsArray[i].productName.toLowerCase().includes(term.toLowerCase()) ||
      productsArray[i].productCategory
        .toLowerCase()
        .includes(term.toLowerCase())
    ) {
      cartoona += `
      <tr data-id=${productsArray[i].id}>
      <td>${i}</td>
      <td>${productsArray[i].productName}</td>
 
      <td>${productsArray[i].productPrice}</td>

      <td>${productsArray[i].productCategory}</td>

      <td>${productsArray[i].productDescription}</td>

      <td>${productsArray[i].productQuantity}</td>

      <td>
        <button class="update-btn" onclick=onEdit(${this})>Edit</button>  
      </td>
        <td>
        <button onclick=deleteProduct(${i}) class="delete-btn">Delete</button>
        </td>
      
    </tr>  
      `;
    }
  }
  productTableResult.innerHTML = cartoona;
}
// clearAllBtn.addEventListener("click", clearAllProducts);
function clearAllProducts() {
  productTableResult.innerHTML = "";
  window.localStorage.removeItem("products");
  productsArray = [];
}

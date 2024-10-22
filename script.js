const nameBox = document.getElementById("name-box");
const priceBox = document.getElementById("price-box");
const imageBox = document.getElementById("image-box");
const listContainer = document.getElementById("list-container");
const addToCart = document.getElementById("add-to-cart");
const totalPriceDisplay = document.getElementById("total-price");
const cart = document.getElementById("cart");



let tasks = [];
function addTask() {
  if (nameBox.value === "") {
    alert("You must write your name");
    return false;
  }

  if (isNaN(priceBox.value) || priceBox.value === "") {
    alert("Price should be number");
    return false;
  }

  if (!imageBox.checkValidity() || imageBox.value === "") {
    alert("You must upload an image");
    return false;
  }

  const price = parseFloat(priceBox.value);

  const li = document.createElement("li");
  li.innerHTML = `${nameBox.value} - $${price}`;
  listContainer.appendChild(li);

  const img = document.createElement("img");
  img.src = `${imageBox.value}`;
  li.appendChild(img);

  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  li.appendChild(checkBox);

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  li.appendChild(deleteBtn);

  deleteBtn.addEventListener("click", function () {
    listContainer.removeChild(li);
  });

  const task = {
    name: nameBox.value,
    price: price,
    img: imageBox.value,
    checkBox: checkBox,
  };

  checkBox.addEventListener("change", function () {
    if (checkBox.checked) {
      totalPrice += task.price;
    } else {
      totalPrice -= task.price;
    }
    updateTotalPrice();
  });

  tasks.push(task);

  nameBox.value = '';
  priceBox.value = '';
  imageBox.value = '';
}

let totalPrice = 0;

function updateTotalPrice() {
    totalPriceDisplay.textContent = `Total Price: $${totalPrice}`;
  }

addToCart.addEventListener("click", function () {
  cart.innerHTML = "";
  let selectedTasks = tasks.filter((task) => task.checkBox.checked); 
  selectedTasks.forEach((task) => {
    const cartItem = document.createElement("div");
    cartItem.textContent = `${task.name} - $${task.price.toFixed(2)} `;
    cart.appendChild(cartItem);

    const cartImg = document.createElement("img");
    cartImg.src = `${task.img}`;
    cartItem.appendChild(cartImg);
    cart.appendChild(cartItem);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    cartItem.appendChild(deleteBtn);

    deleteBtn.addEventListener("click", function () {
      cart.removeChild(cartItem);
    });
  });
});

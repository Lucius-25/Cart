import { list } from "postcss";
import { cartBtnCount, cartCount, cartItems, cartTotalAmount, productSection } from "../core/selector";
import { products } from "../core/variable";
import { calculateCartAmountTotal, calculateCartCount, createCartUi } from "./cart";

export const productRender = (list) => {
  // console.log(list[0]);
  list.forEach((el) => productSection.append(createProductCard(el)));
};

//Rating Stars

export const ratingUi = (rate) => {
  let result = "";

  for (let i = 1; i <= 5; i++) {
    result += `<svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    class="w-6 h-6 ${
      i <= rate.toFixed(0)
        ? "fill-neutral-700 stroke-neutral-700"
        : "fill-neutral-300 stroke-neutral-300"
    }"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
    />
  </svg>`;
  }
  return result;
};

export const createProductCard = ({
  id,
  image,
  title,
  description,
  price,
  rating: { rate, count },
}) => {
  const card = document.createElement("div");
  card.classList.add("product-card");
  card.setAttribute("data-id", id )
  card.innerHTML = `
    <div class=" w-full text-neutral-700">
    <img
    class="h-36 product-img ms-5 -mb-16"
    src="${image}"
    alt=""
  />
    <div
      class="product-info w-full p-5 pt-20 border border-neutral-700"
    >
      <p class="font-heading text-lg line-clamp-1 font-bold mb-5">
        ${title}
      </p>
      <p class="text-sm line-clamp-3 mb-5 text-neutral-500">
        ${description}
      </p>
      <div
        class="rating flex justify-between border-b border-neutral-700 pb-5 mb-5"
      >
        <div class="flex rating-star">${ratingUi(rate)}</div>
        <p class="rating-text">( ${rate}/ ${count} )</p>
      </div>
      <p class="font-bold mb-2 font-heading text-xl">
        $ <span>${price}</span>
      </p>
      <button class="add-to-cart-btn border w-full block border-neutral-700 p-3 font-heading">
        Add to Cart
      </button>
    </div>
  </div>
    `;

    const addToCartBtn = card.querySelector(".add-to-cart-btn")
    addToCartBtn.addEventListener("click" , addToCartBtnHandler)

  return card;


};

const addToCartBtnHandler = (event) => {
  const btn = event.target;
  const currentId = event.target.closest(".product-card").getAttribute("data-id");

  btn.innerText= "Added";
  btn.toggleAttribute("disabled")
  btn.classList.add("bg-neutral-700", "text-white");

  const currentProduct = products.find(el => el.id == currentId)
  // console.log(currentProduct);
  cartItems.append(createCartUi(currentProduct))
}

import {
  app,
  cartBtnCount,
  cartCount,
  cartItems,
  cartTotalAmount,
} from "../core/selector";

export const createCartUi = ({ image, id, price, title }) => {
  const cart = document.createElement("div");
  cart.classList.add("cart-item");
  cart.innerHTML = `
    <div class="group mb-5">
    <img
      src="${image}}"
      alt=""
      class="h-[80px] mb-[-40px] ps-4 relative z-10"
    />
    <div class="border shadow border-neutral-700 p-4 pt-10 relative">
    
    <button class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 duration-200 translate-x-10 group-hover:translate-x-0 cartRemoveBtn">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 stroke-red-500">
    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>    
    </button>
    <p class="font-bold line-clamp-1 mb-3">${title}</p>

      <div class="flex justify-between items-center">
        <p>$ <span class="cart-cost"> ${price} </span></p>
        <div class="flex w-[100px] bg-neutral-200 items-center">
          <button class="px-2 bg-neutral-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-3 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M18 12H6"
              />
            </svg>
          </button>
          <p class="text-end pe-2 flex-grow">3</p>
          <button class="px-2 bg-neutral-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-3 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 6v12m6-6H6"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
    `;
  const cartRemoveBtn = cart.querySelector(".cartRemoveBtn")
  cartRemoveBtn.addEventListener("click", cartRemoveHandler)
  return cart;
  
};


export const cartRemoveHandler = (event) => {
  const currentCart = event.target.closest(".cart-item")
  currentCart.remove();
  // console.log("i did click");
}

export const calculateCartAmountTotal = () => {
  const cartCost = app.querySelectorAll(".cart-cost");
  return [...cartCost].reduce((pv, cv) => pv + parseFloat(cv.innerText), 0);
};

export const calculateCartCount = () => {
  const carts = app.querySelectorAll(".cart-item");
  return carts.length;
};

export const cartObserver = () => {
  const observerOptions = {
    childList: true,
    subtree: true,
  };

  const observer = new MutationObserver(() => {
    cartTotalAmount.innerText = calculateCartAmountTotal();
    cartCount.innerText = cartBtnCount.innerText = calculateCartCount();
  });
  observer.observe(cartItems, observerOptions);
};

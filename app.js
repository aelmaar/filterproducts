import { products } from "./products.js";

const Products = document.querySelector(".app_products");
const cats = document.querySelector(".app_categories");
// show all categories and products when the page loads for the first time
onLoad();

const btns = document.querySelectorAll(".btns");

// filter the category products
btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const cat = e.currentTarget.dataset.id;
    // show all products
    if (cat === "all") {
      Products.innerHTML = showProducts(products);
    } else {
      // show specific category products
      let productFilter = products.filter(
        (product) => product.category === cat
      );
      Products.innerHTML = showProducts(productFilter);
    }
  });
});

function onLoad() {
  let check = new Set();
  // pick only the categories
  let filters = products.reduce((acc, curr) => {
    if (!check.has(curr.category)) {
      acc.push(curr.category);
    }
    check.add(curr.category);
    return acc;
  }, []);

  // show the category buttons
  cats.innerHTML =
    "<button class='btns' data-id='all'>all</button>" +
    " " +
    filters
      .map((cat) => {
        return `<button class="btns" data-id=${cat}>${cat}</button>`;
      })
      .join(" ");

  // show all products
  Products.innerHTML = showProducts(products);
}

// show products
function showProducts(arr) {
  return arr
    .map((product) => {
      return `<article>
                <img src=${product.image} alt=${product.title} />
                <h3>${product.title}</h3>
                <h4>${product.price}</h4>
              </article>`;
    })
    .join("");
}

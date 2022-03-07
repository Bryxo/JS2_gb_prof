'use strict'
const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
class ProductList{
   constructor(container='.products') {
      this.container = container; //куда вставляем товары
      this.goods = []; //массив товаров
      this._getProducts()
         .then(data => {
            this.goods = data;
            //console.log(this.goods);
            this.render();
         });
      ;
      this.allProducts = [];
   }
   _getProducts(){ //метод - запроса продуктов с сервера методом fetch (промисы)
      return fetch(`${API}/catalogData.json`)
         .then(result => result.json())
         .catch(err => alert(err))
      }
   render(){ //метод - вывод товаров на страницу
      const block = document.querySelector(this.container);//куда вставляем товары
      for(let product of this.goods) {
         const productObject = new ProductItem(product);
         this.allProducts.push(productObject);
         block.insertAdjacentHTML("beforeend",productObject.render());
      }
   }
   // sumOfGoods () {  //проработать и добавить свойство/метод который считает и выводит сумму товаров
   //    let sum = 0;
   //    this.goods.forEach(product=> {
   //       sum += product.price;
   //    })
   //    document.querySelector(`${this.container}`).insertAdjacentHTML("afterend", `Цена всех товаров в массиве = ${sum} у.е.`)
   // };
}

class ProductItem{
   constructor(product,img='https://via.placeholder.com/200x150'){
      this.title = product.product_name;
      this.price = product.price;
      this.id = product.id_product;
      this.img = img;
   }
   render(){
         return `<div class="product-item">
               <img src="${this.img}">
               <h3>${this.title}</h3>
               <p>${this.price}</p>
               <button class="buy-btn">Купить</button>
            </div>`
   }
}

class Cart{ // класс корзины
   constructor(){
      this.cartGoods = [];
      this._getCart()
         .then(data => {
            this.cartGoods = data.contents;
            this._render()
            })
   }
   _getCart(){  //метод - запроса продуктов в корзине с сервера методом fetch (промисы)
      return  fetch(`${API}/getBasket.json`)
         .then(result => result.json())
         .catch(err => alert(err))
      }
   _render() { //метод - вывести товары корзины
      const block = document.querySelector('.cart_items');//блок, в который вставляем товары корзины
        // this.cartGood = []; //создаем пустой массив для товаров корзины
      for(let product of this.cartGoods) { //перебираем товары корзины
         const cartItem = new CartItem(product); //для каждого элемента корзины создается новый объект CartItem со своими свойствами и методами
        // this.cartGood.push(cartItem); //
         block.insertAdjacentHTML("beforeend",cartItem.render());//создаем верстку для каждого товара корзины и вставляем ее на страницу
      }
   }
   addToCart() {

   }
   deleteFromCart(){

   }
   clearCart(){

   };
}

class CartItem { // товар корзины
   constructor(product) {
      this.title = product.product_name;
      this.price = product.price;
      this.id = product.id_product;
      this.quantity = product.quantity;
   }
   render() { //верстка с одним товаром для корзины
      return   `<div class="cart-item" data-id="${this.id}">
                  <div class="desc">
                     <h3>${this.title}</h3>
                     <p>${this.price} $</p>
                  </div>
               </div>`
   }
}

let list = new ProductList();
//list.render();
let cart = new Cart(); 
//cart.render();
//list.sumOfGoods();

document.querySelector('.btn-cart').addEventListener('click', () => {
      document.querySelector('.cart_items').classList.toggle('hidden');
   })




// const products = [
//    { id: 1, title: 'Notebook', price: 2000, img: 'http://dummyimage.com/120' },
//    { id: 2, title: 'Mouse', price: 20 },
//    { id: 3, title: 'Keyboard', price: 200 },
//    { id: 4, title: 'Gamepad', price: 50 },
//    { id: 5, title: 'CD', price: 5 },
//    { id:666, title: 'anykey', price:6666, img: 'http://dummyimage.com/120' },
// ];
// //Функция для формирования верстки каждого товара 
// const renderProduct = ( {title, price, img = 'http://dummyimage.com/150'} ) => {    //принимает объект, берет из него title, price, img (если img нет, то по умолчанию 150) 
//    return  `<div class="product-item">
//                <h3>${title}</h3>
//                <img src="${img}" alt="photo">
//                <p>${price}</p>
//                <button class="buy-btn">Купить</button>
//             </div>`           //возвращает разметку (возвращается массив строк - в каждой свои title, price, img))
// };
// //Функция по отрисовке товаров на странице
// const renderPage = list => { //list в данном случае это products - массив наших товаров (массив объектов)
//    const productsList = list.map(item => renderProduct(item)).join(''); /*перебираем массив products методом .map 
//    метод .map применяет к каждому элементу (в данном случае item - это объект) массива products функцию renderProduct
//    и возвращает новый массив productsList. Методом join соединяем все элементы массива productsList через 'пробел', чтобы избавиться от запятых.*/
//    //console.log(productsList);
//    document.querySelector('.products').insertAdjacentHTML('beforeend', productsList); //определяем что и куда вставлять на странице
// //короткая запись: 
// //document.querySelector('.products').insertAdjacentHTML('beforeend', list.map(item => renderProduct(item)).join(''));
// };

// //вызов функции для отрисовки товаров на странице
// renderPage(products);   //передаем ей products - массив наших товаров (массив объектов)
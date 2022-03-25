const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({ //создаем объект app класса vue
    el: '#app', //указывается элемент с которым синхронизируемся
    data: { /* глобальные свойства нашего объекта app, к которым можно обращаться^
    в методах через this. В вёрстке через {{ xxxx }}*/
        catalogUrl: '/catalogData.json', //путь к файлу json с товаров каталога
        cartUrl: '/getBasket.json', //путь к файлу json с товарами корзины
        cartItems: [], //массив с товарами корзины
        products: [],// массив товаров каталога
        filtered: [], //массив отфильтрованных товаров
        imgCart: 'https://via.placeholder.com/50x100', //картинка для всех товаров корзины
        imgCatalog: 'https://via.placeholder.com/200x150', //картинка для всех товаров корзины
        userSearch: '', /* отвечает за фильтр (что записывается фильтр сразу же 
            записывается в userSearch - строка 16 index.html: v-model="userSearch")*/
        showCart: false //отвечает за показ корзины - по умолчанию: корзина скрыта
    },
    methods: {
        filter() {
            const regexp = new RegExp(this.userSearch, 'i');
            this.filtered = this.products.filter(product => regexp.test(product.product_name)); /*применяем к массиву products
            метод filter - у каждого товара (в данном случае это product) берем имя и сопоставляем с нашим правилом указанном 
            в регулярном выражении. Если возвращает true, то товар помещается в массив filtered из массива products */
        },
        getJson(url) { //принимаем url 
            return fetch(url) //делаем коннект к url, получаем promise
                .then(result => result.json()) //преобразуем (парсим) файл json в объект js и тоже вернем promise
                .catch(error => { //если ошибка, то выводим ее в консоль
                    console.log(error);
                })
        },
        remove(item) { //принимаем товар item из корзины, который следует удалить
            this.getJson(`${API}/addToBasket.json`) /*делаем коннект к url, получаем promise 
            (чтобы узнать, можем мы изменять содержание корзины или нет)*/
                .then(data => {
                    if (data.result === 1) { //если менять корзину можем (признак=1), то
                        if (item.quantity > 1) { //если таких товаров больше 1, то
                            item.quantity--; // уменьшаем количество таких товаров на 1 декрементом
                        } else { //если таких товаров не больше 1, то
                            this.cartItems.splice(this.cartItems.indexOf(item), 1); /*удаляем наш элемент 
                            по индексу, т.е. находим индекс вхождения нашего товара в массив и удаляем этот элемент, 
                            в количестве 1 штука*/
                        }
                    }
                })
        },
        addProduct(product) { //принимаем товар product из каталога товаров, который следует добавить в корзину
            this.getJson(`${API}/addToBasket.json`) /*делаем коннект к url, получаем promise 
            (чтобы узнать, можем мы изменять содержание корзины или нет)*/
                .then(data => {
                    if (data.result === 1) {//если менять корзину можем (признак=1), то
                        let find = this.cartItems.find(el => el.id_product === product.id_product); //проверка наличия товара в корзине
                        /* применяем к массиву cartItems метод find - обходим все элементы массива cartItems (в данном случае это el) и
                        ищем товар по id (т.е. сравниваем id товара в массиве cartItems с id товара который добавляется - прилетает
                        по клику по кнопке buy-btn (строка 68 index.html)). Если товар найден, то записываем его в массив find
                        берем имя и сопоставляем с нашим правилом указанном 
                в регулярном выражении. Если возвращает true, то товар помещается в массив filtered из массива products */
                        if (find) { //если find=true, т.е. товар найден, то
                            find.quantity++; //берем свойство quantity массива find и увеличиваем на 1 (инкремент)
                            // -- свойство quantity присутствует у каждого элемента массива cartItems-- //
                        } else { //если find=false, т.е. товар не найден, то нужно его создать в корзине
                            const prod = Object.assign({ quantity: 1 }, product);/*создание нового объекта prod на основе двух, указанных 
                            в параметрах, склеиванием двух объектов в один с помощью assign. 
                            Товар в корзине отличается от товара каталога только наличием свойства quantity у товара корзины. 
                            Для преобразования товара каталога в товар корзины мы к товару каталога добавляем свойство quantity 
                            со значением = 1 и получается новый объект prod товара корзины. (product в данном случае это объект товара 
                            каталога (без свойства quantity))*/
                            this.cartItems.push(prod) //и этот объект prod добавим в массив товаров корзины cartItems
                        }
                    }
                })
        },
    },
    mounted() { //onload /запускается при создании объекта vue /заполнение МАССИВОВ товаров на основе файлов json
        this.getJson(`${API + this.cartUrl}`) //1 вызов метода getJson - к товарам корзины, и получаем объект (т.к. так устроен файл корзины(всё обёрнуто в фигурные скобки))
            .then(data => { //data - это объект, содержащий всю информацию о корзине 
                for (let el of data.contents) { /*в цикле обходим все товары корзины (contents - свойство корзины, в нём хранится инф. о товарах (структура файла корзины такая)).
                el - в данном случае это каждый товар корзины (можно назвать как угодно)*/
                    this.cartItems.push(el); //берем каждый товар корзины и добавляем его в массив cartItems
                }
            });
        this.getJson(`${API + this.catalogUrl}`) //2 вызов метода getJson - к товарам каталога (из интернета), и получаем массив объектов (т.к. так устроен файл каталога(всё обёрнуто в квадратные скобки))
            .then(data => {
                for (let el of data) {/*в цикле обходим все товары каталога.
                    el - в данном случае это каждый товар каталога (можно назвать как угодно)*/
                    this.$data.products.push(el); //берем каждый товар каталога и добавляем его в массив products
                    this.$data.filtered.push(el); //берем каждый товар каталога и добавляем его в массив filtered
                    /*$data.products и $data.filtered - т.к. они находятся в свойстве data ($data нужен для обращения
                    напрямую к свойству data (без использования this), доллар можно не писать, но лучше его использовать).*/
                }
            })
        this.getJson(`getProducts.json`) //3 вызов метода getJson - к товарам каталога (из локального файла)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                    this.filtered.push(el);
                }
            })
    }
})







// class List {
//     constructor(url, container, list = list2){
//         this.container = container;
//         this.list = list;
//         this.url = url;
//         this.goods = [];
//         this.allProducts = [];
//         this.filtered = [];
//         this._init();
//     }
//     getJson(url){
//         return fetch(url ? url : `${API + this.url}`)
//             .then(result => result.json())
//             .catch(error => {
//                 console.log(error);
//             })
//     }
//     handleData(data){
//         this.goods = [...data];
//         this.render();
//     }
//     calcSum(){
//         return this.allProducts.reduce((accum, item) => accum += item.price, 0);
//     }
//     render(){
//         const block = document.querySelector(this.container);
//         for (let product of this.goods){
//             const productObj = new this.list[this.constructor.name](product);
//             console.log(productObj);
//             this.allProducts.push(productObj);
//             block.insertAdjacentHTML('beforeend', productObj.render());
//         }
//     }
//     filter(value){
//         const regexp = new RegExp(value, 'i');
//         this.filtered = this.allProducts.filter(product => regexp.test(product.product_name));
//         this.allProducts.forEach(el => {
//             const block = document.querySelector(`.product-item[data-id="${el.id_product}"]`);
//             if(!this.filtered.includes(el)){
//                 block.classList.add('invisible');
//             } else {
//                 block.classList.remove('invisible');
//             }
//         })
//     }
//     _init(){
//         return false
//     }
// }
//
// class Item{
//     constructor(el, img = 'https://placehold.it/200x150'){
//         this.product_name = el.product_name;
//         this.price = el.price;
//         this.id_product = el.id_product;
//         this.img = img;
//     }
//     render(){
//         return `<div class="product-item" data-id="${this.id_product}">
//                 <img src="${this.img}" alt="Some img">
//                 <div class="desc">
//                     <h3>${this.product_name}</h3>
//                     <p>${this.price} $</p>
//                     <button class="buy-btn"
//                     data-id="${this.id_product}"
//                     data-name="${this.product_name}"
//                     data-price="${this.price}">Купить</button>
//                 </div>
//             </div>`
//     }
// }
//
// class ProductsList extends List{
//     constructor(cart, container = '.products', url = "/catalogData.json"){
//         super(url, container);
//         this.cart = cart;
//         this.getJson()
//             .then(data => this.handleData(data));
//     }
//     _init(){
//         document.querySelector(this.container).addEventListener('click', e => {
//             if(e.target.classList.contains('buy-btn')){
//                 this.cart.addProduct(e.target);
//             }
//         });
//         document.querySelector('.search-form').addEventListener('submit', e => {
//             e.preventDefault();
//             this.filter(document.querySelector('.search-field').value)
//         })
//     }
// }
//
//
// class ProductItem extends Item{}
//
// class Cart extends List{
//     constructor(container = ".cart-block", url = "/getBasket.json"){
//         super(url, container);
//         this.getJson()
//             .then(data => {
//                 this.handleData(data.contents);
//             });
//     }
//     addProduct(element){
//         this.getJson(`${API}/addToBasket.json`)
//             .then(data => {
//                 if(data.result === 1){
//                     let productId = +element.dataset['id'];
//                     let find = this.allProducts.find(product => product.id_product === productId);
//                     if(find){
//                         find.quantity++;
//                         this._updateCart(find);
//                     } else {
//                         let product = {
//                             id_product: productId,
//                             price: +element.dataset['price'],
//                             product_name: element.dataset['name'],
//                             quantity: 1
//                         };
//                         this.goods = [product];
//                         this.render();
//                     }
//                 } else {
//                     alert('Error');
//                 }
//             })
//     }
//     removeProduct(element){
//         this.getJson(`${API}/deleteFromBasket.json`)
//             .then(data => {
//                 if(data.result === 1){
//                     let productId = +element.dataset['id'];
//                     let find = this.allProducts.find(product => product.id_product === productId);
//                     if(find.quantity > 1){
//                         find.quantity--;
//                         this._updateCart(find);
//                     } else {
//                         this.allProducts.splice(this.allProducts.indexOf(find), 1);
//                         document.querySelector(`.cart-item[data-id="${productId}"]`).remove();
//                     }
//                 } else {
//                     alert('Error');
//                 }
//             })
//     }
//     _updateCart(product){
//        let block = document.querySelector(`.cart-item[data-id="${product.id_product}"]`);
//        block.querySelector('.product-quantity').textContent = `Quantity: ${product.quantity}`;
//        block.querySelector('.product-price').textContent = `$${product.quantity*product.price}`;
//     }
//     _init(){
//         document.querySelector('.btn-cart').addEventListener('click', () => {
//             document.querySelector(this.container).classList.toggle('invisible');
//         });
//         document.querySelector(this.container).addEventListener('click', e => {
//            if(e.target.classList.contains('del-btn')){
//                this.removeProduct(e.target);
//            }
//         })
//     }
//
// }
//
// class CartItem extends Item{
//     constructor(el, img = 'https://placehold.it/50x100'){
//         super(el, img);
//         this.quantity = el.quantity;
//     }
//     render(){
//     return `<div class="cart-item" data-id="${this.id_product}">
//             <div class="product-bio">
//             <img src="${this.img}" alt="Some image">
//             <div class="product-desc">
//             <p class="product-title">${this.product_name}</p>
//             <p class="product-quantity">Quantity: ${this.quantity}</p>
//         <p class="product-single-price">$${this.price} each</p>
//         </div>
//         </div>
//         <div class="right-block">
//             <p class="product-price">$${this.quantity*this.price}</p>
//             <button class="del-btn" data-id="${this.id_product}">&times;</button>
//         </div>
//         </div>`
//     }
// }
// const list2 = {
//     ProductsList: ProductItem,
//     Cart: CartItem
// };
//
// let cart = new Cart();
// let products = new ProductsList(cart);
// products.getJson(`getProducts.json`).then(data => products.handleData(data));


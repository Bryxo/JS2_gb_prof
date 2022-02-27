'use strict'
const products = [
   { id: 1, title: 'Notebook', price: 2000, img: 'http://dummyimage.com/120' },
   { id: 2, title: 'Mouse', price: 20 },
   { id: 3, title: 'Keyboard', price: 200 },
   { id: 4, title: 'Gamepad', price: 50 },
   { id: 5, title: 'CD', price: 5 },
   { id:666, title: 'anykey', price:6666, img: 'http://dummyimage.com/120' },
];
//Функция для формирования верстки каждого товара 
const renderProduct = ( {title, price, img = 'http://dummyimage.com/150'} ) => {    //принимает объект, берет из него title, price, img (если img нет, то по умолчанию 150) 
   return  `<div class="product-item">
               <h3>${title}</h3>
               <img src="${img}" alt="photo">
               <p>${price}</p>
               <button class="buy-btn">Купить</button>
            </div>`           //возвращает разметку (возвращается массив строк - в каждой свои title, price, img))
};
//Функция по отрисовке товаров на странице
const renderPage = list => { //list в данном случае это products - массив наших товаров (массив объектов)
   const productsList = list.map(item => renderProduct(item)).join(''); /*перебираем массив products методом .map 
   метод .map применяет к каждому элементу (в данном случае item - это объект) массива products функцию renderProduct
   и возвращает новый массив productsList. Методом join соединяем все элементы массива productsList через 'пробел', чтобы избавиться от запятых.*/
   //console.log(productsList);
   document.querySelector('.products').insertAdjacentHTML('beforeend', productsList); //определяем что и куда вставлять на странице
//короткая запись: 
//document.querySelector('.products').insertAdjacentHTML('beforeend', list.map(item => renderProduct(item)).join(''));
};

//вызов функции для отрисовки товаров на странице
renderPage(products);   //передаем ей products - массив наших товаров (массив объектов)


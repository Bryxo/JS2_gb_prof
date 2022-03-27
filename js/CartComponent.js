Vue.component('cart', { //компонент vue корзины
    props: ['cartItems', 'img', 'visibility'], /*принимает в виде параметров значение массива 
    cartItems, картинку и значение видимости (showcart) корзины*/
    template: //шаблон для показа всех элементов корзины
    `
        <div class="cart-block" v-show="visibility">
            <cart-item v-for="item of cartItems" :key="item.id_product" :img="img" :cart-item="item">
            </cart-item>
        </div>
    `
/* создаем вложенный компонент и в цикле for обходим каждый элемент корзины (item) массива cartItems и
для каждого товара корзины построим вложенный компонент, забирая у массива id, img, item */ 
});

Vue.component('cart-item', { //вложенный компонент cart-item (общий шаблон для всех товаров корзины)
    props: ['img', 'cartItem'],  //то что передается из компонента cart 
    //! если мы передаем из компонента элемент с названием через дефис (:cart-item), то такие элементы в props 
    //! принимаются через camelcase ('cartItem'). т.е. отправили с дефисом - приняли camelcase
    template:
    `
        <div class="cart-item">
            <div class="product-bio">
                <img :src="img" alt="Some img">
                <div class="product-desc">
                    <div class="product-title">{{ cartItem.product_name }}</div>
                    <div class="product-quantity">Quantity: {{ cartItem.quantity }}</div>
                    <div class="product-single-price">$ {{ cartItem.price }} each</div>
                </div>
            </div>
            <div class="right-block">
                <div class="product-price">{{cartItem.quantity*cartItem.price}}</div>
                <button class="del-btn" @click="$root.remove(cartItem)">&times;</button>
            </div>
        </div>
    `
/* кнопка удалить (class="del-btn") - по клику по кнопке удалить, мы запускаем событие remove из main.js, и 
направляем параметр для метода значение cartItem. */ 
/* :src="img" - значит что в src будет переменная img (полученная из внешнего элемента), а не текст img (как в случае с alt="Some img") */    
})
Vue.component('products', { //компонент vue товаров каталога
    props: ['products', 'img'], //принимает из атрибутов массив товаров filtered и картинку
    template: //шаблон вёрстки всех товаров (div class="products)
    `
        <div class="products">
            <product v-for="item of products" 
                :key="item.id_product" 
                :img="img"
                :product="item">
            </product>
        </div>
    `
/* создаем вложенный компонент и в цикле for обходим каждый элемент (item) массива products и
для каждого товара корзины построим вложенный компонент, забирая у массива id, img, item товара */    
});
Vue.component('product', { //вложенный компонент product (общий шаблон для всех товаров каталога)
    props: ['product', 'img'], //то что передается из компонента products
    template: 
    `
        <div class="product-item">
            <img :src="img" alt="Some img">
            <div class="desc">
                <h3>{{product.product_name}}</h3>
                <p>{{product.price}}</p>
                <button class="buy-btn" @click="$parent.$emit('add-product', product)">Купить</button>
            </div>
        </div>
    `
/* кнопка купить (class="buy-btn") - по клику по кнопке купить, мы запускаем событие 'add-product', и 
направляем параметр для метода значение product.
Также запуск можно сделать как @click="$root.addProduct(product)" */ 
/* :src="img" - значит что в src будет переменная img (полученная из внешнего элемента), а не текст img (как в случае с alt="Some img") */    
})

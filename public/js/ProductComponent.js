Vue.component('products', {  //products
    data(){
        return {
            catalogUrl: '/catalogData.json',
            filtered: [],
            products: [],
        //    imgProduct: 'imgCart' //править картинки
        }
    },
    mounted(){
        this.$parent.getJson(`/api/products`)
            .then(data => {
                for (let item of data){
                    this.$data.products.push(item);
                    this.$data.filtered.push(item);
                }
            });
    },
    methods: {
        filter(userSearch){
            let regexp = new RegExp(userSearch, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    template: //products
    `
    <div class="products"> 
        <div class="container product_box">
            <product v-for="product of filtered" 
                :key="product.id_product" 
                :img="product.imgProduct"
                :product="product"
                @add-product="$parent.$refs.cart.addProduct">
            </product>
        </div>   
    </div>
    `
});
Vue.component('product', { //product
    props: ['product', 'img'],
    template: 
    `
        <div class="product__item">
            <div class="product__item_up">
                <a href="#">
                <img :src="img" :alt="product.product_name" class="product__item_up_img" >
                    </a>
                <div class="overlay">
                    <button class="buy-btn" @click="$emit('add-product', product)">Купить</button>
                </div>
            </div>
            <div class="product__item_down">
                <p class="item_name"><a class="ref_product" href="#">{{product.product_name}}</a>
                </p>
                <p class="item_desc">{{product.product_desc}}</p>
                <p class="item_price">$<span class="item_price_value">{{product.price}}</span></p>
            </div>
        </div>
    `
})
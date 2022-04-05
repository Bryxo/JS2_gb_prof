Vue.component('filter-el', {
    data(){
        return {
            userSearch: ''
        }
    },
    template: `<form action="#" class="nav__search" @submit.prevent="$parent.$refs.products.filter(userSearch)">
                <input type="text" class="nav__box-search" placeholder="keyboard" v-model="userSearch">
                <button class="nav__btn__search" type="submit"><img src="img//img_nav/nav_search.svg" alt="search"></button>
            </form>`
})
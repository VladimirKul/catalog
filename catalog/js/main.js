let btnCart = document.querySelector('.header__cart')
let cartWrap = document.querySelector('.header__cartWrap')
let active = false

const API = 'https://raw.githubusercontent.com/VladimirKul/catalog/master/catalog'

class List {//супер класс списка товаров
    constructor(url, container) {
        //параметры, которые будут переназначаться при наследовании
        this.url = url
        this.container = container
        //общие
        this.items = []
        this.DTOarr = []
        this._init()
    }

    _init() {
        return false //заглушка, будет переопределятся
    }

    getJSON(url) {
        return fetch(url)
            .then(data => data.json())
            .then(data => {this.DTOarr = data})
    }

    render() {
        const block = document.querySelector(this.container)
        this.DTOarr.forEach(el => {
            let item = new lists[this.constructor.name](el)
            this.items.push(item)
            block.insertAdjacentHTML('beforeend', item.render())
        })
    }
}

class ListItem {
    constructor(el) {
        this.title = el.title
        this.price = el.price
        this.id = el.id
        this.img = el.img
    }

    render() {
        return `<div class="catalog__item">
                    <div class="catalog__blockimg">
                        <img src="img/${this.img}" alt="img" class="catalog__img">
                    </div>
                    <div class="catalog__title">${this.title}</div>
                    <div class="catalog__price">${this.price}<span> руб.</span></div>
                    <button class="catalog__btn"
                        data-id="${this.id}"
                        data-title="${this.title}"
                        data-price="${this.price}"
                        data-img="${this.img}">
                        Добавить в корзину
                    </button>
                </div>`
    }
}

class ProductList extends List {
    constructor(url = '/catalogData.json', container = '.catalog') {
        super(url, container)
    }

    _init() {
        this.getJSON(API + this.url)
            .finally(() => {
                this.render()
            })
    }
}

let product = new ProductList()

class ProductItem extends ListItem {

}

class CartList extends List {
    constructor(url = '/getBasket.json', container = '.header__cartWrap') {
        super(url, container)
    }

    _init() {
        this.getJSON(API + this.url)
            .finally(() => {
                this.render()
            })
    }
}

const lists = {
    ProductList: ProductItem,
    // CartList: CartItem
}

let activeCart = function() {
    if(active) {
        active = false
        cartWrap.style.visibility = "hidden"
    } else {
        active = true
        cartWrap.style.visibility = "visible"
    }
}

btnCart.addEventListener('click', activeCart)
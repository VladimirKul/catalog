const TITLE = ['Apple MacBook Pro 16', 'Apple MacBook Air 13', 'Apple iMac 27', 'Apple iMac Pro', 'Apple Mac mini', 'Apple Mac Pro']
const PRICE = ['222900', '114900', '199900', '399900', '102900', '349900']
const ID = [1, 2, 3, 4, 5, 6]
const IMG = ['macbook-pro.jpg', 'macbook-air.jpg', 'imac.jpg', 'imac-pro.jpg', 'mac-mini.jpg', 'mac-pro.jpg']

class Product {
    constructor(product) {
        this.title = product.title
        this.price = product.price
        this.id = product.id
        this.img = product.img
    }

    render() {
        return `<div class="catalog__item">
                    <div class="catalog__blockimg">
                        <img src="img/${this.img}" alt="img" class="catalog__img">
                    </div>
                    <div class="catalog__title">${this.title}</div>
                    <div class="catalog__price">2${this.price}<span> руб.</span></div>
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

class Products {
    constructor(block) {
        this.block = `.${block}`
        this.products = []
        this._init()
    }

    _init() {
        list.forEach(item => {
            this.products.push(new Product(item))
        })
        this.render()
    }

    render() {
        let block = document.querySelector(this.block)
        let str = ``

        this.products.forEach(item => {
            str += item.render()
        })

        block.innerHTML = str
    }
}

let  list = []

let getListProducts = function() {
    for(let i = 0; i < ID.length; i++) {
        list.push(getItemList(ID[i], TITLE[i], PRICE[i], IMG[i]))
    }
}

let getItemList = function(idProd, titleProd, priceProd, imgProd) {
    return {
        id: idProd,
        title: titleProd,
        price: priceProd,
        img: imgProd
    }
}

getListProducts()


let a = new Products('catalog')
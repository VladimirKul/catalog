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
        this.arrProducts = []
        this.catalogUrl = 'https://raw.githubusercontent.com/VladimirKul/catalog/master/catalog/catalogData.json'
        this._init()
    }

    _init() {
        this.getReq(this.catalogUrl)
    }

    getReq(url) {
        fetch(url)
            .then(data => data.json())
            .then(data => {this.arrProducts = data})
            .then(() => {
                this.arrProducts.forEach((item) => {
                    this.products.push(new Product(item))
                })
            })
            .then(() => {
                this.render()
            })
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

let a = new Products('catalog')
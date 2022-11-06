// inputs
const inputOne = [
    "2 book at 12.49",
    "1 music CD at 14.99",
    "1 chocolate bar at 0.85"
]

const inputTwo = [
    "1 imported box of chocolates at 10.00",
    "1 imported bottle of perfume at 47.50"
]

const inputThree = [
    "1 imported bottle of perfume at 27.99",
    "1 bottle of perfume at 18.99",
    "1 packet of headache pills at 9.75",
    "3 imported boxes of chocolates at 11.25"
]

class Product {
    #IMPORT_TAX_PERCENTAJE = 0.05
    #TAX_PERCENTAJE = 0.10

    constructor(item) {
        this.item = item
        this.description = ''
        this.price = 0
        this.subtotal = 0
        this.quantity = 0
        this.taxes = 0
        this.withTaxes = false
        this.isImported = false
        this.total = 0

        this.#setDescription()
        this.#setPrice()
        this.#setQuantity()
        this.#setSubtotal()
        this.#setWithTaxes()
        this.#setIsImported()
        this.#setTaxes()
        this.#calculateTotalPrice()
    }

    #setDescription = () => {
        this.description = this.item.split(" at ")[0]
    }

    #setPrice = () => {
        this.price = +this.item.split(" at ")[1]
    }

    #setQuantity = () => {
        this.quantity = +this.item.split(" ")[0]
    }

    #setSubtotal = () => {
        this.subtotal = +(this.price*this.quantity).toFixed(2)
    }
    
    #setTaxes = () => {
        let taxes = 0
        
        
        if (this.withTaxes)
            taxes += +(this.price*this.#TAX_PERCENTAJE).toFixed(2)
        
        if (this.isImported)
            taxes += +(this.price*this.#IMPORT_TAX_PERCENTAJE).toFixed(1)
        
        this.taxes = +(taxes).toFixed(2)
    }
    
    #setIsImported = () => {
        this.isImported = this.item.includes("imported")
    }
    
    #calculateTotalPrice = () => {
        this.total = +(this.quantity*(this.price+this.taxes)).toFixed(2)
    }
    
    
    #setWithTaxes = () => {
        const categoriesWithOutTaxes = [
            "chocolate",
            "book",
            "books",
            "chocolates",
            "pill",
            "headache"
        ]
        this.withTaxes = !categoriesWithOutTaxes.some(category => this.item.includes(category))
    }

}

class ShoppingBasket {

    constructor(input) {
        this.#addProducts(input)
    }

    #addProducts = (input) => {
        this.products = input.map(item => new Product(item))
    }

    #getTotalSale = () => {
        let total = 0
        this.products.forEach(product => {total += product.total})
        return total.toFixed(2)
    }

    #getTotalTaxes = () => {
        let taxes = 0
        this.products.forEach(product => {taxes += (product.taxes*product.quantity)})
        return taxes.toFixed(2)
    }

    showShoppingBasketDetails = () => {
        return this.products.map(product => {
            return `${product.description}: ${product.total}`
        }).join("\n").concat(`\nSales taxes: ${this.#getTotalTaxes()} \nTotal: ${this.#getTotalSale()}`)
    }
}


class Main {
    #selectOption = ()  => {
        const inputNumber = prompt(
            `chose an option\n
            (1): input 1\n
            (2): input 2\n
            (3): input 3\n
            (0): Exit
            `
        )
        
        switch (inputNumber) {
            case "1":
                return inputOne
            case "2":
                return inputTwo
            case "3":
                return inputThree
            case "0":
            case null:
                alert("Good bye!")
                return false
            default:
                alert("Wrong option try again")
                return this.#selectOption()
        }
    }
    
    start = () => {
        let input = true
        while(input) {
            input = this.#selectOption()
            if (!input) {
                console.log("Good bye!") 
                return false
            }
            const shoppingBasket = new ShoppingBasket(input)
            alert(shoppingBasket.showShoppingBasketDetails())
        }
    }
}

const main = new Main()
main.start()




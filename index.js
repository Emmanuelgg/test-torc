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

const getItemDescription = (item) => {
    return item.split(" at ")[0]
}

const getItemPrice = (item) => {
    return +item.split(" at ")[1]
}

const getItemQuantity = (item) => {
    return +item.split(" ")[0]
}

const getTaxes = (item, price) => {
    let taxes = 0

    if (itemWithTaxes(item))
        taxes += +(price*0.1).toFixed(2)
        
    if (isImported(item))
        taxes += +(price*0.05).toFixed(1)

    return taxes
}


const getItemSubTotalPrice = (quantity, price) => {
    return +(quantity*price).toFixed(2)
}

const isImported = (item) => {
    return item.includes("imported")
}

const itemWithTaxes = (item) => {
    const categoriesWithOutTaxes = [
        "chocolate",
        "book",
        "books",
        "chocolates",
        "pill",
        "headache"
    ]
    return !categoriesWithOutTaxes.some(category => item.includes(category))
}

const showShoppingBasketDetails = (input) => {
    let totalSale = 0, totalTaxes = 0
    const output = input.map(item => {
        const [
            description, 
            price, 
            quantity
        ] = [
            getItemDescription(item), 
            getItemPrice(item), 
            getItemQuantity(item)
        ]
        const subTotalItem = getItemSubTotalPrice(quantity, price)
        const taxes = getTaxes(item, subTotalItem)
        const totalItem = (subTotalItem + taxes).toFixed(2)
        totalSale += +totalItem
        totalTaxes += taxes
        return `${description}: ${totalItem}`
    }).join("\n").concat(`\nSales taxes: ${totalTaxes} \nTotal: ${totalSale}`)
    return output
}

const selectOption = ()  => {
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
            return selectOption()
    }
}

const main = () => {
    let option = true
    while(option) {
        option = selectOption()
        if (!option) {
            console.log("Good bye!") 
            return false
        }
        alert(showShoppingBasketDetails(option))
    }
}

main()


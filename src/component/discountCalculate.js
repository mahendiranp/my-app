function discountCalculate(price, discountPercent) {
    var numVal1 = price
    var numVal2 = discountPercent / 100;
    var totalValue = numVal1 - (numVal1 * numVal2)
    return totalValue.toFixed(2);
}

export default discountCalculate
// https://stackoverflow.com/a/35623341/8641842
class Item {
    constructor(name, price, quantity) {
        this.name = name;
        this.price = price;
        this.setQuantity(quantity);
    }
    
    setQuantity(q) {
        this.quantity = q;
    }
}
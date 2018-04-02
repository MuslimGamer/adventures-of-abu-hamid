// https://stackoverflow.com/a/35623341/8641842
class Item {
    constructor(name, price, quantity = 1) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }
}
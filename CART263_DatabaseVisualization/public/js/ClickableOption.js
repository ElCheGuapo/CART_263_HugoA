class ClickableOption {
    constructor(x, y, size, text) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.text = text;
    }

    display() {
        push();
        stroke(255);
        fill(200);
        rect(x, y, size, size);
        textSize(40);
        text(this.text, this.x + 10, this.y + 10, this.x + this.size - 10, this.y + this.size - 10);
        pop();
    }

    mousePressed() {
        console.log(this.text);
    }
}
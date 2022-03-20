
function Vector(x, y) {
    this.x = x;
    this.y = y;
    this.add = function(v) {
        this.x += v.x;
        this.y += v.y;
    }
    this.sub = function(v) {
        this.x -= v.x;
        this.y -= v.y;
    }
}

console.dir(new Vector());
console.log(new Vector());
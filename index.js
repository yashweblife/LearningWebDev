/* 
Todo : Create a vector class
Todo: Create a physics class
*/

function Vector(x=0, y=0) {
    this.x = x;
    this.y = y;
    this.mag = Math.sqrt(x * x + y * y);
    this.recalibrate = function() {
        this.mag = Math.sqrt(this.x * this.x + this.y * this.y);
    }
    this.add = function(v) {
        this.x += v.x;
        this.y += v.y;
        this.recalibrate();
    }
    this.sub = function(v) {
        this.x -= v.x;
        this.y -= v.y;
        this.recalibrate();
    }
    this.mult = function(n) {
        this.x *= n;
        this.y *= n;
        this.recalibrate();
    }
    this.div = function(n) {
        this.x /= n;
        this.y /= n;
        this.recalibrate();
    }
    this.normalize = function() {
        this.div(this.mag);
    }
    this.limit = function(n) {
        if (this.mag > n) {
            this.normalize();
            this.mult(n);
        }
        else if(this.mag < -n) {
            this.normalize();
            this.mult(-n);
        }
    }
    this.setMag = function(n) {
        this.normalize();
        this.mult(n);
    }
    this.getAngle = function(){
        return Math.atan2(this.y, this.x);
    }
    this.setAngle = function(a) {
        this.x = Math.cos(a);
        this.y = Math.sin(a);
        this.recalibrate();
    }
}

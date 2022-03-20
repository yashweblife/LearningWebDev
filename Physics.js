var canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext("2d");


function Physics(){
    this.gravity = new Vector(0,0.2);
    this.forces = [];
    this.position = new Vector(0,0);
    this.velocity = new Vector(0,0);
    this.acceleration = new Vector(0,0);
    this.mass = 1;
    this.friction = 0.9;
    this.direction = new Vector(0,0);
    this.angle = 0;
    this.angularVelocity = 0;
    this.angularAcceleration = 0;
    this.momentum = new Vector(0,0);
    this.angularMomentum = 0;
    this.torque = 0;

    this.update = ()=>{
        //calculate Acceleration
        if(this.forces.length>0){
            this.forces.forEach(f=>{
                f.multiply(1/this.mass)
                this.acceleration.add(f);
            })
        }
        this.acceleration.add(this.gravity);
        //calculate Velocity
        this.velocity.add(this.acceleration);
        //calculate Position
        this.position.add(this.velocity);
        this.acceleration.mult(0);
    }

    this.addForce = (force)=>{
        this.forces.push(force);
    }
    this.removeForce = (force)=>{
        this.forces.splice(this.forces.indexOf(force),1);
    }
    this.clearForces = ()=>{
        this.forces = [];
    }

}

function Box(){
    this.behaviour = new Physics();
    this.width = 100;
    this.height = 100;
    this.draw = (c)=>{
        c.beginPath();
        c.rect(this.behaviour.position.x,this.behaviour.position.y,this.width,this.height);
        c.fill();
        c.closePath();
    }
    this.bound = ()=>{
        if(this.behaviour.position.x < 0){
            this.behaviour.position.x = 0;
            this.behaviour.velocity.x *= -this.behaviour.velocity.x;
        }
        if(this.behaviour.position.x > canvas.width){
            this.behaviour.position.x = canvas.width;
            this.behaviour.velocity.x *= -this.behaviour.velocity.x;
        }
        if(this.behaviour.position.y < 0){
            this.behaviour.position.y = 0;
            this.behaviour.velocity.y *= -this.behaviour.velocity.y;
        }
        if(this.behaviour.position.y > canvas.height){
            this.behaviour.position.y = canvas.height;
            this.behaviour.velocity.y *= -this.behaviour.velocity.y;
        }
    }
    this.update = ()=>{
        this.bound();
        this.behaviour.update();
    }
}

var x = new Box();
function animate(){
    c.clearRect(0,0,canvas.width,canvas.height);
    x.draw(c);
    x.update();
    requestAnimationFrame(animate);
}
animate();

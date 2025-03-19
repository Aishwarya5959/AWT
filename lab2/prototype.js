const a={
    a1:"car",
    Speed(){
        console.log("speed")
    }
};
const cara=Object.create(a)
cara.a1="car a"
cara.Speed=function(){
    console.log("speed of "+this.a1 + "is 120");
}
cara.color=function(){
    console.log("color of "+this.a1 +"is red");
}
cara.prototype =Object.create(a.prototype);
cara.prototype.type=function(){
    console.log("type of "+this.a1+"is type a");
}
console.log(cara.species);
 cara.Speed();
 cara.color();
 cara.type();

class college{
    constructor(name,address){
        this.name=name;
        this.address=address;
    }
branch(){
    console.log("branch of"+this.name+"is xyz");
}
totalno(){
    console.log(this.name+" has 120 mem");
}
collinfo(){
    console.log(this.name+" is  located in"+ this.address);
}

}
const cvr=new college("cvr","vastunagar");
cvr.collinfo();
cvr.branch();
cvr.totalno();
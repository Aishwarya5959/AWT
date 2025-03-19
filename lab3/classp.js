class person{
    constructor(name,age){
        this.name=name;
        this.age=age;
    }
}
class student extends person{
    constructor(name,age,college){
        super(name,age);
        this.college=college;
    }
}
const s1=new student('ravi',25,'cvr');
console.log(s1);
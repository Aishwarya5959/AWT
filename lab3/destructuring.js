//arrays
let arr=[1,2,3,4,5,6]
let[one,,three]=arr;
console.log(one);
console.log(three);
//object
let person={
    fname:'joe',
    lname:'doe',
     
}
let first=person.fname;
console.log(person.age);
person.age=12;
console.log(person.age);
let person1= {
    fname:'ace',
    lname:'harry',
    age:9, 
} 
let {fname:f,lname:l,age:a}=person1;
console.log(f);
console.log(a);
//rest
const person3 = {
    n: 'Frank',
    age: 35,
    city: 'Berlin'
  };
  
  const {n, ...rest } = person3;
  
  console.log(n);  
  console.log(rest);  
  

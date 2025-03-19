function f1(name){
    console.log("in fun 1");
    var h="welcome";
    function f2(){
          var c="hello"
        console.log(h+" "+ name);
    }
    return f2;
}
const s1=f1("asima");
s1();
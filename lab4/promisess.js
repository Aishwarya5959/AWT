function step1(input) {
    return new Promise((resolve, reject) => {
    //   console.log("+ 1 :", input);
      resolve(input + 1);  
    });
  }
  function step2(input){
    return new Promise((resolve,reject)=>{
        // console.log("+ 2 :", input);
        resolve(input+2);
    });
  }
  function step3(){
    return new Promise((resolve,reject)=>{
        resolve(input+3);
    });
  }
  step1()
  .then(result => {
    return step2(2);
  })
  .then(result => {
    return step3(result);
  })
  .catch(error => {
    console.error('Error:', error);
  });
 
function step1(input, callback) {
    setTimeout(() => {
      console.log("Step 1 :", input);
      callback(input * 1);   
    }, 1000);
  }
  
  function step2(input, callback) {
    setTimeout(() => {
      console.log("Step 2 :", input);
      callback(input * 2);   
    }, 1000);
  }
  
  function step3(input, callback) {
    setTimeout(() => {
      console.log("Step 3 :", input);
      callback(input * 3);  
    }, 1000);
  }
  
  function step4(input, callback) {
    setTimeout(() => {
      console.log("Step 4:", input);
      callback(input * 4);   
    }, 1000);
  }
  
  step1(5, (result1) => {
    step2(result1, (result2) => {
      step3(result2, (result3) => {
        step4(result3, (result4) => {
          console.log("Final result:", result4);
        });
      });
    });
  });
  
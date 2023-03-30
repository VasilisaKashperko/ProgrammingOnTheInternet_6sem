function square(num) {
    return new Promise((resolve, reject) => {
      if (typeof num !== 'number') {
        reject('Invalid input: not a number');
      } else {
        resolve(num * num);
      }
    });
  }
  
  function cube(num) {
    return new Promise((resolve, reject) => {
      if (typeof num !== 'number') {
        reject('Invalid input: not a number');
      } else {
        resolve(num * num * num);
      }
    });
  }
  
  function power4(num) {
    return new Promise((resolve, reject) => {
      if (typeof num !== 'number') {
        reject('Invalid input: not a number');
      } else {
        resolve(num * num * num * num);
      }
    });
  }
  
  Promise.all([square(2), cube(3), power4(4)])
  .then(results => {
    console.log(results); // [4, 27, 256]
  })
  .catch(error => {
    console.log(error);
  });

  Promise.all([square('a'), cube('b'), power4('c')])
  .then(results => {
    console.log(results); // Никогда не будет выполнено
  })
  .catch(error => {
    console.log(error); // Invalid input: not a number
  });
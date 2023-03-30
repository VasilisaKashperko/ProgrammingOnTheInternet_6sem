function square(num) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isNaN(num)) {
        reject("Invalid input");
      } else {
        resolve(num * num);
      }
    }, Math.random() * 2000 + 1000);
  });
}

function cube(num) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isNaN(num)) {
        reject("Invalid input");
      } else {
        resolve(num * num * num);
      }
    }, Math.random() * 2000 + 1000);
  });
}

function fourthPower(num) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isNaN(num)) {
        reject("Invalid input");
      } else {
        resolve(num * num * num * num);
      }
    }, Math.random() * 2000 + 1000);
  });
}

const squarePromise = square(2);
const cubePromise = cube(2);
const fourthPowerPromise = fourthPower(2);

Promise.race([squarePromise, cubePromise, fourthPowerPromise])
  .then(result => {
    console.log(`The first function to resolve is: ${result}`);
  })
  .catch(error => {
    console.log(`All functions rejected with error: ${error}`);
  });


Promise.any([squarePromise, cubePromise, fourthPowerPromise])
  .then(result => {
    console.log(`The first function to resolve is: ${result}`);
  })
  .catch(error => {
    console.log(`All functions rejected with error: ${error}`);
  });
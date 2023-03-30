// Определяем функцию thirdJob, принимающую параметр data и возвращающую Promise
function thirdJob(data) {
    return new Promise((resolve, reject) => {
      // Если data не является числом, немедленно отклоняем Promise
      if (typeof data !== "number") {
        reject(new Error("error"));
      }
      // Если data является нечетным числом, разрешаем Promise через 1 секунду со значением "odd"
      else if (data % 2 !== 0) {
        setTimeout(() => {
          resolve("odd");
        }, 1000);
      }
      // Если data является четным числом, отклоняем Promise через 2 секунды со значением "even"
      else {
        setTimeout(() => {
          reject(new Error("even"));
        }, 2000);
      }
    });
  }
  
  // Вызываем функцию thirdJob с разными значениями параметра data и обрабатываем результат через обработчики Promise
  thirdJob("not a number")
    .then(result => {
      console.log(result);
    })
    .catch(error => {
      console.error(error);
    });
  
  thirdJob(3)
    .then(result => {
      console.log(result);
    })
    .catch(error => {
      console.error(error);
    });
  
  thirdJob(4)
    .then(result => {
      console.log(result);
    })
    .catch(error => {
      console.error(error);
    });
  
  // обрабатываем результат через async/await c try/catch
  (async () => {
    try {
      const result1 = await thirdJob("not a number");
      console.log(result1);
    } catch (error) {
      console.error(error);
    }
  
    try {
      const result2 = await thirdJob(3);
      console.log(result2);
    } catch (error) {
      console.error(error);
    }
  
    try {
      const result3 = await thirdJob(4);
      console.log(result3);
    } catch (error) {
      console.error(error);
    }
  })();  
// Определяем функцию firstJob, возвращающую Promise
function firstJob() {
    return new Promise((resolve, reject) => {
      // Через 2 секунды разрешаем Promise со значением "Hello World"
      setTimeout(() => {
        resolve("Hello World");
      }, 2000);
    });
  }
  
  // обрабатываем результат через обработчики Promise
  firstJob()
    .then(result => {
      console.log(result);
    })
    .catch(error => {
      console.error(error);
    });
  
  // обрабатываем результат через async/await c try/catch
  (async () => {
    try {
      const result = await firstJob();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  })();
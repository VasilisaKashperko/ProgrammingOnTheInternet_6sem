// Определяем функцию secondJob, возвращающую Promise
function secondJob() {
    return new Promise((resolve, reject) => {
      // Через 3 секунды отклоняем Promise с сообщением об ошибке
      setTimeout(() => {
        reject(new Error("Something went wrong"));
      }, 3000);
    });
  }
  
  // обрабатываем результат через обработчики Promise
  secondJob()
    .then(result => {
      console.log(result);
    })
    .catch(error => {
      console.error(error);
    });
  
  // обрабатываем результат через async/await c try/catch
  (async () => {
    try {
      const result = await secondJob();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  })();
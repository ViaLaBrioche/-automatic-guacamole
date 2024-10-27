const { Builder } = require("selenium-webdriver");
const { authorization } = require("./authorization") 

 async function go() {


    //lunch the browser
    let driver = new Builder().forBrowser("safari").build();

    // Данные для авторизации
    const forAuth = {
        userLogin: "632140912",
        userPassword: "222333",
        driver,
    }

    // Открываем страницу сайта в браузере
    await driver.get("https://mb1.bbr.ru/web_banking/protected/welcome.jsf")
    // Авторизация
    await authorization(forAuth)
    // Рублевый перевод

    // Валютный перевод

    // Перевод между своими счетами

    // Обмен валют
    
}

go()

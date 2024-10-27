const { Builder } = require("selenium-webdriver");
const { authorization } = require("./authorization"); 
const { test1 } = require("./test1");
const { test2 } = require("./test2");

 async function start() {


    //lunch the browser
    let driver = new Builder().forBrowser("safari").build();

    // Данные для авторизации
    const forAuth = {
        userLogin: "632140912",
        userPassword: "222333",
        driver,
    }

    const forPayOtherBankFL = {
        rcptName: "Широков Михаил Сергеевич",
        rcptAccount: "40817810638128598169",
        rcptBankBic: "044525225",
        driver,
    }

    // Открываем страницу сайта в браузере
    await driver.get("https://mb1.bbr.ru/web_banking/protected/welcome.jsf")
    // Авторизация
    await authorization(forAuth)
    // Рублевый перевод
    // await test1(forPayOtherBankFL)
    await test2(driver)
    // Валютный перевод

    // Перевод между своими счетами

    // Обмен валют
    
}

start()

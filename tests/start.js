const { Builder } = require("selenium-webdriver");
const { authorization } = require("./authorization"); 
const { test1 } = require("./test1");
const { test2 } = require("./test2");
const { test3 } = require("./test3");

 async function start() {


    //lunch the browser
    let driver = new Builder().forBrowser("safari").build();
    await driver.executeScript("window.moveTo(0,0); window.resizeTo(screen.width, screen.height)")
    

    // Данные для авторизации
    const forAuth = {
        userLogin: "632140912",
        userPassword: "222333",
        driver,
    }
    // Данные для Рублевого перевода
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
    await test1(forPayOtherBankFL)

    // Перевод между своими счетами
    await test2(driver)

    // Валютный переводs
    await test3(driver)

    // Обмен валют
    
}

start()

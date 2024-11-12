const { Builder } = require("selenium-webdriver");
const { authorization } = require("./authorization"); 
const { test1 } = require("./test1");
const { test2 } = require("./test2");
const { test3 } = require("./test3");
const { test4 } = require("./test4");

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

    // Данные для Рублевого перевода (ФЛ внутри банка)
    const forPayThisBankFL = {
        rcptName: "Белявская Алена Андреевна",
        amount: "101.01",
        rcptAccount: "40817810602108200525",
        rcptBankBic: "044525769",
        paymentDetails: "Перевод ФЛ внутри банка",
        rcptINN: 0,
        rcptKPP: 0,
        driver,
    }

    // Данные для Рублевого перевода (ФЛ сторонний банк)
    const forPayOtherBankFL = {
        rcptName: "Широков Михаил Сергеевич",
        amount: "101.02",
        rcptAccount: "40817810638128598169",
        rcptBankBic: "044525225",
        paymentDetails: "Перевод ФЛ в сторонний банк",
        rcptINN: 0,
        rcptKPP: 0,
        driver,
    }

    // Данные для Рублевого перевода (ЮЛ)
    const forPayUL = {
        rcptName: "ООО СП-СанТехМонтаж",
        amount: "101.03",
        rcptAccount: "40702810540480003993",
        rcptBankBic: "044525225",
        paymentDetails: "Перевод ЮЛ",
        rcptINN: "5050047525",
        rcptKPP: "505001001",
        driver,
    }

    // Данные для Рублевого перевода (ИП)
    const forPayIP = {
        rcptName: "Перевод ИП",
        amount: "101.04",
        rcptAccount: "40802810202100001918",
        rcptBankBic: "044525225",
        paymentDetails: "Перевод ЮЛ",
        rcptINN: "771587310093",
        rcptKPP: 0,
        driver,
    }

    // Открываем страницу сайта в браузере
    await driver.get("https://mb1.bbr.ru/web_banking/protected/welcome.jsf")

    // Авторизация
    await authorization(forAuth)
    console.log('Авторизация успешно выполнена')

    // Рублевый перевод (ФЛ внутри банка)
    await test1(forPayThisBankFL)
    console.log('Тест_1.1 успешно выполнен')

    // Рублевый перевод (ФЛ сторонний банк)
    await test1(forPayOtherBankFL)
    console.log('Тест_1.2 успешно выполнен')

    // Рублевый перевод (ЮЛ)
    await test1(forPayUL)
    console.log('Тест_1.3 успешно выполнен')

     // Рублевый перевод (ИП)
     await test1(forPayIP)
     console.log('Тест_1.4 успешно выполнен')


    // Перевод между своими счетами
    await test2(driver)
    console.log('Тест_2 успешно выполнен')

    // Валютный переводs
    await test3(driver)
    console.log('Тест_3 успешно выполнен')

    // Обмен валют 
    await test4(driver)
    console.log('Тест_4 успешно выполнен')

    // // CБП С2С
    // await test5(driver)

    // // СБП Ме2Ме
    // await test6(driver)
    

    console.log('Тестирование успешно завершено')
}

start()

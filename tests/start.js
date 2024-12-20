const { Builder, until, By } = require("selenium-webdriver");
const { authorization } = require("./authorization"); 
const { test1 } = require("./test1");
const { test2 } = require("./test2");
const { test3 } = require("./test3");
const { test4 } = require("./test4");
const { test5 } = require("./test5");
const { test6 } = require("./test6");
const { testSBP } = require("./testSBP");


 async function start() {


    //lunch the browser
    let driver = new Builder().forBrowser("safari").build();
    await driver.executeScript("window.moveTo(0,0); window.resizeTo(screen.width, screen.height)")
    
    // Функция выбор счета
    async function accountSelection(accountName, accountType) {
        await driver.wait(until.elementLocated(By.xpath(`//*[@id="dropdown_${accountType}"]/div-tag[2]/a/div-tag/div-tag[1]/span-tag[1]`), 20000));
        const accountList = await driver.findElements(By.xpath(`//*[@id="dropdown_${accountType}"]/div-tag[2]/a/div-tag/div-tag[1]/span-tag[1]`));
        for (let acc of accountList) {
            const text = await acc.getText();
            if (text === accountName) {
                await acc.click();
                console.log("функция завершилась")
                break; // Остановимся после первого клика
                }
            }
        }

    //функция ожидания выполнения операции
    async function waitingFinishOperation() {
        await driver.wait(async () => {
            try {
                const element = await driver.findElement(By.xpath('//*[@id="globalMsgBox"]/div[1]/div/span'));
                await driver.wait(until.elementLocated(By.xpath('//*[@id="globalMsgBox"]/div[1]/div/span')), 20000);
                const text = await element.getText();
                return text === "Заявление успешно отправлено в банк"; // Возвращаем true или false по результату
            } catch (error) {
                // Если элемент не найден, возвращаем false, чтобы попробовать снова
                return false; 
            }
        }, 20000);
    }
    const url = "mb"
    // Данные для авторизации
    const authData = {
        url,
        userLogin: "sbp_bbr",
        userPassword: "1qaz!QAZ",
        driver,
    }

    // Данные для Рублевого перевода (ФЛ внутри банка)
    const forPayThisBankFL = {
        url,
        rcptName: "Белявская Алена Андреевна",
        amount: "101.01",
        rcptAccount: "40817810602108200525",
        rcptBankBic: "044525769",
        paymentDetails: "Перевод ФЛ внутри банка",
        rcptINN: 0,
        rcptKPP: 0,
        accountDebitName: "Текущий счет Тест+",
        waitingFinishOperation,
        accountSelection,
        driver,
    }

    // Данные для Рублевого перевода (ФЛ сторонний банк)
    const forPayOtherBankFL = {
        url,
        rcptName: "Широков Михаил Сергеевич",
        amount: "101.02",
        rcptAccount: "40817810638128598169",
        rcptBankBic: "044525225",
        paymentDetails: "Перевод ФЛ в сторонний банк",
        rcptINN: 0,
        rcptKPP: 0,
        accountDebitName: "Текущий счет Тест+",
        waitingFinishOperation,
        accountSelection,
        driver,
    }

    // Данные для Рублевого перевода (ЮЛ)
    const forPayUL = {
        url,
        rcptName: "ООО СП-СанТехМонтаж",
        amount: "101.03",
        rcptAccount: "40702810540480003993",
        rcptBankBic: "044525225",
        paymentDetails: "Перевод ЮЛ",
        rcptINN: "5050047525",
        rcptKPP: "505001001",
        accountDebitName: "Текущий счет Тест+",
        waitingFinishOperation,
        accountSelection,
        driver,
    }

    // Данные для Рублевого перевода (ИП)
    const forPayIP = {
        url,
        rcptName: "Перевод ИП",
        amount: "101.04",
        rcptAccount: "40802810202100001918",
        rcptBankBic: "044525225",
        paymentDetails: "Перевод ЮЛ",
        rcptINN: "771587310093",
        rcptKPP: 0,
        accountDebitName: "Текущий счет Тест+",
        waitingFinishOperation,
        accountSelection,
        driver,
    }

    const betweenAccounts = {
        url,
        accountDebitName: "Текущий счет Тест+",
        accountCreditName: "До востребования Тест+",
        amount: "102.00",
        waitingFinishOperation,
        accountSelection,
        driver,
    }

    const forPayCurrency = {
        url,
        accountDebitName: "Текущий счет Тест+",
        waitingFinishOperation,
        accountSelection,
        driver,
    }

    const exchangeRurTry = {
        url,
        accountDebitName: "Текущий счет Тест+",
        accountCreditName: "Валютный счет Тест+",
        amount: "104.00",
        waitingFinishOperation,
        accountSelection,
        driver,
    }

    const openDeposit = {
        url,
        accountDebitName: "Текущий счет Тест+",
        amount: "105.00",
        waitingFinishOperation,
        accountSelection,
        driver,
    }

    const openAccount = {
        url,
        branchName: 'Дополнительный офис "Химки"',
        accountCurrency: "Российский рубль (RUR)",
        waitingFinishOperation,
        accountSelection,
        driver,
    }

    const exchangeTryRur = {
        url,
        accountDebitName: "Валютный Тест+",
        accountCreditName: "Текущий счет Тест+",
        amount: "105.00",
        accountSelection,
        waitingFinishOperation,
        driver,
        
    }
    // Авторизация на mb1
    await authorization(authData)
    console.log('Авторизация успешно выполнена')

    // Рублевый перевод (ФЛ внутри банка)
    await test1(forPayThisBankFL)
    console.log('Тест_1.1 успешно выполнен')

    // Рублевый перевод (ФЛ сторонний банк)
    await test1(forPayOtherBankFL)
    console.log('Тест_1.2 успешно выполнен')

    // for (let test of dataTest1) {
    //     await test1(test);
    //     let number = 1
    //     console.log(`Тест_1.${number++} успешно выполнен`)
    //     }

    // Рублевый перевод (ЮЛ)
    await test1(forPayUL)
    console.log('Тест_1.3 успешно выполнен')

    // Рублевый перевод (ИП)
    await test1(forPayIP)
    console.log('Тест_1.4 успешно выполнен')

    // Перевод между своими счетами
    await test2(betweenAccounts)
    console.log('Тест_2 успешно выполнен')

    // Валютный перевод
    await test3(forPayCurrency)
    console.log('Тест_3 успешно выполнен')

    // Обмен валют (рубль-валюта)
    await test4(exchangeRurTry)
    console.log('Тест_4.1 успешно выполнен')


    // Открытие вклада (До востребования)
    await test5(openDeposit)
    console.log('Тест_5 успешно выполнен')

    // Открытие текущего счета
    await test6(openAccount)
    console.log('Тест_6 успешно выполнен')

    // // Обмен валют (валюта-рубль)
    // await test4(exchangeTryRur)
    // console.log('Тест_4.2 успешно выполнен')

    // // CБП С2С (не доделан)
    // await testSBP(forPayThisBankFL)

    console.log('Тестирование успешно завершено')
}

start()

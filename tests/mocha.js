const { Builder, until, By } = require("selenium-webdriver");
const chai = import('chai');
const expect = chai.expect;
const { authorization } = require("./authorization"); 
const { test1 } = require("./test1");
const { test2 } = require("./test2");
const { test3 } = require("./test3");
const { test4 } = require("./test4");
const { test5 } = require("./test5");
const { test6 } = require("./test6");

describe("Тесты с Selenium", function () {
    
    let driver = new Builder().forBrowser("safari").build();
    driver.executeScript("window.moveTo(0,0); window.resizeTo(screen.width, screen.height)")
    //Тестовый контур
    const url = "mb1"

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
    };
    
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
    };

    it("Авторизация", async function() {
        const authData = {
            url,
            userLogin: "e.volkova",
            userPassword: "1qaz!QAZ",
            driver,
        };
       await authorization(authData)
    });

    it("Рублевый перевод ФЛ (внутри банка)", async function() {
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
        };
        await test1(forPayThisBankFL)
    });
    
    it("Рублевый перевод ФЛ (стронний банка)", async function() {
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
        };
        await test1(forPayOtherBankFL)
    });

    it("Рублевый перевод ЮЛ", async function() {
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
        await test1(forPayUL)
    });

    it("Рублевый перевод ИП", async function() {
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
        await test1(forPayIP)
    });
    
    it("Между своими счетами", async function() {
        const betweenAccounts = {
            url,
            accountDebitName: "Текущий счет Тест+",
            accountCreditName: "До востребования Тест+",
            amount: "102.00",
            waitingFinishOperation,
            accountSelection,
            driver,
        }
        await test2(betweenAccounts)
    });

    it("Валютный перевод", async function() {
        const forPayCurrency = {
            url,
            accountDebitName: "Текущий счет Тест+",
            waitingFinishOperation,
            accountSelection,
            driver,
        }
        await test3(forPayCurrency)
    });

    it("Обмен валют", async function() {
        const exchangeRurTry = {
            url,
            accountDebitName: "Текущий счет Тест+",
            accountCreditName: "Валютный счет Тест+",
            amount: "104.00",
            waitingFinishOperation,
            accountSelection,
            driver,
        }
        await test4(exchangeRurTry)
    });

    it("Открытие вклада", async function() {
        const openDeposit = {
            url,
            accountDebitName: "Текущий счет Тест+",
            amount: "105.00",
            waitingFinishOperation,
            accountSelection,
            driver,
        }
        await test5(openDeposit)
    });

    it("Открытие счета", async function() {
        const openAccount = {
            url,
            branchName: 'Дополнительный офис "Химки"',
            accountCurrency: "Российский рубль (RUR)",
            waitingFinishOperation,
            accountSelection,
            driver,
        }
        await test6(openAccount)
    });

});
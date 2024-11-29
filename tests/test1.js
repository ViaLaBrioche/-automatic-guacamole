const {By, until} = require("selenium-webdriver");

 async function test1({driver, rcptName, rcptAccount, rcptBankBic, rcptINN, rcptKPP, paymentDetails, amount, accountDebitName, accountSelection, waitingFinishOperation, url}) {

    //Переход на страницу создания рублевого перевода
    await driver.get(`https://${url}.bbr.ru/web_banking/protected/doc/rubles_transfer/new`);
    await console.log(0.1)
    await driver.wait(until.elementLocated(By.id('AMOUNT'), 20000));
    await console.log(0)
    //Находим поле Сумма и заполняем
    await driver.findElement(By.id("AMOUNT")).sendKeys(amount);
    await console.log(1)
    //Находим выпадающий список Списать с
    await driver.findElement(By.id("dropdown_PAYER_ACCOUNT")).click();
    await console.log(2)
    await driver.wait(until.elementLocated(By.xpath('//*[@id="dropdown_PAYER_ACCOUNT"]/div-tag[2]'), 20000));
    await console.log(3)
    //Выбираем счет списания
    await accountSelection(accountDebitName, 'PAYER_ACCOUNT')
    await console.log(4)
    //Находим и заполняем назначение платежа
    await driver.findElement(By.id("PAYMENT_DETAILS:text_area_with_converter")).sendKeys(paymentDetails);
    await console.log(5)
    //Находим и нажимаем кнопку НДС
    await driver.findElement(By.id("ADD_NDS_LINK")).click();
    await console.log(6)
    //Находим и Заполняем ФИО получателя
    await driver.findElement(By.id("RCPT_NAME")).sendKeys(rcptName);
    await console.log(7)

    //Находим и Заполняем ИНН получателя (при наличии)
    if (rcptINN !== 0) {
        await driver.findElement(By.id("RCPT_INN")).sendKeys(rcptINN);
    }
    await console.log(8)
    //Находим и Заполняем КПП получателя (при наличии)
    if (rcptKPP !== 0) {
        await driver.findElement(By.id("RCPT_KPP")).sendKeys(rcptKPP);
    }
    await console.log(9)
    //Находим и заполняем номер счета получателя
    await driver.findElement(By.id("RCPT_ACCOUNT")).sendKeys(rcptAccount);
    await console.log(1)
    //Находим и заполняем БИК получателя
    await driver.findElement(By.id("RCPT_BANK_BIC")).sendKeys(rcptBankBic);
    await console.log(2)
    //Находим Чекбокс согласие с тарифным планом и ставим галочку
    await driver.findElement(By.xpath("//*[@id='agreement:AGREEMENT']/span[1]/label/span")).click();
    await console.log(3)
    await driver.sleep(1000)
    //Находим кнопку Далее
    await driver.findElement(By.id("j_id_5e_g4:nextBtnAjax")).click();
    await console.log(4)
    //Ожидание загрузки страницы
    const btnSubmit = await driver.wait(until.elementLocated(By.id('j_id_5e_2ls:sendBtn'), 20000));
    // Ожидаем видимого состояния кнопки "Отправить в банк"
    await driver.wait(until.elementIsVisible(btnSubmit), 20000);
    await console.log(5)
    //Нажимаем кнопку отправить в банк
    await btnSubmit.click();
    await console.log(6)
    //Ожидание выполнения операции 
    await waitingFinishOperation()
    await console.log(7)
}

module.exports = { test1 } 



const {By, until} = require("selenium-webdriver");

 async function test1({driver, rcptName, rcptAccount, rcptBankBic, rcptINN, rcptKPP, paymentDetails, amount, accountDebitName, accountSelection, waitingFinishOperation}) {
    //Переход на страницу создания рублевого перевода
    await driver.get("https://mb1.bbr.ru/web_banking/protected/doc/rubles_transfer/new");
    //Находим поле Сумма и заполняем
    await driver.findElement(By.id("AMOUNT")).sendKeys(amount);
    //Находим выпадающий список Списать с
    await driver.findElement(By.className("select-text")).click();
    //Выбираем счет списания
    await accountSelection(accountDebitName, 'PAYER_ACCOUNT')
    //Находим и заполняем назначение платежа
    await driver.findElement(By.id("PAYMENT_DETAILS:text_area_with_converter")).sendKeys(paymentDetails);
    //Находим и нажимаем кнопку НДС
    await driver.findElement(By.id("ADD_NDS_LINK")).click();
    //Находим и Заполняем ФИО получателя
    await driver.findElement(By.id("RCPT_NAME")).sendKeys(rcptName);

    //Находим и Заполняем ИНН получателя (при наличии)
    if (rcptINN !== 0) {
        await driver.findElement(By.id("RCPT_INN")).sendKeys(rcptINN);
    }
    //Находим и Заполняем КПП получателя (при наличии)
    if (rcptKPP !== 0) {
        await driver.findElement(By.id("RCPT_KPP")).sendKeys(rcptKPP);
    }

    //Находим и заполняем номер счета получателя
    await driver.findElement(By.id("RCPT_ACCOUNT")).sendKeys(rcptAccount);
    //Находим и заполняем БИК получателя
    await driver.findElement(By.id("RCPT_BANK_BIC")).sendKeys(rcptBankBic);
    //Находим Чекбокс согласие с тарифным планом и ставим галочку
    await driver.findElement(By.xpath("//*[@id='agreement:AGREEMENT']/span[1]/label/span")).click();
    //Находим кнопку Далее
    await driver.findElement(By.id("j_id_5e_g4:nextBtnAjax")).click();
    //Ожидание загрузки страницы
    await driver.wait(until.elementLocated(By.id('j_id_5e_2ls:sendBtn'), 20000));
    //Нажимаем кнопку отправить в банк
    await driver.findElement(By.id('j_id_5e_2ls:sendBtn')).click();
    //Ожидание выполнения операции 
    await waitingFinishOperation()
    // await driver.wait(async ()=> {
    //     //Ожидание появления окна уведомления
    //     await driver.wait(until.elementLocated(By.xpath('//*[@id="globalMsgBox"]/div[1]/div/span'), 10000))
    //     return await driver.findElement(By.xpath('//*[@id="globalMsgBox"]/div[1]/div/span'))
    //     .getText() === "Заявление успешно отправлено в банк"
    //     }, 20000)
}

module.exports = { test1 } 



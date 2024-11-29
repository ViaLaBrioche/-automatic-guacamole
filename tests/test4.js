const {By, until} = require("selenium-webdriver");

 async function test4({driver, accountSelection, accountDebitName, accountCreditName, waitingFinishOperation, amount, url}) {
    //Переход на страницу перевода между своими счетами
    await driver.get(`https://${url}.bbr.ru/web_banking/protected/doc/currency_exchange/new`);
    await driver.wait(until.elementLocated(By.id("j_id_5e_1e_2_5"), 20000));
    //Находим поле Сумма списания
    await driver.findElement(By.id("j_id_5e_1e_2_5")).sendKeys(amount); 
    //Находим выпадающий список Cписать сawait console.log(7)
    await driver.findElement(By.id("dropdown_DEBIT_CURRENCY")).click();
    //Выбираем счет cписания
    await accountSelection(accountDebitName, 'DEBIT_CURRENCY')
    //Находим выпадающий список Зачислить на
    await driver.findElement(By.id("dropdown_CREDIT_CURRENCY")).click();
    //Выбираем счет зачисления
    await accountSelection(accountCreditName, 'CREDIT_CURRENCY')
    //Находим Чекбокс согласие с тарифным планом и ставим галочку
    await driver.findElement(By.xpath("//*[@id='agreement:AGREEMENT']/span[1]/label/span")).click();  
    //нажимаем кнопку Далее
    await driver.findElement(By.id("j_id_5e_3j:nextBtnAjax")).click();

    //Ожидаем появления предупреждения
    const serviceWarningButton = await driver.wait(until.elementLocated(By.xpath('//*[@id="j_id_5e_3j:serviceWarningDlg:serviceWarningDlg:j_id_5e_45"]')), 20000);
    // Ожидаем видимого состояния элемента
    await driver.wait(until.elementIsVisible(serviceWarningButton), 20000);
    //Подтверждаем кнопкой Да
    await serviceWarningButton.click();
    //Ожидаем загрузки страницы
    await driver.wait(until.elementLocated(By.id('j_id_5e_hv:sendBtn')), 20000);
    //Нажимаем кнопку Отправить в банк
    await driver.findElement(By.id("j_id_5e_hv:sendBtn")).click();
    await waitingFinishOperation()
}

module.exports = { test4 }
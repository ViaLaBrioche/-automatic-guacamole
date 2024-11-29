const {By, until} = require("selenium-webdriver");

 async function test2({driver, accountDebitName, accountSelection, accountCreditName, waitingFinishOperation, amount, url}) {
    //Переход на страницу перевода между своими счетами
    await driver.get(`https://${url}.bbr.ru/web_banking/protected/doc/internal_transfer/new`);
    await console.log(0)
    await driver.wait(until.elementLocated(By.id('j_id_5e_1g_2_5'), 20000));
    await console.log(0.1)
    //Находим поле Сумма и заполняем
    await driver.findElement(By.id("j_id_5e_1g_2_5")).sendKeys(amount); 
    await console.log(1)
    //Находим выпадающий список Зачислить на
    await driver.findElement(By.id("dropdown_CREDIT_CURRENCY")).click();
    await console.log(2)
    //Выбираем счет зачисления
    await accountSelection(accountCreditName, 'CREDIT_CURRENCY')
    //Находим выпадающий список Списать с
    await driver.findElement(By.id("dropdown_DEBIT_CURRENCY")).click();
    await console.log(3)
    //Выбираем счет cписания
    await accountSelection(accountDebitName, 'DEBIT_CURRENCY')
    //Находим Чекбокс согласие с тарифным планом и ставим галочку
    await driver.findElement(By.xpath("//*[@id='agreement:AGREEMENT']/span[1]/label/span")).click();
    await console.log(4)
    //Ожидание после Чек-бокса позволяющее прогрузиться полю Сумма
    await driver.sleep(1000)
    //нажимаем кнопку Далее
    await driver.findElement(By.id("j_id_5e_a3:nextBtn")).click();
    await console.log(5)
    //Ожидание загрузки страницы
    const btnSubmit = await driver.wait(until.elementLocated(By.id('j_id_5e_uv:sendBtn'), 20000));
    await console.log(6)
    // Ожидаем видимого состояния кнопки "Отправить в банк"
    await driver.wait(until.elementIsVisible(btnSubmit), 20000);
    //Нажимаем кнопку Отправить в банк
    await btnSubmit.click();
    await console.log(7)
    await waitingFinishOperation()
    await console.log(8)
}

module.exports = { test2 }
const {By, until} = require("selenium-webdriver");

 async function test2({driver, accountDebitName, accountSelection, accountCreditName, waitingFinishOperation}) {
    //Переход на страницу перевода между своими счетами
    await driver.get("https://mb1.bbr.ru/web_banking/protected/doc/internal_transfer/new");
    //Находим поле Сумма и заполняем
    await driver.findElement(By.id("j_id_5e_1g_2_5")).sendKeys(102.02); 
    //Находим выпадающий список Зачислить на
    await driver.findElement(By.id("dropdown_CREDIT_CURRENCY")).click();
    //Выбираем счет зачисления
    await accountSelection(accountCreditName, 'CREDIT_CURRENCY')
    //Находим выпадающий список Списать с
    await driver.findElement(By.id("dropdown_DEBIT_CURRENCY")).click();
    //Выбираем счет cписания
    await accountSelection(accountDebitName, 'DEBIT_CURRENCY')
    //Находим Чекбокс согласие с тарифным планом и ставим галочку
    await driver.findElement(By.xpath("//*[@id='agreement:AGREEMENT']/span[1]/label/span")).click();
    //Ожидание после Чек-бокса позволяющее прогрузиться полю Сумма
    await driver.sleep(500)
    //нажимаем кнопку Далее
    await driver.findElement(By.id("j_id_5e_a3:nextBtn")).click();
    //Ожидаем загрузки страницы
    await driver.wait(until.elementLocated(By.id('j_id_5e_uv:sendBtn'), 20000));
    //Нажимаем кнопку Отправить в банк
    await driver.findElement(By.id("j_id_5e_uv:sendBtn")).click();
    await waitingFinishOperation()
}

module.exports = { test2 }
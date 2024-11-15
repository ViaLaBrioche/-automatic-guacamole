const {By, until} = require("selenium-webdriver");

 async function test2({driver, accountDebitName, accountSelection, accountCreditName, waitingFinishOperation}) {
    //Переход на страницу перевода между своими счетами
    await driver.get("https://mb1.bbr.ru/web_banking/protected/doc/internal_transfer/new");
    //Находим поле Сумма и заполняем
    await driver.findElement(By.id("j_id_5e_1g_2_5")).sendKeys(102.02); 
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
    //Ожидаем загрузки страницы
    await driver.wait(until.elementLocated(By.id('j_id_5e_uv:sendBtn'), 20000));
    await console.log(6)
    //Нажимаем кнопку Отправить в банк
    await driver.findElement(By.id("j_id_5e_uv:sendBtn")).click();
    await console.log(7)
    await waitingFinishOperation()
    await console.log(8)
}

module.exports = { test2 }
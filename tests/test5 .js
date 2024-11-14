const {By, until, Key} = require("selenium-webdriver");

 async function test5({driver, rcptPhoneNumber, rcptBank, amount, accountDebitName, accountSelection, waitingFinishOperation}) {
    //Переход на страницу создания рублевого перевода
    await driver.get("https://mb.bbr.ru/web_banking/protected/doc/sbp_transfer/new");
    //Находим поле Сумма и заполняем
    await driver.findElement(By.id("AMOUNT")).sendKeys('100.10');
    //Находим выпадающий список Списать с
    await driver.findElement(By.id("dropdown_CLIENT_ACCOUNT")).click();
    //Выбираем счет списания
    await accountSelection("Текущий счет Тест+", 'CLIENT_ACCOUNT')
    //Находим и заполняем номер телефона получателя
    await driver.findElement(By.id("RCPT_ID:phone")).sendKeys("9775997641");
    await driver.sleep(2000)
    //Находим и раскрываем выпадающее меню Банк получателя
    await driver.findElement(By.id('RCPT_BANK_SBP_MEMBER_ID:search_input')).click()
    await driver.sleep(6000)
    await driver.findElement(By.xpath("//*[@id='RCPT_BANK_SBP_MEMBER_ID:banks:0:item_label']")).click()
    await driver.sleep(6000)
    //Находим Чекбокс согласие с тарифным планом и ставим галочку
    await driver.findElement(By.xpath("//*[@id='agreement:AGREEMENT']/span[1]/label/span")).click();
    await driver.sleep(6000)
    //Находим кнопку Далее
    await driver.findElement(By.id("j_id_5e_2r:nextBtnAjax")).click();
    //Ожидание загрузки страницы
    await driver.wait(until.elementLocated(By.id('j_id_5e_1uo:sendBtn'), 20000));
    //Нажимаем кнопку отправить в банк
    await driver.findElement(By.id('j_id_5e_1uo:sendBtn')).click();
    //Ожидание выполнения операции 
    await waitingFinishOperation()
}

module.exports = { test5 } 



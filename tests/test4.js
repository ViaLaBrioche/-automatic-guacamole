const {By, until} = require("selenium-webdriver");

 async function test4(driver) {
    //Переход на страницу перевода между своими счетами
    await driver.get("https://mb1.bbr.ru/web_banking/protected/doc/currency_exchange/new");
    //Находим поле Сумма списания
    await driver.findElement(By.id("j_id_5e_1e_2_5")).sendKeys(104.40); 
    //Находим выпадающий список Зачислить на
    await driver.findElement(By.id("dropdown_CREDIT_CURRENCY")).click();
    //Выбираем счет зачисления
    await driver.findElement(By.xpath("//*[@id='dropdown_CREDIT_CURRENCY']/div-tag[2]/a[69]")).click();
    //Находим выпадающий список Списать с
    await driver.findElement(By.id("dropdown_DEBIT_CURRENCY")).click();
    //Выбираем счет списания
    await driver.findElement(By.xpath("//*[@id='dropdown_DEBIT_CURRENCY']/div-tag[2]/a[61]")).click();
    //Находим Чекбокс согласие с тарифным планом и ставим галочку
    await driver.findElement(By.xpath("//*[@id='agreement:AGREEMENT']/span[1]/label/span")).click();  
    //нажимаем кнопку Далее
    await driver.findElement(By.id("j_id_5e_3j:nextBtnAjax")).click();
    await driver.sleep(3000)
    //Ожидаем появления предупреждения
    await driver.wait(until.elementLocated(By.id('j_id_5e_3j:serviceWarningDlg:serviceWarningDlg:j_id_5e_45'), 20000));
    //Нажимаем кнопку Да
    await driver.findElement(By.id("j_id_5e_3j:serviceWarningDlg:serviceWarningDlg:j_id_5e_45")).click();
    //Ожидаем загрузки страницы
    await driver.wait(until.elementLocated(By.id('j_id_5e_hv:sendBtn'), 20000));
    //Нажимаем кнопку Отправить в банк
    await driver.findElement(By.id("j_id_5e_hv:sendBtn")).click();
    await driver.sleep(6000)
}

module.exports = { test4 }
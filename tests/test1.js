const {By, until} = require("selenium-webdriver");

 async function test1({driver, rcptName, rcptAccount, rcptBankBic}) {
    //Переход на страницу создания рублевого перевода
    await driver.get("https://mb1.bbr.ru/web_banking/protected/doc/rubles_transfer/new");
    //Находим поле Сумма и заполняем
    await driver.findElement(By.id("AMOUNT")).sendKeys(100.01);
    //Находим выпадающий список Списать с
    await driver.findElement(By.className("select-text")).click();
    //Выбираем счет списания
    await driver.findElement(By.xpath("//*[@id='dropdown_PAYER_ACCOUNT']/div-tag[2]/a[58]")).click();
    //Находим и заполняем назначение платежа
    await driver.findElement(By.id("PAYMENT_DETAILS:text_area_with_converter")).sendKeys("Перевод ФЛ в сторонний банк тест");
    //Находим и нажимаем кнопку НДС
    await driver.findElement(By.id("ADD_NDS_LINK")).click();
    //Находим и Заполняем ФИО получателя
    await driver.findElement(By.id("RCPT_NAME")).sendKeys(rcptName);
    //Находим и заполняем номер счета получателя
    await driver.findElement(By.id("RCPT_ACCOUNT")).sendKeys(rcptAccount);
    //Находим и заполняем БИК получателя
    await driver.findElement(By.id("RCPT_BANK_BIC")).sendKeys(rcptBankBic);
    //Находим Чекбокс согласие с тарифным планом и ставим галочку
    await driver.findElement(By.xpath("//*[@id='agreement:AGREEMENT']/span[1]/label/span")).click();
    //Находим кнопку Далее
    await driver.findElement(By.id("j_id_5e_g4:nextBtnAjax")).click();
    //Ожидание загрузки страницы
    await driver.wait(until.elementLocated(By.id('j_id_5e_2ls:sendBtn'), 10000));
    //Нажимаем кнопку отправить в банк
    await driver.findElement(By.id('j_id_5e_2ls:sendBtn')).click();

}

module.exports = { test1 } 



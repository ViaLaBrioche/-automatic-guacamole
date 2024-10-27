const {By, until} = require("selenium-webdriver");

 async function test2(driver) {
    //Переход на страницу перевода между своими счетами
    await driver.get("https://mb1.bbr.ru/web_banking/protected/doc/internal_transfer/new");
    //Находим выпадающий список Списать с
    await driver.findElement(By.className("select-text")).click();
    //Выбираем счет списания
    await driver.findElement(By.xpath("//*[@id='dropdown_PAYER_ACCOUNT']/div-tag[2]/a[58]")).click();
    //Находим поле Сумма и заполняем
    await driver.findElement(By.id("AMOUNT")).sendKeys(100.02);
    //Находим выпадающий список Зачислить на
    await driver.findElement(By.xpath("//*[@id='dropdown_CREDIT_CURRENCY']/div-tag[1]")).click();

    //*[@id="dropdown_CREDIT_CURRENCY"]/div-tag[1]
    //Находим и Выбираем счет списания
    await driver.findElement(By.xpath("//*[@id='dropdown_PAYER_ACCOUNT']/div-tag[2]/a[58]")).click();
    await driver.sleep(5000)

}

module.exports = { test2 } 



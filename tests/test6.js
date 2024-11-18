const {By, until} = require("selenium-webdriver");

 async function test5({driver, accountSelection, accountDebitName, waitingFinishOperation, amount}) {
    //Переход на страницу перевода между своими счетами
    await driver.get("https://mb1.bbr.ru/web_banking/protected/showcase");
    await driver.wait(until.elementLocated(By.id(`j_id_5d_7o:17:j_id_5d_7p:j_id_5d_8v`), 20000));
    await driver.findElement(By.id('j_id_5d_7o:17:j_id_5d_7p:j_id_5d_8v')).click()
    await driver.sleep(2000)
    await driver.wait(until.elementLocated(By.xpath(`//*[@id="RATE_ID"]/tbody/tr/td/label[1]/span`), 20000));
    await driver.findElement(By.xpath('//*[@id="RATE_ID"]/tbody/tr/td/label[1]/span')).click()
    await driver.sleep(2000)
    await driver.findElement(By.id("AMOUNT")).sendKeys(amount);
    await driver.findElement(By.id('dropdown_accountsId')).click()
    await accountSelection(accountDebitName, "accountsId")
    //Находим Чекбокс согласие с тарифным планом и ставим галочку
    await driver.findElement(By.xpath("//*[@id='agreement:AGREEMENT']/span[1]/label/span")).click();
    //нажимаем кнопку Далее
    await driver.findElement(By.id("j_id_5e_4p:nextBtnAjax")).click();
    await driver.wait(until.elementLocated(By.id(`j_id_5e_1mq:nextBtnAjax`), 20000));
    await driver.findElement(By.id("j_id_5e_1mq:nextBtnAjax")).click();
    await driver.wait(until.elementLocated(By.id(`j_id_5e_23h:sendBtn`), 20000));
    await driver.findElement(By.id("j_id_5e_23h:sendBtn")).click();
    
    await waitingFinishOperation()
}

module.exports = { test5 }
const {By, until} = require("selenium-webdriver");

 async function test5({driver, accountSelection, accountDebitName, waitingFinishOperation, amount, url}) {
    //Переход в раздел Витрина (Вклады)
    await driver.get(`https://${url}.bbr.ru/web_banking/protected/showcase`);
    await console.log(0)
    await driver.findElement(By.id('j_id_5d_7o:17:j_id_5d_7p:j_id_5d_8v')).click()
    await console.log(1)
    await driver.sleep(2000)
    await driver.wait(until.elementLocated(By.xpath(`//*[@id="RATE_ID"]/tbody/tr/td/label[1]/span`), 20000));
    await console.log(2)
    await driver.findElement(By.xpath('//*[@id="RATE_ID"]/tbody/tr/td/label[1]/span')).click()
    await driver.sleep(2000)
    await console.log(3)
    await driver.findElement(By.id("AMOUNT")).sendKeys(amount);
    await console.log(4)
    await driver.findElement(By.id("dropdown_accountsId")).click();
    await console.log(5)
    await accountSelection(accountDebitName, "accountsId")
    await console.log(6)
    //Находим Чекбокс согласие с тарифным планом и ставим галочку
    await driver.findElement(By.xpath("//*[@id='agreement:AGREEMENT']/span[1]/label/span")).click();
    await console.log(7)
    //нажимаем кнопку Далее
    await driver.findElement(By.id("j_id_5e_4p:nextBtnAjax")).click();
    await console.log(8)
    const btnNext = await driver.wait(until.elementLocated(By.id(`j_id_5e_1mq:nextBtnAjax`), 20000));
    await console.log(9)
    await driver.wait(until.elementIsVisible(btnNext), 20000);
    await driver.sleep(8000)
    await btnNext.click();
    await console.log(10)
    //Ожидание загрузки страницы
    const btnSubmit = await driver.wait(until.elementLocated(By.id('j_id_5e_23h:sendBtn'), 20000));
    await console.log(11)
    // Ожидаем видимого состояния кнопки "Отправить в банк"
    await driver.wait(until.elementIsVisible(btnSubmit), 20000);
    await console.log(12)
    //Нажимаем кнопку отправить в банк
    await btnSubmit.click();
    await console.log(13)
    
    await waitingFinishOperation()
}

module.exports = { test5 }
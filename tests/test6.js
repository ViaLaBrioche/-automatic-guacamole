const {By, until} = require("selenium-webdriver");

 async function test6({driver, branchName, waitingFinishOperation, accountCurrency, url}) {
    //Переход на страницу перевода между своими счетами
    await driver.get(`https://${url}.bbr.ru/web_banking/protected/showcase`);
    await console.log(0)
    await driver.findElement(By.id('j_id_5d_38:j_id_5d_39')).click()
    await console.log(1)
    await driver.wait(until.elementLocated(By.id("j_id_5d_9h:0:j_id_5d_a5"), 20000));
    await console.log(2)
    await driver.findElement(By.id('j_id_5d_9h:0:j_id_5d_a5')).click()
    await console.log(3)
    await driver.wait(until.elementLocated(By.id("dropdown_BANK_DEPARTMENT"), 20000));
    await console.log(4)
    await driver.findElement(By.id('dropdown_BANK_DEPARTMENT')).click()
    await console.log(5)
    await driver.wait(until.elementLocated(By.xpath(`//*[@id="dropdown_BANK_DEPARTMENT"]/div-tag[2]/a`), 20000));
    await console.log(6)
    const branchList = await driver.findElements(By.xpath(`//*[@id="dropdown_BANK_DEPARTMENT"]/div-tag[2]/a`));
    await console.log(7)
    for (let acc of branchList) {
        const text = await acc.getText();
        if (text === branchName) {
            await acc.click();
            console.log("функция завершилась")
            break; // Остановимся после первого клика
            }
        }
    await console.log(8)

    await driver.findElement(By.id('dropdown_ISO_CURRENCY')).click()
    await console.log(9)
    await driver.wait(until.elementLocated(By.xpath(`//*[@id="dropdown_ISO_CURRENCY"]/div-tag[2]/a`), 20000));
    await console.log(10)
    const currencyList = await driver.findElements(By.xpath(`//*[@id="dropdown_ISO_CURRENCY"]/div-tag[2]/a`));
    await console.log(11)
    for (let acc of currencyList) {
        const text = await acc.getText();
        if (text === accountCurrency) {
            await acc.click();
            console.log("функция завершилась")
            break; // Остановимся после первого клика
            }
        }
        await console.log(12)
    //Находим Чекбокс согласие с тарифным планом и ставим галочку
    await driver.findElement(By.xpath("//*[@id='agreement:AGREEMENT']/span[1]/label/span")).click();
    await console.log(13)
    //нажимаем кнопку Далее
    await driver.findElement(By.id("j_id_5d_3d:nextBtn")).click();
    await console.log(14)
    //Ожидание загрузки страницы
    const btnSubmit = await driver.wait(until.elementLocated(By.id('j_id_5d_1ui:sendBtn'), 20000));
    await console.log(15)
    // Ожидаем видимого состояния кнопки "Отправить в банк"
    await driver.wait(until.elementIsVisible(btnSubmit), 20000);
    await console.log(16)
    //Нажимаем кнопку отправить в банк
    await btnSubmit.click();
    await console.log(17)
    await waitingFinishOperation()
}

module.exports = { test6 }
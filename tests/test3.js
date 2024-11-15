const {By, until, Key} = require("selenium-webdriver");

 async function test3({driver, accountDebitName, accountSelection, waitingFinishOperation}) {

    //Открытие модального окна "страна" и выбор желаемой по номеру кода
    async function filterListModal(code) {
        await driver.wait(async ()=> {
            //Ожидание открытия модального окна
            await driver.wait(until.elementLocated(By.id('REFERENCE:COUNTRIES_REF_SEARCH_FORM:countryCode'), 10000))
            //Находим и заполняем поле Код страны
            await driver.findElement(By.id("REFERENCE:COUNTRIES_REF_SEARCH_FORM:countryCode")).sendKeys(code, Key.ENTER);
            return await driver.findElement(By.id('REFERENCE:COUNTRIES_REF_DATA_FORM:j_id_5e_15s:prfx_j_id_5e_15s_data:0:country_code'))
            .getText() === code
            }, 10000)
    }

    

    //Переход на страницу перевода между своими счетами
    await driver.get("https://mb1.bbr.ru/web_banking/protected/doc/currency_transfer/new")
    
    // Находим выпадающий список Списать с
    await driver.findElement(By.id("dropdown_CLN_ACCOUNT")).click();
    await console.log(1)
    //Выбираем счет списания
    await accountSelection(accountDebitName, 'CLN_ACCOUNT')
    //Находим блок Назначение платежа и заполняем его
    await driver.findElement(By.id("PAYMENT_DETAILS:text_area")).sendKeys("Test");
    await console.log(2)
    //Находим выпадающее меню Расходы по переводу и открываем
    await driver.findElement(By.id("dropdown_commissionTypeCombo")).click();
    await console.log(3)
    //Выбираем вариант оплаты расходов
    await driver.findElement(By.xpath("//*[@id='dropdown_commissionTypeCombo']/div-tag[2]/a[3]")).click();
    await console.log(4)
    //Находим Чекбокс согласие с тарифным планом и ставим галочку
    await driver.findElement(By.xpath("//*[@id='transfer_details']/tbody/tr[9]/td[2]/label/span")).click();
    await console.log(5)
    //Находим поле ФИО получателя и заполняем его
    await driver.findElement(By.id("RCPT_NAME")).sendKeys('Hunan fulide Technology Co., Ltd');
    await console.log(6)
    //Находим кнопку Выбрать из справочника (Страна получателя)
    await driver.findElement(By.id('j_id_5e_3d:j_id_5e_3d')).click();
    await console.log(7)
    //Ожидание окончания фильтрации (Когда первый элемент списка будет иметь значение 840)
    await filterListModal('840')
    await console.log(8)

    //Выбираем страну по клику
    await driver.findElement(
        By.xpath("//*[@id='REFERENCE:COUNTRIES_REF_DATA_FORM:j_id_5e_15s:prfx_j_id_5e_15s_data:0:country_name']"))
        .click();

        await console.log(9)
    //Находим поле город получателя и заполняем его
    await driver.findElement(By.id("RCPT_CITY")).sendKeys('Sarasota');
    await console.log(10)
    //Находим поле Адрес получателя и заполняем его
    await driver.findElement(By.id("RCPT_ADDR")).sendKeys('23, Garden holl');
    await console.log(11)
    //Находим поле счет получателя и заполняем его
    await driver.findElement(By.id("RCPT_ACCOUNT")).sendKeys('43050180463600000854');
    await console.log(12)

    //Находим кнопку Выбрать из справочника (Страна банка получателя)
    await driver.findElement(By.id('j_id_5e_4l:j_id_5e_4l')).click();
    await console.log(13)
    await driver.wait(async ()=> {
        //Ожидание открытия модального окна
        await driver.wait(until.elementLocated(By.id('REFERENCE:COUNTRIES_REF_SEARCH_FORM:countryCode'), 10000))
        //Находим и очищаем поле Код страны 
        await driver.findElement(By.id("REFERENCE:COUNTRIES_REF_SEARCH_FORM:countryCode")).clear()
        //Находим и заполняем поле Код страны
        await driver.findElement(By.id("REFERENCE:COUNTRIES_REF_SEARCH_FORM:countryCode")).sendKeys("031", Key.ENTER)
        //Ожидание фильтрации поиска
        return await driver.findElement(By.id('REFERENCE:COUNTRIES_REF_DATA_FORM:j_id_5e_15s:prfx_j_id_5e_15s_data:0:country_code'))
        .getText() === "031"
        }, 10000)
        await console.log(14)
    //Выбираем страну по клику
    await driver.findElement(
        By.xpath("//*[@id='REFERENCE:COUNTRIES_REF_DATA_FORM:j_id_5e_15s:prfx_j_id_5e_15s_data:0:country_name']"))
        .click();
        await console.log(15)
    //Находим кнопку Выбрать из справочника (SWIFT банка получателя)
    await driver.findElement(By.id('j_id_5e_47:j_id_5e_47')).click();
    await console.log(16)
    await driver.wait(async ()=> {
        //Ожидание открытия модального окна
        await driver.wait(until.elementLocated(By.id('REFERENCE:SWIFT_REF_SEARCH_FORM:mfoText'), 10000))
        //Находим и заполняем поле SWIFT
        await driver.findElement(By.id("REFERENCE:SWIFT_REF_SEARCH_FORM:mfoText")).sendKeys("AZRTAZ22XXX", Key.ENTER)
        //Ожидание фильтрации поиска
        return await driver.findElement(By.id('REFERENCE:SWIFT_REF_DATA_FORM:j_id_5e_ll:prfx_j_id_5e_ll_data:0:swift'))
        .getText() === "AZRTAZ22XXX"
        }, 10000)
        await console.log(17)
       //Выбираем SWIFT
    await driver.findElement(
    By.id("REFERENCE:SWIFT_REF_DATA_FORM:j_id_5e_ll:prfx_j_id_5e_ll_data:0:swift"))
    .click();
    await console.log(18)
    //Находим поле Наименование (Банк-получатель)
    await driver.findElement(By.id("RCPT_BNK_NAME")).sendKeys('AZER-TURK BANK');
    await console.log(19)
    //Находим поле номер счета получателя и заполняем его
    await driver.findElement(By.id("RCPT_BNK_ACCOUNT")).sendKeys('6786536788865');
    await console.log(20)
    //Находим Чекбокс согласие с тарифным планом и ставим галочку
    await driver.findElement(By.xpath("//*[@id='agreement:AGREEMENT']/span[1]/label/span")).click();
    await console.log(21)
    //Находим поле Сумма и заполняем
    await driver.executeScript("document.getElementById('AMOUNT').value='100.03'")
    await console.log(22)
    //нажимаем кнопку Далее
    await driver.findElement(By.id("j_id_5e_eu:nextBtnAjax")).click();
    await console.log(23)
    //Ожидаем загрузки страницы
    await driver.wait(until.elementLocated(By.id('j_id_5e_2lc:sendBtn'), 20000));
    await console.log(24)
    //Нажимаем кнопку Отправить в банк
    await driver.findElement(By.id("j_id_5e_2lc:sendBtn")).click(); 
    await console.log(25)
    await waitingFinishOperation()
    await console.log(26)
}

module.exports = { test3 } 
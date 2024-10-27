const {By, until} = require("selenium-webdriver");

 async function authorization({userLogin, userPassword, driver}) {

    // Находим поле Логин и заполняем
    await driver.findElement(By.id("j_id_5g_5:login")).sendKeys(userLogin)
    
    // Функция ожидания активации кнопки (пока атрибут кнопки "Войти" исчезнет и кнопка станет активной)
    async function waitButtonEnabled(elementId) {
        await driver.wait(async ()=> {
        return await driver.findElement(By.id(elementId)).getAttribute('disabled') === null
        }, 10000)
    }

    // Запускаем функцию ожидания активации кнопки
    await waitButtonEnabled("j_id_5g_5:loginBtn")
    // Нажимаем кнопку "Войти" на странице ввода логина
    await driver.findElement(By.id("j_id_5g_5:loginBtn")).click()
    // Ожидаем пока страница загрузится 
    await driver.wait(until.elementLocated(By.id('password_common'), 10000));
    // Находим поле Пароль и заполняем
    await driver.findElement(By.id("password_common")).sendKeys(userPassword)
    // Запускаем функцию ожидания активации кнопки
    await waitButtonEnabled("loginButton")
    // Нажимаем кнопку "Войти" на странице ввода пароля и авторизуемся 
    await driver.findElement(By.id("loginButton")).click()
    // Ожидание выполнения авторизации и загрузки страницы
    await driver.wait(until.elementLocated(By.id('menuLine'), 10000));

}

module.exports = { authorization } 



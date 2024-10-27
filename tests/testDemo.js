const {Builder, By} = require("selenium-webdriver");
const userLogin= "632140912"
const userPassword = "222333"

 async function auth() {
 
    //lunch the browser
    let driver = new Builder().forBrowser("safari").build();
    
    await driver.get("https://mb1.bbr.ru/web_banking/protected/welcome.jsf")
    // Находим элемент поле Логин и заполняем
    await driver.findElement(By.id("j_id_5g_5:login")).sendKeys(userLogin)
    // ожидание Активации кнопки Войти
    await driver.sleep(500)
    // Находим кнопку войти и клик
    await driver.findElement(By.id("j_id_5g_5:loginBtn")).click()
    // Ожидание загрузки страницы
    await driver.sleep(1000)
    // Находим поле Пароль и заполняем
    await driver.findElement(By.id("password_common")).sendKeys(userPassword)
    // Ожидание активации кнопки Войти
    await driver.sleep(500)
    // Находим кнопку Войти и клик
    await driver.findElement(By.id("loginButton")).click()
    // Ожидание загрузки страницы
    await driver.sleep(2000)

    await driver.get("https://mb1.bbr.ru/web_banking/protected/doc/rubles_transfer/new")
    await driver.sleep(10000)
}

auth()


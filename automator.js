const express =require('express');
const dotenv = require('dotenv');
dotenv.config({path :'./config.env'});
const app=express();
require('chromedriver');
const swd = require('selenium-webdriver');

const tab = new swd.Builder().forBrowser('chrome').build();
const Opentab = tab.get('https://netacces.iitm.ac.in/');

Opentab
    .then(()=> tab.manage().setTimeouts({implicit:10000}))
    .then(() => tab.findElement(swd.By.xpath('./html/body/div[2]/div/form/div[1]/input')))
    .then((username)=> username.sendKeys(process.env.ROLLNO))
    .then(() => tab.findElement(swd.By.xpath('./html/body/div[2]/div/form/div[2]/input')))
    .then((password)=> password.sendKeys(process.env.PASSWORD))
    .then(() => tab.findElement(swd.By.xpath('./html/body/div[2]/div/form/div[3]/button')))
    .then((logIn) => logIn.click())
    .then(() => tab.findElement(swd.By.xpath('./html/body/div[2]/div/div[1]/div[2]/a')))
    .then((approve) => approve.click())
    .then(() => tab.findElement(swd.By.xpath('./html/body/div[2]/div/div[1]/form/div[2]/label/input')))
    .then((oneDay)=> oneDay.click())
    .then(() => tab.findElement(swd.By.xpath('./html/body/div[2]/div/div[1]/form/div[4]/button')))
    .then((authorize) => authorize.click())
    .then(() => tab.close())
    .then(()=>{
        console.log("authorisation is complete")
        setTimeout(() => process.exit(0),2000);
    })
    .catch((err) => {
        tab.close();
        console.log(err);
        console.log('The automation is unsuccessful');
        
    });

app.listen(8000,()=>{
    console.log('Server is running succesfully');
})


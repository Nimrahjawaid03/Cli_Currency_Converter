#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
const exchangeRates = {
    "USD": 1,
    "PKR": 278.65,
    "AED": 3.67,
    "INR": 83.37,
};
// -----------------Setting Object Properties in Array----------------------
const currencyChoices = Object.keys(exchangeRates);
// ------------------Do-While Variable----------------------------
let isContinue = true;
// ---------------------Do-While Condition---------------------------
do {
    // -------------------Questions--------------------------
    const userAnswer = await inquirer.prompt([
        {
            type: "list",
            name: "fromCurrency",
            message: "/nSelect the currency you're converting from:",
            choices: currencyChoices
        },
        {
            type: "list",
            name: "toCurrency",
            message: "/nSelect the currency you're converting to:",
            choices: currencyChoices
        },
        {
            type: "number",
            name: "amount",
            message: "/nEnter the amount you want to convert:"
        }
    ]);
    // -------------------------------Converted Amount-----------------------------------
    const convertedAmount = Number((exchangeRates[userAnswer.toCurrency] / exchangeRates[userAnswer.fromCurrency] * userAnswer.amount).toFixed(2));
    console.log(chalk.green.bold(`/n/tConverted amount: ${convertedAmount} ${userAnswer.toCurrency}💱`));
    // -------------------------------Reverse Conversion---------------------------------------
    const reserveConvertedAmount = Number((exchangeRates[userAnswer.fromCurrency] / exchangeRates[userAnswer.toCurrency] * convertedAmount).toFixed(2));
    console.log(chalk.yellow(`\tReverse converted amount: ${reserveConvertedAmount} ${userAnswer.fromCurrency}💱`));
    // ------------------------------Display Exchange Rate------------------------------------
    const exchangeRate = exchangeRates[userAnswer.toCurrency] / exchangeRates[userAnswer.fromCurrency];
    console.log(chalk.blue(`\tExchange rate: 1 ${userAnswer.fromCurrency} = ${exchangeRate.toFixed(4)} ${userAnswer.toCurrency}`));
    // ------------------------------Continue option----------------------------------
    const userContinue = await inquirer.prompt([{
            type: "confirm",
            name: "continueAns",
            message: "\nDo you want to continue:"
        }]);
    if (userContinue.continueAns === false) {
        isContinue = false;
    }
    // -----------------------------While Condition--------------------------------
} while (isContinue === true);
// ----------------------------Bey Message--------------------------------
console.log(chalk.magenta("\n\tGoodbye! Have a great day! 😊"));

#! /usr/bin/env node
import { differenceInSeconds } from "date-fns";
import inquirer from "inquirer";
import chalk from "chalk";
console.log(chalk.green.bold("\n\tCountdown-timer create by Hania Khan\n"));
const response = await inquirer.prompt([
    {
        name: "userInput",
        type: "number",
        message: "Please enter the amount Of seconds",
        validate: (input) => {
            if (isNaN(input)) {
                return "Please enter the valid number";
            }
            else if (input > 60) {
                return "Seconds must be in 60";
            }
            else {
                return true;
            }
        }
    },
]);
let input = response.userInput;
function startTime(value) {
    const intTime = new Date().setSeconds(new Date().getSeconds() + value);
    const intervalTime = new Date(intTime);
    setInterval(() => {
        const currentTime = new Date();
        const timeDiff = differenceInSeconds(intervalTime, currentTime);
        if (timeDiff <= 0) {
            console.log(chalk.yellow.bold("\n\tTimer has expired"));
            process.exit();
        }
        const minute = Math.floor((timeDiff % (3600 * 24)) / 3600);
        const second = Math.floor(timeDiff % 60);
        console.log(`${minute.toString().padStart(2, "0")}:${second.toString().padStart(2, "0")}`);
    }, 1000);
}
startTime(input);

import { open } from 'node:fs/promises';
import { Buffer } from 'node:buffer';


async function readFile () {
    const inputFile = await open('./day-1-input.txt');
    let inputString;
    
    for await (const chunk of inputFile.readableWebStream()) {
        inputString = Buffer.from(chunk).toString();
    }
    
    await inputFile.close()
    
    return inputString.split('\n')
}

function formatInput(inputArray) {
    let formattedArray = [];
    let tempArray = [];

    inputArray.forEach(e => {
        if (e  !== '') {
            tempArray.push(e);
        } else {
            formattedArray.push(tempArray);
            tempArray = [];
        }
    })
    return formattedArray;
}


function findMostCalories(formattedInput, calorieArray = []) {
    if (calorieArray.length === 3) {
        const summedTotal = calorieArray.reduce((a,c) => parseInt(a) + parseInt(c));
        return summedTotal;
    }
    
    let mostCalories = 0;
    let mostCaloriesIndex = 0;

    for (let i = 0; i < formattedInput.length; i++) {
        const elfArray = formattedInput[i];
        const currentMealCalorieTotal = elfArray.reduce((a,c) => parseInt(a) + parseInt(c))
        if (currentMealCalorieTotal > mostCalories) {
            mostCalories = currentMealCalorieTotal;
            mostCaloriesIndex = i;
        }
    }

    calorieArray.push(parseInt(mostCalories))
    formattedInput.splice(mostCaloriesIndex, 1);
    return findMostCalories(formattedInput, calorieArray);
}

const inputArray = await readFile();
const formattedInput = formatInput(inputArray);
findMostCalories(formattedInput);
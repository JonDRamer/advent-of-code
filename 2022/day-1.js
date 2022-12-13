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


function findMostCalories(inputArray) {
    let mostCalories = 0;
    let tempArray = []
    let tempArrayCalories = 0;

    for (let i = 0; i < inputArray.length; i++) {
        const element = inputArray[i];
        tempArray.push(element)
    
        if (element === '') {
            tempArrayCalories = tempArray.filter((e) => e !== '' ).reduce((a,b) => parseInt(a) + parseInt(b))
            mostCalories = tempArrayCalories > mostCalories ? tempArrayCalories : mostCalories;
            tempArray = [];
            tempArrayCalories = 0;
        }
    }
    
    return mostCalories;
}

const inputArray = await readFile()
findMostCalories(inputArray)
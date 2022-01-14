const inputArray = process.env.INPUT_ARRAY
const inputMode = process.env.MODE


let parsedArray
try {
    parsedArray = JSON.parse(inputArray)
} catch {
    console.log("INPUT_ARRAY is not valid")
}

console.log({ parsedArray })
console.log({ type: typeof parsedArray })

let parsedMode
parsedModeValid = ['head', 'tail'].includes(inputMode)
if (!parsedModeValid) {
    throw "Given mode invalid – please specify `head` or `tail`"
} else {
    parsedMode = inputMode
}

console.log({ parsedMode })
console.log({ type: typeof parsedMode })


let outputValue
parsedArray.forEach(
    (arrayMember) => {
        if (parsedMode == 'head') {
            outputValue = parsedArray[0]
        } else if (parsedMode == 'tail') {
            outputValue = parsedArray.slice(1)
        }
    }
)

console.log({ outputValue })

fs = require('fs')

const stringifiedOutput = outputValue.toString()

fs.writeFile('/data/outputs/result.csv', stringifiedOutput, err => {
    if (err) {
        console.error(err)
        return
    }
    console.log("Output written successfully")
})

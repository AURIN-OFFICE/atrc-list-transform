const inputMode = process.env.MODE
const { log, error } = console

log('ListTransform Node Application')

log('Reading parameters...')

try {
    inputArray = require('/data/inputs/INPUT_ARRAY.json')
} catch {
    log("INPUT_ARRAY is not valid")
}

inputModeValid = ['head', 'tail'].includes(inputMode)
if (!inputModeValid) {
    throw "Given mode invalid – please specify `head` or `tail`"
}

log('Parameters successfully read:')
log(`MODE=${inputMode}`)
log(`INPUT_ARRAY=${inputArray}`)

log('Running...')

let outputValue
inputArray.forEach(
    (arrayMember) => {
        if (inputMode == 'head') {
            outputValue = inputArray[0]
        } else if (inputMode == 'tail') {
            outputValue = inputArray.slice(1)
        }
    }
)

log('Result:')
log(outputValue)

fs = require('fs')

const stringifiedOutput = outputValue.toString()

log("Writing output to file...")
fs.writeFile('/data/outputs/result.json', stringifiedOutput, err => {
    if (err) {
        error(err)
        return
    }
    log("Output written successfully")
})

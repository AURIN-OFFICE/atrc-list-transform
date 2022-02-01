yaml = require('js-yaml')
fs = require('fs');
const { log, error } = console

log('ListTransform Node Application')
log('Reading parameters...')

fileContents = fs.readFileSync('/data/inputs/inputs.yaml', 'utf8');
data = yaml.load(fileContents);
inputs = data.inputs

function getValueFromConfig(inputName) {
    inputDefinition = inputs[inputName]
    switch (inputDefinition.type) {
        case 'value':
            return inputDefinition.value
        case 'path':
            return require(inputDefinition.path)
        default:
            throw ("Definition not found")
    }
}

const inputArray = getValueFromConfig("INPUT_ARRAY")
const inputMode = getValueFromConfig("INPUT_MODE")

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

yaml = require('js-yaml')
fs = require('fs');
const { log, error } = console

log('ListTransform Node Application')
log('Reading parameters...')

fileContents = fs.readFileSync('/atrc_data/parameters.yaml', 'utf8');
parameters = yaml.load(fileContents);
inputs = parameters.inputs

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

const outputPath = parameters.outputs.RESULT.path

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
fs.writeFile(outputPath, stringifiedOutput, err => {
    if (err) {
        error(err)
        return
    }
    log("Output written successfully")
})

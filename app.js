let trainedNet;

function encode(arg) {
    return arg.split('').map(x => (x.charCodeAt(0) / 255));
}

function processTrainingData(data) {
    return data.map(d => {
        return {
            input: encode(d.input),
            output: d.output
        }
    })
}

function train() {
    let net = new brain.NeuralNetwork();
    net.train(processTrainingData(trainingData));
    trainedNet = net.toFunction();
    document.getElementById("load").innerHTML = 'Finished training...';
};

function execute(input) {
    let results = trainedNet(encode(input));
    let output;
    if (results.trump > results.kardashian) {
        return "I'm " + Math.round(results.trump * 100) + "% sure Trump wrote this.";
    } else if (results.kardashian > results.trump) {
        return "I'm " + Math.round(results.kardashian * 100) + "% sure Kardashian wrote this.";
    } else {
        return "Something went wrong,";
    }
    return output;

}
document.getElementById("train").addEventListener('click', train);

document.getElementById("analyze").addEventListener('click', analyze);

function analyze() {
    let text = document.getElementById('comment').value;
    let result = execute(text);
    document.getElementById('result').innerHTML = result;
}
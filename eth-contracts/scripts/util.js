var fs = require('fs')

for (let i = 1; i <= 10; i++) {
    var proofConfig = JSON.parse(fs.readFileSync('../../zokrates/code/square/proof_' + i + '.json'))
    var {proof, input} = proofConfig
    console.log('0x72d7eeC07669A05B1120683cF030948cf9740633,' + i + ',"' + i + '",' + JSON.stringify(proof.A) +
        ',' + JSON.stringify(proof.A_p) +
        ',' + JSON.stringify(proof.B) +
        ',' + JSON.stringify(proof.B_p) +
        ',' + JSON.stringify(proof.C) +
        ',' + JSON.stringify(proof.C_p) +
        ',' + JSON.stringify(proof.H) +
        ',' + JSON.stringify(proof.K) +
        ',' + JSON.stringify(input) 
    )
}
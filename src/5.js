import * as fs from 'fs'

let data = fs.readFileSync("./data/5.txt", "utf-8")
data = data.split("\r\n")

function spliteador(spli_codigo, spli_indices, evalChar){
    let half = Math.ceil(spli_indices.length / 2);
    let firstHalf = spli_indices.splice(0, half)
    let secondHalf = spli_indices.splice(-half)
    return spli_codigo==evalChar ? firstHalf : secondHalf
}

function encontrarValor(tope, arregloValores,evalChar){
    let indices = []
    for (let i = 0; i < tope; i++) {
        indices.push(i) 
    }
    while(arregloValores.length>0){
        let character = arregloValores.shift()
        indices = spliteador(character,indices, evalChar)
    }
    return indices[0]
}

function encontrarFB(x){
    let codigo = x.split("")

    let FBarray = codigo.slice(0,7)
    let LRarray = codigo.slice(7)

    let row = encontrarValor(128, FBarray,"F")
    let column = encontrarValor(8, LRarray,"L")

    let resultado = {codigo, row, column}
    resultado.id = row * 8 + column
    return resultado
}

let finales = data.map(d=> encontrarFB(d))
finales = finales.map(d=>d.id).sort((a,b)=>a-b)
let minimo= Math.min(...finales)
let maximo= Math.max(...finales)


for (let i = minimo; i < maximo; i++) {
    if(!finales.includes(i)){
        console.log(i)
    }
}


// console.log(finales)
// console.log(Math.max(...finales))







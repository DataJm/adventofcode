import * as fs from 'fs'

let data = fs.readFileSync('./data/3.txt', 'utf8')
let matrix = data.split('\r\n').map(d=>d.split(''))

function getTrees(input){
    let [right, down] = input
    let y = 0
    let x = 0
    let contador = 0
    let n = matrix.length
    let m = matrix[0].length

    while(y<n){
        x = x+right
        y = y+down
        if(y>=n){
            return contador
        }

        let valor = matrix[y][x%m]
        if(valor=="#") contador++
    }
}

let coleccion = [
    [1,1],
    [3,1],
    [5,1],
    [7,1],
    [1,2]
]

let resultado = coleccion.map(d=>getTrees(d))

console.log(`
    ${resultado}
    ${resultado.reduce((x,y)=>x*y)}
`)
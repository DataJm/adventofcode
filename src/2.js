import * as fs from 'fs'

let data = fs.readFileSync('./data/2.txt', 'utf8')

data = data.split('\r\n')

let resultados = []
let fails = []
data.forEach(d=>{
    d = d.replace(/\s/g,'')
    let [condition,password] = d.split(':')
    let [init, fin] = condition.split('-')
    init = +init
    let letra = fin.slice(-1)
    fin = +fin.match(/\d+/g)

    let init_ = password[init-1], fin_ = password[fin-1]

    let respuesta = {d,password, init,init_, fin,fin_, letra}

    if(init_===letra && fin_===letra){
        fails.push(respuesta)
    }else if(init_===letra || fin_===letra){
        resultados.push(respuesta)
    }else{
        fails.push(respuesta)
    }
})

console.log(resultados.length)


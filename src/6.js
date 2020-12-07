import * as fs from 'fs'

let data = fs.readFileSync("./data/6.txt", "utf-8")
data = data.split("\r\n")

let valores = []
let respuestas = []

var grupo = new Set()
var personas = []

data.forEach(d=>{
    if(d==''){
        // empezamos a evaluar
        // console.log(personas)
        valores.push(grupo)
        let itera_preguntas = Array.from(grupo)

        let resultadillos = itera_preguntas.map(m=>{
            let todos = personas.every(j=>{
                let nuevo_set = new Set(j.split(''))
                return nuevo_set.has(m)
            })
            return todos ? 1 : 0
        })

        respuestas.push(resultadillos.reduce((x,y)=>x+y))

        grupo = new Set()
        personas = []
    }else{
        personas.push(d)
        let el_split = d.split('')
        el_split.forEach(t=>{
            grupo.add(t)
        })
    }
})

// console.log(valores)
// console.log(valores.map(d=>d.size).reduce((x,y)=>x+y))
console.log(respuestas.reduce((x,y)=>x+y))
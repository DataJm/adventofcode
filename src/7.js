import fs from 'fs'

let data = fs.readFileSync("./data/7.txt", "utf-8")
data = data.split("\r\n")

class bolsa{
    constructor(color, contenido){
        this.color = color
        this.contenido = contenido
    }

    nuevaRegla(nuevaBolsa){
        let actualizarNuevaRegla = (bolsa, nuevaBolsa) =>{
            bolsa.contenido.forEach(d=>{
                if(d.color==nuevaBolsa.color){
                    d.contenido= nuevaBolsa.contenido
                }else{
                    actualizarNuevaRegla(d, nuevaBolsa)
                }
            })
        }
        actualizarNuevaRegla(this, nuevaBolsa)
    }

    buscarColor(color){
        
        let buscador = (bolsa,color) =>{
            if(bolsa.color==color){
                return true
            }else{
                return bolsa.contenido.some(d=>{
                    return buscador(d,color)
                })
            }
        }

        if(this.color==color){
            return false
        }

        return buscador(this, color)
    }
}

let coleccionBolsas = []

// cuando llega una nueva regla, itero y aplico; despues añado la nueva bolsa
// let bolsa1 = new bolsa("rojo",[new bolsa("blanca"), new bolsa("amarilla"), new bolsa("amarilla")])
// let nuevaBolsa = new bolsa("blanca", [new bolsa("gold")])

// bolsa1.nuevaRegla(nuevaBolsa)
// coleccionBolsas.push(bolsa1.contenido[0].contenido)

// console.log(bolsa1.buscarColor("gold"))
data.forEach(d=>{
    let [nuevo_color, nuevo_contenido] = d
    // .replace("bags","bag")
    // .replace("bags,","bag,")
    // .replace("bags.","bag.")
    .split(" contain")
    // console.log(nuevo_contenido)
    let contenidos = []
    nuevo_contenido.split(",").forEach(d=>{
        let contenido = d.replace(".","").substring(1)
        if(contenido!="no other bags"){
            let numero = +contenido.split('')[0]
            let bolsita = contenido.slice(2)
            for (let i = 0; i < numero; i++) {
                contenidos.push(new bolsa(bolsita, []))
            }
        }
    })

    let nueva_bolsa = new bolsa(nuevo_color, contenidos)

    coleccionBolsas.forEach(d=>{
        d.nuevaRegla(nueva_bolsa)
    })

    coleccionBolsas.push(new bolsa(nuevo_color,contenidos))

})

// console.log(coleccionBolsas[1].buscarColor("shiny gold bag"))
// console.log(coleccionBolsas[1].contenido)

console.log(coleccionBolsas.reduce((x,y)=>{
    let valor = y.buscarColor("shiny gold bag") ? 1 : 0
    return x + valor
},0))

// console.log(coleccionBolsas.map(d=>{
//     return d.buscarColor("shiny gold bag")
// }))



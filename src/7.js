import fs from 'fs'

let data = fs.readFileSync("./data/7.txt", "utf-8")
data = data.split("\r\n")

class bolsa{
    constructor(color, contenido=[]){
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
            console.log(`buscando en bolsa: ${bolsa.color}`)
            if(bolsa.color==color){
                console.log("si")
                return true
            }else{
                return bolsa.contenido.some(d=>{
                    buscador(d, color)
                })
            }
        }
        return buscador(this, color)
    }
}

let coleccionBolsas = []

// cuando llega una nueva regla, itero y aplico; despues añado la nueva bolsa
let bolsa1 = new bolsa("rojo",[new bolsa("blanca"), new bolsa("amarilla"), new bolsa("amarilla")])
let nuevaBolsa = new bolsa("blanca", [new bolsa("gold")])

bolsa1.nuevaRegla(nuevaBolsa)


coleccionBolsas.push(bolsa1.contenido[0].contenido)



console.log(bolsa1.buscarColor("gold"))



// console.log(data)






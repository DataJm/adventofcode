import fs from 'fs'

let data = fs.readFileSync("./data/8.txt", "utf-8")
data = data.split("\r\n")

// let suma = 0
// let unicos = new Set()

// for (let i = 0; i < data.length; i++) {
//     console.log(i)
//     let [instruccion, valor] = data[i].split(" ")
//     if(instruccion=="acc"){
//         suma += parseInt(valor)
//     }
//     if(instruccion=="jmp"){
//         i += parseInt(valor) -1 
//     }
//     if(unicos.has(i)){
//         break
//     }else{
//         unicos.add(i)
//     }
// }

// console.log(`######### ${suma}`)

let suma = 0
let unicos = new Set()

let index_not_acc = -1
data = data.map(d=>{
    let [a,b] = d.split(" ")
    if(a!="acc") index_not_acc++    
    return {
        "command" : a,
        "value" : b,
        "index": a=="acc" ? undefined : index_not_acc
    }
})


function corredor(data, indexmagico){
    let suma = 0
    let unicos = new Set()
    let datitos = JSON.parse(JSON.stringify(data))

    datitos.forEach(d=>{
        if(d.index>=0){
            // console.log("ok")
            if(d.index==indexmagico){
                d.command = d.command=="jmp" ? "nop" : "jmp"
            }
        }
    })

    for (let i = 0; i < datitos.length; i++) {
        let {command, value} = datitos[i]
        if(command=="acc"){
            suma += parseInt(value)
        }
        if(command=="jmp"){
            i += parseInt(value) -1 
        }
        if(unicos.has(i)){
            return {logro: false, acc: suma}
        }else{
            unicos.add(i)
        }
    }

    return {logro: true, acc: suma}
}

// console.log(data)

for (let i = 0; i < 1000000; i++) {
    let final = corredor(data, i)
    if(final.logro){
        console.log(final)
    }
}

// console.log(corredor(data, 3))
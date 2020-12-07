import * as fs from 'fs'

let data = fs.readFileSync('data/4.txt', 'utf8')
data = data.split('\r\n')

let list_object = []

let current = {}
for(let x of data){
    if(x!=""){
        let values = x.split(" ")
        values.forEach(d=>{
            let [key, value] = d.split(":")
            current[key] = value
        })
    }else{
        list_object.push(current)
        current = {}
    }
}

let cosos = ["byr","iyr","eyr","hgt","hcl","ecl","pid"]

let resultados = list_object.map(d=>{
    let resultado = {
        test : [],
        error: [],
        data : d
    }
    if(cosos.every(t=> t in d)){
        let {byr, iyr, eyr, hgt, hcl, ecl,pid} = d
        try {
            byr = +byr
            iyr = +iyr
            eyr = +eyr
        } catch (e) {
            console.log(`Error con: ${[byr, iyr, eyr]}`)
            resultado = false
        }

        // byr
        resultado.test.push(byr>=1920 && byr<=2002)
        resultado.error.push("byr")
        

        // iyr
        resultado.test.push(iyr>=2010 && iyr<=2020)
        resultado.error.push("iyr")

        // eyr
        resultado.test.push(eyr>=2020 && eyr<=2030)
        resultado.error.push("eyr")

        // hgt
        let hgt_str = hgt.match(/[a-zA-Z]/g)
        let hgt_num = hgt.match(/[0-9]/g)

        try{
            hgt_str = hgt_str.join("")
            hgt_num = +hgt_num.join("")
            if(hgt_str=="cm"){
                resultado.test.push(hgt_num>=150 && hgt_num<=193)
                resultado.error.push("hgt")
            }
            else if(hgt_str=="in"){
                resultado.test.push(hgt_num>=59 && hgt_num<=76)
                resultado.error.push("hgt")
            }
            else{
                resultado.test.push(false)
                resultado.error.push("hgt_m")
            }
        }catch(e){
            resultado.test.push(false)
            resultado.error.push("hgt_fail")
        }

        // hcl
        let hcl_array = hcl.split("")
        let inicial = hcl_array.shift()
        resultado.test.push(inicial=="#")
        resultado.error.push("hcl_hashtag")
        if(hcl_array.length==6){
            resultado.test.push(hcl_array.every(t=>{
                return [0,1,2,3,4,5,6,7,8,9].includes(+t) || ["a","b","c","d","e","f"].includes(t)
            }))
            resultado.error.push("hcl_chars")
        }else{
            resultado.test.push(false)
            resultado.error.push("hcl_len")
        }

        // ecl
        console.log(["amb","blu","brn","gry","grn","hzl","oth"].includes(ecl))
        resultado.test.push(["amb","blu","brn","gry","grn","hzl","oth"].includes(ecl))
        resultado.error.push("ecl")
        // pid
        if(pid.length==9){
            resultado.test.push(pid==pid.match(/[0-9]/g).join(""))
            resultado.error.push("pid")
        }else{
            resultado.test.push(false)    
            resultado.error.push("pid_length")
        }

        resultado["final"] = resultado.test.every(d=>d)
    }else{
        resultado.test.push(false)
        resultado.error.push("No tiene todos los cosos")
    }
    return resultado
})

console.log(resultados)
console.log(resultados.filter(d=>d.final).length)


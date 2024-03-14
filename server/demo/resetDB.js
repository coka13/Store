import fs from 'fs'
import { Products } from '../server.js'

const resetDB = async ()=>{
try{
    await Products.deleteMany({})
    const productsFromJSON = JSON.parse(fs.readFileSync('products.json','utf8'))
    const productsInDB = await Products.insertMany(productsFromJSON)
    console.log(productsInDB)
}
catch(e){
    console.log(e)
}
}

resetDB()
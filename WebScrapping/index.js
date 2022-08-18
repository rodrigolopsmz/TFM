import {WebScrappingFunction} from "./WebScrapping.js";
import {insertLinksTable} from "./MongoWriteLinksTable.js"
import {MongoWriteTextTable} from "./MongoWriteTextTable.js"

// Withe the next function we get in array result all of the links in string we scrapped
const main = async (topicSearch) => {
  //const  result = await WebScrappingFunction(topicSearch)
  //await insertLinksTable(result, topicSearch)
   await MongoWriteTextTable()
   
}
(async () =>{
  //await main('cláusulas abusivas')
  //await main('Desahucio')
  await main(' Modificaciones contractuales')

})()
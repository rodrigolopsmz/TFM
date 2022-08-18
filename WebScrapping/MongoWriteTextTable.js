import { pdfParser } from "./obtainPdfFromUrl.js"
import mongoose  from 'mongoose'
import { LinkModel } from "./mongo_collections/linkCollection.js";
import { TextModel } from "./mongo_collections/textCollection.js";
export const MongoWriteTextTable =   async () => {
    //const text = await pdfParser("https://www.poderjudicial.es/search/contenidos.action?action=accessToPDF&publicinterface=true&tab=AN&reference=d5264844b1375b2ea0a8778d75e36f0d&encode=true&optimize=20220715&databasematch=AN")
    const conn = await mongoose.connect('mongodb://localhost:27017/DATA_LAKE_WEB_SCRAPPING_LEGAL_SEARCH');
    const allLinks = await LinkModel.find()
    const allTexts = await TextModel.find()
    const textUrls = allTexts.map(text => {
        return text.linkURL
    });
    const linksUrls = allLinks.map(link => {
        return link.linkURL
    });
    const topicsLinks = allLinks.map(link => {
      return link.keyword
  });
    const linksToRemove = []
    allLinks.forEach(linkTable => {
    if (textUrls.indexOf(linkTable.linkURL) !== -1) linksToRemove.push(linkTable.linkURL)
  })
  const linksToDeleteSet = new Set(linksToRemove);

  const linksFiltered = linksUrls.filter((link) => {
  return !linksToDeleteSet.has(link)});
const setTextToInsert = new Set(linksFiltered)
  const textToInsert = [...setTextToInsert]
  const topicsLinksFiltered = allLinks.filter(link => {
     if (textToInsert.indexOf(link.linkURL) !== -1) return link.keyword
  })
  for (var i=0; i< textToInsert.length; i++)
  {

    var text = await pdfParser(textToInsert[i]).catch((error)=>{
      console.log(error)
      process.exit();
  })
    
    await new TextModel({ linkURL: textToInsert[i],
                          textDocument: text[0],
                          topic: topicsLinksFiltered[i] }).save();
    await new Promise(resolve => setTimeout(resolve, 10000));
  }
  mongoose.connection.close()
}

import mongoose  from 'mongoose'
import { LinkModel } from './mongo_collections/linkCollection.js';

export async function insertLinksTable(arrayLinks, topicSearch) {
  const conn = await mongoose.connect('mongodb://localhost:27017/DATA_LAKE_WEB_SCRAPPING_LEGAL_SEARCH');
  
  const all = await LinkModel.find()
  const linksToRemove = []
   all.forEach(linkTable => {
    if (arrayLinks.indexOf(linkTable.linkURL) !== -1) linksToRemove.push(linkTable.linkURL)
  })
  const linksToDeleteSet = new Set(linksToRemove);
  const linksToInsert = arrayLinks.filter((link) => {
  return !linksToDeleteSet.has(link)});
  

  for (var i=0; i< linksToInsert.length; i++)
  {
    await new LinkModel({ linkURL: linksToInsert[i], 
                          keyword:  topicSearch}).save();
  }
  mongoose.connection.close()
  return 1;
}
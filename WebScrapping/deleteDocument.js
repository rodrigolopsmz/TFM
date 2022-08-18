import mongoose  from 'mongoose'
import { TextModel } from './mongo_collections/textCollection.js';

export async function deleteOneDocumentText(id) {
  const conn = await mongoose.connect('mongodb://localhost:27017/DATA_LAKE_WEB_SCRAPPING_LEGAL_SEARCH');
  

  await TextModel.deleteOne({ _id: id});
  await conn.disconnect();
  return 1;
}














(async () => {
    await deleteOneDocumentText('62f52e8004482ee57c5f9414')
    await deleteOneDocumentText('62f52e8004482ee57c5f9836')
    await deleteOneDocumentText('62f52e8004482ee57c5f983e')
    await deleteOneDocumentText('62f52e8004482ee57c5f985a')
    await deleteOneDocumentText('62f52e8004482ee57c5f985c')
    await deleteOneDocumentText('62f52e8004482ee57c5f985e')
    await deleteOneDocumentText('62f52e8004482ee57c5f9860')
    await deleteOneDocumentText('62f52e8004482ee57c5f986a')
    await deleteOneDocumentText('62f52e8004482ee57c5f98a8')
    await deleteOneDocumentText('62f52e8004482ee57c5f9916')
    await deleteOneDocumentText('62f52e8004482ee57c5f9922')
    await deleteOneDocumentText('62f52e8004482ee57c5f9924')
    await deleteOneDocumentText('62f52e8004482ee57c5f9938')
    await deleteOneDocumentText('62f52e8104482ee57c5f9d8a')
    await deleteOneDocumentText('62f52e8104482ee57c5f9dd2')
    })()
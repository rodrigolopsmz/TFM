import mongoose  from 'mongoose'
import { LinkModel } from "./mongo_collections/linkCollection.js";
import { TextModel } from "./mongo_collections/textCollection.js";
const copyTable = async (topicTable) => {
    var topic = ''
    switch(topicTable)
    {
        case '':
            topic = 'Clausulas abusivas';
            break;
        case 'DESHAUCIO_':
            topic = 'Deshaucio';
            break;
        case 'Modificaciones_':
            topic = 'Modificaciones contractuales'
            break;
        default:
            break;
    }
    const conn = await mongoose.connect(`mongodb://localhost:27017/DATA_LAKE_WEB_SCRAPPING_${topicTable}50`);
    const allLinks = await LinkModel.find()
    const allTexts = await TextModel.find()
    await conn.disconnect();
    const conn1 = await mongoose.connect('mongodb://localhost:27017/DATA_LAKE_WEB_SCRAPPING_LEGAL_SEARCH');
    for (var i=0; i< allLinks.length; i++)
    {
        await new LinkModel({linkURL: allLinks[i].linkURL, 
                             keyword:  allLinks[i].keyword}).save();
    }
    for (var i=0; i< allTexts.length; i++)
    {
        await new TextModel({linkURL: allTexts[i].linkURL, 
                            textDocument:  allTexts[i].textDocument,
                            keyword: topic}).save();
    }
   await conn1.disconnect();
} 
(async () => {
await copyTable('')
await copyTable('DESHAUCIO_')
await copyTable('Modificaciones_')
})()
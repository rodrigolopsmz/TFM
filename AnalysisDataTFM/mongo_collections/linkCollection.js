import mongoose  from 'mongoose'
const LinkSchema = new mongoose.Schema({
    linkURL: String,
    keyword: String,
  });
export  const LinkModel = new mongoose.model('Link', LinkSchema);
var mongoose = require('mongoose');

const Schema = mongoose.Schema;
const EntriesSchema = new Schema({
    name: {
        type: String,
    },
    createdAt: {
        type: 'Date',
        default: Date.now
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    price: {
        type: Number
    },
    calories: {
        type: Number
    }
});

const EntryModel = mongoose.model('Entry', EntriesSchema);

EntryModel.ensureIndexes((err) => {
  if (err) {
    return err;
  }
  return true;
});

module.exports = EntryModel;
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
    userId: {
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

EntriesSchema.index({ userId: 1, title: 1 });
EntriesSchema.index({ userId: 1, description: 1 });
EntriesSchema.index({ userId: 1, createdAt: 1 });
EntriesSchema.index({ userId: 1, isPublished: 1 });

const EntryModel = mongoose.model('Entry', EntriesSchema);

EntryModel.ensureIndexes((err) => {
  if (err) {
    return err;
  }
  return true;
});

module.exports = EntryModel;
import mongoose from 'mongoose';


const OfferSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  discountPercentage: {
    type: Number,
    required: true,
  },
  listing: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing' },

});

const AROffer = mongoose.model('AROffer', OfferSchema);

export default AROffer;
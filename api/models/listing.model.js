import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    // priceMin: {
    //   type: Number,
    //   required: true,
    // },
    discountPrice: {
      type: Number,
      // required: true,
    },
    bathrooms: {
      type: Number,
      required: true,
    },
    bedrooms: {
      type: Number,
      required: true,
    },
    furnished: {
      type: Boolean,
      required: true,
    },
    parking: {
      type: Boolean,
      required: true,
    },
    type: {
      type: String,
      required: true,
    }, 
    InvestmentType: {
      type: String,
      required: true,
      default: 'InvestmentType',
    },
    InvestmentTypeDetails: {
      type: String,
      required: false,
      default: 'InvestmentTypeDetails',
    },
    offer: {
      type: Boolean,
      required: true,
    },
    filesUrls: {
      type: Array,
      required: false,
    },
    imageUrls: {
      type: Array,
      required: true,
    },
    videoUrls: {
      type: Array,
      required: false,
    },
    userRef: {
      type: String,
      required: true,
    },

BUA : {
  type: Number,
},
showMinMax : {
  type: Boolean,
  default: false,
},
showCheq: {
  type: Boolean,
  default: false,
},
priceMin : {
  type: Number,
  required: true,
},
priceMax : {
  type: Number,
},
internalAreaMin : {
  type: Number,
  required: true,
},
internalAreaMax : {
  type: Number,
},
externalAreaMin: {
  type: Number,
  required: true,
},
externalAreaMax: {
  type: Number,
},
totalAreaMin:{
  type: Number,
  required: true, 
},
totalAreaMax: {
  type: Number,
},
    apartmentArea: {
      type: Number,
    },
    balconyArea: {
      type: Number,
    },
    totalArea: {
      type: Number,
    },
    projectName: {
      type: String,
      required: true,
    },
    propertyAddressInProject: {
      type: String,
      required: true,
    },
    rentalType: {
      type: String,
      enum: ['weekly', 'monthly', 'yearly' , ''],
    },
    numberOfCheques: {
      type: Number,
      enum: [1,2, 4, 6],
    },
    chequeAmountMin: {
      type: Number,
      required: true,
    },
    chequeAmountMax: {
      type: Number,
    },
    cashAmount: {
      type: Number,
    },
    buildingYear: {
      type: Number,
    },
    apartmentAge: {
      type: Number,
      // required: true,
    },
    ageYear: {
      type: Number,
      required: true,
    },
    ageMonth: {
      type: Number,
      required: true,
    },

    realEstateType: {
      type: String,
    },
    paymentType: {
      type: String,
      required: true,
    },
    // arOffer: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'AROffer',
    // },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    offers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AROffer' 
    }],

  },
  { timestamps: true }
);

const Listing = mongoose.model('Listing', listingSchema);

export default Listing;

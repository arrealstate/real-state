//listing.controller.js
import Listing from "../models/listing.model.js";
import AROffer from '../models/arOffer.model.js';


import { errorHandler } from "../utils/error.js";
// import { io } from '../index.js';

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);

    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return next(errorHandler(404, "Listing not found!"));
  }

  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, "You can only delete your own listings!"));
  }

  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json("Listing has been deleted!");
  } catch (error) {
    next(error);
  }
};


export const updateListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return next(errorHandler(404, "Listing not found!"));
    }

    if (req.user.id !== listing.userRef.toString()) {
      return next(errorHandler(401, "You can only update your own listings!"));
    }

    const updateObj = {};
    for (const key in req.body) {
      updateObj[key] = req.body[key];
    }

    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      { $set: updateObj },
      { new: true }
    );

    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

// export const updateListingById = async (req, res, next) => {
//   try {
//     const listingId = req.params.id;

//     const updateObj = {};
//     for (const key in req.body) {
//       updateObj[key] = req.body[key];
//     }

//     // Update the specific listing with the provided data
//     const updatedListing = await Listing.findByIdAndUpdate(
//       listingId,
//       { $set: updateObj },
//       { new: true }
//     );

//     if (!updatedListing) {
//       return next(errorHandler(404, "Listing not found!"));
//     }

//     res.status(200).json(updatedListing);
//   } catch (error) {
//     next(error);
//   }
// };

// export const updateAllListings = async (req, res, next) => {
//   try {
//     const updateObj = {};
//     for (const key in req.body) {
//       updateObj[key] = req.body[key];
//     }

//     // Update all listings with the provided data
//     const updatedListings = await Listing.updateMany({}, { $set: updateObj });

//     res.status(200).json(updatedListings);
//   } catch (error) {
//     next(error);
//   }
// };


export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, "Listing not found!"));
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};


export const getListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    let offer = req.query.offer;

    if (offer === undefined || offer === "false") {
      offer = { $in: [false, true] };
    }

    let furnished = req.query.furnished;

    if (furnished === undefined || furnished === "false") {
      furnished = { $in: [false, true] };
    }

    let parking = req.query.parking;

    if (parking === undefined || parking === "false") {
      parking = { $in: [false, true] };
    }

    let type = req.query.type;

    if (type === undefined || type === "all") {
      type = { $in: ["sale", "buy", "rent"] };
    }

    let InvestmentType = req.query.InvestmentType;

    if (InvestmentType === undefined || InvestmentType === "all") {
      InvestmentType = { $in: ["payment Plan", "handover", "ready"] };
    }
    const searchTerm = req.query.searchTerm || "";

    const sort = req.query.sort || "createdAt";

    const order = req.query.order || "desc";

    const searchTermCondition = searchTerm
      ? {
          $or: [
            { name: { $regex: searchTerm, $options: "i" } },
            { description: { $regex: searchTerm, $options: "i" } },
            { address: { $regex: searchTerm, $options: "i" } },
            { InvestmentTypeDetails: { $regex: searchTerm, $options: "i" } },
            { projectName: { $regex: searchTerm, $options: "i" } },
            { propertyAddressInProject: { $regex: searchTerm, $options: "i" } },
          ],
        }
      : {};

    const listings = await Listing.find({
      ...searchTermCondition, 
      offer,
      furnished,
      parking,
      type,
      InvestmentType,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};


export const getListingsByUserId = async (req, res, next) => {
   try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    const userId = req.params.userId;
    const listings = await Listing.find({ userRef: userId })
     .limit(limit)
     .skip(startIndex);
    return res.status(200).json(listings);
  } catch (error) {
    next(error);
  }};

  

  export const linkOfferToListing = async (req, res) => {
    try {
      const { listingId, offerId } = req.params;
  
      const listing = await Listing.findById(listingId);
      const offer = await AROffer.findById(offerId).populate('AROffer');
  
      if (!listing || !offer) {
        return res.status(404).json({ error: 'Listing or Offer not found' });
      }
  
      // Check if the offer already exists in the listing
      const existingOfferIndex = listing.offers.findIndex(existingOffer => existingOffer.toString() === offerId);
      if (existingOfferIndex !== -1) {
        return res.status(400).json({ error: 'Offer already linked with Listing' });
      }
  
      // Append new offer ObjectId to the offers array in the Listing schema
      listing.offers.push(offerId);
      await listing.save();
  
      res.status(200).json({ message: 'Offer linked with Listing successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  

export const getLastAddedListings = async (req, res) => {
  try {
    const lastAddedListings = await Listing.find()
      .sort({ createdAt: -1 }) // Sort by creation date in descending order
      .limit(10); // Adjust the number as needed to get the desired count of listings

    res.status(200).json(lastAddedListings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch last added listings' });
  }
};

export const deleteAllListings = async (req, res) => {
  try {
    await Listing.deleteMany({}); // Delete all listings in the collection

    res.status(200).json({ message: 'All listings deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle any errors that occur
  }
};


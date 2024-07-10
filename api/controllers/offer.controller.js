// In your offer.Controller.js file
import AROffer from '../models/arOffer.model.js';
import listings from '../models/listing.model.js';


export const offerController = {
  async getAllOffers(req, res) {
    try {
      const offers = await AROffer.find();
      res.status(200).json(offers);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async createOffer(req, res) {
    try {
      const { code, description, discountPercentage } = req.body;
      const newOffer = new AROffer({ code, description, discountPercentage });
      const savedOffer = await newOffer.save();
      res.status(201).json(savedOffer);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async getOfferById(req, res) {
    try {
      const offer = await AROffer.findById(req.params.offerId);
      if (!offer) {
        return res.status(404).json({ message: 'Offer not found' });
      }
      res.status(200).json(offer);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async updateOffer(req, res) {
    try {
      const { code, description, discountPercentage } = req.body;
      const updatedOffer = await AROffer.findByIdAndUpdate(
        req.params.offerId,
        { code, description, discountPercentage },
        { new: true }
      );
      if (!updatedOffer) {
        return res.status(404).json({ message: 'Offer not found' });
      }
      res.status(200).json(updatedOffer);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async deleteOffer(req, res) {
    try {
      const deletedOffer = await AROffer.findByIdAndDelete(req.params.offerId);
      if (!deletedOffer) {
        return res.status(404).json({ message: 'Offer not found' });
      }
      res.status(200).json({ message: 'Offer deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};


export const linkListingWithOffer = async (req, res) => {
  const { offerId, listingId } = req.params;

  try {
    const offer = await AROffer.findById(offerId);
    if (!offer) {
      return res.status(404).json({ error: 'Offer not found' });
    }

    offer.listing = listingId;
    await offer.save();

    // Populate the 'listing' field after saving the offer
    await offer.populate('listing').execPopulate();

    res.json(offer);
  } catch (error) {
    console.error('Error linking listing with offer:', error);
    res.status(500).json({ error: 'Failed to link listing with offer' });
  }
};

export const getOffersForListing = async (req, res) => {
  const { listingId } = req.params;

  try {
    const offers = await AROffer.find({ listing: listingId });
    res.json(offers);
  } catch (error) {
    console.error('Error retrieving offers for listing:', error);
    res.status(500).json({ error: 'Failed to retrieve offers for listing' });
  }
};



// // Update the offer in a listing

// export const updateOfferInListing = async (req, res) => {
//   const { listingId, offerId, action } = req.body;

//   try {
//     const listing = await listings.findById(listingId);

//     if (!listing) {
//       return res.status(404).json({ message: 'Listing not found' });
//     }

//     if (action === 'add') {
//       if (!listing.offers.includes(offerId)) {
//         listing.offers.push(offerId);
//       }
//     } else if (action === 'remove') {
//       listing.offers = listing.offers.filter((id) => id !== offerId);
//     } else {
//       return res.status(400).json({ message: 'Invalid action' });
//     }

//     const updatedListing = await listing.save();
//     res.json(updatedListing);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// Remove all offers from a listing
export const removeAllOffersFromListing = async (req, res) => {
  const { listingId } = req.params;

  try {
    const listing = await listings.findById(listingId);
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    listing.offers = [];

    const updatedListing = await listing.save();
    res.json(updatedListing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove a specific offer from a listing
export const removeSpecificOfferFromListing = async (req, res) => {
  const { listingId, offerId } = req.params;

  try {
    const listing = await listings.findById(listingId);
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    listing.offers = listing.offers.filter((id) => id !== offerId);

    const updatedListing = await listing.save();
    res.json(updatedListing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Update offers in a listing
export const updateOfferInListing = async (req, res) => {
  const { listingId, offerIds, action } = req.body;

  try {
    const listing = await listings.findById(listingId);

    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    if (action === 'add') {
      // Add new offers to the listing if they don't exist already
      offerIds.forEach((offerId) => {
        if (!listing.offers.includes(offerId)) {
          listing.offers.push(offerId);
        }
      });
    } else if (action === 'update') {
      // Update offers in the listing with the provided offerIds
      listing.offers = offerIds;
    } else {
      return res.status(400).json({ message: 'Invalid action' });
    }

    // Save the updated listing in the database
    const updatedListing = await listing.save();
    res.json(updatedListing.offers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove specific offers from a listing
export const removeOfferFromListing = async (req, res) => {
  const { listingId } = req.params;
  const { offerIds } = req.body;

  try {
    const listing = await listings.findById(listingId);

    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    // Remove selected offers from the listing
    listing.offers = listing.offers.filter((offerId) => !offerIds.includes(offerId));

    const updatedListing = await listing.save();
    res.json(updatedListing.offers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
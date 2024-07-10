import React from 'react';

const OfferList = ({ offers, editOffer, deleteOffer }) => {
  return (
    <div>
      <h2>Offer List</h2>
      {offers && offers.length > 0 ? (
        <ul>
          {offers.map((offer) => (
            <li key={offer._id}>
              <p>
                {offer.code} - {offer.description} - {offer.discountPercentage}%
              </p>
              <button onClick={() => editOffer(offer)}>Edit</button>
              <button onClick={() => deleteOffer(offer._id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No offers available</p>
      )}
    </div>
  );
};

export default OfferList;

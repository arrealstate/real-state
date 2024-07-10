import React, { useState } from "react";
import {
  FaMapMarkerAlt,
  FaBed,
  FaBath,
  FaParking,
  FaChair,
} from "react-icons/fa";
import Contact from "../../components/Contact";
import ListingDescription from "../listingComponents/ListingDescription ";
import { Link } from "react-router-dom";

const TexteArea = ({
  listing,
  contact,
  setContact,
  sendWhatsappMessage,
  offerData,
}) => {
  const [isSendingMessage, setIsSendingMessage] = useState(false);

  const linkTo =
    listing.projectName === "Binghatti Phantom"
      ? "/PaymentPlanBINGHATTIPHANTOM"
      : "/PaymentPlan";

  const showMinMax = listing.showMinMax;

  const constructWhatsAppMessage = () => {
    const {
      name,
      type,
      description,
      address,
      InvestmentTypeDetails,
      PriceMin,
      bedrooms,
      bathrooms,
      parking,
      furnished,
    } = listing;

    const formattedType = type === "rent" ? "For Rent" : "For Buy";

    const message =
      `Hi, I'm interested in the property: ${name} - ${formattedType}.\n` +
      `Description: ${description}\n`;
    // +
    // `Address: ${address}\n` +
    // `Investment Type: ${InvestmentTypeDetails}\n` +
    // `Price: ${PriceMin.toLocaleString('en-US')} ${type === 'rent' ? '/ month' : ''}\n` +
    // `Bedrooms: ${bedrooms} ${bedrooms > 1 ? 'beds' : 'bed'}\n` +
    // `Bathrooms: ${bathrooms} ${bathrooms > 1 ? 'baths' : 'bath'}\n` +
    // `Parking: ${parking ? 'Parking spot' : 'No Parking'}\n` +
    // `Furnished: ${furnished ? 'Furnished' : 'Unfurnished'}`;

    // console.log(message); // Log the constructed message to check

    return encodeURIComponent(message);
  };

  const handleSendWhatsAppMessage = () => {
    setIsSendingMessage(true);

    const formattedMessage = constructWhatsAppMessage();

    const phoneNumber = "971588247858";

    const whatsappLink = `https://api.whatsapp.com/send/?phone=971562929527&text=${formattedMessage}&type=phone_number&app_absent=0`;

    window.open(whatsappLink, "_blank");
    console.log(whatsappLink);

    setIsSendingMessage(false);
  };
  // console.log(listing)
  // console.log(offerData.discountPercentage)

  return (
    <main>
      <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
        <p className="text-2xl font-semibold">{listing.name} </p>

        {listing && offerData && offerData.length !== 0 && (
          <div>
            <Link to={linkTo}>
              <main>
                <p className="bg-orange-950 w-full lg:max-w-[400px] sm:max-w-screen-sm text-white text-center p-3 rounded-md">
                  <span className="mr-2">Offer Code:</span>
                  <span className="font-bold mr-4">{offerData.code}</span>
                  <span className="mr-2">- Click To See Details</span>
                  {/* // <span className="font-bold">{newPrice.toLocaleString('en-US')} AED</span> */}
                </p>
              </main>
            </Link>
          </div>
        )}

        <div className="flex items-center  gap-2 text-slate-600  text-sm">
          <p className="flex items-center mt-2 gap-2 text-slate-600  text-sm">
            <FaMapMarkerAlt className="text-green-700" />
            {listing.address}
          </p>
          <p className="flex items-center mt-2 gap-2 text-slate-600  text-sm">
            <FaMapMarkerAlt className="text-green-700" />
            {listing.projectName}
          </p>
          <p className="flex items-center mt-2 gap-2 text-slate-600  text-sm">
            <FaMapMarkerAlt className="text-green-700" />
            {listing.propertyAddressInProject}
          </p>
        </div>
        <div className="flex gap-4">
          <p className="bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
            {listing.type === "rent"
              ? "For Rent"
              : listing.type === "sale"
              ? "Still Available"
              : listing.type === "buy"
              ? "For Buy"
              : "Unknown Type"}
          </p>
        </div>

        <h1 className="text-xl font-bold mt-4 mb-2 text-gray-800">
          Property Information
        </h1>

        <ListingDescription description={listing.description} />

        {listing && listing.type !== "rent" && (
          <div className="flex gap-2">
            <p className="text-slate-800">
              <span className="font-semibold text-black">
                Real Estate Type :{" "}
              </span>
              {listing.realEstateType}
            </p>
          </div>
        )}
{/* 
        {listing.priceMin !== 0 && (
          <>
            {listing && showMinMax ? (
              <p className="text-slate-800">
                <span className="font-semibold text-black">Price : </span>
                {`${listing.priceMin.toLocaleString(
                  "en-US"
                )} - ${listing.priceMax.toLocaleString("en-US")} AED`}
              </p>
            ) : (
              <p className="text-slate-800">
                <span className="font-semibold text-black">Price : </span>
                {`${listing.priceMin.toLocaleString("en-US")} AED`}
              </p>
            )}
          </>
        )} */}



{listing.priceMin !== 0 ? (
  <>
    {listing && showMinMax ? (
      <p className="text-slate-800">
        <span className="font-semibold text-black">Price : </span>
        {`${listing.priceMin.toLocaleString("en-US")} - ${listing.priceMax.toLocaleString("en-US")} AED`}
      </p>
    ) : (
      <p className="text-slate-800">
        <span className="font-semibold text-black">Price : </span>
        {`${listing.priceMin.toLocaleString("en-US")} AED`}
      </p>
    )}
  </>
) : (
  <p className="text-slate-800">
    <span className="font-semibold text-black">Price : </span>
    Available On Request
  </p>
)}





        <p className="text-slate-800">
          <span className="font-semibold text-black">
            {listing.InvestmentType
              ? listing.InvestmentType.charAt(0).toUpperCase() +
                listing.InvestmentType.slice(1)
              : "Investment Type"}{" "}
            :{" "}
          </span>

          {/* <span className='font-semibold text-black'> {listing.InvestmentType || 'Investment Type'} - </span> */}
          {listing.InvestmentTypeDetails || "Investment Type Details"}
        </p>

        {listing.type === "rent" && (
          <p className="text-slate-800">
            <span className="font-semibold text-black">Rental Type : </span>
            {listing.rentalType || "Rental Type"}
          </p>
        )}

        {listing && listing.paymentType === "cash" && (
          <p className="text-slate-800">
            <span className="font-semibold text-black">Cash Amount : </span>
            {listing.cashAmount} AED
          </p>
        )}

        {listing.totalAreaMin !== 0 && (
          <h1 className="text-xl font-bold mt-4 mb-2 text-gray-800">
            Property Area
          </h1>
        )}

       {/* <div>  */}

{/* 


        
{showMinMax ? (
  <div className='gap-2 '> 
    <p className='text-slate-800 pb-2'>
      <span className='font-semibold text-black'>Internal Area : </span>
      {listing.internalAreaMin} 
      <span className='font-semibold text-black'> - </span>
      {listing.internalAreaMax} sqft
    </p>
    <p className='text-slate-800 pb-2'>
      <span className='font-semibold text-black'>External Area : </span>
      {listing.externalAreaMin}
      <span className='font-semibold text-black'> - </span>
      {listing.externalAreaMax} sqft
    </p>
    <p className='text-slate-800 pb-2'>
      <span className='font-semibold text-black'>Total Area: </span>
      {listing.totalAreaMin} 
      <span className='font-semibold text-black'> - </span>
      {listing.totalAreaMax} sqft
    </p>
  </div>
) : (
  <div className='gap-2 '> 
    <p className='text-slate-800 pb-2'>
      <span className='font-semibold text-black'>Internal Area : </span>
      {listing.internalAreaMin} sqft
    </p>
    <p className='text-slate-800 pb-2'>
      <span className='font-semibold text-black'>External Area : </span>
      {listing.externalAreaMin} sqft
    </p>
    <p className='text-slate-800 pb-2'>
      <span className='font-semibold text-black'>Total Area: </span>
      {listing.totalAreaMin}  sqft
    </p>
  </div>
)}

</div>
{/* </div> * /}
        <div className="gap-2 ">
          {showMinMax ? (
            <div className="gap-2 ">
              {listing.internalAreaMin !== 0 && (
                <p className="text-slate-800 pb-2">
                  <span className="font-semibold text-black">
                    Internal Area :{" "}
                  </span>
                  {listing.internalAreaMin}
                  {listing.internalAreaMax !== 0 && (
                    <>
                      <span className="font-semibold text-black"> - </span>
                      {listing.internalAreaMax}
                    </>
                  )}{" "}
                  sqft
                </p>
              )}
              {listing.externalAreaMin !== 0 && (
                <p className="text-slate-800 pb-2">
                  <span className="font-semibold text-black">
                    External Area :{" "}
                  </span>
                  {listing.externalAreaMin}
                  {listing.externalAreaMax !== 0 && (
                    <>
                      <span className="font-semibold text-black"> - </span>
                      {listing.externalAreaMax}
                    </>
                  )}{" "}
                  sqft
                </p>
              )}
              {listing.internalAreaMin === 0 &&
                listing.externalAreaMin === 0 &&
                listing.totalAreaMin !== 0 && (
                  <p className="text-slate-800 pb-2">
                    <span className="font-semibold text-black">
                      Total Area:{" "}
                    </span>
                    {listing.totalAreaMin !== 0 && listing.totalAreaMin}
                    {listing.totalAreaMin !== 0 &&
                      listing.totalAreaMax !== 0 && (
                        <>
                          <span className="font-semibold text-black"> - </span>
                          {listing.totalAreaMax}
                        </>
                      )}{" "}
                    sqft
                  </p>
                )}
            </div>
          ) : (
            <div className="gap-2 ">
              {listing.internalAreaMin !== 0 && (
                <p className="text-slate-800 pb-2">
                  <span className="font-semibold text-black">
                    Internal Area :{" "}
                  </span>
                  {listing.internalAreaMin} sqft
                </p>
              )}
              {listing.externalAreaMin !== 0 && (
                <p className="text-slate-800 pb-2">
                  <span className="font-semibold text-black">
                    External Area :{" "}
                  </span>
                  {listing.externalAreaMin} sqft
                </p>
              )}
              {listing.internalAreaMin === 0 &&
                listing.externalAreaMin === 0 &&
                listing.totalAreaMin !== 0 && (
                  <p className="text-slate-800 pb-2">
                    <span className="font-semibold text-black">
                      Total Area:{" "}
                    </span>
                    {listing.totalAreaMin !== 0 && listing.totalAreaMin} sqft
                  </p>
                )}
            </div>
          )}

          {listing.BUA !== 0 && (
            <p className="text-slate-800">
              <span className="font-semibold text-black">Built-Up Area : </span>
              {listing.BUA} sqft
            </p>
          )}
      </div> */}



<div>
  {showMinMax ? (
    <div className='gap-2 '> 
      {listing.internalAreaMin !== 0 && (
        <p className='text-slate-800 pb-2'>
          <span className='font-semibold text-black'>Internal Area : </span>
          {listing.internalAreaMin} 
          {listing.internalAreaMax !== 0 && (
            <>
              <span className='font-semibold text-black'> - </span>
              {listing.internalAreaMax}
            </>
          )} sqft
        </p>
      )}
      {listing.externalAreaMin !== 0 && (
        <p className='text-slate-800 pb-2'>
          <span className='font-semibold text-black'>External Area : </span>
          {listing.externalAreaMin}
          {listing.externalAreaMax !== 0 && (
            <>
              <span className='font-semibold text-black'> - </span>
              {listing.externalAreaMax}
            </>
          )} sqft
        </p>
      )}
      {listing.totalAreaMin !== 0 && (
        <p className='text-slate-800 pb-2'>
          <span className='font-semibold text-black'>Total Area: </span>
          {listing.totalAreaMin} 
          {listing.totalAreaMax !== 0 && (
            <>
              <span className='font-semibold text-black'> - </span>
              {listing.totalAreaMax}
            </>
          )} sqft
        </p>
      )}
    </div>
  ) : (
    <div className='gap-2 '> 
      {listing.internalAreaMin !== 0 && (
        <p className='text-slate-800 pb-2'>
          <span className='font-semibold text-black'>Internal Area : </span>
          {listing.internalAreaMin} sqft
        </p>
      )}
      {listing.externalAreaMin !== 0 && (
        <p className='text-slate-800 pb-2'>
          <span className='font-semibold text-black'>External Area : </span>
          {listing.externalAreaMin} sqft
        </p>
      )}
      {listing.totalAreaMin !== 0 && (
        <p className='text-slate-800 pb-2'>
          <span className='font-semibold text-black'>Total Area: </span>
          {listing.totalAreaMin} sqft
        </p>
      )}
    </div>
  )}

  {listing.BUA !== 0 && (
    <p className='text-slate-800'>
      <span className='font-semibold text-black'>Built-Up Area : </span>
      {listing.BUA} sqft
    </p>
  )}
</div>

      </div>

      {listing &&
        listing.type !== "rent" &&
        (listing.ageYear !== 0 || listing.ageMonth !== 0) && (
          <div className="flex gap-2">
            <p className="text-slate-800">
              <span className="font-semibold text-black">
                Real Estate Age :{" "}
              </span>
              {listing.ageYear !== 0 && listing.ageMonth !== 0
                ? `${listing.ageYear} Year ${listing.ageMonth} Month`
                : listing.ageYear !== 0
                ? `${listing.ageYear} Year`
                : `${listing.ageMonth} Month`}
            </p>
          </div>
        )}

      <ul className="text-green-900 font-semibold text-sm flex flex-wrap items-center ml-2 gap-4 sm:gap-6">
        {listing.bedrooms !== 0 && (
          <li className="flex items-center gap-1 whitespace-nowrap ">
            <FaBed className="text-lg" />
            {listing.bedrooms > 1
              ? `${listing.bedrooms} beds `
              : `${listing.bedrooms} bed `}
          </li>
        )}
        {listing.bathrooms !== 0 && (
          <li className="flex items-center gap-1 whitespace-nowrap ">
            <FaBath className="text-lg" />
            {listing.bathrooms > 1
              ? `${listing.bathrooms} baths `
              : `${listing.bathrooms} bath `}
          </li>
        )}
        <li className="flex items-center gap-1 whitespace-nowrap ">
          <FaParking className="text-lg" />
          {listing.parking ? "Parking spot" : "No Parking"}
        </li>
        <li className="flex items-center gap-1 whitespace-nowrap ">
          <FaChair className="text-lg" />
          {listing.furnished ? "Furnished" : "Unfurnished"}
        </li>
      </ul>

      <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
        {!contact && (
          <button
            onClick={() => setContact(true)}
            className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3"
          >
            Contact Email
          </button>
        )}
        {contact && <Contact listing={listing} />}
        <button
          onClick={handleSendWhatsAppMessage}
          disabled={isSendingMessage}
          className="w-full bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3"
        >
          {isSendingMessage ? "Sending..." : "Send WhatsApp Message"}
        </button>
      </div>
    </main>
  );
};

export default TexteArea;


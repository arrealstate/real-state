import react, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ImageSlider from "../../components/listingComponents/ImageSlider";
import MediaSection from "../../components/listingComponents/MediaSection";
import MediaTabs from "../../components/listingComponents/MediaTabs";
import VideoPlayer from "../../components/listingComponents/VideoPlayer";
import FileViewer from "../../components/listingComponents/FileViewer";

import TexteArea from "../../components/listingComponents/TexteArea";

import SwiperCore from "swiper";
import { useSelector } from "react-redux";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { FaShare } from "react-icons/fa";

// https://sabe.io/blog/javascript-format-numbers-commas#:~:text=The%20best%20way%20to%20format,format%20the%20number%20with%20commas.

export default function Listing() {
  const { currentUser } = useSelector((state) => state.user || {});

  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const params = useParams();
  const [userId, setUserId] = useState(null);

  const [offers, setOffers] = useState([]);

  const sendWhatsappMessage = () => {
    // const phoneNumber = '971588247858'; // Replace with recipient's phone number
    // const message = `Hi, I'm interested in your property listing.`;

    // const whatsappURL = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    // const whatsappURL = `https://wa.me/971588247858?text=Hi%2C%20I%27m%20interested%20in%20your%20property%20listing.`;
    // whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    // window.open(whatsappURL);
    window.open(
      `https://wa.me/971588247858?text=Hi%2C%20I%27m%20interested%20in%20your%20property%20listing.`
    );
  };

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        if (!data || data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }

        const { imageUrls, ...otherData } = data;

        if (!Array.isArray(imageUrls)) {
          throw new Error("Invalid image URLs data");
        }

        setListing({ ...otherData, imageUrls });
        setLoading(false);
        setError(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(true);
        setLoading(false);
      }
    };

    fetchListing();
  }, [params.listingId]);

  useEffect(() => {
    if (listing && listing.userRef) {
      setUserId(listing.userRef);
    }
  }, [listing]);

  // console.log(listing);

  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userId) {
          const response = await fetch(`/api/user/developer/${userId}`);
          const data = await response.json();
          setUserData(data);
        } else {
          setUserData([]);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [userId]);

  useEffect(() => {
    if (listing && listing.userRef !== null && listing.userRef !== undefined) {
      setUserId(listing.userRef);
    } else {
      setUserId(null);
    }
  }, [listing]);

  const [user, setUser] = useState([]);

  useEffect(() => {
    if (userData && userData.user !== null && userData.user !== undefined) {
      setUser(userData.user);
    } else {
      setUser(null);
    }
  }, [userData]);

  // console.log(userId);
  // console.log(userData.user);
  const owner = userData?.user?.username || "owner";
  // console.log(owner);
  // console.log(user);
  offers;
  let color = user?.color;
  let bgColor = user?.bgColor;

  // console.log(`User's color: ${color}`);
  // console.log(`User's bg color: ${bgColor}`);

  useEffect(() => {
    if (listing && listing.offers !== null && listing.offers !== undefined) {
      setOffers(listing.offers);
    } else {
      setOffers([]);
    }
  }, [listing]);

  // console.log(offers);

  // /api/offer/offers/:offerId
  const [offerData, setOfferData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (offers[0]) {
          const response = await fetch(`/api/offer/offers/${offers[0]}`);
          const data = await response.json();
          setOfferData(data);
        } else {
          // Handle the case when userId is null
          setOfferData([]); // Clear the userData if userId is null
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [offers[0]]);

  // console.log(offerData);

  const [showPopup, setShowPopup] = useState(false);

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const [mediaType, setMediaType] = useState("images");

  const handleChangeMediaType = (type) => {
    setMediaType(type);
  };

  return (
    <main>
      {loading && 
      
      <main className="flex justify-center items-start min-h-screen py-7">
      <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    </main> 
      
      
      // <p className="text-center my-7 text-2xl">Loading... </p>
      
      
      }
      {error && (
        <p className="text-center my-7 text-2xl">Something went wrong!</p>
      )}
      {listing && !loading && !error && (
        <div>
          <div
            className="w-full  px-2 py-6"
            style={{
              background: bgColor ? bgColor : "#643c1c",
            }}
          >
            <p
              className="bold xl:text-2xl text-xl text-center "
              style={{
                color: color ? color : "#fff",
              }}
            >
              {owner}
            </p>
          </div>

          <div className="w-full grid md:grid-cols-2 gap-4 items-start">
            {listing && (
              <div className="xl:p-4 md:col-span-1 md:p-1">
                <TexteArea
                  listing={listing}
                  contact={contact}
                  setContact={setContact}
                  sendWhatsappMessage={sendWhatsappMessage}
                  offerData={offerData}
                />
              </div>
            )}
            <div
              id="imageContainer"
              className="p-4 md:col-span-1 md:p-1 cursor-pointer"
              onClick={openPopup}
            >
              <MediaSection
                imageUrls={listing?.imageUrls}
                videoUrls={listing?.videoUrls}
              />
            </div>
          </div>

          {showPopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white rounded-lg p-6">
                <div>
                  <MediaTabs
                    value={mediaType}
                    onChange={handleChangeMediaType}
                  />
                  {mediaType === "images" && (
                    <ImageSlider
                      imageUrls={listing.imageUrls}
                      closePopup={closePopup}
                    />
                  )}
                  {mediaType === "videos" && (
                    <VideoPlayer
                      videoUrls={listing.videoUrls}
                      closePopup={closePopup}
                    />
                  )}
                  {mediaType === "files" && (
                    <FileViewer
                      filesUrls={listing.filesUrls}
                      closePopup={closePopup}
                    />
                  )}
                </div>
              </div>
            </div>
          )}

          <div></div>

          <div></div>
          <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
            <FaShare
              className="text-slate-500"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
              Link copied!
            </p>
          )}
        </div>
      )}
    </main>
  );
}

import React from "react";
import styles from "./mediaSection.module.css";
import { FaPlusSquare } from "react-icons/fa";

const MediaSection = ({ imageUrls, videoUrls }) => {
  const totalMediaCount = imageUrls.length + videoUrls.length;
  const largeImageWidth = "100%";
  const mediaItemWidth = "calc(100% / 3)";
  const mediaItemHeight = "200px";

  return (
    <section
      style={{
        width: largeImageWidth,
        maxHeight: "400px",
        aspectRatio: "16/9",
      }}
    >
      <div className="flex items-center justify-center flex-col mt-1 h-auto">
        <img
          src={imageUrls[0]}
          alt="First Image"
          className="inset-0 w-full object-cover mb-4 px-1"
        />
      </div>

      <div className="flex justify-center items-start mt-1">
        {imageUrls[0] && !imageUrls[1] && videoUrls[0] && (
          <video
            controls
            src={videoUrls[0]}
            className="w-full h-full object-cover px-1"
            style={{ height: mediaItemHeight }}
          >
            Your browser does not support the video tag.
          </video>
        )}

        {imageUrls[1] && !videoUrls[0] && (
          <img
            src={imageUrls[1]}
            alt="Second Image"
            className="w-1/3 h-full object-cover px-1"
            style={{ width: mediaItemWidth, height: mediaItemHeight }}
          />
        )}
 {imageUrls[1] && videoUrls[0] && (
          <img
            src={imageUrls[1]}
            alt="Second Image"
            className="w-1/3 h-full object-cover px-1"
            style={{ width: mediaItemWidth, height: mediaItemHeight }}
          />
        )}

{imageUrls[1] && imageUrls[3] && !videoUrls[0] && (
     <>     
          <img
          src={imageUrls[3]}
          alt="third Image"
          className="w-1/3 h-full object-cover px-1"
          style={{ width: mediaItemWidth, height: mediaItemHeight }}
        />
</>
        )}
        {videoUrls[0] && !imageUrls[0] && !imageUrls[1] && (
          <video
            controls
            src={videoUrls[0]}
            className="w-1/3 h-full object-cover px-1"
            style={{ width: mediaItemWidth, height: mediaItemHeight }}
          >
            Your browser does not support the video tag.
          </video>
        )}

        {videoUrls[0] && imageUrls[0] && imageUrls[1] && (
          <video
            controls
            src={videoUrls[0]}
            className="w-1/3 h-full object-cover px-1"
            style={{ width: mediaItemWidth, height: mediaItemHeight }}
          >
            Your browser does not support the video tag.
          </video>
        )}


        {imageUrls[2] && (
          <span
            className="relative w-1/3 plus_image"
            style={{ width: mediaItemWidth }}
          >
            <img
              src={imageUrls[2]}
              alt="Third image"
              className="w-full h-full object-cover px-1"
              style={{ height: mediaItemHeight }}
            />
            {imageUrls.length - 2 > 0 && (
              <button
                className={`${styles.btnPlus} text-white font-bold py-2 px-4 rounded absolute end-0`}
              >
                <FaPlusSquare />
                &nbsp;
                {imageUrls.length - 2}
              </button>
            )}
          </span>
        )}
      </div>
    </section>
  );
};

export default MediaSection;

import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { IoSend } from "react-icons/io5";
import { fetchImages } from "@/service/GlobalApis"; // Adjust the import path as needed

function InfoSection({ trip }) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const getPlaceDetails = async () => {
      if (trip?.userSelection?.location?.label) {
        const fetchedImages = await fetchImages(trip.userSelection.location.label);
        setImages(fetchedImages);
      }
    };

    getPlaceDetails();
  }, [trip]);

  const handleRedirect = () => {
    const location = trip?.userSelection?.location?.label;
    if (location) {
      const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        location
      )}`;
      window.open(googleMapsUrl, "_blank"); // Opens in a new tab
    }
  };

  return (
    <div>
      {images.length > 0 ? (
        <img
          src={images[0]?.src?.original} // Display the first image
          className="h-[360px] w-full object-cover rounded"
          alt={trip?.userSelection?.location?.label}
        />
      ) : (
        <img
          src="/placeholder.jpeg"
          className="h-[360px] w-full object-cover rounded"
          alt="Placeholder"
        />
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
        <div className="my-4 sm:my-6 flex flex-col gap-2">
          <h2 className="font-bold text-xl sm:text-2xl" style={{ color: 'var(--text-primary)' }}>
            {trip?.userSelection?.location?.label}
          </h2>

          <div className="mt-3 flex flex-wrap gap-2 sm:gap-3">
            <div className="p-1 px-2 sm:px-3 bg-gray-200 rounded-full text-gray-700 text-xs sm:text-sm">
              📆 {trip?.userSelection?.noOfDays} Day
            </div>
            <div className="p-1 px-3 bg-gray-200 rounded-full text-gray-700 sm:text-xs md:text-md">
              💵 {trip?.userSelection?.budget} Budget
            </div>
            <div className="p-1 px-3 bg-gray-200 rounded-full text-gray-700 sm:text-xs md:text-md">
              🏖️ Traveller: {trip?.userSelection?.companion}
            </div>
          </div>
        </div>

        <style>
          {`
          @keyframes gradientMove {
            20% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
        </style>

        <Button
          style={{
            background: "linear-gradient(90deg, #8290ff, #ec9eff, #fc7a7a)",
            backgroundSize: "200% 200%",
            animation: "gradientMove 8s ease infinite",
          }}
          className="border-[2px] border-[#fff] mt-4 sm:mt-6 hover:border-[#a6e3f7] hover:text-[#a6e3f7] w-full sm:w-auto"
          onClick={handleRedirect}
        >
          <IoSend /> <span className="ml-2 sm:hidden">Open Map</span>
        </Button>
      </div>
    </div>
  );
}

export default InfoSection;

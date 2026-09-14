import React, { useEffect, useState } from 'react';
import { fetchImages } from '@/service/GlobalApis'; // Adjust the import path as needed
import { Link } from 'react-router-dom';

function UserTripCardItem({ trip }) {
  const [imageUrl, setImageUrl] = useState('/placeholder.jpg'); // Default to placeholder image
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchTripImage = async () => {
      setLoading(true); // Set loading state to true before fetching image

      if (trip?.userSelection?.location.label) {
        try {
          const fetchedImages = await fetchImages(trip.userSelection.location.label);
          // Log the fetched images for debugging purposes
          console.log(`Fetched images for ${trip.userSelection.location.label}:`, fetchedImages);
          setImageUrl(fetchedImages[0]?.src?.original || '/placeholder.jpg'); // Use first image or fallback to placeholder
        } catch (error) {
          console.error(`Error fetching image for ${trip.userSelection.location.label}:`, error);
          setImageUrl('/placeholder.jpg'); // Use placeholder if fetching fails
        }
      }

      setLoading(false); // Set loading state to false after fetching
    };

    fetchTripImage(); // Call the async function
  }, [trip]);

  return (
    <Link to={"/view-trip/"+ trip?.id}>
    <div className="hover:scale-105 transition-all flex flex-col items-center w-full">
      {loading ? (
        <div className="w-full h-48 sm:h-[250px] bg-gray-300 animate-pulse rounded-xl">Loading...</div> // Optional loading indicator
      ) : (
        <img
          src={imageUrl}
          className="w-full aspect-video sm:aspect-[4/3] object-cover rounded-xl" // Responsive and maintains aspect ratio
          alt={trip?.userSelection?.location.label || 'Trip Image'}
        />
      )}
      <div className="mt-2 w-full px-2">
        <h2 className="font-bold text-base sm:text-lg truncate" style={{ color: 'var(--text-primary)' }}>{trip?.userSelection?.location.label}</h2>
        <h2 className="text-xs sm:text-sm text-[#cecece]">
          {trip?.userSelection.noOfDays} Days trip with {trip?.userSelection?.budget} Budget
        </h2>
      </div>
    </div></Link>
  );
}

export default UserTripCardItem;

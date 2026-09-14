import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchImages } from '@/service/GlobalApis'; // Adjust the import path as needed

function Hotels({ trip }) {
  const [hotelImages, setHotelImages] = useState({}); // To store fetched images for each hotel

  useEffect(() => {
    const fetchHotelImages = async () => {
      const images = {};
      const hotels = trip?.tripData?.hotels || [];

      // Create an array of fetch promises
      const fetchPromises = hotels.map(async (hotel) => {
        if (hotel?.name) {
          try {
            const fetchedImages = await fetchImages(hotel.name);
            // Log the fetched images for debugging
            console.log(`Fetched images for ${hotel.name}:`, fetchedImages);
            images[hotel.name] = fetchedImages[0]?.src?.original || "/placeholder.jpeg"; // Store the first image or use placeholder
          } catch (error) {
            console.error(`Error fetching images for ${hotel.name}:`, error);
            images[hotel.name] = "/placeholder.jpeg"; // Fallback to placeholder on error
          }
        }
      });

      // Wait for all promises to resolve
      await Promise.all(fetchPromises);

      setHotelImages(images);
    };

    if (trip?.tripData?.hotels && trip.tripData.hotels.length > 0) {
      fetchHotelImages();
    }
  }, [trip]);

  // Show data immediately with placeholders, don't wait for images
  const hotels = trip?.tripData?.hotels || [];

  if (hotels.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className='font-bold text-xl mt-5' style={{ color: 'var(--text-primary)' }}>Hotel Recommendations</h2>
      <div className='py-4 sm:py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5'>
        {hotels.map((hotel, index) => (
          <Link
            to={`https://www.google.com/maps/search/?api=1&query=${hotel?.name},${hotel?.address}`}
            target='_blank'
            key={index}
          >
            <div className='hover:scale-105 transition-all cursor-pointer'>
              <img
                src={hotelImages[hotel.name] || "/placeholder.jpeg"} // Use the fetched image or placeholder
                className='rounded-xl w-full h-40 sm:h-48 object-cover' // Set a fixed height to make images equal size
                alt={hotel?.name}
              />
              <div className='my-2 flex flex-col gap-1 sm:gap-2'>
                <h2 className='font-medium text-sm sm:text-base' style={{ color: 'var(--text-primary)' }}>{hotel?.name || 'Hotel Name'}</h2>
                <h2 className='text-xs sm:text-sm' style={{ color: 'var(--text-secondary)' }}>📍 {hotel?.address || 'Address'}</h2>
                <h2 className='text-xs sm:text-sm' style={{ color: 'var(--text-primary)' }}>💶 {hotel?.price || 'Price N/A'}</h2>
                <h2 className='text-xs sm:text-sm' style={{ color: 'var(--text-primary)' }}>⭐ {hotel?.rating || 'N/A'}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Hotels;

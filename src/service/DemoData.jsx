// Demo data generator for fallback when API key is invalid/expired
export const generateDemoTripData = (location, days, companion, budget) => {
  const daysNum = parseInt(days);

  const hotels = {
    cheap: [
      {
        name: "Budget Inn",
        address: `Downtown ${location}`,
        price: "$40-80 per night",
        image_url: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop",
        geo_coordinates: "40.7128, -74.0060",
        rating: "3.5 stars",
        description: "Affordable and comfortable budget hotel with basic amenities in the city center",
      },
      {
        name: "Economy Hotel",
        address: `Main Street, ${location}`,
        price: "$50-90 per night",
        image_url: "https://images.unsplash.com/photo-1618773927537-b85f3f00007b?w=400&h=300&fit=crop",
        geo_coordinates: "40.7580, -73.9855",
        rating: "3.8 stars",
        description: "Clean and practical hotel with good value for money",
      },
      {
        name: "Local Stay",
        address: `Residential Area, ${location}`,
        price: "$35-75 per night",
        image_url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
        geo_coordinates: "40.7489, -73.9680",
        rating: "4.0 stars",
        description: "Cozy local accommodation with authentic neighborhood experience",
      },
      {
        name: "Standard Hotel",
        address: `City Center, ${location}`,
        price: "$45-85 per night",
        image_url: "https://images.unsplash.com/photo-1582719471384-894fbb16e143?w=400&h=300&fit=crop",
        geo_coordinates: "40.7505, -73.9972",
        rating: "3.7 stars",
        description: "Standard rooms with essential facilities and friendly service",
      },
    ],
    moderate: [
      {
        name: "Comfort Hotel",
        address: `Business District, ${location}`,
        price: "$100-150 per night",
        image_url: "https://images.unsplash.com/photo-1595576508898-0ad5669b4fbe?w=400&h=300&fit=crop",
        geo_coordinates: "40.7614, -73.9776",
        rating: "4.3 stars",
        description: "Modern hotel with comfortable rooms and good amenities",
      },
      {
        name: "Plaza Hotel",
        address: `Central ${location}`,
        price: "$110-160 per night",
        image_url: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&h=300&fit=crop",
        geo_coordinates: "40.7549, -73.9840",
        rating: "4.4 stars",
        description: "Well-appointed hotel with excellent facilities and central location",
      },
      {
        name: "Prime Inn",
        address: `Resort Area, ${location}`,
        price: "$95-145 per night",
        image_url: "https://images.unsplash.com/photo-1516027657879-3068ba432771?w=400&h=300&fit=crop",
        geo_coordinates: "40.7282, -73.7949",
        rating: "4.2 stars",
        description: "Quality accommodation with good service and facilities",
      },
      {
        name: "City Hotel",
        address: `Downtown ${location}`,
        price: "$105-155 per night",
        image_url: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop",
        geo_coordinates: "40.7680, -73.9810",
        rating: "4.1 stars",
        description: "Contemporary hotel in vibrant city location",
      },
    ],
    luxury: [
      {
        name: "The Grand Palace",
        address: `Premium District, ${location}`,
        price: "$250-400 per night",
        image_url: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=400&h=300&fit=crop",
        geo_coordinates: "40.7733, -73.9820",
        rating: "5.0 stars",
        description: "Luxurious 5-star hotel with world-class amenities and exceptional service",
      },
      {
        name: "Royal Suite Hotel",
        address: `Exclusive Area, ${location}`,
        price: "$280-450 per night",
        image_url: "https://images.unsplash.com/photo-1570129477492-45a003537e1f?w=400&h=300&fit=crop",
        geo_coordinates: "40.7489, -73.9680",
        rating: "4.9 stars",
        description: "Premium luxury hotel with opulent rooms and top-tier hospitality",
      },
      {
        name: "Elite Towers",
        address: `Prestige Location, ${location}`,
        price: "$300-500 per night",
        image_url: "https://images.unsplash.com/photo-1585968944980-c64719829737?w=400&h=300&fit=crop",
        geo_coordinates: "40.7614, -73.9776",
        rating: "4.8 stars",
        description: "Ultra-luxury resort with premium suites and exclusive facilities",
      },
      {
        name: "Heritage Mansion",
        address: `Historic Center, ${location}`,
        price: "$260-380 per night",
        image_url: "https://images.unsplash.com/photo-1529290881920-012e39d46e8f?w=400&h=300&fit=crop",
        geo_coordinates: "40.7505, -73.9972",
        rating: "4.9 stars",
        description: "Luxury heritage property combining historic charm with modern elegance",
      },
    ],
  };

  const attractions = {
    default: [
      {
        place_name: "City Museum",
        place_address: `Museum Street, ${location}`,
        place_details: "World-renowned museum showcasing art, history, and culture",
        place_image_url: "https://images.unsplash.com/photo-1564399579883-451a5d44ec08?w=400&h=300&fit=crop",
        geo_coordinates: "40.7733, -73.9820",
        ticket_pricing: "$15-25",
        rating: "4.6 stars",
        visit_duration: "2-3 hours",
      },
      {
        place_name: "Central Park",
        place_address: `Park Avenue, ${location}`,
        place_details: "Beautiful urban park perfect for walking, picnicking, and relaxation",
        place_image_url: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400&h=300&fit=crop",
        geo_coordinates: "40.7829, -73.9654",
        ticket_pricing: "Free",
        rating: "4.8 stars",
        visit_duration: "3-4 hours",
      },
      {
        place_name: "Historic District",
        place_address: `Old Town, ${location}`,
        place_details: "Charming historic area with colonial architecture and heritage sites",
        place_image_url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
        geo_coordinates: "40.7128, -74.0060",
        ticket_pricing: "Free to explore",
        rating: "4.5 stars",
        visit_duration: "2-3 hours",
      },
      {
        place_name: "Market Square",
        place_address: `Downtown ${location}`,
        place_details: "Vibrant marketplace with local crafts, souvenirs, and street food",
        place_image_url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop",
        geo_coordinates: "40.7489, -73.9680",
        ticket_pricing: "Free",
        rating: "4.4 stars",
        visit_duration: "2-3 hours",
      },
      {
        place_name: "Art Gallery District",
        place_address: `Culture Lane, ${location}`,
        place_details: "Trendy area with contemporary art galleries and local exhibitions",
        place_image_url: "https://images.unsplash.com/photo-1578316278076-b98f00628808?w=400&h=300&fit=crop",
        geo_coordinates: "40.7505, -73.9972",
        ticket_pricing: "$5-20 per gallery",
        rating: "4.3 stars",
        visit_duration: "2-3 hours",
      },
      {
        place_name: "Botanical Garden",
        place_address: `Garden Road, ${location}`,
        place_details: "Serene botanical garden with exotic plants and peaceful walking paths",
        place_image_url: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=400&h=300&fit=crop",
        geo_coordinates: "40.7614, -73.9776",
        ticket_pricing: "$10-15",
        rating: "4.7 stars",
        visit_duration: "2-3 hours",
      },
      {
        place_name: "Waterfront Promenade",
        place_address: `Harbor Front, ${location}`,
        place_details: "Scenic waterfront area perfect for evening walks and dining",
        place_image_url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
        geo_coordinates: "40.7282, -73.7949",
        ticket_pricing: "Free",
        rating: "4.6 stars",
        visit_duration: "2-3 hours",
      },
      {
        place_name: "Adventure Park",
        place_address: `Outskirts, ${location}`,
        place_details: "Fun-filled adventure park with rides and family-friendly attractions",
        place_image_url: "https://images.unsplash.com/photo-1552512098-6df627dbc4df?w=400&h=300&fit=crop",
        geo_coordinates: "40.7549, -73.9840",
        ticket_pricing: "$30-50",
        rating: "4.5 stars",
        visit_duration: "3-4 hours",
      },
    ],
  };

  const restaurants = {
    breakfast: ["The Morning Brew Cafe", "Sunrise Bakery", "Fresh Start Kitchen"],
    lunch: ["Local Bistro", "City Deli", "Garden Restaurant", "Street Food Court"],
    dinner: ["The Grand Restaurant", "Fine Dining Heritage", "Lakeside Dinner", "Rooftop Bistro"],
  };

  // Generate itinerary based on number of days
  const itinerary = [];
  for (let day = 1; day <= daysNum; day++) {
    const dayPlan = {
      day,
      title: `Day ${day} - ${location} Exploration`,
      best_time_to_visit: "Morning to Evening",
      plan: attractions.default.slice(0, 5).map((attraction, index) => ({
        ...attraction,
        time: `${9 + index * 2}:00 AM - ${11 + index * 2}:00 AM`,
        travel_time: "15-30 minutes",
      })),
    };

    // Add lunch and dinner recommendations
    dayPlan.lunch = restaurants.lunch[Math.floor(Math.random() * restaurants.lunch.length)];
    dayPlan.dinner = restaurants.dinner[Math.floor(Math.random() * restaurants.dinner.length)];

    itinerary.push(dayPlan);
  }

  const budgetKey = budget.toLowerCase();
  const selectedHotels = hotels[budgetKey] || hotels.moderate;

  return {
    hotels: selectedHotels,
    itinerary,
    trip_summary: `Perfect ${days}-day trip to ${location} for ${companion} with a ${budget} budget. This itinerary includes the best attractions, restaurants, and accommodations to make your trip memorable.`,
  };
};

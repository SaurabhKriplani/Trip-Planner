import PropTypes from 'prop-types';
import PlaceCardItem from "./PlaceCardItem";

PlacesToVisit.propTypes = {
    trip: PropTypes.object.isRequired,
};

function PlacesToVisit({ trip }) {
    // More robust data extraction with multiple fallback paths
    const tripData = trip?.tripData;
    
    // Debugging: Log the full structure
    console.log("Full trip data structure:", tripData);
    console.log("Keys in tripData:", tripData ? Object.keys(tripData) : "No tripData");
    
    // Initialize itinerary variable
    let itinerary = null;
    let itineraryDays = [];
    
    // Try multiple ways to find itinerary data
    if (tripData) {
        // Method 1: Direct itinerary property
        if (tripData.itinerary) {
            itinerary = tripData.itinerary;
            console.log("Found itinerary in tripData.itinerary");
        }
        // Method 2: dailyPlan or daily_plan
        else if (tripData.dailyPlan) {
            itinerary = tripData.dailyPlan;
            console.log("Found itinerary in tripData.dailyPlan");
        }
        else if (tripData.daily_plan) {
            itinerary = tripData.daily_plan;
            console.log("Found itinerary in tripData.daily_plan");
        }
        // Method 3: Look for Day 1, Day 2, etc. as keys
        else {
            const dayKeys = Object.keys(tripData).filter(key => 
                typeof key === 'string' && (key.toLowerCase().includes('day') || /^day\s*\d+/i.test(key))
            );
            if (dayKeys.length > 0) {
                itinerary = {};
                dayKeys.forEach(key => {
                    itinerary[key] = tripData[key];
                });
                console.log("Found itinerary as day keys:", dayKeys);
            }
        }
    }
    
    console.log("Extracted itinerary:", itinerary);
    
    // Parse itinerary into array format
    if (itinerary) {
        if (Array.isArray(itinerary)) {
            // Already an array of days
            // Normalize the structure: convert 'places' to 'plan' if needed
            itineraryDays = itinerary.map(day => {
                if (day.places && !day.plan) {
                    return {
                        ...day,
                        plan: day.places
                    };
                }
                return day;
            });
            console.log("Itinerary is already an array:", itineraryDays.length, "days");
        } else if (typeof itinerary === 'object') {
            // Convert object to array
            itineraryDays = Object.entries(itinerary).map(([key, value]) => {
                // Handle different value structures
                if (Array.isArray(value)) {
                    return {
                        day: key.replace(/^Day\s*/i, "").trim() || key,
                        plan: value,
                    };
                } else if (typeof value === 'object' && value.attractions) {
                    // Some APIs return { attractions: [] }
                    return {
                        day: key.replace(/^Day\s*/i, "").trim() || key,
                        plan: value.attractions,
                    };
                } else if (typeof value === 'object' && value.places) {
                    // Some APIs return { places: [] }
                    return {
                        day: key.replace(/^Day\s*/i, "").trim() || key,
                        plan: value.places,
                    };
                } else if (typeof value === 'object' && value.plan) {
                    // Some APIs return { plan: [] }
                    return {
                        day: key.replace(/^Day\s*/i, "").trim() || key,
                        plan: value.plan,
                    };
                } else if (typeof value === 'string') {
                    // If it's a string, try to parse as JSON
                    try {
                        const parsed = JSON.parse(value);
                        return {
                            day: key.replace(/^Day\s*/i, "").trim() || key,
                            plan: Array.isArray(parsed) ? parsed : [parsed],
                        };
                    } catch {
                        return {
                            day: key.replace(/^Day\s*/i, "").trim() || key,
                            plan: [{ name: value }],
                        };
                    }
                } else {
                    return {
                        day: key.replace(/^Day\s*/i, "").trim() || key,
                        plan: [value],
                    };
                }
            });
            console.log("Converted itinerary object to array:", itineraryDays.length, "days");
        }
    }
    
    console.log("Final itineraryDays:", itineraryDays);
    
    // Show message if no itinerary data
    if (!itineraryDays || itineraryDays.length === 0) {
        return (
            <div className="mt-5 p-4 bg-gray-800 rounded">
                <h2 className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>Places To Visit</h2>
                <div className="text-gray-400 mt-3">
                    No itinerary data available. Please check the trip data structure.
                </div>
            </div>
        );
    }
    
    return (
        <div>
            <h2 className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>Places To Visit</h2>
            <div>
                {itineraryDays.map((item, index) => (
                    <div key={index} className="mt-5">
                        <h2 className="font-medium text-lg" style={{ color: 'var(--text-primary)' }}>
                            Day {item.day || `${index + 1}`}
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5">
                            {Array.isArray(item.plan) && item.plan.length > 0 ? (
                                item.plan.map((place, idx) => (
                                    <div key={idx} className="my-3">
                                        {place?.time && (
                                            <h3 className="font-medium text-sm text-[#7aeafb]">
                                                {place.time}
                                            </h3>
                                        )}
                                        <PlaceCardItem place={place} />
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-2" style={{ color: 'var(--text-primary)' }}>
                                    No plans available for this day.
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PlacesToVisit;
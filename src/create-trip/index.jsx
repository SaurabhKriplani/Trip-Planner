import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { debounce } from "lodash";
import { Input } from "@/components/ui/input";
import { SelectBudgetOptions, SelectTravelsList, AI_PROMPT } from "@/constants/options";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { chatSession } from "@/service/AIModel";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import Footer from "@/view-trip/[tripId]/components/Footer";

function CreateTrip() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [numberOfDays, setNumberOfDays] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (user) {
      const userData = {
        email: user.emailAddresses[0]?.emailAddress,
        name: user.fullName,
      };
      localStorage.setItem("user", JSON.stringify(userData));
    }
  }, [user]);

  const handleFormInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    console.log("Form Data:", formData);
  }, [formData]);

  const OnGenerateTrip = async () => {
    if (
      !formData?.noOfDays ||
      formData?.noOfDays > 5 ||
      !formData?.location ||
      !formData?.budget ||
      !formData?.companion
    ) {
      toast("Please fill all the details");
      return;
    }

    if (!formData.location.reference) {
      toast("Location reference is missing. Please select a valid location.");
      return;
    }

    setLoading(true);

    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', formData?.location?.label)
      .replace('{totalDays}', formData?.noOfDays)
      .replace('{Companion}', formData?.companion)
      .replace('{budget}', formData?.budget);

    console.log("🚀 Sending request to AI with prompt:", FINAL_PROMPT);

    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      const tripData = result?.response?.text ? await result.response.text() : "No data received";
      
      if (tripData === "No data received") {
        toast("Failed to generate trip data. Please try again.");
        setLoading(false);
        return;
      }
      
      console.log("✅ Trip data received from AI:", tripData);
      await SaveAiTrip(tripData);
    } catch (error) {
      console.error("❌ Error generating trip:", error);
      
      const errorMessage = error?.message || "Unknown error";
      
      if (errorMessage.includes("API_KEY_INVALID") || errorMessage.includes("API key expired")) {
        toast("⚠️ API Key Error: Your API key has expired or is invalid. Please get a new API key from https://aistudio.google.com/app/apikey and update your .env file.");
      } else if (errorMessage.includes("403") || errorMessage.includes("Forbidden")) {
        toast("⚠️ API Error: Permission denied. Your API key doesn't have access to this model. Please check your API key configuration.");
      } else if (errorMessage.includes("404")) {
        toast("⚠️ API Error: Model not found. Please try using a different API key.");
      } else if (errorMessage.includes("429")) {
        toast("⚠️ API Error: Too many requests. Please wait a moment and try again.");
      } else if (errorMessage.includes("500") || errorMessage.includes("502") || errorMessage.includes("503")) {
        toast("⚠️ API Error: Google API servers are temporarily unavailable. Please try again in a few moments.");
      } else {
        toast(`❌ Error: ${errorMessage}`);
      }
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const SaveAiTrip = async (TripData) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();

    try {
      let parsedTripData;
      
      // Parse the trip data
      if (typeof TripData === 'string') {
        parsedTripData = JSON.parse(TripData);
      } else {
        parsedTripData = TripData;
      }
      
      console.log("📊 Parsed trip data before saving:", parsedTripData);
      console.log("Has hotels?", !!parsedTripData.hotels, "Count:", parsedTripData.hotels?.length);
      console.log("Has itinerary?", !!parsedTripData.itinerary, "Count:", parsedTripData.itinerary?.length);
      
      if (formData.location && formData.location.reference) {
        await setDoc(doc(db, "AITrips", docId), {
          userSelection: formData,
          tripData: parsedTripData,
          userEmail: user?.email || "",
          id: docId,
        });
        console.log("✅ Trip data saved successfully to Firebase!");
        toast("Trip data saved successfully!");
      } else {
        console.error("Location reference is missing in formData");
        toast("Failed to save trip data. Location information is missing.");
      }
    } catch (error) {
      console.error("❌ Error saving trip data:", error);
      toast("Failed to save trip data: " + error.message);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
      navigate("/view-trip/" + docId);
    }
  };

  const fetchSuggestions = async (value) => {
    try {
      const response = await axios.get(`https://api.locationiq.com/v1/autocomplete.php`, {
        params: {
          key: import.meta.env.VITE_LOCATION_IQ_TOKENS,
          q: value,
          format: "json",
        },
      });
      setSuggestions(response.data);
    } catch (error) {
      console.error("Error fetching location suggestions:", error);
    }
  };

  const debouncedFetchSuggestions = useRef(debounce(fetchSuggestions, 1000)).current;

  const handleLocationInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 2) {
      debouncedFetchSuggestions(value);
    } else {
      setSuggestions([]);
    }
  };

  const handleLocationSelect = (suggestion) => {
    const { display_name: label, place_id: id, lat, lon } = suggestion;
    const reference = suggestion.reference || `${lat}-${lon}`;

    if (!reference) {
      console.error("Location reference is missing in suggestion");
      toast("Failed to select location. Reference information is missing.");
      return;
    }

    const selected = {
      label,
      id,
      reference,
      latitude: lat,
      longitude: lon,
    };

    setQuery(label);
    setSuggestions([]);
    inputRef.current.blur();
    handleFormInputChange("location", selected);
    console.log("Selected Location Details:", selected);
  };

  const handleDaysChange = (e) => {
    const value = e.target.value;
    if (value === "" || parseInt(value, 10) > 0) {
      setNumberOfDays(value);
      handleFormInputChange("noOfDays", value);
    }
  };

  return (
    <>
      <div className="px-4 sm:px-8 md:px-20 lg:px-40 xl:px-60 mt-6 sm:mt-10">
        <h2 className="font-sans font-bold text-2xl sm:text-3xl" style={{ color: 'var(--text-primary)' }}>
          Tell us your Travel Preferences 🍂🏝️
        </h2>
        <p className="mt-3 sm:mt-4 text-sm sm:text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          Let us know about your preferences, interests, and budget, and we&apos;ll help craft a personalized trip plan.
        </p>

      <div className="mt-10 space-y-10">
        <div className="relative">
          <h2 className="text-xl my-2 font-semibold" style={{ color: 'var(--text-primary)' }}>
            What is your Destination of Choice?
          </h2>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleLocationInputChange}
            placeholder="Search for your destination"
            className="border p-4 rounded-lg w-full text-gray-800 bg-gray-100 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 smooth-transition-fast"
            style={{ height: "48px" }}
            autoComplete="off"
          />
          {suggestions.length > 0 && (
            <ul className="mt-2 bg-white border rounded-lg shadow-lg absolute z-10 w-full max-h-60 overflow-auto slide-down">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="p-4 hover:bg-blue-50 cursor-pointer text-gray-700 smooth-transition"
                  onClick={() => handleLocationSelect(suggestion)}
                >
                  {suggestion.display_name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <h2 className="text-xl my-2 font-semibold" style={{ color: 'var(--text-primary)' }}>
            How many days are you planning your trip for?
          </h2>
          <Input
            placeholder="Ex. 3"
            type="number"
            value={numberOfDays}
            min="1"
            onChange={handleDaysChange}
            className="border p-4 rounded-lg w-full text-gray-800 bg-gray-100 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 smooth-transition-fast"
            style={{ height: "48px" }}
          />
        </div>
      </div>

      <div>
        <h2 className="text-xl my-2 font-semibold" style={{ color: 'var(--text-primary)' }}>
          What is Your Budget?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5 mt-5">
          {SelectBudgetOptions.map((item, index) => (
            <div
              key={index}
              className={`p-4 border cursor-pointer rounded-lg smooth-transition ${formData?.budget === item.title ? 'shadow-lg border-[#8290ff] bg-[#1a1f3a]' : 'hover:bg-[#0a0e27]'}`}
              onClick={() => handleFormInputChange("budget", item.title)}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>{item.title}</h2>
              <h2 className="text-sm" style={{ color: 'var(--text-secondary)' }}>{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl my-2 font-semibold" style={{ color: 'var(--text-primary)' }}>
          Who&apos;s joining your adventure?
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-5 mt-5">
          {SelectTravelsList.map((item, index) => (
            <div
              key={index}
              className={`p-4 border cursor-pointer rounded-lg smooth-transition ${formData?.companion === item.title ? 'shadow-lg border-[#8290ff] bg-[#1a1f3a]' : 'hover:bg-[#0a0e27]'}`}
              onClick={() => handleFormInputChange("companion", item.title)}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>{item.title}</h2>
              <h2 className="text-sm" style={{ color: 'var(--text-secondary)' }}>{item.desc}</h2>
            </div>
          ))}
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
      
      <div className="my-10 justify-end flex">
        <Button 
          style={{
            background: "linear-gradient(90deg, #8290ff, #ec9eff, #fc7a7a)",
            backgroundSize: "200% 200%",
            animation: "gradientMove 8s ease infinite",
          }} 
          className="border-[2px] border-[#fff] mt-6 hover:border-[#a6e3f7] hover:text-[#a6e3f7] gradient-button disabled:opacity-75 disabled:cursor-not-allowed" 
          onClick={OnGenerateTrip} 
          disabled={loading}
        >
          {loading ? "🎯 Generating..." : "✨ Generate Trip"}
        </Button>
      </div>
      <Footer></Footer>
      </div>
    </>
  );
}

export default CreateTrip;


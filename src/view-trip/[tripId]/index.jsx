import { db } from '@/service/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner';
import InfoSection from './components/InfoSection';
import Hotels from './components/Hotels';
import PlacesToVisit from './components/PlacesToVisit';
import Footer from './components/Footer';

function Viewtrip() {
    const { tripId } = useParams();
    // Initialize as null instead of empty array
    const [trip, setTrip] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (tripId) {
            GetTripData();
        }
    }, [tripId]);

    // Used to get Trip Information from the firebase
    const GetTripData = async () => {
        try {
            setLoading(true);
            const docRef = doc(db, "AITrips", tripId);
            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {
                const tripData = docSnap.data();
                console.log("Document:", tripData);
                setTrip(tripData);
            } else {
                console.log("No Such Document");
                toast("No trip Found !!");
                setTrip(null);
            }
        } catch (error) {
            console.error("Error fetching trip data:", error);
            toast("Error loading trip data");
            setTrip(null);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className='px-4 sm:px-8 md:px-20 lg:px-40 xl:px-56 py-6 sm:py-8'>
                <div className="text-center">Loading trip data...</div>
            </div>
        );
    }

    if (!trip) {
        return (
            <div className='px-4 sm:px-8 md:px-20 lg:px-40 xl:px-56 py-6 sm:py-8'>
                <div className="text-center">No trip data found.</div>
            </div>
        );
    }

    return (
        <div className='px-4 sm:px-8 md:px-20 lg:px-40 xl:px-56 py-6 sm:py-8'>
            {/* Information Section */}
            <InfoSection trip={trip} />
            {/* Recommended Hotels */}
            <Hotels trip={trip} />
            {/* Daily plan */}
            <PlacesToVisit trip={trip} />
            {/* Footer */}
            <Footer trip={trip} />
        </div>
    );
}

export default Viewtrip;
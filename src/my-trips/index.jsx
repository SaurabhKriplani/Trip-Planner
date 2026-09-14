import { collection, query, where, getDocs, getFirestore } from 'firebase/firestore'; 
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserTripCardItem from './components/UserTripCardItem';
import Footer from '@/view-trip/[tripId]/components/Footer';

function MyTrips() {
  const navigate = useNavigate();
  const [userTrips, setUserTrips] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state
  const [error, setError] = useState(null); // Added error state

  useEffect(() => {
    const getUserTrips = async () => {
      const user = JSON.parse(localStorage.getItem('user'));

      if (!user) {
        navigate('/'); // Redirect to home if user is not found
        return;
      }

      try {
        const db = getFirestore(); // Initialize Firestore instance
        const q = query(collection(db, 'AITrips'), where('userEmail', '==', user.email));
        const querySnapshot = await getDocs(q);

        const trips = [];
        querySnapshot.forEach((doc) => {
          trips.push({ id: doc.id, ...doc.data() }); // Include document ID
        });

        setUserTrips(trips);
      } catch (error) {
        console.error('Error fetching user trips:', error);
        setError('Error fetching user trips.'); // Set error state
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    getUserTrips();
  }, [navigate]);

  
  

  return (
    <div className='text-center px-4 sm:px-8 md:px-20 lg:px-40 xl:px-60 mt-6 sm:mt-10'>
      <h2 className='font-bold text-2xl sm:text-3xl' style={{ color: 'var(--text-primary)' }}>My Trips </h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-8 sm:mt-10 gap-4 sm:gap-5'>

        {userTrips?.length>0 ?userTrips.map((trip,index)=>(
          
      <UserTripCardItem trip={trip} key ={index} />

        )):[1,2,3,4,5,6].map((item,index)=>(
          <div key={index} className='h-[250px] w-[320] bg-slate-200 animate-pulse rounded-xl '>

          </div>
        ))}
      </div>
      <Footer></Footer>
    </div>
  );
}

export default MyTrips;
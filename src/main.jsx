import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./styles/theme.css";
import Header from "./components/custom/Header.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import CreateTrip from "./create-trip/index.jsx";
import { Toaster } from "./components/ui/sonner.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
import ProtectedRoute from "./components/ui/ProtectedRoute.jsx";
import Viewtrip from "./view-trip/[tripId]/index.jsx";
import MyTrips from "./my-trips/index.jsx";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path:"/view-trip/:tripId",
    element:<Viewtrip/>
  },

  {
    path: "/create-trip",
    element: (
      <ProtectedRoute>
        <CreateTrip />
      </ProtectedRoute>
    ),
  },{
    path:'/my-trips',
    element:<MyTrips/>
  },
  
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <ThemeProvider>
        <Header />
        <RouterProvider router={router} />
        <Toaster />
      </ThemeProvider>
    </ClerkProvider>
  </React.StrictMode>
);

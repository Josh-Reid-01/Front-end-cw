import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ViewIT from "./components/ViewIT";
import Home from "./components/Home";
import HostelGuide from "./components/HostelGuide";
import Navigation from "./components/Navigation";
import CafeOnly from "./components/CafeOnly";
import "bootstrap/dist/js/bootstrap.js";
import "./App.css";
import "leaflet/dist/leaflet.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SubmitReview from "./components/SubmitReview";
import ViewReviews2 from "./components/ViewReviews2";
//import { staff } from "./data/staff";

function App() {
  return (
    <>
      <div className="wrapper">
        <Navigation />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/aboutus" element={<People people={staff} />}>
              <Route path=":personId" element={<Person people={staff} />} />
            </Route> */}

            <Route path="/Itinerary" element={<HostelGuide />} />
            {/* <Route path="/staff" element={<Placeholder />} />
            <Route path="/contactus" element={<Placeholder />} />
            <Route path="*" element={<NoPage />} /> */}
            <Route path="/viewIT" element={<ViewIT />} />
            <Route path="/cafeonly" element={<CafeOnly />} />
            <Route path="/viewReview" element={<ViewReviews2 />} />
            <Route path="/review" element={<SubmitReview />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}
export default App;

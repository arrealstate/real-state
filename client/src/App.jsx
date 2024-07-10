import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header.jsx";

import Home from "./pages/home/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/sign/SignUp";
import About from "./pages/About";
import Profile from "./pages/Profile";
import DeveloperProfile from "./pages/DeveloperProfile";
// import DeveloperOfferProfile from "./admin/offer/user/DeveloperOfferProfile.jsx";
import DeveloperOfferProfile from "./admin/offer/user/DeveloperOfferProfile.jsx";

import Admin from "./components/Admin";
import PrivateRoute from "./components/PrivateRoute";
import CreateListing from "./pages/createListing/CreateListing.jsx";
import Adminlist from "./admin/Adminlist";
import UpdateListing from "./pages/UpdateListing";
import Listing from "./pages/listing/Listing.jsx";
// import SearchProperties from './pages/SearchProperties';
import SearchDeveloper from "./pages/SearchDeveloper";
import AdminSearch from "./pages/AdminSearch";
import AdminSignUp from "./pages/sign/AdminSignUp";
import DevSignUp from "./pages/sign/DevSignUp";
import MicroDevSignUp from "./pages/sign/MicroDevSignUp";
import AllUsersList from "./pages/AllUsers";
import Test from "./pages/Teste";
import LoginFormComponent from "./pages/sign/testsign";
import SearchAreaTest from "./pages/test/SearchAreaTest";
import EditUser from "./pages/EditUser";
import SearchProperties from "./pages/SearchProperties.jsx";
import PrivateAdminRoute from "./components/PrivateAdminRoute.jsx";
import NotFound from "./components/NotFound.jsx";
import OfferAdminPanel from "./admin/offer/admin/offersMainDashboard/OfferAdminPanel.jsx";
import OfferDash from "./admin/offer/admin/offersMainDashboard/OffersDash.jsx";
// import PageListing from "./admin/offer/admin/PageListing.jsx";
// import PageListing1 from "./admin/offer/admin/PageListingCopy.jsx";
// import ExamplePage from "../../client/src/admin/offer/admin/ExamplePage.jsx";
import ListingPage from "./admin/offer/admin/ListingPage.jsx";
import AdminColorControl from "./admin/color/AdminColorControl.jsx";
import PaymentPlanBINGHATTIPHANTOM from "../src/pages/paymentPlan/PaymentPlanBINGHATTIPHANTOM.jsx";
// import PaymentPlan from "../src/pages/paymentPlan/PaymentPlan.jsx";

import PaymentPlan from "../src/pages/paymentPlan/PaymentPlan.jsx";
import PaymentPlanList from "../src/pages/paymentPlan/PaymentPlanList.jsx";
import PaymentPlanForm from "../src/pages/paymentPlan/PaymentPlanForm.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/dev/sign-up" element={<DevSignUp />} />
        <Route path="/microDev/sign-up" element={<MicroDevSignUp />} />
        <Route
          path="/DeveloperOfferProfile/developer"
          element={<DeveloperOfferProfile />}
        />

        <Route path="/developer" element={<DeveloperProfile />} />
        {/* <Route path="/developer/:id" component={DeveloperProfile} /> */}
        <Route path="/OfferAdminPanel" element={<OfferAdminPanel />} />

        <Route element={<PrivateAdminRoute />}>
          <Route path="/admin/sign-up" element={<AdminSignUp />} />
          <Route path="/Admin/Users" element={<AllUsersList />} />
          <Route path="/Admin" element={<Admin />} />
          <Route path="/Admin/search" element={<AdminSearch />} />
          <Route path="/Admin/Categories" element={<Adminlist />}></Route>
          <Route path="/edit-user/:userId" element={<EditUser />} />
        </Route>

        <Route path="/Test" element={<Test />} />
        <Route path="/SearchAreaTest" element={<SearchAreaTest />} />

        <Route
          path="/PaymentPlanBINGHATTIPHANTOM"
          element={<PaymentPlanBINGHATTIPHANTOM />}
        />

        <Route path="/PaymentPlan" element={<PaymentPlan />} />
        <Route path="/PaymentPlanForm" element={<PaymentPlanForm />} />
        <Route path="/PaymentPlanList" element={<PaymentPlanList />} />

        <Route path="/LoginFormComponent" element={<LoginFormComponent />} />
        <Route path="/add-offers-to-listings" element={<ListingPage />} />
        {/* <Route path="/add-offers-to-listings" element={<PageListing1 />} /> */}

        <Route path="/Admin/offer" element={<OfferDash />} />
        <Route path="/Admin/color" element={<AdminColorControl />} />

        <Route path="/about" element={<About />} />
        <Route path="/search" element={<SearchProperties />} />
        <Route path="/real-estate-deveoper" element={<SearchDeveloper />} />

        <Route path="/listing/:listingId" element={<Listing />} />

        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route
            path="/update-listing/:listingId"
            element={<UpdateListing />}
          />
        </Route>
        <Route path="/404" element={<NotFound />} />
        {/* <Route element={<PrivateRoute />}> */}
        {/* <Route path='/Admintes' element={<Admintes />}></Route> */}
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

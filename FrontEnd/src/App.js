import React from "react";
import './css/volt.css';
import './css/responsive.css';
import './css/style.css';
import { Routes, Route, BrowserRouter, } from "react-router-dom";

import Login from "./components/login";
import Signup from "./components/signup";
import Error from "./components/error";

import Dashboard from "./components/user/dashboard";
import Allapi from "./components//user/allapi";
import Createstrategy from "./components/user/createstrategy";
import Viewstrategy from "./components/user/viewstrategy";

import Admindashboard from "./components/admin/adminDashboard";
import AdminUserList from "./components/admin/adminUserList";
import AdminViewApi from "./components/admin/adminViewApi";
import AdminGeneratePassword from "./components/admin/adminGeneratePassword";
import AdminStategyListing from "./components/admin/adminStategyListing";
import AdminProfile from "./components/admin/adminProfile";
import Profile from "./components/user/Profile";
import AdminGlobalSetting from "./components/admin/adminGlobalSetting";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="*" element={<Error />} />

        <Route path="user" element={<Dashboard />} />
        <Route path="user/dashboard" element={<Dashboard />} />
        <Route path="user/all-api" element={<Allapi />} />
        <Route path="user/all-api/create-strategy/:strategyId" element={<Createstrategy />} />
        <Route path="user/all-api/view-strategy/:strategyId" element={<Viewstrategy />} />
        <Route path="user/profile" element={<Profile />} />

        <Route path="admin" element={<Admindashboard />} />
        <Route path="admin/dashboard" element={<Admindashboard />} />
        <Route path="admin/user-list" element={<AdminUserList />} />
        <Route path="admin/strategy/:apikey" element={<AdminStategyListing />} />
        <Route path="admin/generate-Password" element={<AdminGeneratePassword />} />
        <Route path="admin/view-api/:userId" element={<AdminViewApi />} />
        <Route path="admin/profile" element={<AdminProfile />} />
        <Route path="admin/global_setting" element={<AdminGlobalSetting />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

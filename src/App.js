import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./Screens/Layout";
import Home from "./Screens/Home";
import UserLayout from "./Screens/User/Layout";
import AdminLayout from "./Screens/Admin/Layout";
import UserDashboard from "./Screens/User/Dashboard";
import AdminDashboard from "./Screens/Admin/Dashboard";
import Helpers from "./Config/Helpers";
import Login from "./Screens/Auth/Login";
import Register from "./Screens/Auth/Register";
import ForgotPassword from "./Screens/Auth/ForgotPassword";
import Verify from "./Screens/Auth/Verify";
import VerifyForgotPassword from "./Screens/Auth/VerifyForgot";
import RecoverPassword from "./Screens/Auth/RecoverPassword";
import UserProfile from "./Screens/User/UserProfile";
import AdminUsers from "./Screens/Admin/Users";
import AdminCategories from "./Screens/Admin/Categories";
import AdminPrompts from "./Screens/Admin/Prompts";
import AdminTemplates from "./Screens/Admin/Templates";
import TestScreen from "./Screens/User/test";
import AddTempTest from "./Screens/Admin/AddTempTest";
import Chatbot from "./Screens/User/Chatbot";
import PromptsLibrary from "./Screens/User/PromptsLibrary";
import ChatHistory from "./Screens/User/History";
import Templates from "./Screens/User/template/Templates";
import Template1 from "./Screens/User/template/Templates/Template1";
import Template2 from "./Screens/User/template/Templates/Template2";
import Template3 from "./Screens/User/template/Templates/Template3";
import Template4 from "./Screens/User/template/Templates/Template4";
import TemplatesLibrary from "./Screens/User/TemplatesLibrary";
import AdminPackages from "./Screens/Admin/Packages";
import OrganizationMembers from "./Screens/User/OrganizationMembers";
import PricingPlans from "./Screens/User/PricingPlans";
import UserTransactions from "./Screens/User/UserTransactions";
import AdminTransactions from "./Screens/Admin/AdminTransactions";


const Auth = ({ children, isAuth = true, isAdmin = false }) => {
  let user = Helpers.getItem("user", true);
  let token = Helpers.getItem("token");
  let loginTime = Helpers.getItem("loginTimestamp");
  let currentTime = new Date().getTime();
  let minutesPassed = Math.floor((currentTime - loginTime) / (1000 * 60));

  // Check for session expiration
  if (loginTime && minutesPassed > 120) {
    localStorage.clear();
    Helpers.toast("error", "Session expired. Login again to continue");
    return <Navigate to="/login" />;
  }
  // For protected routes
  else if (isAuth) {
    if (!user || !token) {
      Helpers.toast("error", "Please login to continue");
      return <Navigate to="/login" />;
    }

    // Ensure only admins can access admin routes
    if (isAdmin && parseInt(user.user_type) !== 1) {
      Helpers.toast("error", "Access denied. Only admin allowed.");
      return <Navigate to="/user/dashboard" />;
    }

    // Ensure admins cannot access user routes
    if (!isAdmin && parseInt(user.user_type) === 1) {
      Helpers.toast(
        "error",
        "Access denied. Admins cannot access user routes."
      );
      return <Navigate to="/admin/dashboard" />;
    }

    return children;
  }
  // For non-protected routes like /login
  else {
    if (user && token) {
      if (user.user_type === 1) {
        return <Navigate to="/admin/dashboard" />;
      } else {
        return <Navigate to="/user/dashboard" />;
      }
    }
    return children;
  }
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route
            path="/register"
            element={
              <Auth isAuth={false}>
                <Register />
              </Auth>
            }
          />
          <Route
            path="/verify-email"
            element={
              <Auth isAuth={false}>
                <Verify />
              </Auth>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <Auth isAuth={false}>
                <ForgotPassword />
              </Auth>
            }
          />
          <Route
            path="/verify-email-password"
            element={
              <Auth isAuth={false}>
                <VerifyForgotPassword />
              </Auth>
            }
          />
          <Route
            path="/recover-password"
            element={
              <Auth isAuth={false}>
                <RecoverPassword />
              </Auth>
            }
          />
        </Route>
        <Route path="/user" element={<UserLayout />}>
          <Route
            path="/user/dashboard"
            element={
              <Auth>
                <UserDashboard />
              </Auth>
            }
          />
           <Route
            path="/user/pricing"
            element={
              <Auth>
                <PricingPlans />
              </Auth>
            }
          />
          <Route
            path="/user/org-members"
            element={
              <Auth>
                <OrganizationMembers />
              </Auth>
            }
          />
          <Route
            path="/user/profile"
            element={
              <Auth>
                <UserProfile />
              </Auth>
            }
          />
          <Route
            path="/user/chat/:chatid"
            element={
              <Auth>
                <Chatbot />
              </Auth>
            }
          />
          <Route
            path="/user/templates/:msgid"
            element={
              <Auth>
                <Templates />
              </Auth>
            }
          />
          <Route
            path="/user/chat-history"
            element={
              <Auth>
                <ChatHistory />
              </Auth>
            }
          />
          <Route
            path="/user/transactions"
            element={
              <Auth>
                <UserTransactions />
              </Auth>
            }
          />
          <Route
            path="/user/prompts-library"
            element={
              <Auth>
                <PromptsLibrary />
              </Auth>
            }
          />
          <Route
            path="/user/templates-library/:msgid"
            element={
              <Auth>
                <TemplatesLibrary />
              </Auth>
            }
          />
          <Route
            path="/user/template/:msgid/:tempid"
            element={
              <Auth>
                <Template1 />
              </Auth>
            }
          />
          <Route
            path="/user/template2/:msgid"
            element={
              <Auth>
                <Template2 />
              </Auth>
            }
          />
          <Route
            path="/user/template3/:msgid"
            element={
              <Auth>
                <Template3 />
              </Auth>
            }
          />
          <Route
            path="/user/template4/:msgid"
            element={
              <Auth>
                <Template4 />
              </Auth>
            }
          />
          <Route
            path="/user/test/:temp_id"
            element={
              <Auth>
                <TestScreen />
              </Auth>
            }
          />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route
            path="/admin/dashboard"
            element={
              <Auth isAdmin={true}>
                <AdminDashboard />
              </Auth>
            }
          />
          <Route
            path="/admin/users"
            element={
              <Auth isAdmin={true}>
                <AdminUsers />
              </Auth>
            }
          />
          <Route
            path="/admin/categories"
            element={
              <Auth isAdmin={true}>
                <AdminCategories />
              </Auth>
            }
          />
          <Route
            path="/admin/prompts"
            element={
              <Auth isAdmin={true}>
                <AdminPrompts />
              </Auth>
            }
          />
          <Route
            path="/admin/packages"
            element={
              <Auth isAdmin={true}>
                <AdminPackages />
              </Auth>
            }
          />
          <Route
            path="/admin/get-transactions"
            element={
              <Auth isAdmin={true}>
                <AdminTransactions/>
              </Auth>
            }
          />
          <Route
            path="/admin/templates"
            element={
              <Auth isAdmin={true}>
                <AdminTemplates />
              </Auth>
            }
          />
          <Route
            path="/admin/AddTempTest"
            element={
              <Auth isAdmin={true}>
                <AddTempTest />
              </Auth>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

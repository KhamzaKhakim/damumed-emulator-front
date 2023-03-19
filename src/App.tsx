import { Navigate, Route, Routes } from "react-router-dom" ;
import Appointments from "./pages/Appoinments";
import { CreateAppointment } from "./pages/CreateAppointment";
import { CreateExternalApp } from "./pages/CreateExternalApp";
import { CreatePost } from "./pages/CreatePost";
import { CreateReferral } from "./pages/CreateReferral";
import { CreateReferralResult } from "./pages/CreateReferralResult";
import ExternalApps from "./pages/ExternalApps";
import Navbar from "./components/Navbar";
import Posts from "./pages/Posts";
import ReferralResults from "./pages/ReferralResults";
import Referrals from "./pages/Referrals";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/posts" element={<Posts/>} />
        <Route path="/create-post" element={<CreatePost/>} />
        <Route path="/appointments" element={<Appointments/>} />
        <Route path="/create-appointment" element={<CreateAppointment/>} />
        <Route path="/referrals" element={<Referrals/>} />
        <Route path="/create-referral" element={<CreateReferral/>} />
        <Route path="/referral-results" element={<ReferralResults/>} />
        <Route path="/create-referral-result" element={<CreateReferralResult/>} />
        <Route path="/external-apps" element={<ExternalApps/>} />
        <Route path="/create-external-app" element={<CreateExternalApp/>} />
        <Route path="*" element={<Navigate to="/posts" />} />
      </Routes>
    </>
  )
}
export default App;
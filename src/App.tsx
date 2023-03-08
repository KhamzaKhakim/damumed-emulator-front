import { Navigate, Route, Routes } from "react-router-dom" ;
import Appointments from "./pages/Appoinments";
import { CreateAppointment } from "./pages/CreateAppointment";
import { CreatePost } from "./pages/CreatePost";
import { CreateReferral } from "./pages/CreateReferral";
import Navbar from "./components/Navbar";
import Posts from "./pages/Posts";
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
        <Route path="*" element={<Navigate to="/posts" />} />
      </Routes>
    </>
  )
}
export default App;
import { Route, Routes } from "react-router-dom" ;
import { CreatePost } from "./pages/CreatePost";
import Navbar from "./pages/Navbar";
import Posts from "./pages/Posts";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/posts" element={<Posts/>} />
        <Route path="/create-post" element={<CreatePost/>} />

      </Routes>
    </>
  )
}
export default App;
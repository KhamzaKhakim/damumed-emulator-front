import { Route, Routes } from "react-router-dom" ;
import PostsList from "./pages/PostsList";
function App() {
  return (
    <>
      <Routes>
        <Route path="/posts" element={<PostsList/>} />
      </Routes>
    </>
  )
}
export default App;
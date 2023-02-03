import "./App.css";

import Card from "./components/Card";
import Post from "./types/Post";
import { getPost } from "./api/posts";
import { useQuery } from "react-query";

function App() {
  const postQuery = useQuery({
    queryKey: ["post"],
    queryFn: getPost<Post[]>,
  })
  
  if(postQuery.status === "loading") return <h1>Loading...</h1>
  if(postQuery.status === "error") return <h1>Error</h1>

  return (
    <div>
        {postQuery.data?.map( post  => (
          <Card key={post.postFIO} postFIO={post.postFIO} postIIN={post.postIIN}/>
        ))}
    </div>
  );
}

export default App;

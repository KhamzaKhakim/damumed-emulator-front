import { PostItem } from "./PostItem";
import classes from "./styles.module.css"
import { getAllPosts } from "../../api/posts";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";


export default function PostsList() {

    const navigate = useNavigate();

    const postsQuery = useQuery({
      queryKey: ["posts"],
      queryFn: getAllPosts,
    })
  
    if (postsQuery.status === "loading") return <h1>Loading...</h1>
    if (postsQuery.status === "error") {
      return <h1>{JSON.stringify(postsQuery.error)}</h1>
    }

    function navigateToCreate(){
      navigate("/create-post")
    }
  
    return (
      <>
      <div className={classes.colFlex}>
        <button onClick={navigateToCreate}>Create new post</button>
      </div>
      <div className={classes.colFlex}>
          {postsQuery.data.map(post  => (
            <PostItem key={post.postIIN} post={post}/>
          ))}
      </div>
      </>
    )
  }
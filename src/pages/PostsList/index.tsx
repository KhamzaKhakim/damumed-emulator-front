import { PostItem } from "./PostItem";
import classes from "./styles.module.css"
import { getAllPosts } from "../../api/posts";
import { useQuery } from "react-query";

export default function PostsList() {
    const postsQuery = useQuery({
      queryKey: ["posts"],
      queryFn: getAllPosts,
    })
  
    if (postsQuery.status === "loading") return <h1>Loading...</h1>
    if (postsQuery.status === "error") {
      return <h1>{JSON.stringify(postsQuery.error)}</h1>
    }
  
    return (
      <div className={classes.card}>
          {postsQuery.data.map(post => (
            <PostItem key={post.postIIN} post={post}/>
          ))}
      </div>
    )
  }
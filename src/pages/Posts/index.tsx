import EmptyData from "../../components/EmptyData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination";
import { PostItem } from "./PostItem";
import classes from "./styles.module.css";
import { faFileImport } from "@fortawesome/free-solid-svg-icons";
import { getAllPosts } from "../../api/posts";
import { useQuery } from "react-query";
import { useState } from "react";

export default function Posts() {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;

  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: getAllPosts,
  });

  if (postsQuery.status === "loading") return <h1>Loading...</h1>;
  if (postsQuery.status === "error") {
    return <h1>Can not reach to backend</h1>;
  }

  const currentPosts = postsQuery.data?.slice(firstPostIndex, lastPostIndex);

  return (
    <>
      <div className={classes.colFlex}>
        <Link to="/create-post" className={classes.createLink}>
          ADD NEW POST
          <FontAwesomeIcon icon={faFileImport} size="xl" />
        </Link>
      </div>
      <div className={classes.colFlex}>
        {currentPosts?.map((item) => (
          <PostItem key={item.postIIN} post={item} />
        ))}
        {postsQuery.data?.length === 0 && <EmptyData />}
      </div>
      <Pagination
        totalPosts={postsQuery.data?.length}
        postsPerPage={postsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </>
  );
}

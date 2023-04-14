import classes from "./styles.module.css";

type Props = {
  totalPosts?: number;
  postsPerPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
};

export default function Pagination({
  totalPosts = 0,
  postsPerPage,
  setCurrentPage,
  currentPage,
}: Props) {
  const pages = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }

  return (
    <div className={classes.pagination}>
      {pages.map((page, index) => {
        return (
          <button
            key={index}
            onClick={() => setCurrentPage(page)}
            className={page === currentPage ? classes.active : ""}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
}

import { ChangeEvent, FormEvent, useState } from "react";
import { deletePost, updatePost } from "../../api/posts";
import {
  faFilePen,
  faFloppyDisk,
  faTrash,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useMutation, useQueryClient } from "react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Post } from "../../api/posts";
import UpdateField from "../../components/UpdateField";
import classes from "./styles.module.css";

type Props = {
  post: Post;
};

export const PostItem = ({ post }: Props) => {
  const [updatePage, setUpdatePage] = useState(false);
  const [postForm, setPostForm] = useState(post);

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    setPostForm((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  }

  const queryClient = useQueryClient();
  const deletePostMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient
        .invalidateQueries(["posts"], { exact: true })
        .catch((err) => console.error(err));
    },
  });

  function onCLickDelete() {
    deletePostMutation.mutate(post.postIIN);
  }

  const updatePostMutation = useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      queryClient
        .invalidateQueries(["posts"], { exact: true })
        .catch((err) => console.error(err));
      setUpdatePage(false);
    },
  });

  function onClickUpdate() {
    setPostForm(post);
    setUpdatePage((prev) => !prev);
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    updatePostMutation.mutate(postForm);
  }

  if (updatePage) {
    return (
      <>
        <form onSubmit={onSubmit}>
          <div className={classes.container}>
            <div className={classes.buttonContainer}>
              <button
                type="submit"
                className={classes.buttonIcon}
                disabled={post === postForm}
              >
                <FontAwesomeIcon icon={faFloppyDisk} size="xl" />
              </button>
              <button onClick={onClickUpdate} className={classes.buttonIcon}>
                <FontAwesomeIcon icon={faXmark} size="xl" />
              </button>
            </div>
            <div className={classes.fields}>
              <UpdateField
                name="orgHealthCareID"
                value={postForm.orgHealthCareID}
                onChange={onChange}
              />
              <UpdateField
                name="funcStructureID"
                value={postForm.funcStructureID}
                onChange={onChange}
              />
              <UpdateField
                name="funcStructureName"
                value={postForm.funcStructureName}
                onChange={onChange}
              />
              <UpdateField
                name="postID"
                value={postForm.postID}
                onChange={onChange}
              />
              <UpdateField
                name="postMasterDataID"
                value={postForm.postMasterDataID}
                type="number"
                onChange={onChange}
              />
              <UpdateField
                name="postFIO"
                value={postForm.postFIO}
                onChange={onChange}
              />
              <UpdateField
                name="postShortFIO"
                value={postForm.postShortFIO}
                onChange={onChange}
              />
              <UpdateField
                name="postIIN"
                readonly={true}
                value={postForm.postIIN}
                onChange={onChange}
              />
              <UpdateField
                name="postBirthDate"
                value={postForm.postBirthDate}
                type="datetime-local"
                onChange={onChange}
              />
              <UpdateField
                name="personSexName"
                value={postForm.personSexName}
                onChange={onChange}
              />
            </div>
            <div className={classes.fields}>
              <UpdateField
                name="stavka"
                value={postForm.stavka}
                type="number"
                onChange={onChange}
              />
              <UpdateField
                name="personalTypeID"
                value={postForm.personalTypeID}
                type="number"
                onChange={onChange}
              />
              <UpdateField
                name="personalTypeName"
                value={postForm.personalTypeName}
                onChange={onChange}
              />
              <UpdateField
                name="categoryPostID"
                value={postForm.categoryPostID}
                type="number"
                onChange={onChange}
              />
              <UpdateField
                name="categoryPostName"
                value={postForm.categoryPostName}
                onChange={onChange}
              />
              <UpdateField
                name="priznPostID"
                value={postForm.priznPostID}
                type="number"
                onChange={onChange}
              />
              <UpdateField
                name="priznPostName"
                value={postForm.priznPostName}
                onChange={onChange}
              />
              <UpdateField
                name="hPostID"
                value={postForm.hPostID}
                type="number"
                onChange={onChange}
              />
              <UpdateField
                name="hPostName"
                value={postForm.hPostName}
                onChange={onChange}
              />
            </div>
          </div>
        </form>
      </>
    );
  }

  return (
    <>
      <div className={classes.container}>
        <div className={classes.buttonContainer}>
          <button onClick={onClickUpdate} className={classes.buttonIcon}>
            <FontAwesomeIcon icon={faFilePen} size="xl" />
          </button>
          <button onClick={onCLickDelete} className={classes.buttonIcon}>
            <FontAwesomeIcon icon={faTrash} size="xl" />
          </button>
        </div>
        <div className={classes.fields}>
          <p>
            &quot;orgHealthCareID&quot; :{" "}
            <span className={classes.value}>
              &quot;{post.orgHealthCareID}&quot;
            </span>
          </p>
          <p>
            &quot;funcStructureID&quot;:{" "}
            <span className={classes.value}>
              &quot;{post.funcStructureID}&quot;
            </span>
          </p>
          <p>
            &quot;funcStructureName&quot; :{" "}
            <span className={classes.value}>
              &quot;{post.funcStructureName}&quot;
            </span>
          </p>
          <p>
            &quot;postID&quot; :{" "}
            <span className={classes.value}>&quot;{post.postID}&quot;</span>
          </p>
          <p>
            &quot;postMasterDataID&quot; :{" "}
            <span className={classes.value}>
              &quot;{post.postMasterDataID}&quot;
            </span>
          </p>
          <p>
            &quot;postFIO&quot; :{" "}
            <span className={classes.value}>&quot;{post.postFIO}&quot;</span>
          </p>
          <p>
            &quot;postShortFIO&quot; :{" "}
            <span className={classes.value}>
              &quot;{post.postShortFIO}&quot;
            </span>
          </p>
          <p>
            &quot;postIIN&quot; :{" "}
            <span className={classes.value}>&quot;{post.postIIN}&quot;</span>
          </p>
          <p>
            &quot;postBirthDate&quot; :{" "}
            <span className={classes.value}>
              &quot;{post.postBirthDate}&quot;
            </span>
          </p>
          <p>
            &quot;personSexName&quot; :{" "}
            <span className={classes.value}>
              &quot;{post.personSexName}&quot;
            </span>
          </p>
        </div>
        <div className={classes.fields}>
          <p>
            &quot;stavka&quot; :{" "}
            <span className={classes.value}>&quot;{post.stavka}&quot;</span>
          </p>
          <p>
            &quot;personalTypeID&quot; :{" "}
            <span className={classes.value}>
              &quot;{post.personalTypeID}&quot;
            </span>
          </p>
          <p>
            &quot;personalTypeName&quot; :{" "}
            <span className={classes.value}>
              &quot;{post.personalTypeName}&quot;
            </span>
          </p>
          <p>
            &quot;categoryPostID&quot; :{" "}
            <span className={classes.value}>
              &quot;{post.categoryPostID}&quot;
            </span>
          </p>
          <p>
            &quot;categoryPostName&quot; :{" "}
            <span className={classes.value}>
              &quot;{post.categoryPostName}&quot;
            </span>
          </p>
          <p>
            &quot;priznPostID&quot; :{" "}
            <span className={classes.value}>
              &quot;{post.priznPostID}&quot;
            </span>
          </p>
          <p>
            &quot;priznPostName&quot; :{" "}
            <span className={classes.value}>
              &quot;{post.priznPostName}&quot;
            </span>
          </p>
          <p>
            &quot;hPostID&quot; :{" "}
            <span className={classes.value}>&quot;{post.hPostID}&quot;</span>
          </p>
          <p>
            &quot;hPostName&quot; :{" "}
            <span className={classes.value}>&quot;{post.hPostName}&quot;</span>
          </p>
        </div>
      </div>
    </>
  );
};

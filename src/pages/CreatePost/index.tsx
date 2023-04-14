import { ChangeEvent, FormEvent, useState } from "react";
import { faFloppyDisk, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useMutation, useQueryClient } from "react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Post } from "../../api/posts";
import UpdateField from "../../components/UpdateField";
import classes from "./styles.module.css";
import { updatePost } from "../../api/posts";
import { useNavigate } from "react-router-dom";

export const CreatePost = () => {
  const navigate = useNavigate();

  const [postForm, setPostForm] = useState<Post>({
    orgHealthCareID: "",
    funcStructureID: "",
    funcStructureName: "",
    postID: "",
    postMasterDataID: 0,
    postFIO: "",
    postShortFIO: "",
    postIIN: "",
    postBirthDate: "",
    personSexName: "",
    stavka: 0,
    personalTypeID: 0,
    personalTypeName: "",
    categoryPostID: 0,
    categoryPostName: "",
    priznPostID: 0,
    priznPostName: "",
    hPostID: 0,
    hPostName: "",
  });

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    setPostForm((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  }

  function navigateToPosts() {
    navigate("/posts");
  }

  const queryClient = useQueryClient();

  const createPostMutation = useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      queryClient
        .invalidateQueries(["posts"], { exact: true })
        .catch((err) => console.error(err));
      navigate("/posts");
    },
  });

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    createPostMutation.mutate(postForm);
  }
  return (
    <>
      <div className={classes.colFlex}>
        <form onSubmit={onSubmit}>
          <div className={classes.container}>
            <div className={classes.buttonContainer}>
              <button
                type="submit"
                className={classes.buttonIcon}
                disabled={postForm.postIIN === ""}
              >
                <FontAwesomeIcon icon={faFloppyDisk} size="xl" />
              </button>
              <button onClick={navigateToPosts} className={classes.buttonIcon}>
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
      </div>
    </>
  );
};

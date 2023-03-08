import { ChangeEvent, FormEvent, useState } from "react";
import { faFloppyDisk, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useMutation, useQueryClient } from "react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Post } from "../../api/posts";
import UpdateField from "../../components/UpdateField";
import classes from "./styles.module.css"
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
    })
    
    function handleChange(e: ChangeEvent<HTMLInputElement>){
      setPostForm(prev => {
        return {
          ...prev,
          [e.target.name]: e.target.value
        }
      })
    }

    function navigateToPosts(){
        navigate("/posts")
    }
    
    
    const queryClient = useQueryClient()

    const createPostMutation = useMutation({
        mutationFn: updatePost,
        onSuccess: () => {
          queryClient.invalidateQueries(["posts"], { exact: true })
          navigate("/posts")
        },
      })

      function handleCreate(e: FormEvent<HTMLFormElement>){
        e.preventDefault()
        createPostMutation.mutate(postForm)
      }
      return (
        <>
        <div className={classes.colFlex}>
        <form onSubmit={handleCreate}>
          <div className={classes.container}> 
            <div className={classes.buttonContainer}>
            <button type="submit" className={classes.buttonIcon} disabled={postForm.postIIN === ""}><FontAwesomeIcon icon={faFloppyDisk} size="xl"/></button>
            <button onClick={navigateToPosts} className={classes.buttonIcon}><FontAwesomeIcon icon={faXmark} size="xl"/></button>
            </div>   
            <div className={classes.fields}>
              <UpdateField name="orgHealthCareID" value={postForm.orgHealthCareID} handleChange={handleChange}/>
              <UpdateField name="funcStructureID" value={postForm.funcStructureID} handleChange={handleChange}/>
              <UpdateField name="funcStructureName" value={postForm.funcStructureName} handleChange={handleChange}/>
              <UpdateField name="postID" value={postForm.postID} handleChange={handleChange}/>
              <UpdateField name="postMasterDataID" value={postForm.postMasterDataID} type="number" handleChange={handleChange}/>
              <UpdateField name="postFIO" value={postForm.postFIO} handleChange={handleChange}/>
              <UpdateField name="postShortFIO" value={postForm.postShortFIO} handleChange={handleChange}/>
              <UpdateField name="postIIN" value={postForm.postIIN} handleChange={handleChange}/>
              <UpdateField name="postBirthDate" value={postForm.postBirthDate} type="datetime-local" handleChange={handleChange}/>
              <UpdateField name="personSexName" value={postForm.personSexName} handleChange={handleChange}/>
              </div>
            <div className={classes.fields}>
              <UpdateField name="stavka" value={postForm.stavka} type="number" handleChange={handleChange}/>
              <UpdateField name="personalTypeID" value={postForm.personalTypeID} type="number" handleChange={handleChange}/>
              <UpdateField name="personalTypeName" value={postForm.personalTypeName} handleChange={handleChange}/>
              <UpdateField name="categoryPostID" value={postForm.categoryPostID} type="number" handleChange={handleChange}/>
              <UpdateField name="categoryPostName" value={postForm.categoryPostName} handleChange={handleChange}/>
              <UpdateField name="priznPostID" value={postForm.priznPostID} type="number" handleChange={handleChange}/>
              <UpdateField name="priznPostName" value={postForm.priznPostName} handleChange={handleChange}/>
              <UpdateField name="hPostID" value={postForm.hPostID} type="number" handleChange={handleChange}/>
              <UpdateField name="hPostName" value={postForm.hPostName} handleChange={handleChange}/>
            </div>
        </div>
        </form>
        </div>
        </>
      )
  };
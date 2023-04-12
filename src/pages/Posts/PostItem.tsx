import { ChangeEvent, FormEvent, useState } from "react";
import { deletePost, updatePost } from "../../api/posts";
import { faFilePen, faFloppyDisk, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useMutation, useQueryClient } from "react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Post } from "../../api/posts";
import UpdateField from "../../components/UpdateField";
import classes from "./styles.module.css";





type propValue = {
  post: Post;
}


export const PostItem = ({post}: propValue) => {


    const [updatePage, setUpdatePage] = useState(false)
    const [postForm, setPostForm] = useState(post)
    
    function handleChange(e: ChangeEvent<HTMLInputElement>){
      setPostForm(prev => {
        return {
          ...prev,
          [e.target.name]: e.target.value
        }
      })
    }
    
    
    const queryClient = useQueryClient()
    const deletePostMutation = useMutation({
      mutationFn: deletePost,
      onSuccess: () => {
        queryClient.invalidateQueries(["posts"], { exact: true }).catch(err => console.error(err))
      },
    })
  
    function handleDelete() {
      deletePostMutation.mutate(post.postIIN)
    }

    const updatePostMutation = useMutation({
        mutationFn: updatePost,
        onSuccess: () => {
          queryClient.invalidateQueries(["posts"], { exact: true }).catch(err => console.error(err))
          setUpdatePage(false)
        },
      })
    
      function handleUpdatePage() {
        setPostForm(post)
        setUpdatePage(prev => !prev)
      }

      function handleUpdate(e: FormEvent<HTMLFormElement>){
        e.preventDefault()
        updatePostMutation.mutate(postForm)
      }

    
    if(updatePage){
      return (
        <>
        <form onSubmit={handleUpdate}>
          <div className={classes.container}> 
            <div className={classes.buttonContainer}>
            <button type="submit" className={classes.buttonIcon} disabled={post === postForm}><FontAwesomeIcon icon={faFloppyDisk} size="xl"/></button>
            <button onClick={handleUpdatePage} className={classes.buttonIcon}><FontAwesomeIcon icon={faXmark} size="xl"/></button>
            </div>   
            <div className={classes.fields}>
              <UpdateField name="orgHealthCareID" value={postForm.orgHealthCareID} handleChange={handleChange}/>
              <UpdateField name="funcStructureID" value={postForm.funcStructureID} handleChange={handleChange}/>
              <UpdateField name="funcStructureName" value={postForm.funcStructureName} handleChange={handleChange}/>
              <UpdateField name="postID" value={postForm.postID} handleChange={handleChange}/>
              <UpdateField name="postMasterDataID" value={postForm.postMasterDataID} type="number" handleChange={handleChange}/>
              <UpdateField name="postFIO" value={postForm.postFIO} handleChange={handleChange}/>
              <UpdateField name="postShortFIO" value={postForm.postShortFIO} handleChange={handleChange}/>
              <UpdateField name="postIIN" readonly={true} value={postForm.postIIN} handleChange={handleChange}/>
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
        </>
      )
    }

    return (
        <>
          <div className={classes.container}> 
            <div className={classes.buttonContainer}>
            <button onClick={handleUpdatePage}  className={classes.buttonIcon}><FontAwesomeIcon icon={faFilePen} size="xl"/></button>
            <button onClick={handleDelete} className={classes.buttonIcon}><FontAwesomeIcon icon={faTrash} size="xl"/></button>
            </div>   
            <div className={classes.fields}>
            <p>&quot;orgHealthCareID&quot; : <span className={classes.value}>&quot;{post.orgHealthCareID}&quot;</span></p>
            <p>&quot;funcStructureID&quot;: <span className={classes.value}>&quot;{post.funcStructureID}&quot;</span></p>
            <p>&quot;funcStructureName&quot; : <span className={classes.value}>&quot;{post.funcStructureName}&quot;</span></p>
            <p>&quot;postID&quot; : <span className={classes.value}>&quot;{post.postID}&quot;</span></p>
            <p>&quot;postMasterDataID&quot; : <span className={classes.value}>&quot;{post.postMasterDataID}&quot;</span></p>
            <p>&quot;postFIO&quot; : <span className={classes.value}>&quot;{post.postFIO}&quot;</span></p>
            <p>&quot;postShortFIO&quot; : <span className={classes.value}>&quot;{post.postShortFIO}&quot;</span></p>
            <p>&quot;postIIN&quot; : <span className={classes.value}>&quot;{post.postIIN}&quot;</span></p>
            <p>&quot;postBirthDate&quot; : <span className={classes.value}>&quot;{post.postBirthDate}&quot;</span></p>
            <p>&quot;personSexName&quot; : <span className={classes.value}>&quot;{post.personSexName}&quot;</span></p>
            </div>
            <div className={classes.fields}>
            <p>&quot;stavka&quot; : <span className={classes.value}>&quot;{post.stavka}&quot;</span></p>
            <p>&quot;personalTypeID&quot; : <span className={classes.value}>&quot;{post.personalTypeID}&quot;</span></p>
            <p>&quot;personalTypeName&quot; : <span className={classes.value}>&quot;{post.personalTypeName}&quot;</span></p>
            <p>&quot;categoryPostID&quot; : <span className={classes.value}>&quot;{post.categoryPostID}&quot;</span></p>
            <p>&quot;categoryPostName&quot; : <span className={classes.value}>&quot;{post.categoryPostName}&quot;</span></p>
            <p>&quot;priznPostID&quot; : <span className={classes.value}>&quot;{post.priznPostID}&quot;</span></p>
            <p>&quot;priznPostName&quot; : <span className={classes.value}>&quot;{post.priznPostName}&quot;</span></p>
            <p>&quot;hPostID&quot; : <span className={classes.value}>&quot;{post.hPostID}&quot;</span></p>
            <p>&quot;hPostName&quot; : <span className={classes.value}>&quot;{post.hPostName}&quot;</span></p>
            </div>
        </div>
        </>
      );
  };
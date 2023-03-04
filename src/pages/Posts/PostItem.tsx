import { ChangeEvent, FormEvent, useState } from "react";
import { deletePost, updatePost } from "../../api/posts";
import { faFilePen, faFloppyDisk, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useMutation, useQueryClient } from "react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Post } from "../../api/posts";
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
        queryClient.invalidateQueries(["posts"], { exact: true })
      },
    })
  
    function handleDelete() {
      deletePostMutation.mutate(post.postIIN)
    }

    const updatePostMutation = useMutation({
        mutationFn: updatePost,
        onSuccess: () => {
          queryClient.invalidateQueries(["posts"], { exact: true })
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
            <div></div>
            <div className={classes.buttonContainer}>
            <button type="submit" className={classes.buttonIcon} disabled={post === postForm}><FontAwesomeIcon icon={faFloppyDisk} size="xl"/></button>
            <button onClick={handleUpdatePage} className={classes.buttonIcon}><FontAwesomeIcon icon={faXmark} size="xl"/></button>
            </div>   
            <div className={classes.fields}>
            <label>&quot;orgHealthCareID&quot; : </label>
            <input defaultValue={postForm.orgHealthCareID} type="text" name="orgHealthCareID" onChange={handleChange}/>
            <label>&quot;funcStructureID&quot; : </label>
            <input value={postForm.funcStructureID} type="text" name="funcStructureID" onChange={handleChange}/><br/>
            <label>&quot;funcStructureName&quot; : </label>
            <input defaultValue={postForm.funcStructureName} type="text" name="funcStructureName" onChange={handleChange}/><br/>
            <label>&quot;postID&quot; : </label>
            <input defaultValue={postForm.postID} type="text" name="postID" onChange={handleChange}/><br/>
            <label>&quot;postMasterDataID&quot; : </label>
            <input defaultValue={postForm.postMasterDataID} type="number" name="postMasterDataID" onChange={handleChange}/><br/>
            <label>&quot;postFIO&quot; : </label>
            <input defaultValue={postForm.postFIO} type="text" name="postFIO" onChange={handleChange}/><br/>
            <label>&quot;postShortFIO&quot; : </label>
            <input defaultValue={postForm.postShortFIO} type="text" name="postShortFIO" onChange={handleChange}/><br/>
            <label>&quot;postIIN&quot; : </label>
            <input value={postForm.postIIN} type="text" name="postIIN" readOnly/><br/>
            <label>&quot;postBirthDate&quot; : </label>
            <input defaultValue={postForm.postBirthDate}type="datetime-local" name="postBirthDate" onChange={handleChange}/><br/>
            <label>&quot;personSexName&quot; : </label>
            <input value={postForm.personSexName} type="text" name="personSexName" onChange={handleChange}/><br/>
            </div>
            <div className={classes.inputs}>
            <label>&quot;stavka&quot; : </label>
            <input className={classes.margin} defaultValue={postForm.stavka} type="number" name="stavka" onChange={handleChange}/><br/>
            <label>&quot;personalTypeID&quot; : </label>
            <input defaultValue={postForm.personalTypeID} type="number" name="personalTypeID" onChange={handleChange}/><br/>
            <label>&quot;personalTypeName&quot; : </label>
            <input defaultValue={postForm.personalTypeName} type="text" name="personalTypeName" onChange={handleChange}/><br/>
            <label>&quot;categoryPostID&quot; : </label>
            <input defaultValue={postForm.categoryPostID} type="number" name="categoryPostID" onChange={handleChange}/><br/>
            <label>&quot;categoryPostName&quot; : </label>
            <input defaultValue={postForm.categoryPostName} type="text" name="categoryPostName" onChange={handleChange}/><br/>
            <label>&quot;priznPostID&quot; : </label>
            <input defaultValue={postForm.priznPostID} type="number" name="priznPostID" onChange={handleChange}/><br/>
            <label>&quot;priznPostName&quot; : </label>
            <input defaultValue={postForm.priznPostName} type="text" name="priznPostName" onChange={handleChange}/><br/>
            <label>&quot;hPostID&quot; : </label>
            <input defaultValue={postForm.hPostID} type="number" name="hPostID" onChange={handleChange}/><br/>
            <label>&quot;hPostName&quot; : </label>
            <input defaultValue={postForm.hPostName} type="text" name="hPostName" onChange={handleChange}/><br/>
            </div>
        </div>
        </form>
        </>
      )
    }

    return (
        <>
          <div className={classes.container}> 
            <div></div>
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
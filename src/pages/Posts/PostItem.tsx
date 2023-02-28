import { deletePost, updatePost } from "../../api/posts";
import { useMutation, useQueryClient } from "react-query";
import classes from "./styles.module.css"
import { useState } from "react";


export const PostItem = ({post}) => {


    const [updatePage, setUpdatePage] = useState(false)
    const [postForm, setPostForm] = useState(post)
    
    function handleChange(e){
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
  
    function handleDelete(e) {
      e.preventDefault()
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

      function handleUpdate(e){
        e.preventDefault()
        updatePostMutation.mutate(postForm)
      }

    
    if(updatePage){
      return (
        <>
        <form onSubmit={handleUpdate}>
          <div className={classes.container}> 
            <div></div>
            <div className={classes.button}>
            <button onClick={handleUpdate}>Save</button>
            <button onClick={handleUpdatePage}>Cancel</button>
            </div>   
            <div className={classes.inputs}>
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
            <div className={classes.button}>
            <button onClick={handleUpdatePage}>Update</button>
            <button onClick={handleDelete}>Delete</button>
            </div>   
            <div className={classes.fields}>
            <p>&quot;orgHealthCareID&quot; : &quot;{post.orgHealthCareID}&quot;</p>
            <p>&quot;funcStructureID&quot;: &quot;{post.funcStructureID}&quot;</p>
            <p>&quot;funcStructureName&quot; : &quot;{post.funcStructureName}&quot;</p>
            <p>&quot;postID&quot; : &quot;{post.postID}&quot;</p>
            <p>&quot;postMasterDataID&quot; : &quot;{post.postMasterDataID}&quot;</p>
            <p>&quot;postFIO&quot; : &quot;{post.postFIO}&quot;</p>
            <p>&quot;postShortFIO&quot; : &quot;{post.postShortFIO}&quot;</p>
            <p>&quot;postIIN&quot; : &quot;{post.postIIN}&quot;</p>
            <p>&quot;postBirthDate&quot; : &quot;{post.postBirthDate}&quot;</p>
            <p>&quot;personSexName&quot; : &quot;{post.personSexName}&quot;</p>
            </div>
            <div className={classes.fields}>
            <p>&quot;stavka&quot; : &quot;{post.stavka}&quot;</p>
            <p>&quot;personalTypeID&quot; : &quot;{post.personalTypeID}&quot;</p>
            <p>&quot;personalTypeName&quot; : &quot;{post.personalTypeName}&quot;</p>
            <p>&quot;categoryPostID&quot; : &quot;{post.categoryPostID}&quot;</p>
            <p>&quot;categoryPostName&quot; : &quot;{post.categoryPostName}&quot;</p>
            <p>&quot;priznPostID&quot; : &quot;{post.priznPostID}&quot;</p>
            <p>&quot;priznPostName&quot; : &quot;{post.priznPostName}&quot;</p>
            <p>&quot;hPostID&quot; : &quot;{post.hPostID}&quot;</p>
            <p>&quot;hPostName&quot; : &quot;{post.hPostName}&quot;</p>
            </div>
        </div>
        </>
      );
  };
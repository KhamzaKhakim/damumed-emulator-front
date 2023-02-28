import { ChangeEvent, FormEvent, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { Post } from "../../api/posts";
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
        if(postForm.postIIN == ""){
            alert("postIIN should not be empty, since it is the primary key")
            return
        }
        createPostMutation.mutate(postForm)
      }
      return (
        <>
        <div className={classes.colFlex}>
        <form onSubmit={handleCreate}>
          <div className={classes.container}> 
            <div></div>
            <div className={classes.button}>
            <input type="submit" value="Create"/>
            <button onClick={navigateToPosts}>Cancel</button>
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
            <input value={postForm.postIIN} type="text" name="postIIN" onChange={handleChange}/><br/>
            <label>&quot;postBirthDate&quot; : </label>
            <input defaultValue={postForm.postBirthDate} type="datetime-local" name="postBirthDate" onChange={handleChange}/><br/>
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
        </div>
        <div>{JSON.stringify(postForm)}</div>
        </>
      )
  };
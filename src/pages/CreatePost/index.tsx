import { ChangeEvent, FormEvent, useState } from "react";
import { faFloppyDisk, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useMutation, useQueryClient } from "react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
              <div className={classes.inputFields}>
              <label>&quot;orgHealthCareID&quot; : </label>
              <input defaultValue={postForm.orgHealthCareID} type="text" name="orgHealthCareID" onChange={handleChange}/>
              </div>
              <div className={classes.inputFields}>
              <label>&quot;funcStructureID&quot; : </label>
              <input value={postForm.funcStructureID} type="text" name="funcStructureID" onChange={handleChange}/>
              </div>
              <div className={classes.inputFields}>
              <label>&quot;funcStructureName&quot; : </label>
              <input defaultValue={postForm.funcStructureName} type="text" name="funcStructureName" onChange={handleChange}/>
              </div>
              <div className={classes.inputFields}>
              <label>&quot;postID&quot; : </label>
              <input defaultValue={postForm.postID} type="text" name="postID" onChange={handleChange}/>
              </div>
              <div className={classes.inputFields}>
              <label>&quot;postMasterDataID&quot; : </label>
              <input defaultValue={postForm.postMasterDataID} type="number" name="postMasterDataID" onChange={handleChange}/>
              </div>
              <div className={classes.inputFields}>
              <label>&quot;postFIO&quot; : </label>
              <input defaultValue={postForm.postFIO} type="text" name="postFIO" onChange={handleChange}/>
              </div>
              <div className={classes.inputFields}>
              <label>&quot;postShortFIO&quot; : </label>
              <input defaultValue={postForm.postShortFIO} type="text" name="postShortFIO" onChange={handleChange}/>
              </div>
              <div className={classes.inputFields}>
              <label>&quot;postIIN&quot; : </label>
              <input value={postForm.postIIN} type="text" name="postIIN" onChange={handleChange}/>
              </div>
              <div className={classes.inputFields}>
              <label>&quot;postBirthDate&quot; : </label>
              <input defaultValue={postForm.postBirthDate}type="datetime-local" name="postBirthDate" onChange={handleChange}/>
              </div>
              <div className={classes.inputFields}>
              <label>&quot;personSexName&quot; : </label>
              <input value={postForm.personSexName} type="text" name="personSexName" onChange={handleChange}/>
              </div>
            </div>
            <div className={classes.fields}>
              <div className={classes.inputFields}>
              <label>&quot;stavka&quot; : </label>
              <input className={classes.margin} defaultValue={postForm.stavka} type="number" name="stavka" onChange={handleChange}/>
              </div>
              <div className={classes.inputFields}>
              <label>&quot;personalTypeID&quot; : </label>
              <input defaultValue={postForm.personalTypeID} type="number" name="personalTypeID" onChange={handleChange}/>
              </div>
              <div className={classes.inputFields}>
              <label>&quot;personalTypeName&quot; : </label>
              <input defaultValue={postForm.personalTypeName} type="text" name="personalTypeName" onChange={handleChange}/>
              </div>
              <div className={classes.inputFields}>
              <label>&quot;categoryPostID&quot; : </label>
              <input defaultValue={postForm.categoryPostID} type="number" name="categoryPostID" onChange={handleChange}/>
              </div>
              <div className={classes.inputFields}>
              <label>&quot;categoryPostName&quot; : </label>
              <input defaultValue={postForm.categoryPostName} type="text" name="categoryPostName" onChange={handleChange}/>
              </div>
              <div className={classes.inputFields}>
              <label>&quot;priznPostID&quot; : </label>
              <input defaultValue={postForm.priznPostID} type="number" name="priznPostID" onChange={handleChange}/>
              </div>
              <div className={classes.inputFields}>
              <label>&quot;priznPostName&quot; : </label>
              <input defaultValue={postForm.priznPostName} type="text" name="priznPostName" onChange={handleChange}/>
              </div>
              <div className={classes.inputFields}>
              <label>&quot;hPostID&quot; : </label>
              <input defaultValue={postForm.hPostID} type="number" name="hPostID" onChange={handleChange}/>
              </div>
              <div className={classes.inputFields}>
              <label>&quot;hPostName&quot; : </label>
              <input defaultValue={postForm.hPostName} type="text" name="hPostName" onChange={handleChange}/>
              </div>
            </div>
        </div>
        </form>
        </div>
        </>
      )
  };
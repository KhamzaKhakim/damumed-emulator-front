import { useMutation, useQueryClient } from "react-query";
import classes from "./styles.module.css"
import { deletePost } from "../../api/posts";


export const PostItem = ({post}) => {

    const queryClient = useQueryClient()
    const createPostMutation = useMutation({
      mutationFn: deletePost,
      onSuccess: data => {
        queryClient.invalidateQueries(["posts"], { exact: true })
      },
    })
  
    function handleSubmit(e) {
      e.preventDefault()
      createPostMutation.mutate(post.postIIN)
    }
      
    return (
        <>
          <div className={classes.container}> 
            <div></div>
            <div className={classes.button}>
            <button>Update</button>
            <button onClick={handleSubmit}>Delete</button>
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
            </div>
            <div className={classes.fields}>
            <p>&quot;postBirthDate&quot; : &quot;{post.postBirthDate}&quot;</p>
            <p>&quot;personSexName&quot; : &quot;{post.personSexName}&quot;</p>
            <p>&quot;stavka&quot; : &quot;{post.stavka}&quot;</p>
            <p>&quot;personalTypeID&quot; : &quot;{post.personalTypeID}&quot;</p>
            <p>&quot;personalTypeName&quot; : &quot;{post.personalTypeName}&quot;</p>
            <p>&quot;priznPostID&quot; : &quot;{post.priznPostID}&quot;</p>
            <p>&quot;hPostID&quot; : &quot;{post.hPostID}&quot;</p>
            <p>&quot;hPostName&quot; : &quot;{post.hPostName}&quot;</p>
            </div>
        </div>
        </>
      );
  };
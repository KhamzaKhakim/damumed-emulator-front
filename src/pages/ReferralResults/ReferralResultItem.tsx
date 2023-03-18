import { ChangeEvent, FormEvent, useState } from "react";
import { ReferralResult, deleteReferralResult, updateReferralResult } from "../../api/referralResults";
import { faFilePen, faFloppyDisk, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useMutation, useQueryClient } from "react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UpdateField from "../../components/UpdateField";
import classes from "./styles.module.css";





type propValue = {
  refferralResult: ReferralResult;
}


export const ReferralResultItem = ({refferralResult}: propValue) => {


    const [updatePage, setUpdatePage] = useState(false)
    const [referralResultForm, setRefferralResultForm] = useState(refferralResult)
    
    function handleChange(e: ChangeEvent<HTMLInputElement>){
      setRefferralResultForm(prev => {
        return {
          ...prev,
          [e.target.name]: e.target.value
        }
      })
    }
    
    
    const queryClient = useQueryClient()

    const deleteReferralResultMutation = useMutation({
      mutationFn: deleteReferralResult,
      onSuccess: () => {
        queryClient.invalidateQueries(["referralResults"], { exact: true })
      },
    })
  
    function handleDelete() {
      deleteReferralResultMutation.mutate(refferralResult.id)
    }

    const updateReferralResultMutation = useMutation({
        mutationFn: updateReferralResult,
        onSuccess: () => {
          queryClient.invalidateQueries(["referralResults"], { exact: true })
          setUpdatePage(false)
        },
      })
    
      function handleUpdatePage() {
        setRefferralResultForm(refferralResult)
        setUpdatePage(prev => !prev)
      }

      function handleUpdate(e: FormEvent<HTMLFormElement>){
        e.preventDefault()
        updateReferralResultMutation.mutate(referralResultForm)
      }

    
    if(updatePage){
      return (
        <>
        <form onSubmit={handleUpdate}>
          <div className={classes.container}> 
            <div className={classes.buttonContainer}>
            <button type="submit" className={classes.buttonIcon} disabled={refferralResult === referralResultForm}><FontAwesomeIcon icon={faFloppyDisk} size="xl"/></button>
            <button onClick={handleUpdatePage} className={classes.buttonIcon}><FontAwesomeIcon icon={faXmark} size="xl"/></button>
            </div>   
            <div className={classes.fields}>
              <UpdateField name="id" value={referralResultForm.id} type="number"  handleChange={handleChange}/>
              <UpdateField name="execDate" value={referralResultForm.execDate} type="datetime-local" handleChange={handleChange}/>
              <UpdateField name="execPostID" value={referralResultForm.execPostID} type="number" handleChange={handleChange}/>
              <UpdateField name="execTest" value={referralResultForm.execText} handleChange={handleChange}/>
              </div>
            <div className={classes.fields}>
              <UpdateField name="fileName" value={referralResultForm.fileResults[0].fileName} handleChange={handleChange}/>
              <UpdateField name="attachmentTypeID" value={referralResultForm.fileResults[0].attachmentTypeID} type="number" handleChange={handleChange}/>
              <UpdateField name="mimeType" value={referralResultForm.fileResults[0].mimeType} handleChange={handleChange}/>
              <UpdateField name="hPostName" value={referralResultForm.fileResults[0].fileContent} handleChange={handleChange}/>
            </div>
        </div>
        </form>
        <div>{JSON.stringify(referralResultForm)}</div>
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
            <p>&quot;id&quot; : <span className={classes.value}>&quot;{refferralResult.id}&quot;</span></p>
            <p>&quot;execDate&quot; : <span className={classes.value}>&quot;{refferralResult.execDate}&quot;</span></p>
            <p>&quot;execPostID&quot; : <span className={classes.value}>&quot;{refferralResult.execPostID}&quot;</span></p>
            <p>&quot;execText&quot; : <span className={classes.value}>&quot;{refferralResult.execText}&quot;</span></p>
            </div>
            <div className={classes.fields}>
              <p>&quot;fileResults&quot; :</p>
              {refferralResult.fileResults.map(file => (
                <p key={file.fileName}>&quot;fileName&quot; : <span className={classes.value}>&quot;{file.fileName}&quot;</span></p>
              ))}
            </div>
        </div>
        </>
      );
  };
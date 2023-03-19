import { ChangeEvent, FormEvent, useState } from "react";
import { ExternalApp, deleteExternalApp, updateExternalApp } from "../../api/externalApps";
import { faFilePen, faFloppyDisk, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useMutation, useQueryClient } from "react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UpdateField from "../../components/UpdateField";
import classes from "./styles.module.css";

type propValue = {
  externalApp: ExternalApp;
}


export const ExternalAppItem = ({externalApp}: propValue) => {


    const [updatePage, setUpdatePage] = useState(false)
    const [externalAppForm, setExternalAppForm] = useState(externalApp)
    
    function handleChange(e: ChangeEvent<HTMLInputElement>){
      setExternalAppForm(prev => {
        return {
          ...prev,
          [e.target.name]: e.target.value
        }
      })
    }
    
    
    const queryClient = useQueryClient()
    const deleteExternalAppMutation = useMutation({
      mutationFn: deleteExternalApp,
      onSuccess: () => {
        queryClient.invalidateQueries(["external_apps"], { exact: true })
      },
    })
  
    function handleDelete() {
      deleteExternalAppMutation.mutate(externalApp.systemUsername)
    }

    const updateExternalAppMutation = useMutation({
        mutationFn: updateExternalApp,
        onSuccess: () => {
          queryClient.invalidateQueries(["external_apps"], { exact: true })
          setUpdatePage(false)
        },
      })
    
      function handleUpdatePage() {
        setExternalAppForm(externalApp)
        setUpdatePage(prev => !prev)
      }

      function handleUpdate(e: FormEvent<HTMLFormElement>){
        e.preventDefault()
        updateExternalAppMutation.mutate(externalAppForm)
      }

    if(updatePage){
      return (
        <>
        <form onSubmit={handleUpdate}>
          <div className={classes.container}> 
            <div className={classes.buttonContainer}>
            <button type="submit" className={classes.buttonIcon}
            disabled={externalApp === externalAppForm && externalApp.systemPassword !== ""}>
              <FontAwesomeIcon icon={faFloppyDisk} size="xl"/>
            </button>
            <button onClick={handleUpdatePage} className={classes.buttonIcon}><FontAwesomeIcon icon={faXmark} size="xl"/></button>
            </div>   
            <div className={classes.fields}>
              <UpdateField name="systemUsername" readonly={true} value={externalAppForm.systemUsername} handleChange={handleChange}/>
              </div>
            <div className={classes.fields}>  
              <UpdateField name="systemPassword" value={externalAppForm.systemPassword} handleChange={handleChange}/>  
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
            <p>&quot;systemUsername&quot; : <span className={classes.value}>&quot;{externalApp.systemUsername}&quot;</span></p>
            </div>
            <div className={classes.fields}>
            <p>&quot;systemPassword&quot; : <span className={classes.value}>&quot;{externalApp.systemPassword}&quot;</span></p>
            </div>
        </div>
        <div>
        </div>
        </>
      );
  };
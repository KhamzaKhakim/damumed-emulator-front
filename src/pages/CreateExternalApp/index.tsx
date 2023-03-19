import { ChangeEvent, FormEvent, useState } from "react";
import { ExternalApp, updateExternalApp } from "../../api/externalApps";
import { faFloppyDisk, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useMutation, useQueryClient } from "react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UpdateField from "../../components/UpdateField";
import classes from "./styles.module.css"
import { useNavigate } from "react-router-dom";


export const CreateExternalApp = () => {

    const navigate = useNavigate();

    const [externalAppForm, setExternalAppForm] = useState<ExternalApp>({
      systemUsername: "",
      systemPassword: ""
      })
    
    function handleChange(e: ChangeEvent<HTMLInputElement>){
      setExternalAppForm(prev => {
        return {
          ...prev,
          [e.target.name]: e.target.value
        }
      })
    }

    function navigateToExternalApps(){
        navigate("/external-apps")
    }
    
    const queryClient = useQueryClient()

    const createPostMutation = useMutation({
        mutationFn: updateExternalApp,
        onSuccess: () => {
          queryClient.invalidateQueries(["external_apps"], { exact: true })
          navigate("/external-apps")
        },
      })

      function handleCreate(e: FormEvent<HTMLFormElement>){
        e.preventDefault()
        createPostMutation.mutate(externalAppForm)
      }
      return (
        <>
        <div className={classes.colFlex}>
        <form onSubmit={handleCreate}>
          <div className={classes.container}> 
            <div className={classes.buttonContainer}>
            <button type="submit" className={classes.buttonIcon}
            disabled={externalAppForm.systemUsername === "" || externalAppForm.systemPassword === ""}>
              <FontAwesomeIcon icon={faFloppyDisk} size="xl"/></button>
            <button onClick={navigateToExternalApps} className={classes.buttonIcon}><FontAwesomeIcon icon={faXmark} size="xl"/></button>
            </div>   
            <div className={classes.fields}>
              <UpdateField name="systemUsername" value={externalAppForm.systemUsername} handleChange={handleChange}/>
            </div>
            <div className={classes.fields}>
              <UpdateField name="systemPassword" value={externalAppForm.systemPassword} handleChange={handleChange}/>  
            </div>
        </div>
        </form>
        </div>
        </>
      )
  };
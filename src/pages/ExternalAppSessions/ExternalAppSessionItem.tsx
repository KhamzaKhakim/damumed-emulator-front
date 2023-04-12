import { ExternalAppSession, deleteExternalAppSession } from "../../api/externalApps";
import { useMutation, useQueryClient } from "react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./styles.module.css";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

type propValue = {
  externalAppSession: ExternalAppSession;
}


export const ExternalAppSessionItem = ({externalAppSession}: propValue) => {

    const queryClient = useQueryClient()
    const deleteExternalAppMutation = useMutation({
      mutationFn: deleteExternalAppSession,
      onSuccess: () => {
        queryClient.invalidateQueries(["external_app_sessions"], { exact: true }).catch(err => console.error(err))
      },
    })
  
    function handleDelete() {
      deleteExternalAppMutation.mutate(externalAppSession.token)
    }
    
    return (
        <>
          <div className={classes.container}> 
            <div className={classes.buttonContainer}>
            <button onClick={handleDelete} className={classes.buttonIcon}><FontAwesomeIcon icon={faTrash} size="xl"/></button>
            </div>   
            <div className={classes.fields}>
            <p>&quot;externalAppSystemUsername&quot; : <span className={classes.value}>&quot;{externalAppSession.externalAppSystemUsername}&quot;</span></p>
            <p>&quot;validUntil&quot; : <span className={classes.value}>&quot;{externalAppSession.validUntil}&quot;</span></p>
            </div>
            <div className={classes.fields}>
            <p>&quot;token&quot; : <span className={classes.value}>&quot;{externalAppSession.token}&quot;</span></p>
            </div>
        </div>
        <div>
        </div>
        </>
      );
  };
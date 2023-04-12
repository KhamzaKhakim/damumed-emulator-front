import { Appointment, deleteAppointment, updateAppointment } from "../../api/appointments";
import { ChangeEvent, FormEvent, useState } from "react";
import { faFilePen, faFloppyDisk, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useMutation, useQueryClient } from "react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UpdateField from "../../components/UpdateField";
import classes from "./styles.module.css";





type propValue = {
  appointment: Appointment;
}


export const AppointmentItem = ({appointment}: propValue) => {


    const [updatePage, setUpdatePage] = useState(false)
    const [appointmentForm, setAppointmentForm] = useState(appointment)
    
    function handleChange(e: ChangeEvent<HTMLInputElement>){
      setAppointmentForm(prev => {
        return {
          ...prev,
          [e.target.name]: e.target.value
        }
      })
    }
    
    
    const queryClient = useQueryClient()
    const deleteAppointmentMutation = useMutation({
      mutationFn: deleteAppointment,
      onSuccess: () => {
        queryClient.invalidateQueries(["appointments"], { exact: true }).catch(err => console.error(err))
      },
    })
  
    function handleDelete() {
      deleteAppointmentMutation.mutate(appointment.provisionalAppointmentRecordID)
    }

    const updateAppointmentMutation = useMutation({
        mutationFn: updateAppointment,
        onSuccess: () => {
          queryClient.invalidateQueries(["appointments"], { exact: true }).catch(err => console.error(err))
          setUpdatePage(false)
        },
      })
    
      function handleUpdatePage() {
        setAppointmentForm(appointment)
        setUpdatePage(prev => !prev)
      }

      function handleUpdate(e: FormEvent<HTMLFormElement>){
        e.preventDefault()
        updateAppointmentMutation.mutate(appointmentForm)
      }

    if(updatePage){
      return (
        <>
        <form onSubmit={handleUpdate}>
          <div className={classes.container}> 
            <div className={classes.buttonContainer}>
            <button type="submit" className={classes.buttonIcon} disabled={appointment === appointmentForm}><FontAwesomeIcon icon={faFloppyDisk} size="xl"/></button>
            <button onClick={handleUpdatePage} className={classes.buttonIcon}><FontAwesomeIcon icon={faXmark} size="xl"/></button>
            </div>   
            <div className={classes.fields}>
              <UpdateField name="provisionalAppointmentRecordID" readonly={true} value={appointmentForm.provisionalAppointmentRecordID} type="number" handleChange={handleChange}/>
              <UpdateField name="gridScheduleRecordID" value={appointmentForm.gridScheduleRecordID} type="number" handleChange={handleChange}/>
              <UpdateField name="personIIN" value={appointmentForm.personIIN} handleChange={handleChange}/>
              <UpdateField name="personFullName" value={appointmentForm.personFullName} handleChange={handleChange}/>
              <UpdateField name="moName" value={appointmentForm.moName} handleChange={handleChange}/>
              <UpdateField name="serviceName" value={appointmentForm.serviceName} handleChange={handleChange}/>
              <UpdateField name="doctorFullName" value={appointmentForm.doctorFullName} handleChange={handleChange}/>
              <UpdateField name="postName" value={appointmentForm.postName} handleChange={handleChange}/>
              <UpdateField name="cabinet" value={appointmentForm.cabinet} handleChange={handleChange}/>
              <UpdateField name="receptionDate" value={appointmentForm.receptionDate} type="datetime-local" handleChange={handleChange}/>
              <UpdateField name="treatmentReasonName" value={appointmentForm.treatmentReasonName} handleChange={handleChange}/>
            </div>
            <div className={classes.fields}>
              <UpdateField name="treatmentReasonPublicCode" value={appointmentForm.treatmentReasonPublicCode} handleChange={handleChange}/>
              <UpdateField name="assistancePlacePublicCode" value={appointmentForm.assistancePlacePublicCode} handleChange={handleChange}/>
              <UpdateField name="servicePublicCode" value={appointmentForm.servicePublicCode} handleChange={handleChange}/>
              <UpdateField name="assistanceMethod" value={appointmentForm.assistanceMethod} handleChange={handleChange}/>
              <UpdateField name="problem" value={appointmentForm.problem} handleChange={handleChange}/>
              <UpdateField name="serviceName" value={appointmentForm.serviceName} handleChange={handleChange}/>  
              <UpdateField name="isPerformed" value={appointmentForm.isPerformed} type="boolean" handleChange={handleChange}/>  
              <UpdateField name="isCancelReception" value={appointmentForm.isCancelReception} type="boolean" handleChange={handleChange}/>  
              <UpdateField name="isRemotely" value={appointmentForm.isRemotely} type="boolean" handleChange={handleChange}/>
              <UpdateField name="value" value={appointmentForm.value} type="number" handleChange={handleChange}/>  
              <UpdateField name="note" value={appointmentForm.note} handleChange={handleChange}/>  
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
            <p>&quot;provisionalAppointmentRecordID&quot; : <span className={classes.value}>&quot;{appointment.provisionalAppointmentRecordID}&quot;</span></p>
            <p>&quot;gridScheduleRecordID&quot;: <span className={classes.value}>&quot;{appointment.gridScheduleRecordID}&quot;</span></p>
            <p>&quot;personIIN&quot; : <span className={classes.value}>&quot;{appointment.personIIN}&quot;</span></p>
            <p>&quot;personFullName&quot; : <span className={classes.value}>&quot;{appointment.personFullName}&quot;</span></p>
            <p>&quot;moName&quot; : <span className={classes.value}>&quot;{appointment.moName}&quot;</span></p>
            <p>&quot;serviceName&quot; : <span className={classes.value}>&quot;{appointment.serviceName}&quot;</span></p>
            <p>&quot;doctorFullName&quot; : <span className={classes.value}>&quot;{appointment.doctorFullName}&quot;</span></p>
            <p>&quot;postName&quot; : <span className={classes.value}>&quot;{appointment.postName}&quot;</span></p>
            <p>&quot;cabinet&quot; : <span className={classes.value}>&quot;{appointment.cabinet}&quot;</span></p>
            <p>&quot;receptionDate&quot; : <span className={classes.value}>&quot;{appointment.receptionDate}&quot;</span></p>
            <p>&quot;treatmentReasonName&quot; : <span className={classes.value}>&quot;{appointment.treatmentReasonName}&quot;</span></p>
            </div>
            <div className={classes.fields}>
            <p>&quot;treatmentReasonPublicCode&quot; : <span className={classes.value}>&quot;{appointment.treatmentReasonPublicCode}&quot;</span></p>
            <p>&quot;assistancePlacePublicCode&quot; : <span className={classes.value}>&quot;{appointment.assistancePlacePublicCode}&quot;</span></p>
            <p>&quot;servicePublicCode&quot; : <span className={classes.value}>&quot;{appointment.servicePublicCode}&quot;</span></p>
            <p>&quot;assistanceMethod&quot; : <span className={classes.value}>&quot;{appointment.assistanceMethod}&quot;</span></p>
            <p>&quot;problem&quot; : <span className={classes.value}>&quot;{appointment.problem}&quot;</span></p>
            <p>&quot;isPerformed&quot; : <span className={classes.value}>&quot;{JSON.stringify(appointment.isPerformed)}&quot;</span></p>
            <p>&quot;isCancelReception&quot; : <span className={classes.value}>&quot;{JSON.stringify(appointment.isCancelReception)}&quot;</span></p>
            <p>&quot;isRemotely&quot; : <span className={classes.value}>&quot;{JSON.stringify(appointment.isRemotely)}&quot;</span></p>
            <p>&quot;value&quot; : <span className={classes.value}>&quot;{appointment.value}&quot;</span></p>
            {/* <p>&quot;questions&quot; : <span className={classes.value}>&quot;{appointment.questions}&quot;</span></p> */}
            <p>&quot;note&quot; : <span className={classes.value}>&quot;{appointment.note}&quot;</span></p>
            </div>
        </div>
        <div>
        </div>
        </>
      );
  };
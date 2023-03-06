import { ChangeEvent, FormEvent, useState } from "react";
import { faFloppyDisk, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useMutation, useQueryClient } from "react-query";
import { Appointment } from "../../api/appointments";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UpdateField from "../../components/UpdateField";
import classes from "./styles.module.css"
import { updateAppointment } from "../../api/appointments";
import { useNavigate } from "react-router-dom";


export const CreateAppointment = () => {

    const navigate = useNavigate();

    const [appointmentForm, setAppointmentForm] = useState<Appointment>({
      provisionalAppointmentRecordID: 0,
      gridScheduleRecordID: 0,
      personIIN: "",
      personFullName: "",
      moName: "",
      serviceName: "",
      doctorFullName: "",
      postName: "",
      cabinet: "",
      receptionDate: "",
      treatmentReasonName: "",
      treatmentReasonPublicCode: "",
      assistancePlacePublicCode: "",
      servicePublicCode: "",
      assistanceMethod: "",
      problem: "",
      isPerformed: "",
      isCancelReception: "",
      isRemotely: "",
      value: 0,
      // questions: [""],
      note: "",
    })
    
    function handleChange(e: ChangeEvent<HTMLInputElement>){
      console.log(e.target.name)
      setAppointmentForm(prev => {
        return {
          ...prev,
          [e.target.name]: e.target.value
        }
      })
    }

    function navigateToAppointments(){
        navigate("/appointments")
    }
    
    const queryClient = useQueryClient()

    const createPostMutation = useMutation({
        mutationFn: updateAppointment,
        onSuccess: () => {
          queryClient.invalidateQueries(["appointments"], { exact: true })
          navigate("/appointments")
        },
      })

      function handleCreate(e: FormEvent<HTMLFormElement>){
        e.preventDefault()
        createPostMutation.mutate(appointmentForm)
      }
      return (
        <>
        <div className={classes.colFlex}>
        <form onSubmit={handleCreate}>
          <div className={classes.container}> 
            <div className={classes.buttonContainer}>
            <button type="submit" className={classes.buttonIcon} disabled={appointmentForm.provisionalAppointmentRecordID === 0}><FontAwesomeIcon icon={faFloppyDisk} size="xl"/></button>
            <button onClick={navigateToAppointments} className={classes.buttonIcon}><FontAwesomeIcon icon={faXmark} size="xl"/></button>
            </div>   
            <div className={classes.fields}>
              <UpdateField name="provisionalAppointmentRecordID" value={appointmentForm.provisionalAppointmentRecordID} type="number" handleChange={handleChange}/>
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
              <UpdateField name="isCancelReception" value={appointmentForm.isCancelReception} handleChange={handleChange}/>  
              <UpdateField name="isRemotely" value={appointmentForm.isRemotely} handleChange={handleChange}/>  
              <UpdateField name="value" value={appointmentForm.value} type="number" handleChange={handleChange}/>  
              <UpdateField name="note" value={appointmentForm.note} handleChange={handleChange}/>  
            </div>
        </div>
        </form>
        </div>
        </>
      )
  };
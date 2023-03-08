import { ChangeEvent, FormEvent, useState } from "react";
import { Referral, updateReferral } from "../../api/referrals";
import { faFloppyDisk, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useMutation, useQueryClient } from "react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UpdateField from "../../components/UpdateField";
import classes from "./styles.module.css"
import { useNavigate } from "react-router-dom";


export const CreateReferral = () => {

    const navigate = useNavigate();

    const [referralForm, setReferralForm] = useState<Referral>({
      id: 0,
      personIIN: "",
      personLastName: "",
      personFirstName: "",
      personSecondName: "",
      personBirthDate: "",
      sexID: 0,
      sexName: "",
      referralDate: "",
      serviceCode: "",
      serviceName: "",
      senderMoID: 0,
      senderMoName: "",
      receiverMoID: 0,
      receiverMoName: "",
      senderFpID: 0,
      senderFpName: "",
      receiverFpID: 0,
      receiverFpName: "",
      senderDocPostID: 0,
      senderDocPostFIO: "",
      execDate: "",
      execPostID: 0,
      execPostFIO: "",
      execFpID: 0,
      execFpName: "",
      execMoID: 0,
      execMoName: "",
      serviceCount: 0,
    })
    
    function handleChange(e: ChangeEvent<HTMLInputElement>){
      setReferralForm(prev => {
        return {
          ...prev,
          [e.target.name]: e.target.value
        }
      })
    }

    function navigateToPosts(){
        navigate("/referrals")
    }
    
    
    const queryClient = useQueryClient()

    const createPostMutation = useMutation({
        mutationFn: updateReferral,
        onSuccess: () => {
          queryClient.invalidateQueries(["referrals"], { exact: true })
          navigate("/referrals")
        },
      })

      function handleCreate(e: FormEvent<HTMLFormElement>){
        e.preventDefault()
        createPostMutation.mutate(referralForm)
      }
      return (
        <>
        <div className={classes.colFlex}>
        <form onSubmit={handleCreate}>
          <div className={classes.container}> 
            <div className={classes.buttonContainer}>
            <button type="submit" className={classes.buttonIcon} disabled={referralForm.id === 0}><FontAwesomeIcon icon={faFloppyDisk} size="xl"/></button>
            <button onClick={navigateToPosts} className={classes.buttonIcon}><FontAwesomeIcon icon={faXmark} size="xl"/></button>
            </div>   
            <div className={classes.fields}>
              <UpdateField name="id" value={referralForm.id} handleChange={handleChange} type="number"/>
              <UpdateField name="personIIN" value={referralForm.personIIN} handleChange={handleChange}/>
              <UpdateField name="personLastName" value={referralForm.personLastName} handleChange={handleChange}/>
              <UpdateField name="personFirstName" value={referralForm.personFirstName} handleChange={handleChange}/>
              <UpdateField name="personSecondName" value={referralForm.personSecondName} handleChange={handleChange}/>
              <UpdateField name="personBirthDate" value={referralForm.personBirthDate} type="datetime-local" handleChange={handleChange}/>
              <UpdateField name="sexID" value={referralForm.sexID} type="number" handleChange={handleChange}/>
              <UpdateField name="sexName" value={referralForm.sexName} handleChange={handleChange}/>
              <UpdateField name="referralDate" value={referralForm.referralDate} type="datetime-local" handleChange={handleChange}/>
              <UpdateField name="serviceCode" value={referralForm.serviceCode} handleChange={handleChange}/>
              <UpdateField name="serviceName" value={referralForm.serviceName} handleChange={handleChange}/>
              <UpdateField name="senderMoID" value={referralForm.senderMoID} type="number" handleChange={handleChange}/>
              <UpdateField name="senderMoName" value={referralForm.senderMoName} handleChange={handleChange}/>
              <UpdateField name="receiverMoID" value={referralForm.receiverMoID} type="number" handleChange={handleChange}/>
              <UpdateField name="receiverMoName" value={referralForm.receiverMoName} handleChange={handleChange}/>
              </div>
            <div className={classes.fields}>
              <UpdateField name="senderFpID" value={referralForm.senderFpID} type="number" handleChange={handleChange}/>
              <UpdateField name="senderFpName" value={referralForm.senderFpName} handleChange={handleChange}/>
              <UpdateField name="receiverFpID" value={referralForm.receiverFpID} type="number" handleChange={handleChange}/>
              <UpdateField name="receiverFpName" value={referralForm.receiverFpName} handleChange={handleChange}/>
              <UpdateField name="senderDocPostID" value={referralForm.senderDocPostID} type="number" handleChange={handleChange}/>
              <UpdateField name="senderDocPostFIO" value={referralForm.senderDocPostFIO} handleChange={handleChange}/>
              <UpdateField name="execDate" value={referralForm.execDate} type="datetime-local" handleChange={handleChange}/>
              <UpdateField name="execPostID" value={referralForm.execPostID} type="number" handleChange={handleChange}/>
              <UpdateField name="execPostFIO" value={referralForm.execPostFIO} handleChange={handleChange}/>
              <UpdateField name="execFpID" value={referralForm.execFpID} type="number" handleChange={handleChange}/>
              <UpdateField name="execFpName" value={referralForm.execFpName} handleChange={handleChange}/>
              <UpdateField name="execMoID" value={referralForm.execMoID} type="number" handleChange={handleChange}/>
              <UpdateField name="execMoName" value={referralForm.execMoName} handleChange={handleChange}/>
              <UpdateField name="serviceCount" value={referralForm.serviceCount} type="number" handleChange={handleChange}/>
            </div>
        </div>
        </form>
        </div>
        </>
      )
  };
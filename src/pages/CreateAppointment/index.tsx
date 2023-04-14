import { ChangeEvent, FormEvent, useState } from "react";
import { faFloppyDisk, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useMutation, useQueryClient } from "react-query";
import { Appointment } from "../../api/appointments";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UpdateField from "../../components/UpdateField";
import classes from "./styles.module.css";
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
  });

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    setAppointmentForm((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  }

  function navigateToAppointments() {
    navigate("/appointments");
  }

  const queryClient = useQueryClient();

  const createPostMutation = useMutation({
    mutationFn: updateAppointment,
    onSuccess: () => {
      queryClient
        .invalidateQueries(["appointments"], { exact: true })
        .catch((err) => console.error(err));
      navigate("/appointments");
    },
  });

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    createPostMutation.mutate(appointmentForm);
  }
  return (
    <>
      <div className={classes.colFlex}>
        <form onSubmit={onSubmit}>
          <div className={classes.container}>
            <div className={classes.buttonContainer}>
              <button
                type="submit"
                className={classes.buttonIcon}
                disabled={appointmentForm.provisionalAppointmentRecordID === 0}
              >
                <FontAwesomeIcon icon={faFloppyDisk} size="xl" />
              </button>
              <button
                onClick={navigateToAppointments}
                className={classes.buttonIcon}
              >
                <FontAwesomeIcon icon={faXmark} size="xl" />
              </button>
            </div>
            <div className={classes.fields}>
              <UpdateField
                name="provisionalAppointmentRecordID"
                value={appointmentForm.provisionalAppointmentRecordID}
                type="number"
                onChange={onChange}
              />
              <UpdateField
                name="gridScheduleRecordID"
                value={appointmentForm.gridScheduleRecordID}
                type="number"
                onChange={onChange}
              />
              <UpdateField
                name="personIIN"
                value={appointmentForm.personIIN}
                onChange={onChange}
              />
              <UpdateField
                name="personFullName"
                value={appointmentForm.personFullName}
                onChange={onChange}
              />
              <UpdateField
                name="moName"
                value={appointmentForm.moName}
                onChange={onChange}
              />
              <UpdateField
                name="serviceName"
                value={appointmentForm.serviceName}
                onChange={onChange}
              />
              <UpdateField
                name="doctorFullName"
                value={appointmentForm.doctorFullName}
                onChange={onChange}
              />
              <UpdateField
                name="postName"
                value={appointmentForm.postName}
                onChange={onChange}
              />
              <UpdateField
                name="cabinet"
                value={appointmentForm.cabinet}
                onChange={onChange}
              />
              <UpdateField
                name="receptionDate"
                value={appointmentForm.receptionDate}
                type="datetime-local"
                onChange={onChange}
              />
              <UpdateField
                name="treatmentReasonName"
                value={appointmentForm.treatmentReasonName}
                onChange={onChange}
              />
            </div>
            <div className={classes.fields}>
              <UpdateField
                name="treatmentReasonPublicCode"
                value={appointmentForm.treatmentReasonPublicCode}
                onChange={onChange}
              />
              <UpdateField
                name="assistancePlacePublicCode"
                value={appointmentForm.assistancePlacePublicCode}
                onChange={onChange}
              />
              <UpdateField
                name="servicePublicCode"
                value={appointmentForm.servicePublicCode}
                onChange={onChange}
              />
              <UpdateField
                name="assistanceMethod"
                value={appointmentForm.assistanceMethod}
                onChange={onChange}
              />
              <UpdateField
                name="problem"
                value={appointmentForm.problem}
                onChange={onChange}
              />
              <UpdateField
                name="serviceName"
                value={appointmentForm.serviceName}
                onChange={onChange}
              />
              <UpdateField
                name="isPerformed"
                value={appointmentForm.isPerformed}
                type="boolean"
                onChange={onChange}
              />
              <UpdateField
                name="isCancelReception"
                value={appointmentForm.isCancelReception}
                type="boolean"
                onChange={onChange}
              />
              <UpdateField
                name="isRemotely"
                value={appointmentForm.isRemotely}
                type="boolean"
                onChange={onChange}
              />
              <UpdateField
                name="value"
                value={appointmentForm.value}
                type="number"
                onChange={onChange}
              />
              <UpdateField
                name="note"
                value={appointmentForm.note}
                onChange={onChange}
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

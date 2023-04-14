import { ChangeEvent, FormEvent, useState } from "react";
import { Referral, updateReferral } from "../../api/referrals";
import { faFloppyDisk, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useMutation, useQueryClient } from "react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UpdateField from "../../components/UpdateField";
import classes from "./styles.module.css";
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
  });

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    setReferralForm((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  }

  function navigateToPosts() {
    navigate("/referrals");
  }

  const queryClient = useQueryClient();

  const createPostMutation = useMutation({
    mutationFn: updateReferral,
    onSuccess: () => {
      queryClient
        .invalidateQueries(["referrals"], { exact: true })
        .catch((err) => console.error(err));
      navigate("/referrals");
    },
  });

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    createPostMutation.mutate(referralForm);
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
                disabled={referralForm.id === 0}
              >
                <FontAwesomeIcon icon={faFloppyDisk} size="xl" />
              </button>
              <button onClick={navigateToPosts} className={classes.buttonIcon}>
                <FontAwesomeIcon icon={faXmark} size="xl" />
              </button>
            </div>
            <div className={classes.fields}>
              <UpdateField
                name="id"
                value={referralForm.id}
                onChange={onChange}
                type="number"
              />
              <UpdateField
                name="personIIN"
                value={referralForm.personIIN}
                onChange={onChange}
              />
              <UpdateField
                name="personLastName"
                value={referralForm.personLastName}
                onChange={onChange}
              />
              <UpdateField
                name="personFirstName"
                value={referralForm.personFirstName}
                onChange={onChange}
              />
              <UpdateField
                name="personSecondName"
                value={referralForm.personSecondName}
                onChange={onChange}
              />
              <UpdateField
                name="personBirthDate"
                value={referralForm.personBirthDate}
                type="datetime-local"
                onChange={onChange}
              />
              <UpdateField
                name="sexID"
                value={referralForm.sexID}
                type="number"
                onChange={onChange}
              />
              <UpdateField
                name="sexName"
                value={referralForm.sexName}
                onChange={onChange}
              />
              <UpdateField
                name="referralDate"
                value={referralForm.referralDate}
                type="datetime-local"
                onChange={onChange}
              />
              <UpdateField
                name="serviceCode"
                value={referralForm.serviceCode}
                onChange={onChange}
              />
              <UpdateField
                name="serviceName"
                value={referralForm.serviceName}
                onChange={onChange}
              />
              <UpdateField
                name="senderMoID"
                value={referralForm.senderMoID}
                type="number"
                onChange={onChange}
              />
              <UpdateField
                name="senderMoName"
                value={referralForm.senderMoName}
                onChange={onChange}
              />
              <UpdateField
                name="receiverMoID"
                value={referralForm.receiverMoID}
                type="number"
                onChange={onChange}
              />
              <UpdateField
                name="receiverMoName"
                value={referralForm.receiverMoName}
                onChange={onChange}
              />
            </div>
            <div className={classes.fields}>
              <UpdateField
                name="senderFpID"
                value={referralForm.senderFpID}
                type="number"
                onChange={onChange}
              />
              <UpdateField
                name="senderFpName"
                value={referralForm.senderFpName}
                onChange={onChange}
              />
              <UpdateField
                name="receiverFpID"
                value={referralForm.receiverFpID}
                type="number"
                onChange={onChange}
              />
              <UpdateField
                name="receiverFpName"
                value={referralForm.receiverFpName}
                onChange={onChange}
              />
              <UpdateField
                name="senderDocPostID"
                value={referralForm.senderDocPostID}
                type="number"
                onChange={onChange}
              />
              <UpdateField
                name="senderDocPostFIO"
                value={referralForm.senderDocPostFIO}
                onChange={onChange}
              />
              <UpdateField
                name="execDate"
                value={referralForm.execDate}
                type="datetime-local"
                onChange={onChange}
              />
              <UpdateField
                name="execPostID"
                value={referralForm.execPostID}
                type="number"
                onChange={onChange}
              />
              <UpdateField
                name="execPostFIO"
                value={referralForm.execPostFIO}
                onChange={onChange}
              />
              <UpdateField
                name="execFpID"
                value={referralForm.execFpID}
                type="number"
                onChange={onChange}
              />
              <UpdateField
                name="execFpName"
                value={referralForm.execFpName}
                onChange={onChange}
              />
              <UpdateField
                name="execMoID"
                value={referralForm.execMoID}
                type="number"
                onChange={onChange}
              />
              <UpdateField
                name="execMoName"
                value={referralForm.execMoName}
                onChange={onChange}
              />
              <UpdateField
                name="serviceCount"
                value={referralForm.serviceCount}
                type="number"
                onChange={onChange}
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

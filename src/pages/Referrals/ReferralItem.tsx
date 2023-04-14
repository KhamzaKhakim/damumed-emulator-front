import { ChangeEvent, FormEvent, useState } from "react";
import { deleteReferral, updateReferral } from "../../api/referrals";
import {
  faFilePen,
  faFloppyDisk,
  faTrash,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useMutation, useQueryClient } from "react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Referral } from "../../api/referrals";
import UpdateField from "../../components/UpdateField";
import classes from "./styles.module.css";

type Props = {
  referral: Referral;
};

export const ReferralItem = ({ referral }: Props) => {
  const [updatePage, setUpdatePage] = useState(false);
  const [referralForm, setReferralForm] = useState(referral);

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    setReferralForm((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  }

  const queryClient = useQueryClient();
  const deletereferralMutation = useMutation({
    mutationFn: deleteReferral,
    onSuccess: () => {
      queryClient
        .invalidateQueries(["referrals"], { exact: true })
        .catch((err) => console.error(err));
    },
  });

  function onClickDelete() {
    deletereferralMutation.mutate(referral.id);
  }

  const updatereferralMutation = useMutation({
    mutationFn: updateReferral,
    onSuccess: () => {
      queryClient
        .invalidateQueries(["referrals"], { exact: true })
        .catch((err) => console.error(err));
      setUpdatePage(false);
    },
  });

  function onClickUpdate() {
    setReferralForm(referral);
    setUpdatePage((prev) => !prev);
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    updatereferralMutation.mutate(referralForm);
  }

  if (updatePage) {
    return (
      <>
        <form onSubmit={onSubmit}>
          <div className={classes.container}>
            <div className={classes.buttonContainer}>
              <button
                type="submit"
                className={classes.buttonIcon}
                disabled={referral === referralForm}
              >
                <FontAwesomeIcon icon={faFloppyDisk} size="xl" />
              </button>
              <button onClick={onClickUpdate} className={classes.buttonIcon}>
                <FontAwesomeIcon icon={faXmark} size="xl" />
              </button>
            </div>
            <div className={classes.fields}>
              <UpdateField
                name="id"
                value={referralForm.id}
                onChange={onChange}
                type="number"
                readonly={true}
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
      </>
    );
  }

  return (
    <>
      <div className={classes.container}>
        <div className={classes.buttonContainer}>
          <button onClick={onClickUpdate} className={classes.buttonIcon}>
            <FontAwesomeIcon icon={faFilePen} size="xl" />
          </button>
          <button onClick={onClickDelete} className={classes.buttonIcon}>
            <FontAwesomeIcon icon={faTrash} size="xl" />
          </button>
        </div>
        <div className={classes.fields}>
          <p>
            &quot;id&quot; :{" "}
            <span className={classes.value}>&quot;{referral.id}&quot;</span>
          </p>
          <p>
            &quot;personIIN&quot; :{" "}
            <span className={classes.value}>
              &quot;{referral.personIIN}&quot;
            </span>
          </p>
          <p>
            &quot;personLastName&quot; :{" "}
            <span className={classes.value}>
              &quot;{referral.personLastName}&quot;
            </span>
          </p>
          <p>
            &quot;personFirstName&quot; :{" "}
            <span className={classes.value}>
              &quot;{referral.personFirstName}&quot;
            </span>
          </p>
          <p>
            &quot;personSecondName&quot; :{" "}
            <span className={classes.value}>
              &quot;{referral.personSecondName}&quot;
            </span>
          </p>
          <p>
            &quot;personBirthDate&quot; :{" "}
            <span className={classes.value}>
              &quot;{referral.personBirthDate}&quot;
            </span>
          </p>
          <p>
            &quot;sexID&quot; :{" "}
            <span className={classes.value}>&quot;{referral.sexID}&quot;</span>
          </p>
          <p>
            &quot;sexName&quot; :{" "}
            <span className={classes.value}>
              &quot;{referral.sexName}&quot;
            </span>
          </p>
          <p>
            &quot;referralDate&quot; :{" "}
            <span className={classes.value}>
              &quot;{referral.referralDate}&quot;
            </span>
          </p>
          <p>
            &quot;serviceCode&quot; :{" "}
            <span className={classes.value}>
              &quot;{referral.serviceCode}&quot;
            </span>
          </p>
          <p>
            &quot;serviceName&quot; :{" "}
            <span className={classes.value}>
              &quot;{referral.serviceName}&quot;
            </span>
          </p>
          <p>
            &quot;senderMoID&quot; :{" "}
            <span className={classes.value}>
              &quot;{referral.senderMoID}&quot;
            </span>
          </p>
          <p>
            &quot;senderMoName&quot; :{" "}
            <span className={classes.value}>
              &quot;{referral.senderMoName}&quot;
            </span>
          </p>
          <p>
            &quot;receiverMoID&quot; :{" "}
            <span className={classes.value}>
              &quot;{referral.receiverMoID}&quot;
            </span>
          </p>
          <p>
            &quot;receiverMoName&quot; :{" "}
            <span className={classes.value}>
              &quot;{referral.receiverMoName}&quot;
            </span>
          </p>
        </div>
        <div className={classes.fields}>
          <p>
            &quot;senderFpID&quot; :{" "}
            <span className={classes.value}>
              &quot;{referral.senderFpID}&quot;
            </span>
          </p>
          <p>
            &quot;senderFpName&quot; :{" "}
            <span className={classes.value}>
              &quot;{referral.senderFpName}&quot;
            </span>
          </p>
          <p>
            &quot;receiverFpID&quot; :{" "}
            <span className={classes.value}>
              &quot;{referral.receiverFpID}&quot;
            </span>
          </p>
          <p>
            &quot;receiverFpName&quot; :{" "}
            <span className={classes.value}>
              &quot;{referral.receiverFpName}&quot;
            </span>
          </p>
          <p>
            &quot;senderDocPostID&quot; :{" "}
            <span className={classes.value}>
              &quot;{referral.senderDocPostID}&quot;
            </span>
          </p>
          <p>
            &quot;senderDocPostFIO&quot; :{" "}
            <span className={classes.value}>
              &quot;{referral.senderDocPostFIO}&quot;
            </span>
          </p>
          <p>
            &quot;execDate&quot; :{" "}
            <span className={classes.value}>
              &quot;{referral.execDate}&quot;
            </span>
          </p>
          <p>
            &quot;execPostID&quot; :{" "}
            <span className={classes.value}>
              &quot;{referral.execPostID}&quot;
            </span>
          </p>
          <p>
            &quot;execPostFIO&quot; :{" "}
            <span className={classes.value}>
              &quot;{referral.execPostFIO}&quot;
            </span>
          </p>
          <p>
            &quot;execFpID&quot; :{" "}
            <span className={classes.value}>
              &quot;{referral.execFpID}&quot;
            </span>
          </p>
          <p>
            &quot;execFpName&quot; :{" "}
            <span className={classes.value}>
              &quot;{referral.execFpName}&quot;
            </span>
          </p>
          <p>
            &quot;execMoID&quot; :{" "}
            <span className={classes.value}>
              &quot;{referral.execMoID}&quot;
            </span>
          </p>
          <p>
            &quot;execMoName&quot; :{" "}
            <span className={classes.value}>
              &quot;{referral.execMoName}&quot;
            </span>
          </p>
          <p>
            &quot;serviceCode&quot; :{" "}
            <span className={classes.value}>
              &quot;{referral.serviceCode}&quot;
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

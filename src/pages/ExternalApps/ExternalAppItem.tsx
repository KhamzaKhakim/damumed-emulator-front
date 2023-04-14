import { ChangeEvent, FormEvent, useState } from "react";
import {
  ExternalApp,
  deleteExternalApp,
  updateExternalApp,
} from "../../api/externalApps";
import {
  faFilePen,
  faFloppyDisk,
  faTrash,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useMutation, useQueryClient } from "react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UpdateField from "../../components/UpdateField";
import classes from "./styles.module.css";

type Props = {
  externalApp: ExternalApp;
};

export const ExternalAppItem = ({ externalApp }: Props) => {
  const [updatePage, setUpdatePage] = useState(false);
  const [externalAppForm, setExternalAppForm] = useState(externalApp);

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    setExternalAppForm((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  }

  const queryClient = useQueryClient();
  const deleteExternalAppMutation = useMutation({
    mutationFn: deleteExternalApp,
    onSuccess: () => {
      queryClient
        .invalidateQueries(["external_apps"], { exact: true })
        .catch((err) => console.error(err));
    },
  });

  function onClickDelete() {
    deleteExternalAppMutation.mutate(externalApp.systemUsername);
  }

  const updateExternalAppMutation = useMutation({
    mutationFn: updateExternalApp,
    onSuccess: () => {
      queryClient
        .invalidateQueries(["external_apps"], { exact: true })
        .catch((err) => console.error(err));
      setUpdatePage(false);
    },
  });

  function onClickUpdate() {
    setExternalAppForm(externalApp);
    setUpdatePage((prev) => !prev);
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    updateExternalAppMutation.mutate(externalAppForm);
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
                disabled={
                  externalApp === externalAppForm &&
                  externalApp.systemPassword !== ""
                }
              >
                <FontAwesomeIcon icon={faFloppyDisk} size="xl" />
              </button>
              <button onClick={onClickUpdate} className={classes.buttonIcon}>
                <FontAwesomeIcon icon={faXmark} size="xl" />
              </button>
            </div>
            <div className={classes.fields}>
              <UpdateField
                name="systemUsername"
                readonly={true}
                value={externalAppForm.systemUsername}
                onChange={onChange}
              />
            </div>
            <div className={classes.fields}>
              <UpdateField
                name="systemPassword"
                value={externalAppForm.systemPassword}
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
            &quot;systemUsername&quot; :{" "}
            <span className={classes.value}>
              &quot;{externalApp.systemUsername}&quot;
            </span>
          </p>
        </div>
        <div className={classes.fields}>
          <p>
            &quot;systemPassword&quot; :{" "}
            <span className={classes.value}>
              &quot;{externalApp.systemPassword}&quot;
            </span>
          </p>
        </div>
      </div>
      <div></div>
    </>
  );
};

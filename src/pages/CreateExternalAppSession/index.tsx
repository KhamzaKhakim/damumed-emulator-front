import { ChangeEvent, FormEvent, useState } from "react";
import { ExternalApp, createSession } from "../../api/externalApps";
import { faFloppyDisk, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useMutation, useQueryClient } from "react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UpdateField from "../../components/UpdateField";
import classes from "./styles.module.css";
import { useNavigate } from "react-router-dom";

export const CreateExternalAppSession = () => {
  const navigate = useNavigate();

  const [externalAppSessionForm, setExternalAppSessionForm] =
    useState<ExternalApp>({
      systemUsername: "",
      systemPassword: "",
    });

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    setExternalAppSessionForm((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  }

  function navigateToExternalAppSessions() {
    navigate("/external-app-sessions");
  }

  const queryClient = useQueryClient();

  const createPostMutation = useMutation({
    mutationFn: createSession,
    onSuccess: () => {
      queryClient
        .invalidateQueries(["external_app_sessions"], { exact: true })
        .catch((err) => console.error(err));
      navigate("/external-app-sessions");
    },
  });

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    createPostMutation.mutate(externalAppSessionForm);
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
                disabled={
                  externalAppSessionForm.systemUsername === "" ||
                  externalAppSessionForm.systemPassword === ""
                }
              >
                <FontAwesomeIcon icon={faFloppyDisk} size="xl" />
              </button>
              <button
                onClick={navigateToExternalAppSessions}
                className={classes.buttonIcon}
              >
                <FontAwesomeIcon icon={faXmark} size="xl" />
              </button>
            </div>
            <div className={classes.fields}>
              <UpdateField
                name="systemUsername"
                value={externalAppSessionForm.systemUsername}
                onChange={onChange}
              />
            </div>
            <div className={classes.fields}>
              <UpdateField
                name="systemPassword"
                value={externalAppSessionForm.systemPassword}
                onChange={onChange}
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

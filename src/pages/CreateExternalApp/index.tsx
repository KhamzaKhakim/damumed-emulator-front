import { ChangeEvent, FormEvent, useState } from "react";
import { ExternalApp, updateExternalApp } from "../../api/externalApps";
import { faFloppyDisk, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useMutation, useQueryClient } from "react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UpdateField from "../../components/UpdateField";
import classes from "./styles.module.css";
import { useNavigate } from "react-router-dom";

export const CreateExternalApp = () => {
  const navigate = useNavigate();

  const [externalAppForm, setExternalAppForm] = useState<ExternalApp>({
    systemUsername: "",
    systemPassword: "",
  });

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    setExternalAppForm((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  }

  function navigateToExternalApps() {
    navigate("/external-apps");
  }

  const queryClient = useQueryClient();

  const createPostMutation = useMutation({
    mutationFn: updateExternalApp,
    onSuccess: () => {
      queryClient
        .invalidateQueries(["external_apps"], { exact: true })
        .catch((err) => console.error(err));
      navigate("/external-apps");
    },
  });

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    createPostMutation.mutate(externalAppForm);
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
                  externalAppForm.systemUsername === "" ||
                  externalAppForm.systemPassword === ""
                }
              >
                <FontAwesomeIcon icon={faFloppyDisk} size="xl" />
              </button>
              <button
                onClick={navigateToExternalApps}
                className={classes.buttonIcon}
              >
                <FontAwesomeIcon icon={faXmark} size="xl" />
              </button>
            </div>
            <div className={classes.fields}>
              <UpdateField
                name="systemUsername"
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
      </div>
    </>
  );
};

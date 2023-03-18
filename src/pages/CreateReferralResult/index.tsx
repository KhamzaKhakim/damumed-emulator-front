import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FileResult, ReferralResult, updateReferralResult } from "../../api/referralResults";
import { faFloppyDisk, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useMutation, useQueryClient } from "react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UpdateField from "../../components/UpdateField";
import classes from "./styles.module.css"
import { useNavigate } from "react-router-dom";


export const CreateReferralResult = () => {

    const navigate = useNavigate();

    const [files, setFiles] = useState<Array<FileResult>>([]);

    useEffect(function() {
      setRefferralResultForm(prev => (
        {
          ...prev,
          fileResults: files,
        }
      ))
    }, [files])

    const [referralResultForm, setRefferralResultForm] = useState<ReferralResult>({
      id: 0,
      execDate: "",
      execPostID: 0,
      execText: "",
      fileResults: [],
    });
    
    function handleChange(e: ChangeEvent<HTMLInputElement>){
      setRefferralResultForm(prev => {
        return {
          ...prev,
          [e.target.name]: e.target.value
        }
      })
    }

    const handleAttachmentIdChange = (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
      const newArr = [...files];
      newArr[index].attachmentTypeID = Number(e.target.value);
    
      setFiles(newArr);
    }

  function readFile(file: File) {
    return new Promise<ArrayBuffer>((resolve, reject) => {
      const reader = new FileReader()
      reader.addEventListener("loadend", e => resolve(e.target?.result))
      reader.addEventListener("error", reject)
      reader.readAsArrayBuffer(file)
    })
  }
  
  function arrayBufferToBase64( buffer: ArrayBuffer ) {
    let binary = '';
    const bytes = new Uint8Array( buffer );
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );

  }
  
  const uploadFile = async (event: ChangeEvent<HTMLInputElement>) => {
      if (!event.target.files) return;
      for(let i = 0; i < event.target.files.length; i++){
        
        const file = event.target.files[i];
        const base64String = arrayBufferToBase64(await readFile(file));
        
        setFiles(prev => (
          [...prev,
          {
            fileName: file.name,
            mimeType: file.type,
            attachmentTypeID: 0,
            fileContent: base64String,
          }]
        ))
      }
  };
  
  
  function handleFileChange(e: ChangeEvent<HTMLInputElement>){
      uploadFile(e);
  }

    function navigateToReferralResults(){
        navigate("/referral-results")
    }
    
    
    const queryClient = useQueryClient()

    const createReferralResultMutation = useMutation({
        mutationFn: updateReferralResult,
        onSuccess: () => {
          queryClient.invalidateQueries(["referralsResults"], { exact: true })
          navigate("/referrals")
        },
      })

      function handleCreate(e: FormEvent<HTMLFormElement>){
        e.preventDefault()
        createReferralResultMutation.mutate(referralResultForm)
      }
      return (
        <>
        <div className={classes.colFlex}>
        <form onSubmit={handleCreate}>
          <div className={classes.container}> 
            <div className={classes.buttonContainer}>
            <button type="submit" className={classes.buttonIcon} disabled={referralResultForm.id === 0}><FontAwesomeIcon icon={faFloppyDisk} size="xl"/></button>
            <button onClick={navigateToReferralResults} className={classes.buttonIcon}><FontAwesomeIcon icon={faXmark} size="xl"/></button>
            </div>   
            <div className={classes.fields}>
              <UpdateField name="id" value={referralResultForm.id} type="number"  handleChange={handleChange}/>
              <UpdateField name="execDate" value={referralResultForm.execDate} type="datetime-local" handleChange={handleChange}/>
              <UpdateField name="execPostID" value={referralResultForm.execPostID} type="number" handleChange={handleChange}/>
              <UpdateField name="execText" value={referralResultForm.execText} handleChange={handleChange}/>
            </div>
            <div className={classes.fields}>
              <UpdateField name="files" value={referralResultForm.execText} type="file" handleChange={handleFileChange}/>
              <hr/>
              <p>attacmentTypeID: </p>
              {files.map((file, index) => (
                <UpdateField key={file.fileName} name={file.fileName} value={files[index].attachmentTypeID} type="number" handleChange={handleAttachmentIdChange(index)}/> 
              ))}
            </div>
        </div>
        </form>
        </div>
        </>
      )
  };  
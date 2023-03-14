export type FileResult = {
  fileName: string;
  attachmentTypeID: number;
  mimeType: string;
  fileContent: any;

}

export type ReferralResult = {
    id: number;
    execDate: string;
    execPostID: number;
    execText: string;
    fileResults: Array<FileResult>
}

export async function getAllReferralResults(): Promise<ReferralResult[]> {
    const response = await fetch("http://localhost:8080/db/referral_result");
  
    if (!response.ok) {
      throw new Error("Something went wrong.");
    }
    
    return response.json();
  }

  export async function deleteReferralResult(id: number) {
    const response = await fetch(`http://localhost:8080/db/referral_result/${id}`, {
      method: "DELETE",
    });
  
    if (!response.ok) {
      throw new Error("Something went wrong.");
    } 
  }


  export async function updateReferralResult(referral_result: ReferralResult) {
    referral_result.execDate = referral_result.execDate+"+06:00"
    
    //TODO: split string after comma
    for(let i = 0; i < referral_result.fileResults.length; i++) {
      console.log(typeof referral_result.fileResults[i].fileContent)
    }


    const response = await fetch(`http://localhost:8080/db/referral_result`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(referral_result),
    });
  
    if (!response.ok) {
      throw new Error("Something went wrong.");
    } 
  }


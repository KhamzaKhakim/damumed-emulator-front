export type FileResult = {
  fileName: string;
  attachmentTypeID: number;
  mimeType: string;
  fileContent: string;
};

export type ReferralResult = {
  id: number;
  execDate: string;
  execPostID: number;
  execText: string;
  fileResults: Array<FileResult>;
};

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export async function getAllReferralResults(): Promise<ReferralResult[]> {
  const response = await fetch(`${backendUrl}/db/referral_result`);

  if (!response.ok) {
    throw new Error("Something went wrong.");
  }

  return response.json() as Promise<ReferralResult[]>;
}

export async function deleteReferralResult(id: number) {
  const response = await fetch(`${backendUrl}/db/referral_result/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Something went wrong.");
  }
}

export async function updateReferralResult(referral_result: ReferralResult) {
  if (referral_result.execDate) {
    referral_result.execDate = referral_result.execDate + "+06:00";
  }

  const response = await fetch(`${backendUrl}/db/referral_result`, {
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

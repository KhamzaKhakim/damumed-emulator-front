export type Referral = {
  id: number;
  personIIN: string;
  personLastName: string;
  personFirstName: string;
  personSecondName: string;
  personBirthDate: string;
  sexID: number;
  sexName: string;
  referralDate: string;
  serviceCode: string;
  serviceName: string;
  senderMoID: number;
  senderMoName: string;
  receiverMoID: number;
  receiverMoName: string;
  senderFpID: number;
  senderFpName: string;
  receiverFpID: number;
  receiverFpName: string;
  senderDocPostID: number;
  senderDocPostFIO: string;
  execDate: string;
  execPostID: number;
  execPostFIO: string;
  execFpID: number;
  execFpName: string;
  execMoID: number;
  execMoName: string;
  serviceCount: number;
};

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export async function getAllReferrals(): Promise<Referral[]> {
  const response = await fetch(`${backendUrl}/db/referral`);

  if (!response.ok) {
    throw new Error("Something went wrong.");
  }

  return response.json() as Promise<Referral[]>;
}

export async function deleteReferral(id: number) {
  const response = await fetch(`${backendUrl}/db/referral/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Something went wrong.");
  }
}

export async function updateReferral(referral: Referral) {
  const response = await fetch(`${backendUrl}/db/referral`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(referral),
  });

  if (!response.ok) {
    throw new Error("Something went wrong.");
  }
}

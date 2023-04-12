export type Appointment = {
    provisionalAppointmentRecordID: number;
    gridScheduleRecordID: number;
    personIIN: string;
    personFullName: string;
    moName: string;
    serviceName: string;
    doctorFullName: string;
    postName: string;
    cabinet: string;
    receptionDate: string;
    treatmentReasonName: string;
    treatmentReasonPublicCode: string;
    assistancePlacePublicCode: string;
    servicePublicCode: string;
    assistanceMethod: string;
    problem: string;
    isPerformed: string;
    isCancelReception: string;
    isRemotely: string;
    value: number;
    // questions: Array<string>;
    note: string;
}

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export async function getAllAppointments(): Promise<Appointment[]> {
    const response = await fetch(`${backendUrl}/db/appointment`);
  
    if (!response.ok) {
      throw new Error("Something went wrong.");
    }
    
    const appointments: Appointment[] = response.json() as Appointment[];

    return appointments;
  }

  export async function deleteAppointment(id: number) {
    const response = await fetch(`${backendUrl}/db/appointment/${id}`, {
      method: "DELETE",
    });
  
    if (!response.ok) {
      throw new Error("Something went wrong.");
    } 
  }


  export async function updateAppointment(appointment: Appointment) {
    const response = await fetch(`${backendUrl}/db/appointment`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(appointment),
    });
  
    if (!response.ok) {
      throw new Error("Something went wrong.");
    } 
  }


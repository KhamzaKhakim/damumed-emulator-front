export type ExternalApp = {
    systemUsername: string;
    systemPassword: string;
}

export type ExternalAppSession = {
  token: string;
  externalAppSystemUsername: string;
  validUntil: string;
}

export async function getAllExternalApps(): Promise<ExternalApp[]> {
    const response = await fetch("http://localhost:8080/db/external_app");
  
    if (!response.ok) {
      throw new Error("Something went wrong.");
    }
    
    return response.json();
  }

  export async function deleteExternalApp(username: string) {
    const response = await fetch(`http://localhost:8080/db/external_app/${username}`, {
      method: "DELETE",
    });
  
    if (!response.ok) {
      throw new Error("Something went wrong.");
    } 
  }


  export async function updateExternalApp(externalApp: ExternalApp) {
    const response = await fetch(`http://localhost:8080/db/external_app`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(externalApp),
    });
  
    if (!response.ok) {
      throw new Error("Something went wrong.");
    } 
  }

  export async function createSession(externalApp: ExternalApp) {
    const response = await fetch(`http://localhost:8080/Authentication/SignInExternalApp`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(externalApp),
    });
  
    if (!response.ok) {
      alert("Incorrect Data")
      throw new Error("Something went wrong.");
    } 
  }

  export async function getAllExternalAppSessions(): Promise<ExternalAppSession[]> {
    const response = await fetch("http://localhost:8080/db/external_app_session");
  
    if (!response.ok) {
      throw new Error("Something went wrong.");
    }
    
    return response.json();
  }

  export async function deleteExternalAppSession(token: string) {
    const response = await fetch(`http://localhost:8080/db/external_app_session/${token}`, {
      method: "DELETE",
    });
  
    if (!response.ok) {
      throw new Error("Something went wrong.");
    } 
  }

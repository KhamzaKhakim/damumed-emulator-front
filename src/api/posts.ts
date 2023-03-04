export type Post = {
    orgHealthCareID: string;
    funcStructureID: string;
    funcStructureName: string;
    postID: string;
    postMasterDataID: number;
    postFIO: string;
    postShortFIO: string;
    postIIN: string;
    postBirthDate: string;
    personSexName: string;
    stavka: number;
    personalTypeID: number;
    personalTypeName: string;
    categoryPostID: number;
    categoryPostName: string;
    priznPostID: number;
    priznPostName: string;
    hPostID: number;
    hPostName: string;
}

export async function getAllPosts(): Promise<Post[]> {
    const response = await fetch("http://localhost:8080/db/post");
  
    if (!response.ok) {
      throw new Error("Something went wrong.");
    }
    
    return response.json();
  }

  export async function deletePost(iin: string) {
    const response = await fetch(`http://localhost:8080/db/post/${iin}`, {
      method: "DELETE",
    });
  
    if (!response.ok) {
      throw new Error("Something went wrong.");
    } 
  }


  export async function updatePost(post: Post) {
    const response = await fetch(`http://localhost:8080/db/post`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(post),
    });
  
    if (!response.ok) {
      throw new Error("Something went wrong.");
    } 
  }


export async function getAllPosts() {
    const response = await fetch("http://localhost:8080/db/post");
  
    if (!response.ok) {
      throw new Error("Something went wrong.");
    }
    
    return response.json();
  }

  export async function deletePost(iin) {
    const response = await fetch(`http://localhost:8080/db/post/${iin}`, {
      method: "DELETE",
    });
  
    if (!response.ok) {
      throw new Error("Something went wrong.");
    }
  }

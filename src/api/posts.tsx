export function getPost<T>(): Promise<T> {
  return fetch("http://localhost:8080/db/post")
  .then((res) => res.json())
}

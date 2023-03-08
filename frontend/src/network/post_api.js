async function fetchData(input, init) {
  const response = await fetch(input, init);
  if (response.ok) {
    return response;
  } else {
    const errorBody = await response.json();
    const errorMessage = errorBody.error;
    if (response.status === 401) {
      //throw new UnauthorizedError(errorMessage);
    } else if (response.status === 409) {
      //throw new ConflictError(errorMessage);
    } else {
      throw Error(
        "Request failed with status: " +
          response.status +
          " message: " +
          errorMessage
      );
    }
  }
}

export async function fetchPost() {
  const response = await fetchData("/post", { method: "GET" });
  return response.json();
}

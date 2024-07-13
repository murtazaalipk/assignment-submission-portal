export async function fetchUserByEmail(email) {
  const response = await fetch(
    `/api/getUser?email=${encodeURIComponent(email)}`,
    {
      method: "GET",
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch user");
  }

  const user = await response.json();
  return user;
}

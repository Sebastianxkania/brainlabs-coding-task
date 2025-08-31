import axios from "axios";

export const getCsrfToken = async () => {
  // Ensure credentials (cookies) are included
  await axios.get("http://localhost:8000/api/csrf/", {
    withCredentials: true,
  });

  // At this point, the 'csrftoken' cookie is set by Django in the browser

  // return true for tanstack query to consider it as a successful fetch
  return true
};
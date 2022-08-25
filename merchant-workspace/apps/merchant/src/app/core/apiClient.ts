import axios from "axios";

export const apiClient = axios.create({
  baseURL: "/",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json"
    //'Authorization': 'token <your-token-here> -- https://docs.GitHub.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token'
  }
  // TODO add necessary data
  // TODO move to separate file
});

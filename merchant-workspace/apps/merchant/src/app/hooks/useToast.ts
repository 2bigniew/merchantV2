import {toast} from "react-toastify";
import {handleError} from "../helpers/errorHelper";

type ActionTypes = {
  showMessage: (message: string) => void
  showSuccess: (message: string) => void
  showError: (error: unknown) => void
}

export const useToast = (): ActionTypes => {
  const showMessage = (message: string) => toast(message, {type: "info"})
  const showSuccess = (message: string) => toast(message, {type: "success"})
  const showError = (error: unknown) => toast(handleError(error), {type: "error"})

  return { showMessage, showSuccess ,showError }
}

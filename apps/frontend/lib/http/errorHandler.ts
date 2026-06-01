import { isAxiosError } from "axios";

export const errorHandler = (error: unknown) => {
    let errorMessage = "Something went wrong. Please try again.";

    if (isAxiosError(error)) {
        const errorData = error.response?.data;

        if (errorData?.errors && Array.isArray(errorData.errors) && errorData.errors.length > 0) {
            errorMessage = errorData.errors[0].msg;
        } else if (errorData?.detail) {
            errorMessage = errorData.detail;
        } else if (errorData?.message) {
            errorMessage = errorData.message;
        }
    } else if (error instanceof Error) {
        // Handle native fetch error
        const errorData = (error as { response?: { data?: { errors?: { msg: string }[], detail?: string, message?: string } } }).response?.data;
        if (errorData) {
            if (errorData.errors && Array.isArray(errorData.errors) && errorData.errors.length > 0) {
                errorMessage = errorData.errors[0].msg;
            } else if (errorData.detail) {
                errorMessage = errorData.detail;
            } else if (errorData.message) {
                errorMessage = errorData.message;
            }
        } else {
            errorMessage = error.message;
        }
    }

    return errorMessage;
};
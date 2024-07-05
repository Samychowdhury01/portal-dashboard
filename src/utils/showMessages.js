import Swal from "sweetalert2";

export const showSuccessMessage = (message) => {
    Swal.fire({
      title: "Good job!",
      text: message,
      icon: "success",
    });
  };


  export  const showErrorMessage = (message) => {
    Swal.fire({
      title: "Oops!",
      text: message,
      icon: "error",
    });
  };
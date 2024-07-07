import Swal from "sweetalert2";
import axiosInstance from "./axiosInstance";

const handleDelete = (id, path, setData) => {
    console.log(path);
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const response = await axiosInstance.delete(`/${path}/${id}`);
        if (response.data?.success) {
          Swal.fire({
            title: "Deleted!",
            text: "Your item has been deleted.",
            icon: "success",
          });

          // Update state to remove the deleted item
          setData((prevData) => prevData.filter((data) => data.id !== id));
        } else {
          Swal.fire({
            title: "Error!",
            text: response.data?.message || "There was an error deleting the item.",
            icon: "error",
          });
        }
      } catch (error) {
        console.error("Error deleting item:", error);
        Swal.fire({
          title: "Error!",
          text: "There was an error deleting the item.",
          icon: "error",
        });
      }
    }
  });
};

export default handleDelete;

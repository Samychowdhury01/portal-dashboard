import { LuPencilLine } from "react-icons/lu";

const ComposeMessage = () => {
  return (
    <>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="flex items-center gap-2 text-lg p-2 bg-[#a7d0ee] rounded-md"
        onClick={() => document.getElementById("my_modal_3").showModal()}
      >
        <p className="flex items-center gap-2 text-lg p-2 bg-[#a7d0ee] rounded-md">
    <LuPencilLine />
    Compose
    </p>
      </button>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">Press ESC key or click on ✕ button to close</p>
        </div>
      </dialog>
    </>
  );
};

export default ComposeMessage;

import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

const SideForm = () => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: "username", // Unique identifier for draggable element
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: "transform ease-in-out, width 0.5s ease-in-out",
    touchAction: "none",
    zIndex: isDragging ? 100 : 0,
    opacity: isDragging ? 0.8 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-3 border-2 border-primary transition-all ease-in-out duration-300 rounded-lg shadow-lg"
    >
      <label className={`label-text `}>Username</label>
      <input
        onClick={(e) => e.preventDefault()}
        className="input input-bordered"
        type="text"
        placeholder="Username"
        id="username"
        name="username"
        disabled
      />
    </div>
  );
};

export default SideForm;

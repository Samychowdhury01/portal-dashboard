import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from "react";

const TestComponent = ({ id }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id,
  });
  // styling for drag and drop
  const style = {
    transform: CSS.Transform.toString(transform),
    transition: "transform ease-in-out, width 0.5s ease-in-out", // Ensure width is also transitioned
    touchAction: "none",
    zIndex: isDragging ? 100 : 0,
    opacity: isDragging ? 0.8 : 1,
  };
  return (
    <div className="border-2 border-red-200 p-5 m-2">
      <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
        ::
      </div>
      <p>Hello moveable</p>
    </div>
  );
};

export default TestComponent;

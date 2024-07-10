import { useState } from "react";
import WidgetItem from "./WidgetItem";
const Widget = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      username: "samy",
      jobTitle: "dev",
      email: "dev@gmail.com",
      department: "design",
    },
    {
      id: 2,
      username: "samy2",
      jobTitle: "dev2",
      email: "dev2@gmail.com",
      department: "developer",
    },
    {
      id: 3,
      username: "samy3",
      jobTitle: "dev3",
      email: "dev3@gmail.com",
      department: "design",
    },
    {
      id: 4,
      username: "samy4",
      jobTitle: "dev",
      email: "dev4@gmail.com",
      department: "design",
    },
    {
      id: 5,
      username: "samy5",
      jobTitle: "dev",
      email: "dev5@gmail.com",
      department: "developer",
    },
  ]);

  return (
    <div>
      <h1>Widgets</h1>

      <WidgetItem items={items} setItems={setItems} />
    </div>
  );
};

export default Widget;

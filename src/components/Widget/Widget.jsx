// import { useState } from "react";
// import WidgetItems from "./WidgetItems";

// const Widget = () => {
//   const [items, setItems] = useState([
//     {
//       id: 1,
//       username: "samy",
//       jobTitle: "dev",
//       email: "dev@gmail.com",
//       department: "design",
//     },
//     {
//       id: 2,
//       username: "samy2",
//       jobTitle: "dev2",
//       email: "dev2@gmail.com",
//       department: "developer",
//     },
//     {
//       id: 3,
//       username: "samy3",
//       jobTitle: "dev3",
//       email: "dev3@gmail.com",
//       department: "design",
//     },
//     {
//       id: 4,
//       username: "samy4",
//       jobTitle: "dev",
//       email: "dev4@gmail.com",
//       department: "design",
//     },
//     {
//       id: 5,
//       username: "samy5",
//       jobTitle: "dev",
//       email: "dev5@gmail.com",
//       department: "developer",
//     },
//   ]);

//   return (
//     <div>
//       <h1>Widgets</h1>

//       <WidgetItems items={items} setItems={setItems} />
//     </div>
//   );
// };

// export default Widget;

import { useContext } from "react";
import { DataContext } from "../../provider/DataProvider";
import WidgetItems from "./WidgetItems";
import Loader from "../ui/shared/Loader";

const Widget = () => {
  const { setDropItems, dropItems, isDropItemsLoading } =
    useContext(DataContext);

  return (
    <div>
      <h1>Widgets</h1>
      {isDropItemsLoading ? (
        <Loader />
      ) : (
        <WidgetItems items={dropItems} setItems={setDropItems} isItemsLoading={isDropItemsLoading}/>
      )}
    </div>
  );
};

export default Widget;

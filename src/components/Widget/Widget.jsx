
// import { useContext } from "react";
// import { DataContext } from "../../provider/DataProvider";
// import WidgetItems from "./WidgetItems";
// import Loader from "../ui/shared/Loader";

// const Widget = () => {
//   const { setDropItems, dropItems, isDropItemsLoading } =
//     useContext(DataContext);
//   console.log(dropItems,'from widget page');
//   return (
//     <div>
//       <h1>Widgets</h1>
//       {isDropItemsLoading ? (
//         <Loader />
//       ) : (
//         <WidgetItems
//           items={dropItems}
//           setItems={setDropItems}
//           isItemsLoading={isDropItemsLoading}
//         />
//       )}
//     </div>
//   );
// };

// export default Widget;

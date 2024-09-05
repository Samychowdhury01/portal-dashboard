import { useContext } from "react";
import { DataContext } from "../../provider/DataProvider";
import Loader from "../../components/ui/shared/Loader";
import WidgetItems from "../../components/Widget/WidgetItems";

const DropItem = () => {
  const { setDropItems, dropItems, isDropItemsLoading } =
    useContext(DataContext);
  return (
    <div>
      <h1>Widgets</h1>
      {isDropItemsLoading ? (
        <Loader />
      ) : (
        <WidgetItems
          items={dropItems}
          setItems={setDropItems}
          isItemsLoading={isDropItemsLoading}
          
        />
      )}
    </div>
  );
};

export default DropItem;

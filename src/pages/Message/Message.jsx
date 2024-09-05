import Inbox from "../../components/message/Inbox";
import Menu from "../../components/message/Menu";
import ComposeMessage from "../../components/message/ComposeMessage";

const Message = () => {
  return (
   <>
   {/* for compose message */}
   <div className="w-full flex justify-end">
    <ComposeMessage/>
   </div>
    <div className="flex items-center gap-10">
      {/* side tab */}
      <div>

    <Menu/>
      </div>
      {/* body */}
      <div className="w-full">
        {/* conditionally render the body */}
        <Inbox/>
      </div>
    </div>
   </>
  );
};

export default Message;

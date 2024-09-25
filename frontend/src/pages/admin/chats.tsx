import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  createMessage,
  getAllChat,
  getAllMessages,
} from "@/redux/actions/chat.action";
import { setMessageLocally } from "@/redux/reducers/chat.reducer";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { IMessage } from "@/types/chat.types";
import { Button } from "@material-tailwind/react";
import { Search, Send, User, Verified } from "lucide-react";
import { useEffect, useState } from "react";

import { useLocation } from "react-router-dom";
import { v4 as uuid } from "uuid";
export const ChatSection = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const { socket, onlineUsers } = useAppSelector((state) => state.socket);
  const { chats, selectedChatId, messages, selectedUserId } = useAppSelector(
    (state) => state.chat
  );
  useEffect(() => {
    if (user?._id) {
      dispatch(getAllChat(user?._id as string));
    }
  }, [dispatch, user?._id]);
  const { pathname } = useLocation();
  useEffect(() => {
    if (selectedChatId) {
      dispatch(getAllMessages(selectedChatId));
    }
  }, [selectedChatId, dispatch]);
  const [message, setMessage] = useState<string>("");
  const handleSendMessage = () => {
    if (message.trim()) {
      const sendObj = {
        chatId: selectedChatId as string,
        content: {
          content: message,
          type: "text",
          isReply: false,
        },
        senderId: user?._id as string,
        receiverId: "".trim() + selectedUserId?.trim(),
        status: "unread",
      };
      socket?.emit("send-message", {
        ...sendObj,
        _id: uuid(),
        createdAt: new Date(),
      });
      dispatch(
        setMessageLocally({ ...sendObj, _id: uuid(), createdAt: new Date() })
      );
      dispatch(createMessage(sendObj as IMessage));
    }
    setMessage("");
  };
  return (
    <main
      className={`w-full ${
        pathname == "/messages" ? "h-screen" : "h-full"
      } flex lg:flex-row flex-col border-t`}
    >
      <aside className="lg:w-80 py-2 px-2 w-full  lg:h-full border-r flex flex-col">
        <div className="w-full border-b pb-4">
          <div className="flex h-10 w-full gap-2">
            <Input className="h-full flex-1" placeholder="Search..." />
            <Button
              className="text-[11px] px-3 border bg-transparent text-black flex-center"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <Search className="w-4" />
            </Button>
          </div>
        </div>
        <div className="w-full h-[570px] overflow-y-auto py-5  ">
          {chats?.map((cht) => (
            <div
              className="w-full h-12 py-1 bg-blue-gray-50/50 flex px-2 items-center border-b"
              key={cht?._id}
            >
              <div className="size-10 bg-gray-200 flex-center  rounded-full overflow-hidden">
                <User className="w-5" />
              </div>
              <div className="flex-1 px-2 line-clamp-1 py-1 h-full flex flex-col justify-between">
                <span className="text-sm flex gap-2 items-center">
                  {cht?.username}{" "}
                  {cht?.username == "Admin" && (
                    <>
                      <Verified className="w-4 text-colors-forground" />
                    </>
                  )}
                </span>
              </div>
            </div>
          ))}
        </div>
      </aside>
      <section className="flex-1 overflow-hidden  h-full flex flex-col">
        <div className="w-full h-16  border-b px-2 flex items-center">
          <div className="size-12 border rounded-full flex-center bg-gray-200">
            {" "}
            <User className="w-5 text-gray-600" />
          </div>
          <div className="flex-1 py-2 flex-col h-full px-2 justify-between">
            <h3 className="font-semibold">Mohamed Aflah</h3>
            <div className="text-sm flex gap-1 items-center">
              {onlineUsers?.some((usr) => usr.id == user?._id) ? (
                <>
                  <div className="size-[6px] rounded-full bg-green-500"></div>
                  <span>Online</span>
                </>
              ) : (
                <>
                  <div className="size-[6px] rounded-full bg-red-500"></div>
                  <span>Offline</span>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="h-full w-full overflow-y-auto p-2 space-y-1">
          {messages && messages?.length <= 0 && (
            <>
              <div className="w-full flex flex-center h-12">
                <span>No message sended yet</span>
              </div>
            </>
          )}

          {messages?.map((msg) => (
            <div
              key={String(msg?._id)}
              className={cn("w-full h-10 flex justify-start", {
                "justify-end": msg.senderId == user?._id,
              })}
            >
              <div
                className={cn(
                  "h-10 md:max-w-[50%] max-w-[80%] px-2 py-1 rounded-lg rounded-tl-none text-sm border",
                  {
                    "bg-colors-forground text-white": msg.senderId == user?._id,
                  }
                )}
              >
                {msg.content.content}
              </div>
            </div>
          ))}
        </div>
        <div className="w-full h-28 border-t flex p-2 ">
          <div className="w-full h-10  rounded-md flex gap-2">
            <input
              onChange={(e) => {
                setMessage(e.target.value.trim());
              }}
              value={message}
              type="text"
              className="h-full border rounded-md px-2 text-sm flex-1 "
              placeholder="Type message here.."
            />
            <Button
              onClick={handleSendMessage}
              className="px-3 flex-center bg-colors-forground"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <Send className="w-4" />
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

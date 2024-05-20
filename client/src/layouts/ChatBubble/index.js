// Import thêm useState để theo dõi trạng thái của liên kết được nhấp
import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane, faLink } from "@fortawesome/free-solid-svg-icons";
import Draggable from "react-draggable";
import styles from "./ChatBubble.module.scss";
import { formatRelative } from "date-fns";
import { enUS } from "date-fns/locale";

const cs = classNames.bind(styles);

const socket = io("http://localhost:8000");
const ChatBubble = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [hasNewMessages, setHasNewMessages] = useState(false);
  const chatBodyRef = useRef(null);

  useEffect(() => {
    socket.on("message", (data) => {
      setMessages((preMessages) => [...preMessages, data]);
      setHasNewMessages(true);
      if (chatBodyRef.current) {
        chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
      }
    });

    return () => {
      socket.off("message");
    };
  }, [messages]);

  const sendMessage = () => {
    if (message.trim()) {
      const user = JSON.parse(localStorage.getItem("user"));
      const newMessage = {
        content: message,
        sender: `${user.firstName} ${user.lastName}`,
        timeSent: Math.floor(Date.now() / 1000),
      };

      socket.emit("message", newMessage);
      setMessage("");
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setHasNewMessages(false);
    }
  };

  const getAndSetCurrentURL = () => {
    const currentURL = window.location.href;
    setMessage(currentURL);
  };

  // Hàm để render tin nhắn, chứa logic để hiển thị liên kết như một phần tử <a>
  const renderMessageContent = (content) => {
    // Kiểm tra nếu nội dung có chứa "http://" hoặc "https://" để nhận diện là một liên kết
    if (content.includes("http://") || content.includes("https://")) {
      return (
        <a href={content} target="_blank" rel="noopener noreferrer">
          {content}
        </a>
      );
    }
    // Trường hợp khác, hiển thị nội dung bình thường
    return content;
  };

  function formatDate(seconds) {
    let formattedDate = "";

    if (seconds) {
      const date = new Date(seconds * 1000);
      const currentDate = new Date();

      formattedDate = formatRelative(date, currentDate, { locale: enUS });
      formattedDate = `${formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)} `;
    }

    return formattedDate;
  }

  return (
    <Draggable>
      <div className={cs("chat-bubble")}>
        {" "}
        {isOpen ? (
          <div className={cs("chat-container")}>
            <div className={cs("chat-header")}>
              <strong>Chat</strong>
              <button className={cs("closeBtn")} onClick={toggleChat}>
                X
              </button>{" "}
            </div>
            <div className={cs("chat-body")} ref={chatBodyRef}>
              {messages.map((msg, index) => (
                <div key={index} className={cs("message")}>
                  <div className={cs("sender")}>{msg.sender}</div>{" "}
                  <div className={cs("content")}>
                    {renderMessageContent(msg.content)}
                  </div>
                  <div className={cs("timesent")}>
                    {formatDate(msg.timeSent)}
                  </div>
                </div>
              ))}
            </div>
            <div className={cs("chat-footer")}>
              <input
                type="text"
                value={message}
                className={cs("inputText")}
                placeholder="Nhập tin nhắn..."
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") sendMessage();
                }}
              />
              <button className={cs("sent-icon")} onClick={sendMessage}>
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
              <button className={cs("sent-icon")} onClick={getAndSetCurrentURL}>
                <FontAwesomeIcon icon={faLink} />
              </button>
            </div>
          </div>
        ) : (
          <div className={cs("chat-icon")} onClick={toggleChat}>
            <FontAwesomeIcon icon={faComments} />
            {hasNewMessages && <div className={cs("notification-dot")}></div>}
          </div>
        )}
      </div>
    </Draggable>
  );
};

export default ChatBubble;

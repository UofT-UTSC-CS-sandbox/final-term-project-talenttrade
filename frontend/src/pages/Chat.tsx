import { useState, useEffect } from "react";
import host from "../utils/links";
import useRequest from "../utils/requestHandler";
import axios from "axios";
import { Button, TextField } from "@mui/material";
import { useParams } from "react-router-dom";


import "./Chat.css";

interface message {
  map(arg0: (msg: any) => import("react/jsx-runtime").JSX.Element): import("react").ReactNode;
  id: number
  user: number
  sender: number
  reciever: number
  message: string
  sender_profile: object
  reciever_profile: object
  date: string
}

export default function Chat() {
  const [userId, setUserId] = useState(-1);
  const [messages, setMessages] = useState<message | null>(null)
  const [message, setMessage] = useState("");

  const apiFetch = useRequest();

  const { otherUser } = useParams<{otherUser: string}>()

  useEffect(() => {
    getAndSetUser();
  }, [])

  const getAndSetUser = async () => {
    const response = await apiFetch("accounts/get-current-user-id", {
      method: "GET",
    });
    setUserId(response.user_id);
  };

  useEffect(() => {
    let interval = setInterval(() => {
      try {
        axios
          .get(`${host}/chat/messages/${userId}/${otherUser}/`)
          .then((res) => {
            if (res.data.length != 0)
              setMessages(res.data)
          })
      } catch (error) {
        console.log(error);
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const sendMessage = async () => {
    const msg = {
      user: userId,
      sender: userId,
      reciever: otherUser,
      message: message,
      is_read: false,
    }
    axios.post(`${host}/chat/send/`, msg)
  }

  const handleSend = () => {
    if (message.trim() == "")
      return
    sendMessage();
    setMessage("")
  }

  return (
    <div className="chat_container">
      {messages ? (messages.map((msg) =>   
        <div className="message_container" key={msg.id}>
          {msg.sender == userId ? 
          (
            <div className="right" key={msg.id}>
              <div className="text">{msg.message}</div>
              <img
                src="/Default_pfp.png"
                alt="Profile"
                className="profileIcon"
              />
            </div>
          )
          :
          (
            <div className="left" key={msg.id}>
              <img
                src="/Default_pfp.png"
                alt="Profile"
                className="profileIcon"
              />
              <div className="text">{msg.message}</div>
            </div>
          )
          }
        </div>
      ))
      :
      (
        <div>Send a message to start a conversation</div>
      )}

      <div className="input">
        <TextField 
          id="outlined-basic" 
          placeholder="Click to enter message"
          variant="outlined" 
          multiline 
          sx={{width: '80%'}}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value)
          }}
          />
        <Button variant="contained" sx={{height: 55, width: '20%'}} onClick={handleSend}>Send</Button>
      </div>
    </div>
  )
}
import { useState, useEffect } from "react";
import host from "../utils/links";
import useRequest from "../utils/requestHandler";
import axios from "axios";
import { Avatar, Button, TextField } from "@mui/material";
import { useParams } from "react-router-dom";


import "./Chat.css";
import { stringToColor } from "../components/topbar";

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
              setMessages(res.data.reverse())
          })
      } catch (error) {
        console.log(error);
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [userId]);

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
      <div className="message_container">
        {messages ? (messages.map((msg) =>   
          <div className="message" key={msg.id}>
            {msg.sender == userId ? 
            (
              <div className="right" key={msg.id}>
                <div className="text">{msg.message}</div>
                <Avatar
                    alt={msg.sender_profile?.full_name}
                    src={`${msg.sender_profile?.profile_picture}`}
                    sx={{
                      backgroundColor: stringToColor(msg.sender_profile?.full_name || ""),
                      fontSize: "1rem",
                    }}
                  >
                    {msg.sender_profile?.full_name.split(" ")[0][0]}
                    {msg.sender_profile?.full_name.split(" ")[1][0]}
                  </Avatar>
              </div>
            )
            :
            (
              <div className="left" key={msg.id}>
                <Avatar
                    alt={msg.sender_profile?.full_name}
                    src={`${msg.sender_profile?.profile_picture}`}
                    sx={{
                      backgroundColor: stringToColor(msg.sender_profile?.full_name || ""),
                      fontSize: "1rem",
                    }}
                  >
                    {msg.sender_profile?.full_name.split(" ")[0][0]}
                    {msg.sender_profile?.full_name.split(" ")[1][0]}
                </Avatar>
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
      </div>
      <div className="input_container">
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
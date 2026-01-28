import { useState } from "react";
export default function Home() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    const sendMessage = async () => {
    const userMessage = { role: "user", content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");

    const res = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: newMessages }),
    });
    const data = await res.json();
    const aiMessage = { role: "assistant", content: data.reply };
    setMessages([...newMessages, aiMessage]);
    };

    return (
        <div style={{ padding: "2rem"}}>
        <div style={{ marginBottom: "1rem"}}>
            {messages.map((m, i) => (
            <div key={i} style={{ margin: "5px0"}}>
                <b>{m.role === "user" ? "You:" : "AI:"}</b> {m.content}
            </div>
            ))}
        </div>
        <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
        </div>
    );
}
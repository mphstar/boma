import { useEffect, useRef, useState } from 'react';
import { useAdmin } from '../../context/AdminContext';

export function ChatPage() {
  const { chats, activeChat, selectChat, sendMessage } = useAdmin();
  const [draft, setDraft] = useState('');
  const threadRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentIndex = chats.length ? Math.min(activeChat, chats.length - 1) : 0;
  const chat = chats[currentIndex];
  const messageCount = chat?.messages.length ?? 0;

  useEffect(() => {
    const thread = threadRef.current;
    if (thread) thread.scrollTop = thread.scrollHeight;
  }, [currentIndex, messageCount]);

  if (!chat) {
    return (
      <div className="box">
        <p className="muted">Belum ada percakapan.</p>
      </div>
    );
  }

  const submit = () => {
    if (!draft.trim()) return;
    sendMessage(draft);
    setDraft('');
    inputRef.current?.focus();
  };

  return (
    <div className="box chat">
      <div className="cl">
        {chats.map((item, index) => (
          <button
            type="button"
            key={item.customer}
            className={`ci${index === currentIndex ? ' on' : ''}`}
            onClick={() => selectChat(index)}
          >
            <div className="av">{item.customer[0]}</div>
            <span className="grow">
              <b>{item.customer}</b>
              <small>{item.messages[item.messages.length - 1]?.text}</small>
            </span>
            {item.unread ? <i className="ud" /> : null}
          </button>
        ))}
      </div>

      <div className="cm">
        <div className="ms" ref={threadRef}>
          {chat.messages.map((message, index) => (
            <div key={index} className={`b ${message.from}`}>
              {message.text}
            </div>
          ))}
        </div>
        <form
          className="cf"
          onSubmit={(event) => {
            event.preventDefault();
            submit();
          }}
        >
          <input
            ref={inputRef}
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Tulis balasan…"
            aria-label="Tulis balasan"
          />
          <button type="submit" className="add">
            Kirim
          </button>
        </form>
      </div>
    </div>
  );
}

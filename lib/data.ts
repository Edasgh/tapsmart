export const data = [
  {
    title: "Send a Whatsapp Message",
    steps: [
      "Open WhatsApp",
      "Press New Chat Button",
      "Tap on a contact",
      "Type your message & Press send",
      "Message Sent!",
    ],
    images: [
      "/images/icon.jpeg",
      "/images/home.jpeg",
      "/images/chatlist.jpeg",
      "/images/typing.jpeg",
      "/images/sent.jpeg",
    ],
    getClassName: (index: number) => {
      return ` ${
        index === 0
          ? "top-[30%] right-[5%]"
          : index === 1
            ? "bottom-[20%] right-[4%]"
            : index === 2
              ? "bottom-[37.5%] left-1/2 -translate-x-1/2"
              : index === 3
                ? "bottom-[48.5%] right-[2%]"
                : "inset-0"
      }`;
    },
  },
  {
    title: "Send a Photo",
    steps: [
      "Open WhatsApp",
      "Press New Chat Button",
      "Tap on a contact",
      "Tap the Paperclip icon",
      "Tap on Gallery",
      "Tap on a photo to select it",
      "Press Send",
      "Photo Sent!",
    ],
    images: [
      "/images/icon.jpeg",
      "/images/home.jpeg",
      "/images/chatlist.jpeg",
      "/images/paperclip.jpeg",
      "/images/gallery.jpeg",
      "/images/select-photo.jpeg",
      "/images/send-photo.jpeg",
      "/images/photo-sent.jpeg",
    ],
    getClassName: (index: number) => {
      return `${
        index === 0
          ? "top-[30%] right-[5%]"
          : index === 1
            ? "bottom-[20%] right-[4%]"
            : index === 2
              ? "bottom-[37.5%] left-1/2 -translate-x-1/2"
              : index === 3
                ? "top-[20%] right-[25%]"
                : index === 4
                  ? "top-[6%] left-[3%]"
                  : index === 5
                    ? "top-[22%] left-1/2 -translate-x-1/2"
                    : index === 6
                      ? "bottom-[18%] right-[2%]"
                      : "inset-0"
      }`;
    },
  },
  {
    title: "Make a Call",
    steps: [
      "Open WhatsApp",
      "Press New Chat Button",
      "Tap on a contact",
      "Press call button",
      "Click on call",
      "Call started!",
    ],
    images: [
      "/images/icon.jpeg",
      "/images/home.jpeg",
      "/images/chatlist.jpeg",
      "/images/chat-open.jpeg",
      "/images/call-btn.jpeg",
      "/images/calling.png",
    ],
    getClassName: (index: number) => {
      return `${
        index === 0
          ? "top-[30%] right-[5%]"
          : index === 1
            ? "bottom-[20%] right-[4%]"
            : index === 2
              ? "bottom-[37.5%] left-1/2 -translate-x-1/2"
              : index === 3
                ? "top-[0%] right-[2.5%]"
                : index === 4
                  ? "bottom-[40%] right-[2%] md:right-[10%]"
                  : "inset-0"
      }`;
    },
  },
  {
    title: "Search on Google",
    steps: [
      "Open Google",
      "Tap search bar",
      "Type your query",
      "Press search",
      "View results",
    ],
    images: [
      "/images/google.jpeg",
      "/images/searchbar.jpeg",
      "/images/query.jpeg",
      "/images/search-btn.jpeg",
      "/images/results.gif",
    ],
    getClassName: (index: number) => {
      return `${
        index === 0
          ? "top-[23.5%] md:top-[10%] left-[10%] md:left-[15%]"
          : index === 1
            ? "top-[15%] left-1/2 -translate-x-1/2"
            : index === 2
              ? "top-[0%] left-1/2 -translate-x-1/2"
              : index === 3
                ? "bottom-[12%] right-[0%]"
                : "inset-0"
      }`;
    },
  },
  {
    title: "Ask AI",
    steps: [
      "Open ChatGPT",
      "Tap message box",
      "Type your question",
      "Press send",
      "See AI response",
    ],
    images: [
      "/images/chatgpt.jpeg",
      "/images/chat-input.jpeg",
      "/images/typing-ai.jpeg",
      "/images/send-ai.jpeg",
      // "/images/response.jpeg",
      "/images/response.gif",
    ],
    getClassName: (index: number) => {
      return `${
        index === 0
          ? "top-[15%] left-[5%]"
          : index === 1
            ? "bottom-[35%] md:bottom-[12%] left-1/2 -translate-x-1/2"
            : index === 2
              ? "inset-0"
              : index === 3
                ? "bottom-[35%] md:bottom-[30%] right-[3%]"
                : "inset-0"
      }`;
    },
  },
  {
    title: "Make a Video Call",
    steps: [
      "Open WhatsApp",
      "Press New Chat Button",
      "Tap on a contact",
      "Open chat",
      "Press video call button",
      "Video call started!",
    ],
    images: [
      "/images/icon.jpeg",
      "/images/home.jpeg",
      "/images/chatlist.jpeg",
      "/images/chat-open.jpeg",
      "/images/chat-open.jpeg",
      "/images/video-call.jpeg",
    ],
    getClassName: (index: number) => {
      return `${
        index === 0
          ? "top-[30%] right-[5%]"
          : index === 1
            ? "bottom-[20%] right-[4%]"
            : index === 2
              ? "bottom-[37.5%] left-1/2 -translate-x-1/2"
              : index === 3
                ? "inset-0"
                : index === 4
                  ? "top-[0%] right-[18%]"
                  : "inset-0"
      }`;
    },
  },
];

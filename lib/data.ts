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
          ? "top-23 right-5 md:top-32 md:right-1"
          : index === 1
            ? "bottom-23 md:bottom-16 right-3"
            : index === 2
              ? "bottom-52 md:bottom-30 inset-x-0"
              : index === 3
                ? "bottom-50 md:bottom-52 right-1"
                : "inset-0"
      }`;
    },
  },
  {
    title: "Send a Photo",
    steps: [
      "Open WhatsApp",
      "Tap on a contact",
      "Tap the Paperclip icon",
      "Tap on Gallery",
      "Tap on a photo to select it",
      "Press Send",
      "Photo Sent!"
    ],
    images: [
      "/images/icon.jpeg",
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
          ? "top-23 right-5 md:top-32 md:right-1"
          : index === 1
            ? "bottom-52 md:bottom-30 inset-x-0"
            : index === 2
              ? "top-20 right-15 md:right-20"
              : index === 3
                ? "top-8 left-6"
                : index === 4
                  ? "top-25 md:top-30 inset-x-0"
                  : index === 5
                    ? "bottom-15 md:bottom-10 right-0"
                    : "inset-0"
      }`;
    },
  },
  {
    title: "Make a Call",
    steps: [
      "Open WhatsApp",
      "Tap on a contact",
      "Press call button",
      "Click on call",
      "Call started!",
    ],
    images: [
      "/images/icon.jpeg",
      "/images/chatlist.jpeg",
      "/images/chat-open.jpeg",
      "/images/call-btn.jpeg",
      "/images/calling.png",
    ],
    getClassName: (index: number) => {
      return `${
        index === 0
          ? "top-23 right-5 md:top-32 md:right-1"
          : index === 1
            ? "bottom-52 md:bottom-30 inset-x-0"
            : index === 2
              ? "right-5 md:right-3 top-2"
              : index === 3
                ? "bottom-60 right-9 md:bottom-42 md:right-10"
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
          ? "top-30 md:top-10 left-11 md:left-15"
          : index === 1
            ? "top-20 md:top-17 inset-x-0"
            : index === 2
              ? "-top-4 md:top-2 inset-x-0"
              : index === 3
                ? "bottom-12 md:bottom-6 right-0"
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
      "/images/response.jpeg",
    ],
    getClassName: (index: number) => {
      return `${
        index === 0
          ? "top-20 md:top-10 left-4"
          : index === 1
            ? "bottom-15 md:bottom-5 inset-x-0"
            : index === 2
              ? "inset-0"
              : index === 3
                ? "bottom-48 right-2 md:bottom-25"
                : "inset-0"
      }`;
    },
  },
  {
    title: "Make a Video Call",
    steps: [
      "Open WhatsApp",
      "Tap on a contact",
      "Open chat",
      "Press video call button",
      "Video call started!",
    ],
    images: [
      "/images/icon.jpeg",
      "/images/chatlist.jpeg",
      "/images/chat-open.jpeg",
      "/images/chat-open.jpeg",
      "/images/video-call.jpeg",
    ],
    getClassName: (index: number) => {
      return `${
        index === 0
          ? "top-23 right-5 md:top-32 md:right-1"
          : index === 1
            ? "bottom-52 md:bottom-30 inset-x-0"
            : index === 2
              ? "inset-0"
              : index === 3
                ? "top-2 md:-top-4 right-15"
                : "inset-0"
      }`;
    },
  },
];

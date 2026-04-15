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
          ? "sm:top-15 md:top-32 right-1"
          : index === 1
            ? "bottom-16 right-3"
            : index === 2
              ? "sm:top-32 md:top-52 inset-x-0"
              : index === 3
                ? "sm:bottom-36 md:bottom-52 sm:right-3 md:right-1"
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
          ? "sm:top-15 md:top-32 right-1"
          : index === 1
            ? "top-56 inset-x-0"
            : index === 2
              ? "bottom-12 right-32"
              : index === 3
                ? "top-8 left-6"
                : index === 4
                  ? "top-30 inset-x-0" :
                  index=== 5 ? "bottom-10 right-0"
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
          ? "sm:top-15 md:top-32 right-1"
          : index === 1
            ? "top-56 inset-x-0"
            : index === 2
              ? "right-3 top-2"
              : index === 3
                ? "bottom-42 right-10"
                : "inset-0"
      }`;
    },
  },
  {
    title: "Search on Google",
    steps: [
      "Open Chrome",
      "Tap search bar",
      "Type your query",
      "Press search",
      "View results",
    ],
    images: [
      "/images/chrome.jpeg",
      "/images/searchbar.jpeg",
      "/images/typing-search.jpeg",
      "/images/search-btn.jpeg",
      "/images/results.jpeg",
    ],
    getClassName: (index: number) => {
      return `${
        index === 0
          ? "bottom-20 right-4"
          : index === 1
            ? "top-4 inset-x-0"
            : index === 2
              ? "top-4 inset-x-0"
              : index === 3
                ? "bottom-6 right-4"
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
          ? "bottom-20 right-4"
          : index === 1
            ? "bottom-4 inset-x-0"
            : index === 2
              ? "bottom-4 inset-x-0"
              : index === 3
                ? "bottom-4 right-4"
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
      "/images/video-btn.jpeg",
      "/images/video-call.jpeg",
    ],
    getClassName: (index: number) => {
      return `${
        index === 0
          ? "sm:top-15 md:top-32 right-1"
          : index === 1
            ? "top-40 inset-x-0"
            : index === 2
              ? "inset-0"
              : index === 3
                ? "top-4 right-10"
                : "inset-0"
      }`;
    },
  },
];

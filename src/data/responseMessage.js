export const responseMessage = [
  {
    type: "flex",
    altText: "This is a Flex Message",
    contents: {
      type: "bubble",
      body: {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "image",
            text: "Hello,",
          },
          {
            type: "text",
            text: "World!",
          },
        ],
      },
    },
  },
];

export const responseMessage = [
  {
    type: "flex",
    altText: "This is a Flex Message",
    contents: {
      type: "bubble",
      hero: {
        type: "image",
        url: "https://example.com/flex/images/image.jpg",
        size: "full",
        aspectRatio: "2:1"
      },
      body: {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "button",
            style: "primary",
            action: {
              type: "uri",
              label: "Go",
              uri: "https://example.com"
            }
          },
        ],
      },
    },
  },
];

export const responseMessage = [
  {
    type: "flex",
    altText: "This is a Flex Message",
    contents: {
      type: "bubble",
      header: {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "text",
            text: "#ส่งบิล"
          }
        ]
      },
      body: {
        type: "box",
        layout: "horizontal",
        contents: [
          {
            type: "text",
            text: "กรอกรายละเอียดรายงานประจำวันผ่านการกดปุ่มด้านล่างได้เลย",
            wrap: true
          }
        ]
      },
      footer: {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "button",
            style: "primary",
            action: {
              type: "uri",
              label: "กดที่นี่เพื่อส่งบิล",
              uri: "https://mana-outlet.stackblitz.io"
            }
          },
        ],
      },
    },
  },
];

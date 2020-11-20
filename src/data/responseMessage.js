export const responseMessage = [
  {
    type: "flex",
    altText: "This is a Flex Message",
    contents: {
      type: "bubble",
      header: {
        type: "box",
        layout: "baseline",
        contents: [
          {
            type: "text",
            text: "#ส่งบิล",
            color: "#ffffff",
            weight: "bold",
            size: "xxl"
          },
          {
            type: "filler"
          }
        ]
      },
      body: {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "text",
            text: "กรอกรายละเอียดรายงานประจำวันผ่านการกดปุ่มด้านล่างได้เลย",
            wrap: true,
            weight: "regular"
          }
        ]
      },
      footer: {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "button",
            action: {
              type: "uri",
              label: "กดที่นี่เพื่อส่งบิล",
              uri: "https://mana-outlet.stackblitz.io"
            },
            color: "#D35132",
            style: "primary"
          }
        ]
      },
      "styles": {
        "header": {
          "backgroundColor": "#D35132"
        }
      }
    },
  },
];

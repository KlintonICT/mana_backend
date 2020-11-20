export const responseMessage = [
  {
    type: "flex",
    altText: "This is a Flex Message",
    contents: {
      type: "bubble",
      styles: {
        header: {
          backgroundColor: "#D35132"
        }
      },
      header: {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "text",
            text: "#ส่งบิล",
            // color: "#ffffff",
            // weight: "bold",
            // size: "xxl"
          },
          // {
          //   type: "filler"
          // },
          {
            type: "icon",
            url: "https://example.com/flex/images/icon.png",
            // size: "md"
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
            //style: "#D35132",
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

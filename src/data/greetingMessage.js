export const greetingMessage = [
    {
        "type":"text",
        "text":"Hello, user"
   },
   {
    "type": "flex",
    "altText": "This is a Flex Message",
    "contents": {
        "type": "bubble",
        "hero": {
          "type": "image",
          "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png",
          "size": "full",
          "aspectRatio": "20:13",
          "aspectMode": "cover",
          "action": {
            "type": "uri",
            "uri": "http://linecorp.com/"
          }
        }
      }
  }
  ];
  
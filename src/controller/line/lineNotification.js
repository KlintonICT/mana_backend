import axios from "axios";
import { thaiDate } from "../../utils/thaiDate";

const lineNotification = (requestData) => {
  const groupId = "Ca588bb043dccb4f05dac0d8232ab7b34";
  const { posSum, receiptImg } = requestData;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.AUTHORIZATION}`,
  };

  const data = {
    to: groupId,
    messages: [
      {
        type: "text",
        text: `แจ้งยอดขายประจำวันที่ ${thaiDate.format(
          "DD/MM/YYYY"
        )} 🎯 ยอดรวมทั้งหมด ${posSum} บาท มีข้อสงสัย กรุณาติดต่อ 02-988-2462`,
      },
      {
        type: "image",
        originalContentUrl: receiptImg,
        previewImageUrl: receiptImg,
      },
    ],
  };

  axios
    .post(`${process.env.LINE_HOST}/bot/message/push`, data, {
      headers: headers,
    })
    .then((response) => {
      console.log("Bot notification data: ", response.data);
      console.log("Bot notification code: ", response.statusCode);
    })
    .catch((error) => {
      console.log("Data :" + data);
      console.log("Bot notification error: ", error);
    });
};

export default lineNotification;

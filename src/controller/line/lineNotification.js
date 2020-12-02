import axios from "axios";


const lineNotification = (sum) => {
    const groupId = "Ca588bb043dccb4f05dac0d8232ab7b34";
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.AUTHORIZATION}`,
      };
    const data = {
        groupId : groupId,
        messages: [
            {
                type : "text",
                text : `แจ้งยอดขายประจำวันที่ 15 พฤศจิกายน 2563 ยอดรวมทั้งหมด ${sum} บาท มีข้อสงสัย กรุณาติดต่อ 02-988-2462 `
            }
        ],
    }
    axios
    .post(`${process.env.LINE_HOST}/bot/message/reply`, data, {
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
}

export default lineNotification;
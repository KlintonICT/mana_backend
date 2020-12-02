const moment = require("moment-timezone");

export const thaiDate = () => moment.tz(new Date(), "Asia/Bangkok");

const moment = require('moment-timezone');
// send bill query
export const sendBillQuery = (data) => {
  const thaiDate = moment.tz(new Date(),'Asia/Bangkok');
  const today = thaiDate.format("YYYY-MM-DD HH:mm:ss.SSS");
  const { transferSum, cashSum, posSum, receiptImg } = data;

  const insertValue = `INSERT INTO transacSumHistory (transacSumId, transferSum, cashSum, posSum, receiptImg, datetime)
    VALUES (NEWID(), ${transferSum}, ${cashSum}, ${posSum}, '${receiptImg}', '${today}')`;

  return insertValue;
};

// get bill query
export const getBillQuery = () => {
  return "SELECT * FROM transacSumHistory";
};

// get bill by branch query
export const getByBranchQuery = (branch) => {
  return `SELECT * FROM transacSumHistory WHERE branch = '${branch}'`;
};

// update bill query
export const updateBillQuery = (data) => {
  const { transacSumId, transferSum, cashSum, posSum } = data;

  const updateValue = `UPDATE transacSumHistory
    SET transferSum=${transferSum}, cashSum=${cashSum}, posSum=${posSum}
    WHERE transacSumId= CAST('${transacSumId}' AS UNIQUEIDENTIFIER)`;

  return updateValue;
};

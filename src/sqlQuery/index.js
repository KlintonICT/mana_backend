const moment = require("moment-timezone");

// send bill query
export const sendBillQuery = (data) => {
  const thaiDate = moment.tz(new Date(), "Asia/Bangkok");
  const today = thaiDate.format("YYYY-MM-DD HH:mm:ss.SSS");
  const { transferSum, cashSum, posSum, receiptImg, userId } = data;

  const insertValue = `INSERT INTO transacSumHistory (transacSumId, transferSum, cashSum, posSum, receiptImg, datetime, userId)
    VALUES (NEWID(), ${transferSum}, ${cashSum}, ${posSum}, '${receiptImg}', '${today}', '${userId}')`;

  return insertValue;
};

// get bill query
export const getBillQuery = () => {
  return "SELECT transacSumHistory.transacSumId, transacSumHistory.transferSum, transacSumHistory.cashSum, transacSumHistory.posSum, transacSumHistory.receiptImg, transacSumHistory.datetime, userDb.branch, userDb.firstName, userDb.lastName FROM transacSumHistory INNER JOIN userDb on transacSumHistory.userId = userDb.userId";
};

// get bill by branch query
export const getByBranchQuery = (branch) => {
  return `SELECT transacSumHistory.transacSumId, transacSumHistory.transferSum, transacSumHistory.cashSum, transacSumHistory.posSum, transacSumHistory.receiptImg, transacSumHistory.datetime, userDb.branch, userDb.firstName, userDb.lastName FROM transacSumHistory
  INNER JOIN userDb on transacSumHistory.userId = userDb.userId WHERE userDb.branch = '${branch}'`;
};

// update bill query
export const updateBillQuery = (data) => {
  const { transacSumId, transferSum, cashSum, posSum } = data;

  const updateValue = `UPDATE transacSumHistory
    SET transferSum=${transferSum}, cashSum=${cashSum}, posSum=${posSum}
    WHERE transacSumId= CAST('${transacSumId}' AS UNIQUEIDENTIFIER)`;

  return updateValue;
};

// verify use send bill
export const verifySendBillUser = (data) => {
  const { userId } = data;
  return `SELECT userId FROM userDb WHERE userId = '${userId}'`;
};

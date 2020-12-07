import { thaiDate } from "../utils/thaiDate";

// send bill query
export const sendBillQuery = (data) => {
  const today = thaiDate.format("YYYY-MM-DD HH:mm:ss.SSS");
  const { transferSum, cashSum, posSum, receiptImg, userId } = data;

  const insertValue = `INSERT INTO transacSumHistory (transacSumId, transferSum, cashSum, posSum, receiptImg, datetime, userId)
    VALUES (NEWID(), ${transferSum}, ${cashSum}, ${posSum}, '${receiptImg}', '${today}', '${userId}')`;

  return insertValue;
};

// get bill query
export const getBillQuery = () => {
  return "SELECT transacSumHistory.transacSumId, transacSumHistory.transferSum, transacSumHistory.cashSum, transacSumHistory.posSum, transacSumHistory.receiptImg, transacSumHistory.datetime, userDb.branch, userDb.firstName, userDb.lastName FROM transacSumHistory INNER JOIN userDb on transacSumHistory.userId = userDb.userId ORDER BY datetime DESC";
};

// get bill by branch query
export const getByBranchQuery = (branch) => {
  return `SELECT transacSumHistory.transacSumId, transacSumHistory.transferSum, transacSumHistory.cashSum, transacSumHistory.posSum, transacSumHistory.receiptImg, transacSumHistory.datetime, userDb.branch, userDb.firstName, userDb.lastName FROM transacSumHistory
  INNER JOIN userDb on transacSumHistory.userId = userDb.userId WHERE userDb.branch = '${branch}' ORDER BY datetime DESC`;
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
export const userExists = (data) => {
  const { userId } = data;
  return `SELECT userId FROM userDb WHERE userId = '${userId}'`;
};

// create admin
export const createAdminQuery = (data, hashedPassword) => {
  const { username, branch, firstName, lastName } = data;
  return `INSERT INTO userDb VALUES('${hashedPassword}', '${branch}', 'Admin', '${firstName}', '${lastName}', '${username}')`;
};

// admin login
export const adminLoginQuery = (data) => {
  const { username } = data;
  return `SELECT password FROM userDb WHERE userId = '${username}'`;
};

// get total and diff
export const getTotalDiffQuery = () => {
  return "SELECT [transferSum] + [cashSum] as total, [posSum], [posSum] - [transferSum] + [cashSum] as diff, datetime FROM [dbo].[transacSumHistory] ORDER BY datetime DESC";
};

import moment from "moment";

// send bill query
export const sendBillQuery = (data) => {
  const today = moment(new Date()).format("YYYY-MM-DD HH:mm:ss.SSS");
  console.log(today)
  const { transferSum, cashSum, posSum, receiptImg } = data;

  const insertValue = `INSERT INTO transacSumHistory (transacSumId, transferSum, cashSum, posSum, receiptImg, branch, datetime)
    VALUES (NEWID(), ${transferSum}, ${cashSum}, ${posSum}, '${receiptImg}', 'rak yong', '${today}')`;

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

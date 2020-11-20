import moment from "moment";

// send bill query
export const sendBillQuery = (data) => {
  const today = moment(new Date()).format("YYYY-MM-DD");
  const { transferSum, cashSum, posSum } = data;

  const insertValue = `INSERT INTO transacSumHistory (transacSumId, transferSum, cashSum, posSum, receiptImg, branch, datetime)
    VALUES (NEWID(), ${transferSum}, ${cashSum}, ${posSum}, 'image-link', 'rak yong', ${today})`;

  return insertValue;
};

// get bill query
export const getBillQuery = () => {
  return "SELECT * FROM transacSumHistory";
};

// update bill query
export const updateBillQuery = (data) => {
  const { transacSumId, transferSum, cashSum, posSum } = data;

  const updateValue = `UPDATE transacSumHistory
    SET transferSum=${transferSum}, cashSum=${cashSum}, posSum=${posSum}
    WHERE transacSumId= CAST('${transacSumId}' AS UNIQUEIDENTIFIER)`;

  return updateValue;
};

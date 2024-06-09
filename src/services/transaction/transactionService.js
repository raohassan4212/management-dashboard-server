const express = require("express");
const multer = require("multer");
const fs = require("fs-extra");
const path = require("path");

const Transactions = require("../../models/Transactions/transactions");
const { uploadImage } = require("../../functions/ImageKit");
const { model } = require("mongoose");
const Sale = require("../../models/Sale/sale");
const User = require("../../models/User/user");

// Create transaction function
const create = async (reqData, file) => {
  // console.log(reqData);
  const serial = Math.floor(100 + Math.random() * 9000);
  console.log(reqData.file);
  try {
    if (reqData && file) {
      const filePath = file.path;
      const fileBuffer = await fs.readFile(filePath);
      const fileBase64 = fileBuffer.toString("base64");
      const uploadedImgUrl = await uploadImage(
        fileBase64,
        `TS-${serial}`,
        "payments"
      );
      if (uploadedImgUrl) {
        await fs.unlink(filePath); // Delete the temporary file
      }

      if (!uploadedImgUrl) {
        return res.status(301).json({
          code: 301,
          success: false,
          message: "Failed to upload image",
          data: null,
        });
      }

      const newTransaction = await Transactions.create({
        ...reqData,
        img: uploadedImgUrl,
        serial: `TS-${serial}`,
      });

      if (newTransaction) {
        return res.status(200).json({
          code: 200,
          success: true,
          message: "Transaction created successfully",
          data: newTransaction,
        });
      } else {
        return res.status(301).json({
          code: 301,
          success: false,
          message: "Failed to create transaction",
          data: null,
        });
      }
    }

    if (!reqData) {
      return {
        code: 500,
        success: false,
        message: "Failed to upload image to ImageKit",
        data: null,
      };
    }
  } catch (error) {
    console.error("Error creating Transaction:", error);
    return {
      code: 500,
      success: false,
      message: "Internal server error",
      data: null,
    };
  }
};

const get = async (reqData) => {
  const {
    id,
    user_id,
    serial,
    type,
    amount,
    day,
    month,
    date,
    unit_id,
    lead_id,
  } = reqData;
  let whereClause = {};

  if (id) whereClause.id = id || "";
  if (user_id) whereClause.user_id = user_id || "";
  if (serial) whereClause.serial = serial || "";
  if (type) whereClause.type = type || "";
  if (amount) whereClause.amount = amount || "";
  if (day) whereClause.user_id = day || "";
  if (month) whereClause.user_id = month || "";
  if (date) whereClause.date = date || "";
  if (unit_id) whereClause.unit_id = unit_id || "";
  if (lead_id) whereClause.lead_id = lead_id || "";

  const page = parseInt(reqData.page) || 0;
  const pageSize = parseInt(reqData.pageSize) || 10;

  const zeroBasedPage = Math.max(0, page - 1);
  const offset = zeroBasedPage * pageSize;

  let totalCount;
  let transactions;

  totalCount = await Transactions.count({ where: whereClause });
  transactions = await Transactions.findAll({
    where: whereClause,
    offset,
    limit: pageSize,
    include:[
      { model: Sale },
      { model: User },
    ]
  });
  if (transactions) {
    return {
      code: 200,
      success: true,
      message: "transactions retrieved successfully",
      data: transactions,
      currentPage: parseInt(page),
      pageSize: parseInt(pageSize),
      totalCount,
    };
  }
};

module.exports = {
  create,
  get,
};

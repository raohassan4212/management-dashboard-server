const express = require("express");
const multer = require("multer");
const fs = require("fs-extra");
const path = require("path");

const Transactions = require("../../models/Transactions/transactions");
const { uploadImage } = require("../../functions/ImageKit");

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

module.exports = {
  create,
};

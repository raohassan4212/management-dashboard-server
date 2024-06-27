const Sale = require("../../models/Sale/sale");
const { Op } = require("sequelize");
const moment = require("moment");
const SaleService = require("../../models/SaleService/saleService");
const Transactions = require("../../models/Transactions/transactions");

const create = async (reqData) => {
  const serialSale = Math.floor(100 + Math.random() * 9000);

  if (reqData) {
    const createSale = await Sale.create({
      ...reqData,
      serial: `SL-${serialSale}`,
    });

    if (createSale) {
      return {
        code: 201,
        success: true,
        message: "Sale created successfully",
        data: createSale,
      };
    }
  }
};

const update = async (reqData) => {
  if (reqData) {
    const saleToUpdate = await Sale.findOne({ where: { id: reqData.id } });
    if (!saleToUpdate) {
      return {
        code: 400,
        success: true,
        message: "Sale Not Found",
        data: saleToUpdate,
      };
    }
    const updateData = await Sale.upsert({ ...reqData });
    if (updateData) {
      return {
        code: 200,
        success: true,
        message: "Sale Updated successfully",
        data: updateData,
      };
    }
  }
};

const paranoid = async (id) => {
  if (id) {
    const saleToDelete = await Sale.findOne({ where: { id: id } });
    if (!saleToDelete) {
      return {
        code: 400,
        success: true,
        message: "Sale Not Found",
        data: saleToDelete,
      };
    }
    const deleteSale = await Sale.destroy({ where: { id: id } });
    if (deleteSale) {
      return {
        code: 200,
        success: true,
        message: "Sale Deleted successfully",
        data: deleteSale,
      };
    }
  }
};

const getAll = async (page, pageSize) => {
  const offset = (page - 1) * pageSize;
  const limit = pageSize;

  const isPaginationEnabled =
    !isNaN(parseInt(page)) && !isNaN(parseInt(pageSize));

  const options = isPaginationEnabled
    ? {
        offset: (page - 1) * pageSize,
        limit: pageSize,
      }
    : {};

  const { count, rows } = await Sale.findAndCountAll(options);

  if (rows && rows.length > 0) {
    return {
      code: 200,
      success: true,
      message: "Get All Sales successfully",
      data: {
        data: rows,
        totalRecords: count,
        currentPage: page,
        totalPages: Math.ceil(count / pageSize),
      },
    };
  } else {
    return {
      code: 404,
      success: false,
      message: "No sales data found",
      data: [],
    };
  }
};

const getById = async (id) => {
  if (id) {
    console.log("val ===> ", id, " type ===> ", typeof id);
    const saleData = await Sale.findOne({ where: { id: id } });
    if (!saleData) {
      return {
        code: 400,
        success: true,
        message: "Sale Not Found",
        data: saleData,
      };
    }

    return {
      code: 200,
      success: true,
      message: "Get Sale successfully",
      data: saleData,
    };
  }
};

const getByFilter = async (filter) => {
  const options = {};

  const dateFilter = getDateFilter(filter);
  if (dateFilter) {
    options.where = {
      ...options.where,
      date: dateFilter,
    };
  }

  const { count, rows } = await Sale.findAndCountAll(options);
  const totalAmount = await Sale.sum(
    "amount",
    options.where ? { where: options.where } : {}
  );
  if (rows && rows.length > 0) {
    return {
      code: 200,
      success: true,
      message: "Get All Sales successfully",
      data: {
        // data: rows,
        // totalRecords: count,
        totalAmount: totalAmount,
      },
    };
  } else {
    return {
      code: 404,
      success: false,
      message: "No sales data found",
      data: [],
    };
  }
};

const getDateFilter = (filter) => {
  const now = moment().endOf("day");
  let startDate, endDate;

  if (filter === "currentMonth") {
    startDate = now.clone().startOf("month");
    endDate = now;
  } else if (filter === "previousMonth") {
    startDate = now.clone().subtract(1, "month").startOf("month");
    endDate = now.clone().subtract(1, "month").endOf("month");
  } else if (filter === "lastSixMonths") {
    startDate = now.clone().subtract(6, "months").startOf("month");
    endDate = now;
  } else if (filter === "lastTwelveMonths") {
    startDate = now.clone().subtract(12, "months").startOf("month");
    endDate = now;
  } else {
    return null;
  }

  return {
    [Op.gte]: startDate.toDate(),
    [Op.lte]: endDate.toDate(),
  };
};

module.exports = { create, update, paranoid, getAll, getById, getByFilter };

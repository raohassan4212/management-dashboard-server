const Sale = require("../../models/Sale/sale");

const create = async (reqData) => {
  if (reqData) {
    const createData = await Sale.create({ ...reqData });
    if (createData) {
      return {
        code: 201,
        success: true,
        message: "Sale created successfully",
        data: createData,
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
  
  const { count, rows } = await Sale.findAndCountAll({
    offset: offset,
    limit: limit,
  });

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

module.exports = { create, update, paranoid, getAll, getById };

const cron = require("node-cron");
const { Op } = require("sequelize");
const Sale = require("../models/Sale/sale");
const User = require("../models/User/user");
const CommissionRate = require("../models/CommissionRates/commissionRates");
const Salary = require("../models/Salary/salary");
const Report = require("../models/Report/report");

// Cron job to calculate total profit every month

const calculateTolalSaleProfit = async () => {
  cron.schedule("0 0 1 * *", async () => {
    console.log("Generating Report every month on the first day at midnight");
    try {
      const users = await User.findAll({
        include: [
          { model: Salary },
          { model: CommissionRate },
          {
            model: Sale,
            where: {
              createdAt: {
                [Op.gte]: new Date(new Date() - 30 * 24 * 60 * 60 * 1000),
              },
            },
            required: false,
          },
        ],
      });

      let allSalaryExpense = 0;
      let allCommissionExpense = 0;
      let totalSale = 0;
      users.forEach((user) => {
        const userSalaries = user.has_salary ? Number(user.Salary.amount) : 0;
        allSalaryExpense += userSalaries;
        if (user.CommissionRate) {
          const userSales = user.Sales.reduce(
            (sum, sale) => sum + sale.amount,
            0
          );
          const userCommission = userSales * (user.CommissionRate.rate / 100);
          allCommissionExpense += userCommission;
        }
        const sale = user.Sales.reduce((sum, sale) => sum + sale.amount, 0);
        totalSale = totalSale + sale;
      });

      let totalExpense = allSalaryExpense + allCommissionExpense;
      let profit = totalSale - totalExpense;

      await Report.create({
        total_sales: totalSale,
        total_expenses: totalExpense,
        total_profit: profit,
      });
    } catch (error) {
      console.error("Error calculating total profit:", error);
    }
  });
};

module.exports = { calculateTolalSaleProfit };

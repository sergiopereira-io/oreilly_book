const fs = require('fs');
const csv = require('csv-parser');

// Create an empty array to store the data
const products = [];
let totalRevenue = 0; // Variable to store total revenue

// Read the CSV file
fs.createReadStream('Online_Retail.csv')
  .pipe(csv())
  .on('data', (data) => {
    products.push(data);
    
    // Calculate total revenue for this entry and add to totalRevenue
    const quantity = parseFloat(data.Quantity);
    const unitPrice = parseFloat(data.UnitPrice);
    totalRevenue += quantity * unitPrice;
  })
  .on('end', () => {
    // 1. Total number of unique products sold (based on unique StockCode)
    const uniqueProducts = [...new Set(products.map(product => product.StockCode))];
    console.log('Total number of unique products sold:', uniqueProducts.length);

    // 4. Console log the total revenue from all products
    console.log('Total revenue from all products: £', totalRevenue.toFixed(2));

    // 2. Total number of units sold by product (group by StockCode, sum Quantity)
    const unitsSoldByProduct = products.reduce((acc, product) => {
      const stockCode = product.StockCode;
      const quantity = parseFloat(product.Quantity);
      if (!acc[stockCode]) {
        acc[stockCode] = { description: product.Description, totalQuantity: 0 };
      }
      acc[stockCode].totalQuantity += quantity;
      return acc;
    }, {});

    const sortedUnitsSold = Object.values(unitsSoldByProduct)
      .sort((a, b) => b.totalQuantity - a.totalQuantity)
      .slice(0, 30);

    console.log('Top 30 products by total units sold:');
    sortedUnitsSold.forEach((product, index) => {
      console.log(`${index + 1}. ${product.description} - ${product.totalQuantity} units sold`);
    });

    // 3. Total revenue made by product (group by StockCode, sum Quantity * UnitPrice)
    const revenueByProduct = products.reduce((acc, product) => {
      const stockCode = product.StockCode;
      const quantity = parseFloat(product.Quantity);
      const unitPrice = parseFloat(product.UnitPrice);
      const revenue = quantity * unitPrice;
      if (!acc[stockCode]) {
        acc[stockCode] = { description: product.Description, totalRevenue: 0 };
      }
      acc[stockCode].totalRevenue += revenue;
      return acc;
    }, {});

    const sortedRevenue = Object.values(revenueByProduct)
      .sort((a, b) => b.totalRevenue - a.totalRevenue)
      .slice(0, 30);

    console.log('Top 30 products by total revenue:');
    sortedRevenue.forEach((product, index) => {
      console.log(`${index + 1}. ${product.description} - £${product.totalRevenue.toFixed(2)} in revenue`);
    });
  });

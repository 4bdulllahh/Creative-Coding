var table;

// To retrieve the file, we used function preload()
function preload() {
  // data file is stored in variable table
  table = loadTable("Car Sales and Profit.csv", "csv");
}

function setup() {
  createCanvas(800, 600);
  noStroke(); // it removes the border of the shape
}

function draw() {
  background("#F8F4E1"); // background color
  textSize(18); // size of the text
  textStyle(BOLD);  // it sets text in bold
  textAlign(CENTER); // it aligns the text to center
  text('CAR SALES AND PROFIT', width / 2, 30); // position of the text
  textSize(14);

  // Calculate the total sales and total profit
  let salesData = table.getRow(1).arr;
  let profitData = table.getRow(2).arr;
  let totalSales = 0;
  let totalProfit = 0;

  for (let i = 0; i < salesData.length; i++) {
    totalSales += int(salesData[i]);
    totalProfit += int(profitData[i]);
  }

  // Variables for pie charts
  let lastAngleSales = 0;
  let lastAngleProfit = 0;
  let centerX1 = width / 4;
  let centerY1 = height / 2 + 20;
  let centerX2 = 3 * width / 4;
  let centerY2 = height / 2 + 20;
  let radius = 150;

  // Colors for sales pie chart
  let salesColors = [color(255, 102, 102), color(255, 178, 102), color(255, 255, 102), color(178, 255, 102), color(102, 255, 178), color(102, 178, 255), color(178, 102, 255), color(255, 102, 255)];

  // Colors for profit pie chart
  let profitColors = [color(255, 51, 51), color(255, 153, 51), color(255, 255, 51), color(153, 255, 51), color(51, 255, 153), color(51, 153, 255), color(153, 51, 255), color(255, 51, 255)];

  // Draw sales pie chart
  text("Sales Data", centerX1, centerY1 - radius - 20);
  for (let i = 0; i < table.getColumnCount(); i++) {
    let sales = int(salesData[i]);
    let angle = map(sales, 0, totalSales, 0, TWO_PI);
    fill(salesColors[i % salesColors.length]);
    arc(centerX1, centerY1, radius * 2, radius * 2, lastAngleSales, lastAngleSales + angle, PIE);
    let labelAngle = lastAngleSales + angle / 2;
    let labelX = centerX1 + cos(labelAngle) * (radius + 20);
    let labelY = centerY1 + sin(labelAngle) * (radius + 20);
    fill(0);
    text(table.getRow(0).arr[i], labelX, labelY);
    lastAngleSales += angle;
  }

  // Draw profit pie chart
  text("Profit Data", centerX2, centerY2 - radius - 20);
  for (let i = 0; i < table.getColumnCount(); i++) {
    let profit = int(profitData[i]);
    let angle = map(profit, 0, totalProfit, 0, TWO_PI);
    fill(profitColors[i % profitColors.length]);
    arc(centerX2, centerY2, radius * 2, radius * 2, lastAngleProfit, lastAngleProfit + angle, PIE);
    let labelAngle = lastAngleProfit + angle / 2;
    let labelX = centerX2 + cos(labelAngle) * (radius + 20);
    let labelY = centerY2 + sin(labelAngle) * (radius + 20);
    fill(0);
    text(table.getRow(0).arr[i], labelX, labelY);
    lastAngleProfit += angle;
  }
}

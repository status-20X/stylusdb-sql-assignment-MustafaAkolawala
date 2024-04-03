const readCSV = require('../src/csvReader');

test('Basic Jest Test', () => {
    expect(1).toBe(1);
  });

test('Read CSV File', async () => {
    const data = await readCSV('./sample.csv');
    expect(data.length).toBeGreaterThan(0);
    expect(data.length).toBe(3);
    expect(data[0].name).toBe('John');
    expect(data[0].age).toBe('30'); 
});
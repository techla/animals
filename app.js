const { filterData, countData, parseOptions } = require('./src/lib.js');
const { data } = require('./data.js');

const main = () => {
  try {
    // Remove the first two arguments (node and script path)
    const args = process.argv.slice(2);
    
    const parsedOptions = parseOptions(args);

    // Execute
    let result = data;
    if (parsedOptions.filter) {
      result = filterData({pattern: parsedOptions.filter, data})
    }
    if (parsedOptions.count) {
      result = countData(result);
    }
    
    result && console.log(JSON.stringify(result, null, 2));

    } catch (error) {    
      console.error(`Something went wrong: ${error.message}`);
      process.exit(1);
    }
}

main()
const { filterData, countData, extractFirstOptionFromArgs } = require('./src/lib.js');
const { data } = require('./data.js');
const FILTER = '--filter';
const COUNT = '--count';

const main = () => {
  try {
    // clean the arguments
    // remove the first two arguments (node and script path)
    const args = process.argv.slice(2);

    // check if the arguments are valid
    if (args.length === 0) {
      throw new Error('No arguments provided');
    }
    
    // check if the arguments are valid
    const wrongOptions = args.filter(arg => !arg.startsWith('--'));
    if (wrongOptions.length > 0) {
      throw new Error('options should be prefixed by "--"');
    }

    // start processing
    // we handle separatly the filter and the count options
    // they can can be used together
    // not handled options are ignored


    let result=data;

    // first apply the filter option if it exists
    const filterOption = args.find(option => option.startsWith(FILTER));
    if (filterOption) {
      const pattern = filterOption.split('=')[1] || '';
      result = filterData(pattern, data);
    }

    // apply the count option if it exists
    const countOption = args.find(option => option.startsWith(COUNT));
    if (countOption) {
        result = countData(result)
    }
    
    // print the result
    console.log(JSON.stringify(result, null, 2));

    } catch (error) {    
      console.error(`Something went wrong: ${error.message}`);
      process.exit(1);
    }
}

main()
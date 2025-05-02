const FILTER_OPTION = '--filter'
const COUNT_OPTION = '--count'

const HELP_MESSAGE = `
Usage:
  node app.js <options>

Options :
  --filter=<pattern>   Filters the data structure based on a filter applied to the animal names.
  --count              Append a counter to the container name based on the number of elements it contains.`

  module.exports = {
    HELP_MESSAGE,
    FILTER_OPTION,
    COUNT_OPTION
  };
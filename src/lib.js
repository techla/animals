const { HELP_MESSAGE, FILTER_OPTION, COUNT_OPTION } = require('./constants');

/**
 * Filters the countries array passed as an argument and keep only the
 * peaple for which there is at least one animal matching the pattern
 * @param pattern animals search pattern
 * @param data array of countries
 * @returns the array containing only the countries and the peaple for which
 * there is at least one animal matching the pattern
 */
function filterData({pattern, data}) {
  if (data === undefined) {
    return;
  }
    const lowerCasePattern = pattern.toLowerCase();
    // we use reduce to filter the data and keep the structure
    const filteredCountries = data.reduce((countries, country) => {
      const filteredPeople = country.people.reduce((people, person) => {
        const filteredAnimals = person.animals.filter(animal =>
          animal.name.toLowerCase().includes(lowerCasePattern)
        );

        if (filteredAnimals.length > 0) {
          return [...people, { ...person, animals: filteredAnimals }];
        }

        return people;
      }, []);
  
      if (filteredPeople.length > 0) {
        return [...countries, { ...country, people: filteredPeople }];
      }
  
      return countries;
    }, []);
    if (filteredCountries.length === 0) {
      return;
    }
    return filteredCountries;
  }


/**
 * Add a counting number on countries and people name on the countries array,
 * regarding the items they contain
 * @param {Array} array of countries
 * @returns {Array} as the initial array but with the names suffixed by the counter
 */
function countData(data) {
  if (data === undefined) {
    return;
  }

  // since we are juste modifiing a field value without changing the strcture,
  // we can use nested map functions here
  const countriesWithCounter = data.map(country => {
    const peopleWithCounter = country.people.map(person => {
      const animalCount = person.animals.length;
      return {
        ...person,
        name: `${person.name} [${animalCount}]`,
      };
    });
    return {
      ...country,
      name: `${country.name} [${peopleWithCounter.length}]`,
      people: peopleWithCounter
    };
  });
  return countriesWithCounter;
}


/**
 * Parses the command line arguments and returns an object with the options
 * Check if they are valid
 * --filter=<pattern> and --count can both be used together
 * --filter=<pattern> and --count can only appear once
 * @param {Array} array of options
 * @returns {Object} parsed options
 * @throws Error if the arguments are not valid
 */
function parseOptions(args) {
  // Check if no arguments were provided
  if (args.length === 0) {
    throw new Error(HELP_MESSAGE);
  }
  const parsedOptions = {};
  args.forEach(arg => {
    if (arg.startsWith(`${FILTER_OPTION}=`)) {
      if (parsedOptions.filter) {
        throw new Error('parseOptions: --filter can only be used once.');
      }
      parsedOptions.filter = arg.split('=')[1] || '';
    } else if (arg === COUNT_OPTION) {
      if (parsedOptions.count) {
        throw new Error('parseOptions: --count can only be used once.');
      }
      parsedOptions.count = true;
    } else {
      throw new Error(HELP_MESSAGE);
    }
  });
  return parsedOptions;
}

module.exports = {
  filterData,
  countData,
  parseOptions
};
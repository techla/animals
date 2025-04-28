/**
 * Filters the countries array passed as an argument and keep only the
 * peaple for which there is at least one animal matching the pattern
 * @param pattern animals search pattern
 * @param data array of countries
 * @returns the array containing only the countries and the peaple for which
 * there is at least one animal matching the pattern
 * @throws Error if the data is not an array
 */
function filterData(pattern='', data=[]) {
  if (!Array.isArray(data)) {
    throw new Error('filterData: input data should be an array');
  }
    const lowerCasePattern = pattern.toLowerCase();
    // we use reduce to filter the data and keep the structure
    const countries = data.reduce((countries, country) => {
      const people = country.people.reduce((people, person) => {
        const animals = person.animals.filter(animal =>
          animal.name.toLowerCase().includes(lowerCasePattern)
        );
  
        if (animals.length > 0) {
          people.push({ name: person.name, animals });
        }
  
        return people;
      }, []);
  
      if (people.length > 0) {
        countries.push({ name: country.name, people });
      }
  
      return countries;
    }, []);
    return countries.length > 0 ? countries : undefined;
  }

/**
 * Add a counting number on countries and people name on the countries array,
 * regarding the items they contain
 * @param data array of countries
 * @returns Object as the initial object but with the names suffixed by the counter
 */
function countData(data=[]) {
  if (!Array.isArray(data)) {
    throw new Error('countData: input data should be an array');
  }

  // since we are juste modifiing a field value without changing the strcture,
  // we can use nested map functions here
  const countries = data.map(country => {
    const people = country.people.map(person => {
      const animalCount = person.animals.length;
      return {
        name: `${person.name} [${animalCount}]`,
        animals: person.animals
      };
    });
    return {
      name: `${country.name} [${people.length}]`,
      people
    };
  });
  return countries.length > 0 ? countries : undefined;
}

module.exports = {
  filterData,
  countData
};
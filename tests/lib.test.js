const { filterData, countData } = require('../src/lib');
const { testData, countedData, filteredData } = require('./data');

describe('filterData', () => {
  describe('edge cases', () => {
    it('if the pattern is an empty string, return de initial data', () => {
        const pattern = '';
        const result = filterData(pattern, testData);
  
        expect(testData).toStrictEqual(result);
      });

    it('should return a country names array if no animal matches', () => {
      const pattern = 'no_match';
      const result = filterData(pattern, testData);
      expect(result).toBeUndefined();
    });
  });
  describe('standard cases', () => {
    it('should not return empty people or countries', () => {
      const pattern = 'mo';
      const result = filterData(pattern, testData);

      expect(Array.isArray(result)).toBe(true);
      result.forEach(country => {
        expect(country.people.length).toBeGreaterThan(0);
        country.people.forEach(person => {
          expect(person.animals.length).toBeGreaterThan(0);
        });
      });
    });
    it('should return only the structure with animals matching the filter pattern', () => {
        const pattern = 'mo';
        const expectedResult = filteredData
        const result = filterData(pattern, testData);
  
        expect(result).toStrictEqual(expectedResult);
    });
  });
})

describe('countData', () => {
  describe('edge cases', () => {
    it('should return an empty array if no data was provided', () => {
      const result = countData();
      expect(result).toBeUndefined();
    });
  });
  describe('standard cases', () => {
    it('should append counts to names', () => {
      const expectedResult = countData(testData);
      expect(countedData).toStrictEqual(expectedResult);
    });
  });
});
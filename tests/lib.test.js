const { HELP_MESSAGE } = require('../src/constants');
const { filterData, countData, parseOptions } = require('../src/lib');
const { testData, countedData, filteredData } = require('./data');

describe('filterData', () => {
  describe('edge cases', () => {
    it('should return de initial data if the pattern is an empty string, ', () => {
        const pattern = '';
        const result = filterData({pattern, data: testData});
  
        expect(testData).toStrictEqual(result);
      });
  });

  describe('standard cases', () => {
    it('should not return empty people or countries', () => {
      const pattern = 'mo';
      const result = filterData({pattern, data: testData});

      result.forEach(country => {
        expect(country.people).not.toHaveLength(0);
        country.people.forEach(person => {
          expect(person.animals).not.toHaveLength(0);
        });
      });
    });

    it('should return undefined if no animal matches', () => {
      const pattern = 'no_match';
      const result = filterData({pattern, data: testData});
      expect(result).toBeUndefined();
    });

    it('should filter the data based on animal names', () => {
        const pattern = 'mo';
        const expectedResult = filteredData
        const result = filterData({pattern, data: testData});
  
        expect(result).toStrictEqual(expectedResult);
    });
  });
})

describe('countData', () => {
  describe('edge cases', () => {
    it('should return undefined if no data was provided', () => {
      const result = countData();
      expect(result).toBeUndefined();
    });
  });

  describe('standard cases', () => {
    it('should append counts to names', () => {
      const result = countData(testData);
      const expectedResult = countedData
      expect(result).toStrictEqual(expectedResult);
    });
  });
});

describe('parseOptions', () => {
  describe('edge cases', () => {
    it('should throw an exception if no option is provided', () => {
      let args = [];
      expect(() => {
        parseOptions(args);
      }).toThrow(HELP_MESSAGE);
    });

    it('should throw an exception if duplicated options', () => {
      let args = ['--filter=mo', '--filter=by'];
      expect(() => {
        parseOptions(args);
      }).toThrow('parseOptions: --filter can only be used once.');

      args = ['--count', '--count', '--filter=mo'];
      expect(() => {
        parseOptions(args);
      }).toThrow('parseOptions: --count can only be used once.');
    });
  });

  describe('standard cases', () => {
    it('should parse the options', () => {
      const args = ['--count', '--filter=mo'];
      const parsedOptions = parseOptions(args);
      const expectedResult = {filter: 'mo', count: true};
      expect(parsedOptions).toStrictEqual(expectedResult);
    });
  });
});
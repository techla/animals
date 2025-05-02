const testData = [{
  name: "France",
  people: [{
    name: "John",
    animals: [
      { name: "Cat" },
      { name: "Dog" },
      { name: "Mouse" },
      { name: "Fish" }
    ]
  },
  {
    name: "Doe",
    animals: [
        { name: "Fish" },
        { name: "Horse" },
        { name: "Cow" }
    ]
  }]
}];

const filteredData = [
  {
    name: "France",
    people: [
      {
        name: "John",
        animals: [
          {
            name: "Mouse"
          }
        ]
      }
    ]
  }
]

const countedData = [{
  name: "France [2]",
  people: [
    {
      name: "John [4]",
      animals: [
        {
          name: "Cat"
        },
        {
          name: "Dog"
        },
        {
          name: "Mouse"
        },
        {
          name: "Fish"
        }
      ]
    },
    {
      name: "Doe [3]",
      animals: [
        {
          name: "Fish"
        },
        {
          name: "Horse"
        },
        {
          name: "Cow"
        }
      ]
    }
  ]}
]

module.exports = {
  filteredData,
  countedData,
  testData
}
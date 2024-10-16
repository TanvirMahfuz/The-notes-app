const FuzzySet = require("fuzzyset.js");

async function matchName(searchItem, stringsList) {
  const searchWords = searchItem.split(" ");

  let matchedResults = [];
  let count = 0;

  stringsList.forEach((item) => {
    const itemWords = item.name.split(" ");

    const fuzzySet = FuzzySet(itemWords);

    const matches = searchWords
      .map((word) => {
        const results = fuzzySet.get(word);
        return results && results[0][0] >= 0.9 ? word : null;
      })
      .filter((match) => match !== null);

    const filteredMatches = matches.filter((match) => match !== null);

    if (filteredMatches.length > 0) {
      matchedResults.push(item);
    }
  });

  return matchedResults; // Return the list of matched items
}
module.exports = {matchName};

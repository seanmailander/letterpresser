export const getRandomGame = () =>
    fetch('/api/randomGame')
    .then(response => response.json())

export const getWordsForGame = board =>
    fetch(`/api/wordsForGame?board=${board}`)
      .then(response => response.json())
      .then(response => response.map(word => word.toUpperCase()));

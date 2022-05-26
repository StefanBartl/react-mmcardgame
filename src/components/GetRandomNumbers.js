export default function App() {

  let unshuffled = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  let shuffled = unshuffled
  .map(value => ({ value, sort: Math.random() }))
  .sort((a, b) => a.sort - b.sort)
  .map(({ value }) => value)

    return shuffled
};
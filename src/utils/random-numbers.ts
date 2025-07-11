export function getRandomInt(min: number, max: number, prev?: number) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  
  let randomInt = Math.floor(
    Math.random() * (maxFloored - minCeiled) + minCeiled
  );

  if (prev === randomInt) {
    while (prev === randomInt) {
      randomInt = Math.floor(
        Math.random() * (maxFloored - minCeiled) + minCeiled
      );
    }
  }

  return randomInt;
}

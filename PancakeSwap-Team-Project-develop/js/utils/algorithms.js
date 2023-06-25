export function reduceData(array) {
  const n = array.length;
  const result = [array[0]]; // keep the first item
  if (n > 2) {
    const interval = Math.floor((n - 2) / 28); // divide remaining items into 28 intervals
    let prev = 0;
    for (let i = 1; i < n - 1; i++) {
      if (i - prev >= interval || i === n - 2) {
        // select the item that maximizes the score based on siblings
        let best = i;
        let bestScore = -Infinity;
        for (let j = prev + 1; j < i; j++) {
          const score =
            Math.abs(array[i].value - array[j].value) /
            Math.abs(array[i].time - array[j].time);
          if (score > bestScore) {
            best = j;
            bestScore = score;
          }
        }
        result.push(array[best]);
        prev = i;
      }
    }
  }
  result.push(array[n - 1]); // keep the last item
  return result;
}

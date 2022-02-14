import { RankedResult, UnrankedResult } from "./types";

const UNRANKED_RESULTS = Array.from(
  new Array(
    Math.round(Math.random() * 10) + 1
  )
    .keys()
).map<UnrankedResult>((_, index) => ({
  bib: `B${index + 100}`,
  name: `Person #${index}`,
  time: Math.round(Math.random() * 1000000),
}))

function addResult(result: UnrankedResult) {
  UNRANKED_RESULTS.push(result)
}

function getResults() {
  const ranked = [...UNRANKED_RESULTS];

  ranked.sort((a, b) => a.time < b.time
    ? -1
    : a.time > b.time
      ? 1
      : 0
  );
  
  return ranked.map<RankedResult>((x, i) => ({
    ...x,
    rank: i + 1
  }));
}

export default {
  addResult,
  getResults
}
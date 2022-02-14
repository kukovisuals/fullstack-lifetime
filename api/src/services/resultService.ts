import axios from "axios";

export type UnrankedResult = {
  bib: string
  name: string
  time: number
}
const http =  axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-type": "application/json"
  }
});


// class lifetimeAPI {
//   getAll() {
//     return http.get("/results");
//   }
//   create(data) {
//     return http.post("/results", data);
//   }
// }

export type RankedResult = UnrankedResult & {
  rank: number
}

export interface IResultService {
  addResult(result: UnrankedResult): Promise<void>
  getRanked(): Promise<RankedResult[]>
}

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


export default class ResultService implements IResultService {

  async addResult(result: UnrankedResult): Promise<void> {
    UNRANKED_RESULTS.push(result)
  }
  async getAll() {
    return http.get("/results");
  }
  async getRanked(): Promise<RankedResult[]> {
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

}
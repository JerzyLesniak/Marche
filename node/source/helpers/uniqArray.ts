import { StateVisits } from '../models/stateVisits';

const uniqArray = (arr: StateVisits[]): StateVisits[] => {
  return [...new Set(arr.map((i: StateVisits) => JSON.stringify(i)))].map((i: string) => JSON.parse(i));
};

export default uniqArray;

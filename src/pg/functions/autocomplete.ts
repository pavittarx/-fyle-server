import { execQuery } from "./../connect";
import sanitize from "./../../shared/sanitize";

export async function getBanksForQuery(
  q: string,
  limit: number = 10,
  offset: number = 0
) {
  const qParam = sanitize(q);
  const query = `SELECT * from branches 
                  WHERE branch LIKE '%${qParam.toUpperCase()}%' 
                  ORDER BY ifsc 
                  LIMIT ${limit} 
                  OFFSET ${offset};`;

  const result = await execQuery(query);
  console.log("Response", result);

  return result;
}

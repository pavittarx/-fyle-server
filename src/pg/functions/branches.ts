import { execQuery } from "../connect";
import sanitize from "../../shared/sanitize";

/**
 *
 * @param q
 * @param limit
 * @param offset
 *
 * Fetches Bank Details for Given Parameters
 */

export async function getBanksForAutocompleteQuery(
  q: string,
  limit: number = 10,
  offset: number = 0
) {
  const qParam = sanitize(q);
  const query = `SELECT * from branches
                  FULL OUTER JOIN banks on branches.bank_id = banks.id
                  WHERE branch LIKE '%${qParam.toUpperCase()}%' 
                  ORDER BY ifsc 
                  LIMIT ${limit} 
                  OFFSET ${offset} rs
                  ;`;

  const result = await execQuery(query);

  return result && result.rows;
}

export async function getBanksForQuery(
  q: string,
  limit: number = 10,
  offset: number = 0
) {
  const qParam = sanitize(q);

  const searchBanksQuery = `SELECT id, name from banks where doc_vectors @@ '${qParam}' = 't'`;
  const searchBranchesQuery = `SELECT ifsc, bank_id, branch, address, city, district, state from branches WHERE doc_vectors @@ '${qParam}' = 't'`;

  const query = `SELECT * from (${searchBranchesQuery}) branches 
                  FULL OUTER JOIN (${searchBanksQuery}) banks 
                  on branches.bank_id = banks.id
                  LIMIT ${limit}
                  OFFSET ${offset};`;

  const result = await execQuery(query);

  return result && result.rows;
}

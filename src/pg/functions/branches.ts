import sanitize from "../../shared/sanitize";
import { execQuery } from "../connect";

/**
 *
 * @param q
 * @param limit
 * @param offset
 *
 * Fetches Bank Details for Given Parameters
 */

export async function getBanksForAutocompleteQuery(
  q: string | undefined,
  limit: number = 100,
  offset: number = 0
) {
  let query: string;

  if (!q) {
    query = `SELECT ifsc, branch, address, city, district, state, id, name from branches
              FULL OUTER JOIN banks on branches.bank_id = banks.id
              ORDER BY ifsc
              LIMIT ${limit ? limit : 100}
              OFFSET ${offset ? offset : 0};`;
  } else {
    const qParam = sanitize(q);
    query = `SELECT ifsc, branch, address, city, district, state, id, name from branches
                  FULL OUTER JOIN banks on branches.bank_id = banks.id
                  WHERE branch LIKE '%${qParam!.toUpperCase()}%' 
                  ORDER BY ifsc 
                  LIMIT ${limit} 
                  OFFSET ${offset} 
                  ;`;
  }

  const result = await execQuery(query);
  return result && result.rows;
}

export async function getBanksForQuery(
  q: string,
  limit: number = 100,
  offset: number = 0
) {
  let query: string;

  if (!q) {
    query = `SELECT ifsc, branch, address, city, district, state, id, name from branches
              FULL OUTER JOIN banks on branches.bank_id = banks.id
              ORDER BY ifsc
              LIMIT ${limit ? limit : 100}
              OFFSET ${offset ? offset : 0};`;
  } else {
    const qParam = sanitize(q);

    query = `SELECT ifsc, branch, address, city, district, state, id, name from branches, banks 
                          WHERE (branches.doc_vectors @@ to_tsquery('${qParam}') 
                                  OR  banks.doc_vectors @@ to_tsquery('${qParam}'))
                          AND banks.id = branches.bank_id
                          ORDER BY ifsc
                          LIMIT ${limit}
                          OFFSET ${offset};
                `;
  }

  const result = await execQuery(query);
  return result && result.rows;
}

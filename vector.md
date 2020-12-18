## ts_vector creation Queries

Source: https://hevodata.com/blog/postgresql-full-text-search-setup/#a2

```sql
  ALTER TABLE banks ADD "doc_vectors" tsvector;

  ALTER TABLE branches ADD "doc_vectors" tsvector;

  CREATE INDEX idx_fts_doc_vec ON banks USING gin(doc_vectors);

  CREATE INDEX idx_fts_doc_vec ON branches USING gin(doc_vectors);
```

## Updating ts_vector records

```sql
  UPDATE branches SET doc_vectors = (to_tsvector(ifsc) || to_tsvector(branch) || to_tsvector(address) || to_tsvector(city) || to_tsvector(district) || to_tsvector(state));

  UPDATE banks SET doc_vectors = (to_tsvector(name));
```
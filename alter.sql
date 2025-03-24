-- SQLite
CREATE TEMPORARY TABLE temp AS
SELECT questionid, questiontext FROM Question;

-- Step2: Alter the temporary table to add an identity column named "row_id"
ALTER TABLE  temp
ADD COLUMN  row_id  INTEGER PRIMARY KEY AUTOINCREMENT;

-- Step3: Insert data from the original "products" table into the temporary table
INSERT INTO temp (id,name,price,row_id)
SELECT questionid, questiontext, NULL FROM products;

-- Step4: Drop the original "products" table:
-- DROP TABLE products;

-- Rename the temporary table to replace the original "products" table
 ALTER TABLE  temp RENAME TO Question;

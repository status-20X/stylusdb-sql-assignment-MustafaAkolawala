function parseQuery(query) {
  try {
    const selectRegex = /SELECT (.+?) FROM (.+?)(?: WHERE (.*))?$/i;
    const match = query.match(selectRegex);

    if (match) {
      const [, fields, table, whereString] = match;
      const whereClauses = whereString ? parseWhereClause(whereString) : [];
      return {
        fields: fields.split(",").map((field) => field.trim()),
        table: table.trim(),
        whereClauses,
      };
    } else {
      throw new Error("Invalid query format");
    }
  } catch (error) {
    console.error("Error parsing the query", error.message);
    throw error;
  }
}

function parseWhereClause(whereString) {
  try {
    const conditions = whereString.split(/ AND | OR /i);
    return conditions.map((condition) => {
      const [field, operator, value] = condition.split(/\s+/);
      return { field, operator, value };
    });
  } catch (error) {
    console.error("Error parsing the Where clause", error.message);
    throw error;
  }
}


module.exports = parseQuery;
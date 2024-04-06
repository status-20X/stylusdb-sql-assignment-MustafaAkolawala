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
    const conditionRegex = /(.*?)(=|!=|>|<|>=|<=)(.*)/;
    return whereString.split(/ AND | OR /i).map(conditionString => {
        const match = conditionString.match(conditionRegex);
        if (match) {
            const [, field, operator, value] = match;
            return { field: field.trim(), operator, value: value.trim() };
        }
        throw new Error('Invalid WHERE clause format');
    });
}


module.exports = parseQuery;
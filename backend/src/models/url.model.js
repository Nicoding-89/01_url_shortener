import { pool } from "../../config/db.config.js";

export const createShortUrl = async (url, shortUrl) => {
  const query = {
    text: `
      INSERT INTO urls (long_url, short_url)
      VALUES ($1, $2)
      RETURNING *;
    `,
    values: [url, shortUrl]
  };

  try {
    const { rows } = await pool.query(query);
    if (rows.length > 0) {
      return rows[0];
    };
    return null;
  } catch (error) {
    throw { 
      status: 500, 
      message: 'Error creating the new URL in the database.' 
    };
  };
};


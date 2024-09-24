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
      dbMessage: 'Error creating the new URL in the database.' 
    };
  };
};

export const getLongUrlByShortUrl = async (shortUrl) => {
  const query = {
    text: `SELECT long_url, id 
      FROM urls 
      WHERE short_url = $1;
    `,
    values: [shortUrl]
  };

  try {
    const { rows } = await pool.query(query);

    if (rows.length > 0) {
      return {
        longUrl: rows[0].long_url,
        id: rows[0].id
      };
    };

    return null;
  } catch (error) {
    throw { 
      status: 500, 
      dbMessage: 'Error retrieving the URL provided by the user.' 
    };
  };
};

export const incrementCounter = async (id) => {
  const query = {
    text: `
      UPDATE urls
      SET counter = counter + 1
      WHERE id = $1;
    `,
    values: [id]
  };

  try {
    await pool.query(query);
  } catch (error) {
    throw {
      status: 500,
      dbMessage: 'Error updating the counter.'
    }
  };
};

export const deleteUrl = async (id) => {
  const query = {
    text: `
      DELETE
      FROM urls 
      WHERE id = $1;
    `,
    values: [id]
  };

  try {
    await pool.query(query);
  } catch (error) {
    throw {
      status: 500,
      dbMessage: 'Error deleting the URL in the database.'
    }
  };
};

//Future features

export const getAllData = async (id) => {
  const query = {
    text: `
      SELECT long_url, short_url, created_at, counter 
      FROM urls 
      WHERE id = $1;
    `,
    values: [id]
  };

  try {
    const { rows } = await pool.query(query);

    if (rows.length > 0) {
      return rows[0].counter;
    };

    return null;
  } catch (error) {
    throw {
      status: 500,
      message: 'Error retrieving the data.'
    };
  };

};
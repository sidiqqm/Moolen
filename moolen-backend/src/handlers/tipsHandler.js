// handlers/tipsHandler.js
const Boom = require('@hapi/boom');
const dbPool = require('../config/database');

const getAllTips = async (request, h) => {
  try {
    const { page = 1, limit = 10, category } = request.query;
    const offset = (page - 1) * limit;

    let query = 'SELECT * FROM daily_tips';
    const queryParams = [];

    if (category) {
      query += ' WHERE category = ?';
      queryParams.push(category);
    }

    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    queryParams.push(parseInt(limit, 10), parseInt(offset, 10));

    const [tips] = await dbPool.query(query, queryParams);

    // Query untuk total count (untuk pagination di frontend)
    let countQuery = 'SELECT COUNT(*) as total FROM daily_tips';
    const countQueryParams = [];
    if (category) {
      countQuery += ' WHERE category = ?';
      countQueryParams.push(category);
    }
    const [totalResult] = await dbPool.query(countQuery, countQueryParams);
    const totalTips = totalResult[0].total;

    return h.response({
      status: 'success',
      message: 'Daily tips retrieved successfully',
      data: tips,
      pagination: {
        currentPage: parseInt(page, 10),
        totalPages: Math.ceil(totalTips / limit),
        totalTips,
        limit: parseInt(limit, 10)
      }
    }).code(200);
  } catch (error) {
    console.error('Error fetching tips:', error);
    return Boom.internal('An internal server error occurred');
  }
};

const getTipById = async (request, h) => {
  try {
    const { id } = request.params;
    const [rows] = await dbPool.query('SELECT * FROM daily_tips WHERE id = ?', [id]);

    if (rows.length === 0) {
      return Boom.notFound('Tip not found');
    }
    return h.response({
      status: 'success',
      data: rows[0]
    }).code(200);
  } catch (error) {
    console.error('Error fetching tip by ID:', error);
    return Boom.internal('An internal server error occurred');
  }
};

const createTip = async (request, h) => {
  try {
    const { title, content, category, image_url } = request.payload;
    const [result] = await dbPool.query(
      'INSERT INTO daily_tips (title, content, category, image_url) VALUES (?, ?, ?, ?)',
      [title, content, category, image_url]
    );
    return h.response({
      status: 'success',
      message: 'Tip created successfully',
      data: { id: result.insertId, title, content, category, image_url }
    }).code(201);
  } catch (error) {
    console.error('Error creating tip:', error);
    return Boom.badImplementation('Failed to create tip');
  }
};

const updateTip = async (request, h) => {
  try {
    const { id } = request.params;
    const { title, content, category, image_url } = request.payload;
    const [result] = await dbPool.query(
      'UPDATE daily_tips SET title = ?, content = ?, category = ?, image_url = ? WHERE id = ?',
      [title, content, category, image_url, id]
    );

    if (result.affectedRows === 0) {
      return Boom.notFound('Tip not found or no changes made');
    }
    return h.response({
      status: 'success',
      message: 'Tip updated successfully'
    }).code(200);
  } catch (error) {
    console.error('Error updating tip:', error);
    return Boom.badImplementation('Failed to update tip');
  }
};

const deleteTip = async (request, h) => {
  try {
    const { id } = request.params;
    const [result] = await dbPool.query('DELETE FROM daily_tips WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return Boom.notFound('Tip not found');
    }
    return h.response({
      status: 'success',
      message: 'Tip deleted successfully'
    }).code(200);
  } catch (error) {
    console.error('Error deleting tip:', error);
    return Boom.badImplementation('Failed to delete tip');
  }
};


module.exports = {
  getAllTips,
  getTipById,
  createTip,
  updateTip,
  deleteTip,
};
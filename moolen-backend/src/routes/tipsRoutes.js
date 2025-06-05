// routes/tipsRoutes.js
const Joi = require('joi');
const {
  getAllTips,
  getTipById,
  createTip,
  updateTip,
  deleteTip
} = require('../handlers/tipsHandler');

const tipsRoutes = [
  {
    method: 'GET',
    path: '/api/tips',
    handler: getAllTips,
    options: {
      tags: ['api', 'tips'],
      description: 'Get all daily tips with pagination and category filter',
      validate: {
        query: Joi.object({
          page: Joi.number().integer().min(1).default(1),
          limit: Joi.number().integer().min(1).max(100).default(10),
          category: Joi.string().valid('meditation', 'motivation', 'self-care', 'emotional').optional()
        })
      }
    }
  },
  {
    method: 'GET',
    path: '/api/tips/{id}',
    handler: getTipById,
    options: {
      tags: ['api', 'tips'],
      description: 'Get a specific daily tip by ID',
      validate: {
        params: Joi.object({
          id: Joi.number().integer().required()
        })
      }
    }
  },
  // Admin routes (placeholder - add auth later)
  {
    method: 'POST',
    path: '/api/admin/tips',
    handler: createTip,
    options: {
      tags: ['api', 'admin', 'tips'],
      description: 'Create a new daily tip (Admin)',
      validate: {
        payload: Joi.object({
          title: Joi.string().required(),
          content: Joi.string().required(),
          category: Joi.string().valid('meditation', 'motivation', 'self-care', 'emotional').optional(),
          image_url: Joi.string().uri().optional().allow(null, '')
        })
      }
      // Add authentication strategy here later
    }
  },
  {
    method: 'PUT',
    path: '/api/admin/tips/{id}',
    handler: updateTip,
    options: {
      tags: ['api', 'admin', 'tips'],
      description: 'Update an existing daily tip (Admin)',
      validate: {
        params: Joi.object({
          id: Joi.number().integer().required()
        }),
        payload: Joi.object({
          title: Joi.string().optional(),
          content: Joi.string().optional(),
          category: Joi.string().valid('meditation', 'motivation', 'self-care', 'emotional').optional(),
          image_url: Joi.string().uri().optional().allow(null, '')
        })
      }
      // Add authentication strategy here later
    }
  },
  {
    method: 'DELETE',
    path: '/api/admin/tips/{id}',
    handler: deleteTip,
    options: {
      tags: ['api', 'admin', 'tips'],
      description: 'Delete a daily tip (Admin)',
      validate: {
        params: Joi.object({
          id: Joi.number().integer().required()
        })
      }
      // Add authentication strategy here later
    }
  }
];

module.exports = tipsRoutes;
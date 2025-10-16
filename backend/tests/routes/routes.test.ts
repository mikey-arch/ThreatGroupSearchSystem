import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import express from 'express';
import routes from '../../src/routes/routes.ts';
import { connectDB } from '../../src/config/db.ts';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

//Setup Express App for testing
const app = express();
app.use(express.json());
app.use('/api/threatgroups', routes);

describe('Threat Group Routes', () => {
  //Connect to database before tests
  beforeAll(async () => {
    await connectDB();
  });

  //Close database connection after tests
  afterAll(async () => {
    await mongoose.connection.close();
  });

  //Test GET all threat groups
  describe('GET /api/threatgroups', () => {
    it('returns all threat groups', async () => {
      const response = await request(app)
        .get('/api/threatgroups')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });

    it('returns threat groups with required fields', async () => {
      const response = await request(app)
        .get('/api/threatgroups')
        .expect(200);

      const group = response.body[0];
      expect(group).toHaveProperty('canonicalName');
      expect(group).toHaveProperty('description');
      expect(group).toHaveProperty('_id');
    });
  });

  //Test search endpoint
  describe('GET /api/threatgroups/search', () => {
    it('returns search results for canonical name match', async () => {
      const response = await request(app)
        .get('/api/threatgroups/search?query=Lazarus')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0].canonicalName).toMatch(/Lazarus/i);
    });

    it('returns search results for alias match', async () => {
      const response = await request(app)
        .get('/api/threatgroups/search?query=ZINC')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });

    it('returns search results for tag match', async () => {
      const response = await request(app)
        .get('/api/threatgroups/search?query=apt')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });

    it('returns 400 when query parameter is missing', async () => {
      const response = await request(app)
        .get('/api/threatgroups/search')
        .expect(400);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe('Search query is required');
    });

    it('prioritizes canonical name matches first', async () => {
      const response = await request(app)
        .get('/api/threatgroups/search?query=APT')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      // First result should have APT in canonical name
      const firstResult = response.body[0];
      expect(firstResult.canonicalName).toMatch(/APT/i);
    });

    it('limits results to 20', async () => {
      const response = await request(app)
        .get('/api/threatgroups/search?query=a')
        .expect(200);

      expect(response.body.length).toBeLessThanOrEqual(20);
    });
  });

  //Test GET by ID
  describe('GET /api/threatgroups/id/:id', () => {
    it('returns threat group by valid ID', async () => {
      //First get a group to get a valid ID
      const allGroups = await request(app).get('/api/threatgroups');
      const validId = allGroups.body[0]._id;

      const response = await request(app)
        .get(`/api/threatgroups/id/${validId}`)
        .expect(200);

      expect(response.body).toHaveProperty('_id', validId);
      expect(response.body).toHaveProperty('canonicalName');
    });

    it('returns 404 for non-existent ID', async () => {
      //Valid MongoDB ObjectId format
      const fakeId = '507f1f77bcf86cd799439011'; 
      const response = await request(app)
        .get(`/api/threatgroups/id/${fakeId}`)
        .expect(404);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe('Threat Group not found');
    });

    it('returns 500 for invalid ID format', async () => {
      const response = await request(app)
        .get('/api/threatgroups/id/invalid-id')
        .expect(500);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe('Internal server error');
    });
  });

  //Test GET by canonical name
  describe('GET /api/threatgroups/:canonicalName', () => {
    it('returns threat group by canonical name', async () => {
      const response = await request(app)
        .get('/api/threatgroups/Lazarus Group')
        .expect(200);

      expect(response.body).toHaveProperty('canonicalName', 'Lazarus Group');
      expect(response.body).toHaveProperty('description');
    });

    it('returns 404 for non-existent canonical name', async () => {
      const response = await request(app)
        .get('/api/threatgroups/NonExistentGroup')
        .expect(404);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe('Threat group not found');
    });

    it('handles URL-encoded canonical names', async () => {
      const response = await request(app)
        .get('/api/threatgroups/Lazarus%20Group')
        .expect(200);

      expect(response.body).toHaveProperty('canonicalName', 'Lazarus Group');
    });
  });
});

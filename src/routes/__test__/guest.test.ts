﻿/**
 * @jest-environment node
 */

import mongoose from 'mongoose';
import * as mongodbMemoryServer from 'mongodb-memory-server';
import supertest from 'supertest';

import * as App from '../../app';

describe('routes/guest test', () => {

  let mongoServer;
  beforeAll(async () => {
    mongoServer = new mongodbMemoryServer.MongoMemoryServer();
    const mongoUri = await mongoServer.getConnectionString();
    const mongooseOpts = { // options for mongoose 4.11.3 and above
      autoReconnect: true,
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 1000,
    };

    await mongoose.connect(mongoUri, mongooseOpts, err => {
      if (err) {
        console.log('Mongoose connect to MongoMemory failed!');
        console.error(err);
      }
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  const app = App.createApp({isTest: true});

  test('/', async () => {
    const response = await supertest(app).get('/');
    expect(response.status).toBe(200);
  });

  test('/react', async () => {
    const response = await supertest(app).get('/react');
    expect(response.status).toBe(200);
  });

  test('/redux', async () => {
    const response = await supertest(app).get('/redux');
    expect(response.status).toBe(200);
  });
});

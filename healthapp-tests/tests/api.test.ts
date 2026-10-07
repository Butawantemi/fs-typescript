import { test, expect } from '@playwright/test';

test.describe('Health App API', () => {
  test.describe('GET /hello', () => {
    test('should return greeting message', async ({ request }) => {
      const response = await request.get('/hello');
      
      expect(response.ok()).toBeTruthy();
      expect(response.status()).toBe(200);
      
      const text = await response.text();
      expect(text).toBe('Hello Full Stack!');
    });
  });

  test.describe('GET /bmi', () => {
    test('should calculate BMI correctly', async ({ request }) => {
      const response = await request.get('/bmi?height=180&weight=72');
      
      expect(response.ok()).toBeTruthy();
      expect(response.status()).toBe(200);
      
      const body = await response.json();
      expect(body).toHaveProperty('weight', 72);
      expect(body).toHaveProperty('height', 180);
      expect(body).toHaveProperty('bmi');
      expect(typeof body.bmi).toBe('string');
    });

    test('should return error for missing height parameter', async ({ request }) => {
      const response = await request.get('/bmi?weight=72');
      
      expect(response.status()).toBe(400);
      
      const body = await response.json();
      expect(body).toHaveProperty('error', 'malformatted parameters');
    });

    test('should return error for missing weight parameter', async ({ request }) => {
      const response = await request.get('/bmi?height=180');
      
      expect(response.status()).toBe(400);
      
      const body = await response.json();
      expect(body).toHaveProperty('error', 'malformatted parameters');
    });

    test('should return error for non-numeric height', async ({ request }) => {
      const response = await request.get('/bmi?height=abc&weight=72');
      
      expect(response.status()).toBe(400);
      
      const body = await response.json();
      expect(body).toHaveProperty('error', 'malformatted parameters');
    });

    test('should return error for non-numeric weight', async ({ request }) => {
      const response = await request.get('/bmi?height=180&weight=xyz');
      
      expect(response.status()).toBe(400);
      
      const body = await response.json();
      expect(body).toHaveProperty('error', 'malformatted parameters');
    });
  });

  test.describe('POST /exercises', () => {
    test('should calculate exercise statistics correctly', async ({ request }) => {
      const response = await request.post('/exercises', {
        data: {
          daily_exercises: [1, 0, 2, 0, 3, 0, 2.5],
          target: 2
        }
      });
      
      expect(response.ok()).toBeTruthy();
      expect(response.status()).toBe(200);
      
      const body = await response.json();
      expect(body).toHaveProperty('periodLength');
      expect(body).toHaveProperty('trainingDays');
      expect(body).toHaveProperty('success');
      expect(body).toHaveProperty('rating');
      expect(body).toHaveProperty('ratingDescription');
      expect(body).toHaveProperty('target');
      expect(body).toHaveProperty('average');
    });

    test('should return error for missing daily_exercises', async ({ request }) => {
      const response = await request.post('/exercises', {
        data: {
          target: 2
        }
      });
      
      const body = await response.json();
      expect(body).toHaveProperty('error', 'parameters missing');
    });

    test('should return error for missing target', async ({ request }) => {
      const response = await request.post('/exercises', {
        data: {
          daily_exercises: [1, 0, 2, 0, 3, 0, 2.5]
        }
      });
      
      const body = await response.json();
      expect(body).toHaveProperty('error', 'parameters missing');
    });

    test('should return error for non-numeric target', async ({ request }) => {
      const response = await request.post('/exercises', {
        data: {
          daily_exercises: [1, 0, 2, 0, 3, 0, 2.5],
          target: 'abc'
        }
      });
      
      const body = await response.json();
      expect(body).toHaveProperty('error', 'malformatted parameters');
    });

    test('should return error for non-numeric values in daily_exercises', async ({ request }) => {
      const response = await request.post('/exercises', {
        data: {
          daily_exercises: [1, 0, 'two', 0, 3, 0, 2.5],
          target: 2
        }
      });
      
      const body = await response.json();
      expect(body).toHaveProperty('error', 'malformatted parameters');
    });
  });
});

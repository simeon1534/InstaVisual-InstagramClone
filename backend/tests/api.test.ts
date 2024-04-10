import { test, expect, describe } from '@jest/globals'; // Import test and expect functions
import axios, { AxiosRequestConfig } from 'axios'; // Import AxiosRequestConfig for TypeScript typings

describe('Api tests', () => {
    let userId: number;
  const axiosInstance = axios.create({
    headers: {
      Authorization: 'abc123', // Add the Authorization header with its fixed value
      'Content-Type': 'application/json', // Add other headers if needed
    },
  });

  test('Fails with 400 when required fields are missing', async () => {

    // Create an object representing invalid user data with missing required fields
    const invalidUserData = {
      // Missing username, password, and email
    };

    try {
      // Send a POST request to the createUser endpoint with invalid user data
      const response = await axiosInstance.post('http://localhost:5000/user_api/new_user', invalidUserData);

      // If we reach this point, the test should fail because we expect a 400 error
      throw new Error('Expected request to fail with 400 Bad Request');
    } catch (error) {
      // Verify that the error response has status code 400
      expect(error.response.status).toBe(400);

      // Verify the structure of the error response body
      expect(error.response.data).toEqual({
        status: 400,
        message: expect.any(String), // We expect any string message
      });
    }
  });


  // Test to get all users
  test('Get all users', async () => {
  
    const response = await axiosInstance.get('http://localhost:5000/user_api/users');
    expect(response.status).toBe(200);

    
  });

  // Test to create a new user
  test('Create a new user', async () => {
    const newUser = {
      username: 'testuser92Testtest',
      password: 'testpassword',
      email: 'test@example.com',
      last_name: 'Doe',
    };

    const response = await axiosInstance.post('http://localhost:5000/user_api/new_user', newUser);
    expect(response.status).toBe(201);

    
  });

  test('Retrieve user details by username', async () => {
    const username = 'testuser92Testtest';
    const response = await axiosInstance.get(`http://localhost:5000/user_api/username/${username}`);
    expect(response.status).toBe(200);
    userId = response.data[0].user_id;
    // Add assertions to verify the retrieved user details by username
  });

  // Test to retrieve the details of the created user
  test('Retrieve user details by id', async () => {
    const response = await axiosInstance.get(`http://localhost:5000/user_api/user/${userId}`);
    expect(response.status).toBe(200);

    // Add assertions to verify the retrieved user details
  });

  // Test to update the user's details
  test('Update user details', async () => {
    const updatedUserData = {
      username: 'updatedusername',
      first_name: 'John',
    };

    const response = await axiosInstance.put(`http://localhost:5000/user_api/user/update/${userId}`, updatedUserData);
    expect(response.status).toBe(200);

    // Add assertions to verify the response after updating user details
  });

  test('Create photo', async () => {
    
    const sampleImageData = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAA...';

    const mockData = {
      user_id: userId,
      photo_description: "random_description",
      photo_base64: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAA...',
    };
    const response = await axiosInstance.post(`http://localhost:5000/photo_api/new_photo`, mockData);

    expect(response.status).toBe(201);

  });


  test('Create photo', async () => {
    
    const sampleImageData = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAA...';

    const mockData = {
      user_id: userId,
      photo_description: "random_description",
      photo_base64: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAA...',
    };
    const response = await axiosInstance.post(`http://localhost:5000/photo_api/new_photo`, mockData);

    expect(response.status).toBe(201);

  });

  test('Get photos by user id', async () => {

    const response = await axiosInstance.get(`http://localhost:5000/photo_api/user/${userId}`);
    expect(response.status).toBe(200);

  });

  test('Get all photos', async () => {

    const response = await axiosInstance.get(`http://localhost:5000/photo_api/photos`);
    expect(response.status).toBe(200);

  });



  // Test to delete the user
  test('Delete user', async () => {
    const response = await axiosInstance.delete(`http://localhost:5000/user_api/user/delete/${userId}`);
    expect(response.status).toBe(204);

    // Add assertions to verify the response after deleting the user
  });

  

});

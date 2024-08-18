// src/services/slideApi.ts

import { Slide } from '../types';

const API_BASE_URL = 'http://localhost:3001/api/slides';

export const createSlide = async (presentationId: string, content: string): Promise<Slide> => {
    const response = await fetch(`${API_BASE_URL}/${presentationId}/slides`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    });
    if (!response.ok) {
      throw new Error('Failed to create slide');
    }
    return response.json();
  };
  

export const updateSlide = async (id: string, content: string): Promise<Slide> => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content }),
  });
  if (!response.ok) {
    throw new Error('Failed to update slide');
  }
  return response.json();
};

export const deleteSlide = async (id: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete slide');
  }
};

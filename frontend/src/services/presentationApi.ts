// src/services/presentationApi.ts

import { Presentation } from '../types';

const API_BASE_URL = 'http://localhost:3001/api/presentations';

export const getPresentations = async (): Promise<Presentation[]> => {
  const response = await fetch(API_BASE_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch presentations');
  }
  return response.json();
};

export const getPresentationById = async (id: string): Promise<Presentation> => {
  const response = await fetch(`${API_BASE_URL}/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch presentation');
  }
  return response.json();
};

export const createPresentation = async (presentation: Partial<Presentation>): Promise<Presentation> => {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(presentation),
  });
  if (!response.ok) {
    throw new Error('Failed to create presentation');
  }
  return response.json();
};

export const updatePresentation = async (id: string, presentation: Partial<Presentation>): Promise<Presentation> => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(presentation),
  });
  if (!response.ok) {
    throw new Error('Failed to update presentation');
  }
  return response.json();
};

export const deletePresentation = async (id: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete presentation');
  }
};

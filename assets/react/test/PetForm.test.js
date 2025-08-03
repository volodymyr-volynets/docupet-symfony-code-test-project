import React from 'react';
import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import PetForm from '../controllers/PetForm.jsx';

describe('PetForm Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('Form', () => {
    let breeds = {
      'Dog': ['Breed Dog 1', 'Breed Dog 2'],
      'Cat': ['Breed Cat 1', 'Breed Cat 2'],
    };
    render(
      <PetForm breeds={breeds} />
    );
    expect(screen.getByTestId('pet-type')).toBeInTheDocument();
    expect(screen.getByTestId('pet-name')).toBeInTheDocument();
    // todo: add all other fields
    expect(screen.getByText('Continue')).toBeInTheDocument();
  });
});

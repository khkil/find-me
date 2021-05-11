import React from 'react';

export const timeout = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}
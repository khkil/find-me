import React from 'react';

export const timeout = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const timeFormat = (time) => {
  const m = Math.floor(time / 60).toString()
  let s = (time % 60).toString()
  if (s.length === 1) s = `0${s}`
  return `${m}:${s}`
}
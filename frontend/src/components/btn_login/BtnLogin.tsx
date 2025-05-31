import React from 'react';
import { StyleButton } from './styles.ts';

export function ButtonLogin({ name, type }: { name: string; type: string }) {
  return (
    <StyleButton type={type as 'button' | 'submit' | 'reset'}>
      {name}
    </StyleButton>
  );
}

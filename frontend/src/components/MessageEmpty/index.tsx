import React from 'react';
import { Container } from './styles';

type MessageEmptyProps = {
  message: string;
};

export const MessageEmpty = ({ message }: MessageEmptyProps) => {
  return (
    <Container>
      <p>{message}</p>
    </Container>
  );
};

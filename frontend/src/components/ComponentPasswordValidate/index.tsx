import React from 'react';
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';
import { Container, Item, Icon, Text } from './styles';

interface ComponentPasswordValidateProps {
  password: string;
}

export const ComponentPasswordValidate = ({
  password,
}: ComponentPasswordValidateProps) => {
  if (!password) return null;

  const validations = [
    {
      label: '1 caractere maiúsculo',
      isValid: /(?=.*[A-Z])/.test(password),
    },
    {
      label: '1 caractere minúsculo',
      isValid: /(?=.*[a-z])/.test(password),
    },
    {
      label: '1 caractere numérico',
      isValid: /(?=.*\d)/.test(password),
    },
    {
      label: '1 caractere especial',
      isValid: /[^a-zA-Z0-9]/.test(password),
    },
  ];

  return (
    <Container>
      {validations.map((item, index) => (
        <Item key={index}>
          <Icon isValid={item.isValid}>
            {item.isValid ? (
              <AiOutlineCheck size={14} />
            ) : (
              <AiOutlineClose size={14} />
            )}
          </Icon>
          <Text isValid={item.isValid}>{item.label}</Text>
        </Item>
      ))}
    </Container>
  );
};

import styled from 'styled-components';

export const Container = styled.div`
  background: #f5f5f5;
  border-radius: 10px;
  border: 1px solid #5cc9aa;
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  max-width: 90%;
  justify-content: space-between;
  gap: 8px;
  margin-top: 1rem;
`;

export const Item = styled.div`
  width: 48%;
  display: flex;
  align-items: center;
`;

export const Icon = styled.div<{ isValid: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ isValid }) => (isValid ? '#5cc9aa' : '#e36387')};
`;

export const Text = styled.span<{ isValid: boolean }>`
  margin-left: 5px;
  font-size: 13px;
  color: ${({ isValid }) => (isValid ? '#5cc9aa' : '#e36387')};
`;

import styled from '@emotion/styled';

export const StyledTable = styled.table`
  width: fit-content;
  border-collapse: collapse;

  tr:hover {
    background-color: rgba(0, 0, 0, 0.03);
  }

  th,
  td {
    padding: 0.2em 0.5em;
    line-height: 1.3;
  }

  th {
    text-align: right;
    white-space: break-spaces;
  }
`;

import styled from "styled-components";

const StyledInput = styled.input`
  width: ${({ width }) => width || "100%"};
  padding: 8px 12px;
  font-size: ${({ size }) => (size === "small" ? "14px" : "16px")};
  border: 1px solid #616161cd;
  border-radius: 4px;
  outline: none;
  color: #e4e2e2;
  transition: border-color 0.3s ease;
  background-color: #1f2a40;
  margin-right: ${({ marginRight }) => marginRight || "0px"};

  &:focus {
    border-color: #1976d2; /* Material UI primary color */
  }
  &:hover {
    border-color: #ccc;
  }

  ::placeholder {
    color: #a9a9a9;
    opacity: 0.7;
  }
`;

export const Input = ({
  value,
  onChange,
  placeholder,
  width,
  size,
  marginRight,
  type,
}) => {
  return (
    <StyledInput
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required
      placeholder={placeholder}
      width={width}
      size={size}
      marginRight={marginRight}
    />
  );
};

const StyledSelect = styled.select`
  width: ${({ width }) => width || "100%"};
  padding: 8px 12px;
  font-size: ${({ size }) => (size === "small" ? "14px" : "16px")};
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  margin-right: ${({ marginRight }) => marginRight || "0px"};
  margin-inline: auto;
  background-color: #3348749d;
  color: #ededed;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #1976d2;
  }
`;

export const CustomSelect = ({
  priority,
  setPriority,
  width,
  size,
  marginRight,
}) => {
  return (
    <StyledSelect
      value={priority}
      onChange={(e) => setPriority(e.target.value)}
      width={width}
      size={size}
      marginRight={marginRight}
    >
      <option value="3">Urgent</option>
      <option value="2">Routine</option>
      <option value="1">Follow Up</option>
    </StyledSelect>
  );
};

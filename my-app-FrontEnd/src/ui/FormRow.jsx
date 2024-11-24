import styled from "styled-components";

const StyledFormRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;

  padding: 0.8rem 0;
`;

const Label = styled.label`
  font-weight: 500;
  width: 150px;
  text-align: left;
`;
const InputContainer = styled.div`
  flex: 1;
`;

function FormRow({ label, children }) {
  return (
    <StyledFormRow>
      <Label htmlFor={children?.props?.id || "default-id"}>{label}</Label>
      <InputContainer>{children}</InputContainer>
    </StyledFormRow>
  );
}

export default FormRow;

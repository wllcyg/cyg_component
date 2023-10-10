import styled from "styled-components";
interface IndexWrapperProps {
    color?: string;
    size: number;
}
//attrs 可以为props赋
export const IndexWrapper = styled.div<IndexWrapperProps>`
h1{
  color: ${props => props.color};
}
span{
  font-size: ${props => props.size}px;
}  
`
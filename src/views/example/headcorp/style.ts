import styled from "styled-components";

interface CorpWrapper {
  drapValue: object,
}

export const HeadCorpWrapper = styled.div<CorpWrapper>`
  .corpWrapper {
    width: ${props => props.drapValue.wrapWidth}px;
    height: ${props => props.drapValue.wrapHeight}px;

    .baseImg {
      z-index: 2;
    }

    .mask {
      z-index: 2;
    }

    .clipImg {
      z-index: 4;
    }
    .drapBox {
      width: ${props => props.drapValue.dBoxWidth}px;
      height: ${props => props.drapValue.dBoxHeight}px;
      z-index: 12;
      transform: translate(${props => props.drapValue.top}px, ${props => props.drapValue.left}px);
    }
  }
`

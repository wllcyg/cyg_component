import styled from "styled-components";

interface CorpWrapper {
  drapvalue: object,
}


export const HeadCorpWrapper = styled.div<CorpWrapper>`
  .corpWrapper {
    width: ${props => props.drapvalue.wrapWidth}px;
    height: ${props => props.drapvalue.wrapHeight}px;

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
      width: ${props => props.drapvalue.dBoxWidth}px;
      height: ${props => props.drapvalue.dBoxHeight}px;
      z-index: 12;
      transform: translate(${props => props.drapvalue.top}px, ${props => props.drapvalue.left}px);
    }
  }
`

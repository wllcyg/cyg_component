import styled from "styled-components";

const value = '168px'
export const CorpWrapper = styled.div`
  .imageContainer {
    height: 400px;
    width: 50%;
    overflow: hidden;

    img {
      height: 400px;
    }
  }

  .preview {
    .previewbox {
      width: ${value};
      height: ${value};
      overflow: hidden;
      border-radius: 8px;
    }

    .previewboxround {
      width: ${value};
      height: ${value};
      overflow: hidden;
      border-radius: 100%;
    }
  }
`

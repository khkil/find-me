import { useState } from "react";
import contents from "../../dummy/contentsApi.json";
import ResultContentPopup from "./ResultContentPopup";

const ResultContents = () => {
  const [selectedContent, setSelectedContent] = useState(-1);

  const selectContent = (index) => {
    setSelectedContent(index);
  };

  return (
    <div id="root">
      <div className="findme__common__container">
        <div className="findme__common__wrapper">
          <div className="findme__result__other">
            <p className="findme__result__other__label">
              옥타그노시스 <br />
              15가지 성향 알아보기
            </p>
            <div className="findme__result__other__tendency" style={{ whiteSpace: "pre-line" }}>
              {contents.map((content, index) => (
                <dl key={index} onClick={() => selectContent(index)}>
                  <dt>
                    <img src={`${process.env.PUBLIC_URL}/template${content.imgUrl}`} />
                  </dt>
                  <dd>
                    <div className="tit">{content.title}</div>
                    <div className="txt">{content.desc.replaceAll("<br>", "\n")}</div>
                  </dd>
                </dl>
              ))}
            </div>
          </div>
        </div>
      </div>
      {selectedContent > -1 && <ResultContentPopup contents={contents} selectedContent={selectedContent} setSelectedContent={setSelectedContent} />}
    </div>
  );
};

export default ResultContents;

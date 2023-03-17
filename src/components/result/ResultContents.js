import React, { useEffect, useMemo, useState } from "react";
import { getResultContents } from "../../api/resultAPI";
import ResultContentPopup from "./ResultContentPopup";
import contents from "../../dummy/contentsApi.json"

const ResultContents = () => {
  const [selectedContent, setSelectedContent] = useState(null);

  const showContent = (content, index) => {
    setSelectedContent({
      ...content,
      detail: {
        index: index,
        ...content.detail
      }
    });
  };

  const contentDetail = useMemo(() => selectedContent?.detail, [selectedContent]);

  return (
    <div id="root">
      <div className="findme__common__container">
        <div className="findme__common__wrapper">
          <div className="findme__result__other">
            <p className="findme__result__other__label">
              옥타그노시스 <br />
              15가지 성형 알아보기
            </p>
            <div className="findme__result__other__tendency">
              {contents.map((content, index) => (
                <dl key={index} onClick={() => showContent(content, index)}>
                  <dt>
                    <img src={`${process.env.PUBLIC_URL}/template${content.imgUrl}`} />
                  </dt>
                  <dd>
                    <div className="tit">{content.title}</div>
                    <div className="txt">
                      {content.desc.replaceAll("<br>", "\n")}
                    </div>
                  </dd>
                </dl>

              ))}
            </div>
          </div>
        </div>
      </div>
      {
        contentDetail && 
          <ResultContentPopup contentDetail={contentDetail} setSelectedContent={setSelectedContent} lastIndex={contents.length}/>
      }
      
    </div>
  );
};

export default ResultContents;

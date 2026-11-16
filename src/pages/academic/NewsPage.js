import React from "react";
import AcademicPage from "./AcademicPage";
import News from "../home/news/News";

export default function NewsPage(props) {
  return (
    <AcademicPage {...props} title="News" intro={<p>everything, all the way back.</p>}>
      <News theme={props.theme} full />
    </AcademicPage>
  );
}

import React from "react";
import AcademicPage, { AcSection, AcRows } from "./AcademicPage";
import { greeting, teaching, outreach, awards } from "../../config/portfolio";

const afhea = awards.find((a) => a.title.includes("AFHEA"));

export default function Outreach(props) {
  return (
    <AcademicPage {...props} title="Teaching & Outreach" intro={<p>{greeting.outreachAndTeaching}</p>}>
      <AcSection title="Teaching">
        <AcRows rows={teaching.map((t) => ({ when: t.duration, title: `${t.role}, ${t.institution}`, detail: t.course }))} />
      </AcSection>

      <AcSection title="Science communication and outreach">
        <AcRows rows={outreach.map((o) => ({ when: o.duration, title: `${o.role}, ${o.org}`, detail: o.detail, link: o.link }))} />
      </AcSection>

      {afhea && (
        <AcSection title="Recognition">
          <AcRows rows={[{ when: afhea.year, title: afhea.title, sub: afhea.detail }]} />
        </AcSection>
      )}
    </AcademicPage>
  );
}

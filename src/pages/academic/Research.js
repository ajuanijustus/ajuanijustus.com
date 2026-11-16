import React from "react";
import AcademicPage, { AcSection, AcRows } from "./AcademicPage";
import Publications from "../home/publications/Publications";
import RichText from "../../components/richText/RichText";
import { greeting, talks, awards, service, summerSchools, openSource } from "../../config/portfolio";

export default function Research(props) {
  return (
    <AcademicPage
      {...props}
      title="Research"
      intro={
        <>
          <p>{greeting.phdInfo}</p>
          <p>
            <strong>The question I keep coming back to:</strong> {greeting.coreQuestion}
          </p>
          <p>
            <RichText text={greeting.community} />
          </p>
          <p>
            Supervised by{" "}
            {greeting.advisors.map((a, i) => (
              <React.Fragment key={a.name}>
                {i > 0 && " and "}
                <a href={a.link} target="_blank" rel="noopener noreferrer">
                  {a.name}
                </a>
              </React.Fragment>
            ))}
            .
          </p>
        </>
      }
    >
      <AcSection title="Interests">
        <ul className="ac-list">
          {greeting.researchInterests.map((r) => (
            <li key={r}>{r}</li>
          ))}
          <li>Machine learning for music and voice</li>
        </ul>
      </AcSection>

      <Publications theme={props.theme} title="Publications" />

      <AcSection title="Talks">
        <AcRows rows={talks.map((t) => ({ when: t.date, title: t.title, sub: `${t.kind}, ${t.where}` }))} />
      </AcSection>

      <AcSection title="Awards">
        <AcRows rows={awards.map((a) => ({ when: a.year, title: a.title, sub: a.detail }))} />
      </AcSection>

      <AcSection title="Service">
        <ul className="ac-list">
          {service.map((s) => (
            <li key={s.role}>
              <strong>{s.role}</strong>, <RichText text={s.org} />
              {s.detail && `. ${s.detail}`}
            </li>
          ))}
        </ul>
      </AcSection>

      <AcSection title="Summer schools">
        <AcRows rows={summerSchools.map((s) => ({ when: s.year, title: s.name }))} />
      </AcSection>

      <AcSection title="Open source">
        <ul className="ac-list">
          {openSource.map((o) => (
            <li key={o.name}>
              <strong>{o.name}</strong>: {o.detail}
            </li>
          ))}
          <li>
            more on{" "}
            <a className="ac-link" href="https://github.com/ajuanijustus" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </li>
        </ul>
      </AcSection>
    </AcademicPage>
  );
}

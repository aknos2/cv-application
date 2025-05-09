import "../styles/CVtemplate.css";

export default function CVTemplate({ data }) {
  return (
    <>
      <div className="cv-template">
        {data.personalInfo && (
          <section className="name-section">
            <h1>
              {" "}
              {data.personalInfo.firstName} {data.personalInfo.lastName}
            </h1>
            <p>{data.personalInfo.email}</p>
            <p>{data.personalInfo.phoneNumber}</p>
          </section>
        )}

        {data.education && (
          <section className="education-section">
            <h2 className="section-titles">Education</h2>
            <hr />
            {Array.isArray(data.education) &&
              data.education.map((edu) => (
                <div key={edu.id} className="education-section-content">
                  <h2>{edu.schoolName}</h2>
                  <p>{edu.studyField}</p>
                  <p>
                    {edu.dateFrom} / {edu.dateTo}
                  </p>
                </div>
              ))}
          </section>
        )}

        {data.degrees && (
          <section className="degree-section">
            <h2 className="section-titles">Degrees</h2>
            <hr />
            {Array.isArray(data.degrees) &&
              data.degrees.map((deg) => (
                <div key={deg.id} className="degree-section-content">
                  <ul>
                    <li>{deg.degree}</li>
                  </ul>
                </div>
              ))}
          </section>
        )}

        {data.workExperience && (
          <section className="work-section">
            <h2 className="section-titles">Experience</h2>
            <hr />
            {Array.isArray(data.workExperience) &&
              data.workExperience.map((job) => (
                <div key={job.id} className="work-section-content">
                  <h2 className="company-name-wrapper">
                    {job.positionTitle}
                    <spam id="company-name-title">at {job.companyName}</spam>
                  </h2>
                  <p>
                    {job.dateFrom} / {job.dateTo}
                  </p>
                  <p>{job.duties}</p>
                </div>
              ))}
          </section>
        )}
      </div>
    </>
  );
}

import Header from "./Header";

export default function CVTemplate({ data }) {
    return (
        <>
        <Header />
      <div className="cv-template">
        <h1>Curriculum Vitae</h1>
        
        {data.personalInfo && (
          <section>
            <h2>Personal Information</h2>
            <p>Name: {data.personalInfo.firstName} {data.personalInfo.lastName}</p>
            <p>Email: {data.personalInfo.email}</p>
            <p>Phone: {data.personalInfo.phoneNumber}</p>
          </section>
        )}
        
        {data.education && (
          <section>
            <h2>Education</h2>
            {Array.isArray(data.education) && data.education.map(edu => (
              <div key={edu.id}>
                <h3>{edu.schoolName}</h3>
                <p>Field of Study: {edu.studyField}</p>
                <p>From: {edu.dateFrom} To: {edu.dateTo}</p>
              </div>
            ))}
          </section>
        )}
        
        {data.degrees && (
          <section>
            <h2>Degrees</h2>
            {Array.isArray(data.degrees) && data.degrees.map(deg => (
              <div key={deg.id}>
                <p>{deg.degree}</p>
              </div>
            ))}
          </section>
        )}
        
        {data.workExperience && (
          <section>
            <h2>Work Experience</h2>
            {Array.isArray(data.workExperience) && data.workExperience.map(job => (
              <div key={job.id}>
                <h3>{job.positionTitle} at {job.companyName}</h3>
                <p>From: {job.dateFrom} To: {job.dateTo}</p>
                <p>Duties: {job.duties}</p>
              </div>
            ))}
          </section>
        )}
      </div>
      </>
    );
  }
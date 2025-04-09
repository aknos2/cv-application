import NameSection from './components/NameSection'
import Header from './components/Header'
import EducationSection from './components/EducationSection'
import DegreesSection from './components/Degrees'
import WorkSection from './components/WorkExperience'
import Button from './components/Button'
import CVTemplate from './components/CVTemplate'
import { useState } from 'react'

function App() {
  const [formData, setFormData] = useState({
    personalInfo: null,
    education: null,
    degrees: null,
    workExperience: null
  });

  const [showCV, setShowCV] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  
  const updateFormData = (section, data) => {
    setFormData(prevData => ({
      ...prevData,
      [section]: data
    }));
  };

  const generateHandleCV = (e) => {
    e.preventDefault();
    setShowCV(true);
    setIsPreview(false);
  }

  const handlePreviewCV = () => {
    setShowCV(true);
    setIsPreview(true);
  }

  const handleBackToForm = () => {
    setShowCV(false);
    setIsPreview(false);
  }

  return (
    <div>
      {!showCV ? (
        <>
         <Header onPreviewCV={handlePreviewCV} />
          <div className='body-form'>
            <p>Please fill the form to submit your job application.</p>
            <form onSubmit={generateHandleCV}>
              <NameSection 
                onSave={(data) => updateFormData('personalInfo', data)}
                initialData={formData.personalInfo} 
              />
              <EducationSection 
                onSave={(data) => updateFormData('education', data)}
                initialData={formData.education}
              />
              <DegreesSection 
                onSave={(data) => updateFormData('degrees', data)}
                initialData={formData.degrees}
              />
              <WorkSection 
                onSave={(data) => updateFormData('workExperience', data)}
                initialData={formData.workExperience}
              />
              <Button className="generateCV-btn" type="submit" text="Generate CV" aria-label="generate CV" />
            </form>
          </div>
        </>
      ) : (
        <>
          <Header onPreviewCV={handlePreviewCV} showPreviewButton={false} />
          <CVTemplate data={formData} />
          {isPreview ? (
            <div className="preview-buttons">
              <Button onClick={handleBackToForm} text="Back to Form" className='back-btn'/>
            </div>
          ) : (
            <Button onClick={handleBackToForm} text="Back to Form" className='back-btn'/>
          )}
        </>
      )}
    
    </div>
  )
}

export default App

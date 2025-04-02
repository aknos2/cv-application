import NameSection from './components/NameSection'
import Header from './components/Header'
import EducationSection from './components/EducationSection'
import DegreesSection from './components/Degrees'
import WorkSection from './components/WorkExperience'
import Button from './components/Button'

function App() {

  function handleSubmit(e) {
    e.preventDefault(); // Prevent page reload
    alert('Form submitted!');
  }

  return (
    <>
    <Header />
    <div className='body-form'>
      <p>Please fill the form to submit your job application.</p>
    <form onSubmit={handleSubmit}>
      <NameSection />
      <EducationSection />
      <DegreesSection />
      <WorkSection />
      <Button type="submit" text="Submit" aria-label="submit form" />
    </form>
    </div>
    </>
  )
}

export default App

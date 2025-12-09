import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { CourseList } from './components/CourseList'
import { Footer } from './components/Footer'
import { MainLayout } from './layouts/MainLayout'

function App() {
  const scrollToCourses = () => {
    const el = document.getElementById('courses')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <MainLayout>
      <Header onCtaClick={scrollToCourses} />
      <Hero onPrimary={scrollToCourses} />
      <div id="courses">
        <CourseList />
      </div>
      <Footer />
    </MainLayout>
  )
}

export default App

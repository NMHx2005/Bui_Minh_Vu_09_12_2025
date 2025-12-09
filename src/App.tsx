import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { CourseList } from './components/CourseList'
import { Footer } from './components/Footer'
import { MainLayout } from './layouts/MainLayout'

function App() {
  return (
    <MainLayout>
      <Header />
      <Hero />
      <div id="courses">
        <CourseList />
      </div>
      <Footer />
    </MainLayout>
  )
}

export default App

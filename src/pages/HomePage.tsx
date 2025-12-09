import { Header } from '../components/Header'
import { Hero } from '../components/Hero'
import { CourseList } from '../components/CourseList'
import { Footer } from '../components/Footer'

export function HomePage() {
    return (
        <>
            <Header />
            <Hero />
            <div id="courses">
                <CourseList />
            </div>
            <Footer />
        </>
    )
}


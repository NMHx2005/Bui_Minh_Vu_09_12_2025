import { Pagination } from 'antd'
import { useMemo, useState } from 'react'
import db from '../data/db.json'
import type { Course } from '../types/course'
import { CourseCard } from './CourseCard'

const courses = db.courses as Course[]

export function CourseList() {
    const [page, setPage] = useState(1)
    const pageSize = 6

    const pagedCourses = useMemo(() => {
        const start = (page - 1) * pageSize
        return courses.slice(start, start + pageSize)
    }, [page])

    return (
        <section className="w-full bg-linear-to-b from-white via-[#fff5f2] to-white px-6 py-16 md:px-10 lg:px-16 xl:px-[120px]">
            <div className="mb-10 text-center">
                <p className="text-[32px] uppercase tracking-wide text-[#111827] font-semibold md:text-[36px]">
                    Khoá học nổi bật
                </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {pagedCourses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                ))}
            </div>

            <div className="mt-12 flex justify-center">
                <div className="course-pagination w-full">
                    <Pagination
                        current={page}
                        pageSize={pageSize}
                        total={Math.max(courses.length, pageSize * 10)}
                        onChange={(p) => setPage(p)}
                        showSizeChanger={false}
                        itemRender={(_, type, originalElement) => {
                            if (type === 'prev') {
                                return (
                                    <span className="flex items-center gap-2 text-slate-500">
                                        <span>←</span> Previous
                                    </span>
                                )
                            }
                            if (type === 'next') {
                                return (
                                    <span className="flex justify-end items-center gap-2 text-slate-500">
                                        Next <span>→</span>
                                    </span>
                                )
                            }
                            if (type === 'jump-prev' || type === 'jump-next') {
                                return <span className="text-slate-500">…</span>
                            }
                            return originalElement
                        }}
                    />
                </div>
            </div>
        </section>
    )
}


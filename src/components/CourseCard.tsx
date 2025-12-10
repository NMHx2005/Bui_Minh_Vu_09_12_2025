import { BookOutlined, ClockCircleOutlined, RightOutlined, UserOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import type { Course } from '../types/course'

type Props = {
    course: Course
}

export function CourseCard({ course }: Props) {
    return (
        <div className="group flex h-full flex-col overflow-hidden rounded-[28px] bg-white shadow-[0_16px_60px_rgba(0,0,0,0.08)] transition hover:-translate-y-1 hover:shadow-[0_20px_70px_rgba(0,0,0,0.12)]">
            <div className="px-4 pt-4">
                <div className="overflow-hidden rounded-[24px] bg-[#f4762d]">
                    <img
                        src={course.heroImage}
                        alt={course.title}
                        className="h-[320px] w-full object-cover"
                    />
                </div>
            </div>

            <div className="flex flex-1 flex-col gap-4 px-6 py-5">
                <div className="inline-flex w-fit rounded-full bg-[#fbe7e4] px-4 py-2 text-sm font-semibold text-[#e55c34]">
                    {course.level}
                </div>

                <div className="flex flex-wrap items-center gap-3 text-[15px] font-medium text-[#3b3b3b]">
                    <div className="flex items-center gap-2">
                        <ClockCircleOutlined className="text-[#e55c34]" />
                        <span>{course.durationMinutes} phút</span>
                    </div>
                    <span className="text-slate-300">|</span>
                    <div className="flex items-center gap-2">
                        <BookOutlined className="text-[#e55c34]" />
                        <span>{course.chapters} Chương</span>
                    </div>
                    <span className="text-slate-300">|</span>
                    <div className="flex items-center gap-2">
                        <UserOutlined className="text-[#e55c34]" />
                        <span>{course.teacher}</span>
                    </div>
                </div>

                <div className="text-[28px] font-semibold leading-tight text-[#0f0f0f]">{course.title}</div>

                <div className="mt-auto rounded-2xl bg-[#f8dedd] px-6 py-4 text-center">
                    <Link to={`/courses/${course.id}`}>
                        <Button
                            type="text"
                            className="h-auto! w-full p-0! text-lg font-semibold uppercase tracking-wide text-[#d45454]"
                            icon={<RightOutlined className="text-sm" />}
                            iconPosition="end"
                        >
                            Học ngay
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}


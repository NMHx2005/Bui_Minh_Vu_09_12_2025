import { ClockCircleOutlined, CloudUploadOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons'
import { useParams, Link, Navigate } from 'react-router-dom'
import { useState } from 'react'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { SubmissionModal } from '../components/SubmissionModal'
import { LessonSidebar } from '../components/LessonSidebar'

export function ExercisePage() {
    const { id } = useParams<{ id: string }>()
    const [isSubmissionModalVisible, setIsSubmissionModalVisible] = useState(false)

    // Mock data - in a real app, this would come from API
    const exercise = {
        id: id || 'ex1',
        title: 'Web Frontend Fundamental',
        date: '24 tháng 6 năm 2023',
        progress: 30,
        completedLessons: 3,
        totalLessons: 10,
        objectives: [
            'Luyện tập các thẻ định nghĩa khu vực nội dung header, footer, section, article, aside, div có thể kết hợp hx và p',
        ],
        description: 'Thực hiện tạo trang web có nội dung như sau:',
        content: {
            title: 'Sách yêu thích của tôi',
            introduction: 'Tôi là một đọc giả đam mê sách. Dưới đây là những cuốn sách mà tôi yêu thích.',
            books: [
                { type: 'Sách tiểu thuyết', name: 'Đắc nhân tâm', author: 'Dale Carnegie' },
                { type: 'Sách khoa học', name: 'Vũ trụ trong lòng bàn tay', author: 'Neil deGrasse Tyson' },
                { type: 'Sách kinh doanh', name: 'Bí mật của sự giàu có', author: 'T. Harv Eker' },
            ],
            relatedArticles: [
                '10 cuốn sách hay nhất về khoa học',
                'Cách trở thành một đọc giả đam mê',
            ],
            contact: 'example@gmail.com',
        },
        evaluation: [
            'Đưa mã nguồn lên GitHub.',
            'Dán link của repository lên phần nộp bài trên hệ thống.',
        ],
    }

    const handleSubmit = (data: { repository: string; branch: string; file: string }) => {
        console.log('Submission data:', data)
        // Handle submission logic here
    }

    // Mock sessions data for sidebar
    const sessions = [
        {
            id: 's1',
            title: 'Từ vựng',
            subSessions: [
                {
                    id: 'ss1',
                    title: 'Lession 1: Phó từ láy',
                    lessons: [
                        {
                            id: 'l1',
                            title: 'Form & Table',
                            type: 'video' as const,
                            duration: '10:34',
                            completed: true,
                            link: '/courses/c1',
                        },
                        {
                            id: 'l2',
                            title: 'Luyện tập Function',
                            type: 'video' as const,
                            duration: '10:34',
                            completed: false,
                            active: true,
                            link: '/courses/c1',
                        },
                        {
                            id: 'l3',
                            title: 'Tổng quan về Git',
                            type: 'video' as const,
                            duration: '5 phút',
                            completed: false,
                            link: '/courses/c1',
                        },
                        {
                            id: 'l4',
                            title: '[Quizz] JS Cơ bản',
                            type: 'quiz' as const,
                            questions: 6,
                            completed: false,
                            link: '/quizzes/quiz1',
                        },
                    ],
                },
            ],
        },
        {
            id: 's2',
            title: 'Tính từ',
            subSessions: [
                {
                    id: 'ss2',
                    title: 'Lession 2: Tính từ',
                    lessons: [
                        {
                            id: 'l5',
                            title: 'Basic HTML Tag',
                            type: 'video' as const,
                            duration: '10:34',
                            completed: false,
                            link: '/courses/c1',
                        },
                        {
                            id: 'l6',
                            title: '[Quizz] JS Nâng cao',
                            type: 'quiz' as const,
                            questions: 6,
                            completed: false,
                            link: '/quizzes/quiz1',
                        },
                    ],
                },
            ],
        },
        {
            id: 's3',
            title: 'Danh từ',
            subSessions: [
                {
                    id: 'ss3',
                    title: 'Lession 3: Danh từ',
                    lessons: [
                        {
                            id: 'l7',
                            title: 'HTML Layout Structure',
                            type: 'video' as const,
                            duration: '10:34',
                            completed: false,
                            link: '/courses/c1',
                        },
                        {
                            id: 'l8',
                            title: '[Quizz] JS Cơ bản',
                            type: 'quiz' as const,
                            questions: 6,
                            completed: false,
                            link: '/quizzes/quiz1',
                        },
                        {
                            id: 'l9',
                            title: 'HTML In Real World',
                            type: 'video' as const,
                            duration: '10:34',
                            completed: false,
                            link: '/courses/c1',
                        },
                    ],
                },
            ],
        },
    ]

    const homeworkLessons = [
                        {
                            id: 'hw1',
                            title: 'Các thẻ sanh sách',
                            type: 'exercise' as const,
                            duration: '10 phút',
                            link: '/exercises/ex1',
                            active: id === 'ex1',
                            completed: false,
                        },
                        {
                            id: 'hw2',
                            title: 'Tạo trang CV cá nhân',
                            type: 'exercise' as const,
                            duration: '10 phút',
                            link: '/exercises/ex2',
                            active: id === 'ex2',
                            completed: false,
                        },
                        {
                            id: 'hw3',
                            title: 'Kết hợp thẻ nav, a để làm menu',
                            type: 'exercise' as const,
                            duration: '10 phút',
                            link: '/exercises/ex3',
                            active: id === 'ex3',
                            completed: false,
                        },
                        {
                            id: 'hw4',
                            title: 'Thực hành thẻ img',
                            type: 'exercise' as const,
                            duration: '10 phút',
                            link: '/exercises/ex4',
                            active: id === 'ex4',
                            completed: false,
                        },
    ]

    return (
        <div className="min-h-screen bg-white">
            <Header />
            <div className="px-6 py-8 md:px-10 lg:px-16 xl:px-[120px]">
                <div className="flex flex-col gap-8 lg:flex-row relative">
                    {/* Left Column - Main Content */}
                    <div className="flex-1">
                        {/* Breadcrumb and Navigation */}
                        <div className="mb-4 md:mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                    <div className="flex items-center gap-2 text-xs md:text-sm">
                        <Link to="/" className="text-[#b5b5b5] hover:text-slate-600 transition">
                            Trang chủ
                        </Link>
                        <span className="text-[#b5b5b5]">/</span>
                        <span className="text-[#3d3d3d] truncate max-w-[200px] sm:max-w-none">{exercise.title}</span>
                    </div>

                    <div className="flex items-center gap-3 md:gap-4">
                        <button className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm text-[#a6a6a6] hover:text-slate-900 transition-colors duration-200 hover:scale-105">
                            <LeftOutlined className="h-4 w-4 md:h-5 md:w-5" />
                            <span className="hidden sm:inline">Bài trước</span>
                        </button>
                        <button className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm text-[#dd673c] hover:text-[#f4762d] transition-colors duration-200 hover:scale-105">
                            <span className="hidden sm:inline">Bài tiếp theo</span>
                            <RightOutlined className="h-4 w-4 md:h-5 md:w-5" />
                        </button>
                    </div>
                </div>

                {/* Progress Indicator */}
                <div className="mb-4 md:mb-6 flex items-center gap-3 md:gap-4">
                    <div className="relative h-12 w-12 md:h-16 md:w-16">
                        <svg className="h-12 w-12 md:h-16 md:w-16 -rotate-90 transform">
                            <circle
                                cx="24"
                                cy="24"
                                r="20"
                                stroke="#e5e7eb"
                                strokeWidth="3"
                                fill="none"
                                className="md:hidden"
                            />
                            <circle
                                cx="24"
                                cy="24"
                                r="20"
                                stroke="#f4762d"
                                strokeWidth="3"
                                fill="none"
                                strokeDasharray={`${2 * Math.PI * 20}`}
                                strokeDashoffset={`${2 * Math.PI * 20 * (1 - exercise.progress / 100)}`}
                                className="md:hidden"
                            />
                            <circle
                                cx="32"
                                cy="32"
                                r="28"
                                stroke="#e5e7eb"
                                strokeWidth="4"
                                fill="none"
                                className="hidden md:block"
                            />
                            <circle
                                cx="32"
                                cy="32"
                                r="28"
                                stroke="#f4762d"
                                strokeWidth="4"
                                fill="none"
                                strokeDasharray={`${2 * Math.PI * 28}`}
                                strokeDashoffset={`${2 * Math.PI * 28 * (1 - exercise.progress / 100)}`}
                                className="hidden md:block"
                            />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-xs md:text-sm font-semibold text-slate-900">{exercise.progress}%</span>
                        </div>
                    </div>
                    <div className="text-sm md:text-base text-slate-600">
                        <span className="font-semibold text-slate-900">{exercise.completedLessons}/{exercise.totalLessons}</span> Bài học
                    </div>
                </div>

                {/* Title */}
                <h1 className="mb-3 md:mb-4 text-lg md:text-xl lg:text-2xl font-bold text-slate-900">
                    Các thẻ định nghĩa khu vực nội dung header, footer, section, article, aside, div có thể kết hợp hx và p
                </h1>

                {/* Date */}
                <div className="mb-6 md:mb-8 flex items-center gap-2 text-sm md:text-base text-slate-600">
                    <ClockCircleOutlined />
                    <span>{exercise.date}</span>
                </div>

                {/* Main Content */}
                <div className="space-y-6 md:space-y-8">
                    {/* Mục tiêu */}
                    <div>
                        <h2 className="mb-3 md:mb-4 text-lg md:text-xl font-semibold text-slate-900">Mục tiêu</h2>
                        <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-slate-600">
                            {exercise.objectives.map((objective, index) => (
                                <li key={index}>{objective}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Mô tả */}
                    <div>
                        <h2 className="mb-3 md:mb-4 text-lg md:text-xl font-semibold text-slate-900">Mô tả</h2>
                        <p className="mb-3 md:mb-4 text-sm md:text-base text-slate-600">{exercise.description}</p>
                        
                        {/* Content Box */}
                        <div className="rounded-lg border border-slate-200 bg-white p-4 md:p-6 shadow-sm">
                            <h3 className="mb-3 md:mb-4 text-base md:text-lg font-semibold text-slate-900">{exercise.content.title}</h3>
                            
                            <p className="mb-3 md:mb-4 text-sm md:text-base text-slate-600">{exercise.content.introduction}</p>
                            
                            <div className="space-y-3 mb-4">
                                {exercise.content.books.map((book, index) => (
                                    <div key={index}>
                                        <span className="font-semibold text-slate-900">{book.type}:</span>{' '}
                                        <span className="text-slate-600">"{book.name}" - {book.author}</span>
                                    </div>
                                ))}
                            </div>
                            
                            <div className="mb-4">
                                <h4 className="mb-2 font-semibold text-slate-900">Bài viết liên quan:</h4>
                                <ul className="list-disc list-inside space-y-1 text-slate-600">
                                    {exercise.content.relatedArticles.map((article, index) => (
                                        <li key={index}>{article}</li>
                                    ))}
                                </ul>
                            </div>
                            
                            <div>
                                <span className="font-semibold text-slate-900">Liên hệ:</span>{' '}
                                <span className="text-slate-600">{exercise.content.contact}</span>
                            </div>
                        </div>
                    </div>

                    {/* Đánh giá */}
                    <div>
                        <h2 className="mb-3 md:mb-4 text-lg md:text-xl font-semibold text-slate-900">Đánh giá</h2>
                        <p className="mb-3 md:mb-4 text-sm md:text-base text-slate-600">
                            Để hoàn thành bài thực hành, học viên cần :
                        </p>
                        <ol className="list-decimal list-inside space-y-2 text-sm md:text-base text-slate-600">
                            {exercise.evaluation.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ol>
                    </div>
                </div>

                        {/* Submit Button */}
                        <div className="mt-12 flex justify-center">
                            <button
                                onClick={() => setIsSubmissionModalVisible(true)}
                                className="flex items-center gap-2 rounded-lg bg-[#DD673C] px-8 py-3 text-white font-semibold hover:bg-[#C85A2F] transition-colors duration-200"
                            >
                                <CloudUploadOutlined />
                                <span>Nộp bài</span>
                            </button>
                        </div>
                    </div>

                    {/* Right Column - Lesson Sidebar */}
                    <LessonSidebar sessions={sessions} homeworkLessons={homeworkLessons} />
                </div>
            </div>

            <SubmissionModal
                visible={isSubmissionModalVisible}
                onClose={() => setIsSubmissionModalVisible(false)}
                onSubmit={handleSubmit}
            />
            <Footer />
        </div>
    )
}


import { CheckCircleOutlined, PlayCircleOutlined, FileTextOutlined, UpOutlined, DownOutlined, ThunderboltOutlined, CodeOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons'
import { useParams, Link, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import db from '../data/db.json'
import type { Course } from '../types/course'

const courses = db.courses as Course[]
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { VideoWarningModal } from '../components/VideoWarningModal'
import { LoadingProgressModal } from '../components/LoadingProgressModal'

export function CourseDetailPage() {
    const { id } = useParams<{ id: string }>()
    const course = courses.find((c) => c.id === id)
    const [expandedSessions, setExpandedSessions] = useState<Set<string>>(new Set(['s1', 's3']))
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)
    const [isSidebarVisible, setIsSidebarVisible] = useState(true)
    const [isWarningModalVisible, setIsWarningModalVisible] = useState(false)
    const [isLoadingModalVisible, setIsLoadingModalVisible] = useState(false)
    const [loadingProgress, setLoadingProgress] = useState(0)

    // Simulate loading progress when modal is visible
    useEffect(() => {
        if (!isLoadingModalVisible) {
            return
        }

        const interval = setInterval(() => {
            setLoadingProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval)
                    setTimeout(() => {
                        setIsLoadingModalVisible(false)
                    }, 500)
                    return 100
                }
                return prev + 2
            })
        }, 50)

        return () => clearInterval(interval)
    }, [isLoadingModalVisible])

    if (!course) {
        return <Navigate to="/" replace />
    }

    const toggleSession = (sessionId: string) => {
        const newExpanded = new Set(expandedSessions)
        if (newExpanded.has(sessionId)) {
            newExpanded.delete(sessionId)
        } else {
            newExpanded.add(sessionId)
        }
        setExpandedSessions(newExpanded)
    }

    // Mock lesson data - in a real app, this would come from a data source
    const sessions = [
        {
            id: 's1',
            title: 'Từ vựng',
            lessons: [
                {
                    id: 'l1',
                    title: 'Form & Table',
                    type: 'video',
                    duration: '10:34',
                    completed: true,
                },
                {
                    id: 'l2',
                    title: 'Luyện tập Function',
                    type: 'video',
                    duration: '10:34',
                    completed: false,
                    active: true,
                },
                {
                    id: 'l3',
                    title: 'Tổng quan về Git',
                    type: 'video',
                    duration: '5 phút',
                    completed: false,
                },
                {
                    id: 'l4',
                    title: '[Quizz] JS Cơ bản',
                    type: 'quiz',
                    questions: 6,
                    completed: false,
                },
            ],
            subSessions: [
                {
                    id: 'ss1',
                    title: 'Lession 1: Phó từ láy',
                    lessons: [
                        {
                            id: 'l1',
                            title: 'Form & Table',
                            type: 'video',
                            duration: '10:34',
                            completed: true,
                        },
                        {
                            id: 'l2',
                            title: 'Luyện tập Function',
                            type: 'video',
                            duration: '10:34',
                            completed: false,
                            active: true,
                        },
                        {
                            id: 'l3',
                            title: 'Tổng quan về Git',
                            type: 'video',
                            duration: '5 phút',
                            completed: false,
                        },
                        {
                            id: 'l4',
                            title: '[Quizz] JS Cơ bản',
                            type: 'quiz',
                            questions: 6,
                            completed: false,
                        },
                    ],
                },
            ],
        },
        {
            id: 's2',
            title: 'Tính từ',
            lessons: [
                {
                    id: 'l5',
                    title: 'Basic HTML Tag',
                    type: 'video',
                    duration: '10:34',
                    completed: false,
                },
                {
                    id: 'l6',
                    title: '[Quizz] JS Nâng cao',
                    type: 'quiz',
                    questions: 6,
                    completed: false,
                },
            ],
            subSessions: [
                {
                    id: 'ss2',
                    title: 'Lession 2: Tính từ',
                    lessons: [
                        {
                            id: 'l5',
                            title: 'Basic HTML Tag',
                            type: 'video',
                            duration: '10:34',
                            completed: false,
                        },
                        {
                            id: 'l6',
                            title: '[Quizz] JS Nâng cao',
                            type: 'quiz',
                            questions: 6,
                            completed: false,
                        },
                    ],
                },
            ],
        },
        {
            id: 's3',
            title: 'Danh từ',
            lessons: [
                {
                    id: 'l7',
                    title: 'HTML Layout Structure',
                    type: 'video',
                    duration: '10:34',
                    completed: false,
                },
                {
                    id: 'l8',
                    title: '[Quizz] JS Cơ bản',
                    type: 'quiz',
                    questions: 6,
                    completed: false,
                },
                {
                    id: 'l9',
                    title: 'HTML In Real World',
                    type: 'video',
                    duration: '10:34',
                    completed: false,
                },
            ],
            subSessions: [
                {
                    id: 'ss3',
                    title: 'Lession 3: Danh từ',
                    lessons: [
                        {
                            id: 'l7',
                            title: 'HTML Layout Structure',
                            type: 'video',
                            duration: '10:34',
                            completed: false,
                        },
                        {
                            id: 'l8',
                            title: '[Quizz] JS Cơ bản',
                            type: 'quiz',
                            questions: 6,
                            completed: false,
                        },
                        {
                            id: 'l9',
                            title: 'HTML In Real World',
                            type: 'video',
                            duration: '10:34',
                            completed: false,
                        },
                    ],
                },
            ],
        },
    ]

    const completedLessons = sessions.reduce((acc, session) => {
        const sessionLessons = session.subSessions?.reduce((subAcc, subSession) => {
            return subAcc + subSession.lessons.filter((l) => l.completed).length
        }, 0) || 0
        return acc + sessionLessons
    }, 0)
    const totalLessons = sessions.reduce((acc, session) => {
        const sessionLessons = session.subSessions?.reduce((subAcc, subSession) => {
            return subAcc + subSession.lessons.length
        }, 0) || 0
        return acc + sessionLessons
    }, 0)
    const progress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0

    return (
        <div className="min-h-screen bg-white">
            <Header />
            <div className="px-6 py-8 md:px-10 lg:px-16 xl:px-[120px]">
                <div className="flex flex-col gap-8 lg:flex-row relative">
                    {/* Left Column - All content except lesson list */}
                    <div className={`flex-1 transition-all duration-300 ${!isSidebarVisible ? 'w-full' : ''}`}>
                        {/* Breadcrumb and Navigation - Same row */}
                        <div className="mb-4 md:mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                            {/* Breadcrumb */}
                            <div className="flex items-center gap-2 text-xs md:text-sm">
                                <Link to="/" className="text-[#b5b5b5] hover:text-slate-600 transition">
                                    Trang chủ
                                </Link>
                                <span className="text-[#b5b5b5]">/</span>
                                <span className="text-[#3d3d3d] truncate max-w-[200px] sm:max-w-none">{course.title}</span>
                            </div>

                            {/* Navigation Buttons */}
                            <div className="flex items-center gap-3 md:gap-4">
                                <button className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm text-[#a6a6a6] hover:text-slate-900 transition-colors duration-200 hover:scale-105">
                                    <LeftOutlined className="h-4 w-4 md:h-5 md:w-5 transition-transform duration-200 group-hover:-translate-x-1" />
                                    <span className="hidden sm:inline">Bài trước</span>
                                </button>
                                <button className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm text-[#dd673c] hover:text-[#f4762d] transition-colors duration-200 hover:scale-105">
                                    <span className="hidden sm:inline">Bài tiếp theo</span>
                                    <RightOutlined className="h-4 w-4 md:h-5 md:w-5 transition-transform duration-200 group-hover:translate-x-1" />
                                </button>
                            </div>
                        </div>
                        {/* Video Player - Placeholder for YouTube embed */}
                        <div
                            className="mb-6 aspect-video w-full overflow-hidden rounded-xl bg-[#f4762d] cursor-pointer"
                            onClick={() => {
                                setLoadingProgress(0)
                                setIsLoadingModalVisible(true)
                            }}
                            onDoubleClick={() => setIsWarningModalVisible(true)}
                        >
                            <div className="relative h-full w-full flex items-center justify-center">
                                <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-orange-600"></div>
                                <div className="relative z-10 text-center">
                                    <div className="mb-4 text-6xl font-bold text-yellow-200">N1 CHILL CLASS</div>
                                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-yellow-400 shadow-lg">
                                        <PlayCircleOutlined className="ml-1 text-4xl text-white" />
                                    </div>
                                </div>
                            </div>
                            {/* YouTube iframe will be embedded here */}
                        </div>

                        {/* Video Title */}
                        <h1 className="mb-3 md:mb-4 text-xl md:text-2xl font-bold text-slate-900">{course.title}</h1>

                        {/* Date */}
                        <div className="mb-3 md:mb-4 text-sm md:text-base text-slate-600">
                            <span>• 24 tháng 6 năm 2023</span>
                        </div>

                        {/* Progress */}
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
                                        strokeDashoffset={`${2 * Math.PI * 20 * (1 - progress / 100)}`}
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
                                        strokeDashoffset={`${2 * Math.PI * 28 * (1 - progress / 100)}`}
                                        className="hidden md:block"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-xs md:text-sm font-semibold text-slate-900">{progress}%</span>
                                </div>
                            </div>
                            <div className="text-sm md:text-base text-slate-600">
                                <span className="font-semibold text-slate-900">{completedLessons}/{totalLessons}</span> Bài học
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mb-4 md:mb-6">
                            <h2 className="mb-3 md:mb-4 text-lg md:text-xl font-semibold text-slate-900">Mô tả</h2>
                            <div className="text-sm md:text-base text-slate-600 leading-relaxed">
                                {isDescriptionExpanded ? (
                                    <p>
                                        Lorem ipsum dolor sit amet consectetur: Ornare eu elementum felis porttitor nunc tortor. Ornare neque accumsan metus nulla ultricies maecenas rhoncus ultrices cras. Vestibulum varius adipiscing ipsum pharetra. Semper ullamcorper malesuada ut auctor scelerisque. Sit morbi pellentesque adipiscing pellentesque habitant ullamcorper est. In dolor sit platea faucibus ut dignissim pulvinar. Semper lacinia non lectus mauris sed eget scelerisque facilisis donec: Tellus molestie leo gravida feugiat. Ipsum est lacus lobortis accumsan eget. Sit parturient viverra ut cursus. Vestibulum non et ullamcorper fermentum fringilla est. A nullam diam rhoncus pellentesque eleifend risus ut libero. Eget gravida fermentum nisi dignissim senectus pellentesque egestas. Pellentesque scelerisque arcu congue lorem. In quis sagittis netus lacinia ut vitae. Vitae quam nunc quis libero in. Viverra purus elementum risus feugiat in est. Ut sit a erat ante aliquam. Nec viverra nibh orci erat feugiat viverra viverra sit faucibus. Adipiscing vel nunc integer mi montes cras magna. Est vitae posuere quis sed quam vivamus urna lorem dolor.
                                    </p>
                                ) : (
                                    <p>
                                        Lorem ipsum dolor sit amet consectetur: Ornare eu elementum felis porttitor nunc tortor. Ornare neque accumsan metus nulla ultricies maecenas rhoncus ultrices cras. Vestibulum varius adipiscing ipsum pharetra. Semper ullamcorper malesuada ut auctor scelerisque. Sit morbi pellentesque adipiscing pellentesque habitant ullamcorper est. In dolor sit platea faucibus ut dignissim pulvinar. Semper lacinia non lectus mauris sed eget scelerisque facilisis donec: Tellus molestie leo gravida feugiat. Ipsum est lacus lobortis accumsan eget. Sit parturient viverra ut cursus. Vestibulum non et ullamcorper fermentum fringilla est.
                                    </p>
                                )}
                            </div>
                            <button
                                onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                                className="mt-2 text-[#f4762d] hover:text-[#dd673c] hover:underline transition-colors duration-200"
                            >
                                {isDescriptionExpanded ? 'Ẩn bớt' : 'Xem thêm'}
                            </button>
                        </div>
                    </div>

                    {/* Right Column - Lesson List */}
                    {isSidebarVisible && (
                        <div className="w-full lg:w-[278px] transition-all duration-300">
                            <div className="sticky top-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                                <h2
                                    className="mb-6 flex items-center gap-2 text-xl font-semibold text-slate-900 cursor-pointer hover:text-[#f4762d] transition-colors duration-200"
                                    onClick={() => setIsSidebarVisible(false)}
                                >
                                    <span className="text-2xl">≡</span>
                                    <span>Danh sách bài học</span>
                                </h2>

                                <div className="space-y-[24px]">
                                    {sessions.map((session) => {
                                        const isExpanded = expandedSessions.has(session.id)
                                        return (
                                            <div key={session.id} className="space-y-[10px]">
                                                {/* Session Header */}
                                                <button
                                                    onClick={() => toggleSession(session.id)}
                                                    className="flex w-full items-center justify-between hover:bg-slate-50 rounded px-2 py-1 transition-colors duration-200 group"
                                                >
                                                    <h3 className="text-base font-normal text-black group-hover:text-[#f4762d] transition-colors duration-200">
                                                        Session {sessions.indexOf(session) + 1}: {session.title}
                                                    </h3>
                                                    {isExpanded ? (
                                                        <UpOutlined className="h-4 w-4 text-black group-hover:text-[#f4762d] transition-all duration-200" />
                                                    ) : (
                                                        <DownOutlined className="h-4 w-4 text-black group-hover:text-[#f4762d] transition-all duration-200" />
                                                    )}
                                                </button>

                                                {/* Session Content */}
                                                {isExpanded && (
                                                    <div className="space-y-2">
                                                        {session.subSessions?.map((subSession) => (
                                                            <div key={subSession.id} className="space-y-2">
                                                                <div className="ml-5 text-sm font-normal text-[#3d3d3d]">
                                                                    {subSession.title}
                                                                </div>
                                                                <div className="space-y-2">
                                                                    {subSession.lessons.map((lesson) => (
                                                                        <div
                                                                            key={lesson.id}
                                                                            className={`group flex items-start gap-3 rounded px-5 py-2 transition-all duration-200 cursor-pointer ${lesson.active
                                                                                ? 'bg-[#fff5f2] border-l-4 border-[#f4762d]'
                                                                                : 'hover:bg-slate-50 hover:border-l-4 hover:border-slate-300'
                                                                                }`}
                                                                        >
                                                                            <div className="mt-1 flex-shrink-0">
                                                                                {lesson.completed ? (
                                                                                    <CheckCircleOutlined className="h-5 w-5 text-[#12b76a] group-hover:scale-110 transition-transform duration-200" />
                                                                                ) : lesson.active ? (
                                                                                    <FileTextOutlined className="h-5 w-5 text-[#505050] group-hover:text-[#f4762d] transition-colors duration-200" />
                                                                                ) : lesson.type === 'quiz' ? (
                                                                                    <ThunderboltOutlined className="h-5 w-5 text-[#505050] group-hover:text-[#f4762d] transition-colors duration-200" />
                                                                                ) : lesson.type === 'exercise' ? (
                                                                                    <CodeOutlined className="h-5 w-5 text-[#505050] group-hover:text-[#f4762d] transition-colors duration-200" />
                                                                                ) : (
                                                                                    <PlayCircleOutlined className="h-5 w-5 text-[#505050] group-hover:text-[#f4762d] transition-colors duration-200" />
                                                                                )}
                                                                            </div>
                                                                            <div className="flex-1 min-w-0">
                                                                                <div className={`text-sm font-normal leading-5 transition-colors duration-200 ${lesson.active ? 'text-[#3d3d3d]' : 'text-[#3d3d3d] group-hover:text-[#f4762d]'
                                                                                    }`}>
                                                                                    {lesson.title}
                                                                                </div>
                                                                                <div className="mt-1 flex items-center gap-2 text-xs font-normal text-[#676767]">
                                                                                    <span>
                                                                                        {lesson.type === 'quiz'
                                                                                            ? 'Bài kiểm tra'
                                                                                            : lesson.type === 'exercise'
                                                                                                ? 'Bài tập'
                                                                                                : 'Video'}
                                                                                    </span>
                                                                                    <span className="h-1 w-1 rounded-full bg-[#676767]"></span>
                                                                                    <span>
                                                                                        {lesson.type === 'quiz'
                                                                                            ? `${lesson.questions} câu hỏi`
                                                                                            : lesson.duration}
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        )
                                    })}

                                    {/* Bài tập về nhà Section */}
                                    <div className="space-y-2">
                                        <div className="ml-5 text-sm font-normal text-[#3d3d3d]">
                                            Bài tập về nhà
                                        </div>
                                        <div className="space-y-2">
                                            <div className="group flex items-start gap-3 rounded px-5 py-2 cursor-pointer hover:bg-slate-50 hover:border-l-4 hover:border-slate-300 transition-all duration-200">
                                                <CodeOutlined className="mt-1 h-5 w-5 flex-shrink-0 text-[#505050] group-hover:text-[#f4762d] transition-colors duration-200" />
                                                <div className="flex-1 min-w-0">
                                                    <div className="text-sm font-normal text-[#3d3d3d] leading-5 group-hover:text-[#f4762d] transition-colors duration-200">
                                                        Các thẻ sanh sách
                                                    </div>
                                                    <div className="mt-1 flex items-center gap-2 text-xs font-normal text-[#676767]">
                                                        <span>Bài tập</span>
                                                        <span className="h-1 w-1 rounded-full bg-[#676767]"></span>
                                                        <span>10 phút</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="group flex items-start gap-3 rounded px-5 py-2 cursor-pointer hover:bg-slate-50 hover:border-l-4 hover:border-slate-300 transition-all duration-200">
                                                <CodeOutlined className="mt-1 h-5 w-5 flex-shrink-0 text-[#505050] group-hover:text-[#f4762d] transition-colors duration-200" />
                                                <div className="flex-1 min-w-0">
                                                    <div className="text-sm font-normal text-[#3d3d3d] leading-5 group-hover:text-[#f4762d] transition-colors duration-200">
                                                        Tạo trang CV cá nhân
                                                    </div>
                                                    <div className="mt-1 flex items-center gap-2 text-xs font-normal text-[#676767]">
                                                        <span>Bài tập</span>
                                                        <span className="h-1 w-1 rounded-full bg-[#676767]"></span>
                                                        <span>10 phút</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="group flex items-start gap-3 rounded px-5 py-2 cursor-pointer hover:bg-slate-50 hover:border-l-4 hover:border-slate-300 transition-all duration-200">
                                                <CodeOutlined className="mt-1 h-5 w-5 flex-shrink-0 text-[#505050] group-hover:text-[#f4762d] transition-colors duration-200" />
                                                <div className="flex-1 min-w-0">
                                                    <div className="text-sm font-normal text-[#3d3d3d] leading-5 group-hover:text-[#f4762d] transition-colors duration-200">
                                                        Kết hợp thẻ nav, a để làm menu
                                                    </div>
                                                    <div className="mt-1 flex items-center gap-2 text-xs font-normal text-[#676767]">
                                                        <span>Bài tập</span>
                                                        <span className="h-1 w-1 rounded-full bg-[#676767]"></span>
                                                        <span>10 phút</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="group flex items-start gap-3 rounded px-5 py-2 cursor-pointer hover:bg-slate-50 hover:border-l-4 hover:border-slate-300 transition-all duration-200">
                                                <CodeOutlined className="mt-1 h-5 w-5 flex-shrink-0 text-[#505050] group-hover:text-[#f4762d] transition-colors duration-200" />
                                                <div className="flex-1 min-w-0">
                                                    <div className="text-sm font-normal text-[#3d3d3d] leading-5 group-hover:text-[#f4762d] transition-colors duration-200">
                                                        Thực hành thẻ img
                                                    </div>
                                                    <div className="mt-1 flex items-center gap-2 text-xs font-normal text-[#676767]">
                                                        <span>Bài tập</span>
                                                        <span className="h-1 w-1 rounded-full bg-[#676767]"></span>
                                                        <span>10 phút</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Floating button to show sidebar when hidden */}
                {!isSidebarVisible && (
                    <button
                        onClick={() => setIsSidebarVisible(true)}
                        className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#f4762d] text-white shadow-lg hover:bg-[#dd673c] transition-all duration-200 hover:scale-110"
                        aria-label="Hiển thị danh sách bài học"
                    >
                        <span className="text-2xl">≡</span>
                    </button>
                )}
            </div>
            <VideoWarningModal
                visible={isWarningModalVisible}
                onClose={() => setIsWarningModalVisible(false)}
            />
            <LoadingProgressModal
                visible={isLoadingModalVisible}
                progress={loadingProgress}
            />
            <Footer />
        </div>
    )
}


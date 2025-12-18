import { ClockCircleOutlined, LeftOutlined, RightOutlined, ReloadOutlined, CheckCircleOutlined, CloseCircleOutlined, ThunderboltOutlined } from '@ant-design/icons'
import { useParams, Link, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { LessonSidebar } from '../components/LessonSidebar'

type QuizState = 'start' | 'questions' | 'results'

type Question = {
    id: string
    text: string
    points: number
    options: string[]
    correctAnswer: number
}

export function QuizPage() {
    const { id } = useParams<{ id: string }>()
    const [quizState, setQuizState] = useState<QuizState>('start')
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({})
    const [timeRemaining, setTimeRemaining] = useState(85) // 1 minute 25 seconds
    const [score, setScore] = useState(0)

    // Mock quiz data
    const quiz = {
        id: id || 'quiz1',
        title: '[Quizz] JS Cơ bản',
        date: '24 tháng 6 năm 2023',
        totalQuestions: 6,
        description: 'Ornare eu elementum felis porttitor nunc tortor. Ornare neque accumsan metus nulla ultricies maecenas rhoncus ultrices cras. Vestibulum varius adipiscing ipsum pharetra.',
        fullDescription: 'Lorem ipsum dolor sit amet consectetur: Ornare eu elementum felis porttitor nunc tortor. Ornare neque accumsan metus nulla ultricies maecenas rhoncus ultrices cras. Vestibulum varius adipiscing ipsum pharetra. Semper ullamcorper malesuada ut auctor scelerisque. Sit morbi pellentesque adipiscing pellentesque habitant ullamcorper est. In dolor sit platea faucibus ut dignissim pulvinar.',
        progress: 40,
        completedLessons: 4,
        totalLessons: 10,
        questions: [
            {
                id: 'q1',
                text: 'Có thể không sử dụng CSS vẫn layout được hay không? (20 điểm)',
                points: 20,
                options: ['Đúng', 'Sai', 'Vừa vừa', 'Cả 3 đáp án trên đều đúng'],
                correctAnswer: 0,
            },
            {
                id: 'q2',
                text: 'React là một framework hay library? (20 điểm)',
                points: 20,
                options: ['Framework', 'Library', 'Cả hai', 'Không phải cả hai'],
                correctAnswer: 1,
            },
            {
                id: 'q3',
                text: 'JavaScript là ngôn ngữ lập trình gì? (20 điểm)',
                points: 20,
                options: ['Compiled', 'Interpreted', 'Both', 'Neither'],
                correctAnswer: 1,
            },
            {
                id: 'q4',
                text: 'HTML là viết tắt của gì? (20 điểm)',
                points: 20,
                options: ['HyperText Markup Language', 'HighText Markup Language', 'HyperText Markdown Language', 'HighText Markdown Language'],
                correctAnswer: 0,
            },
            {
                id: 'q5',
                text: 'CSS là viết tắt của gì? (10 điểm)',
                points: 10,
                options: ['Computer Style Sheets', 'Cascading Style Sheets', 'Creative Style Sheets', 'Colorful Style Sheets'],
                correctAnswer: 1,
            },
            {
                id: 'q6',
                text: 'TypeScript là gì? (10 điểm)',
                points: 10,
                options: ['Một framework', 'Một superset của JavaScript', 'Một database', 'Một server'],
                correctAnswer: 1,
            },
        ] as Question[],
    }

    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)

    // Timer effect
    useEffect(() => {
        if (quizState === 'questions' && timeRemaining > 0) {
            const timer = setInterval(() => {
                setTimeRemaining((prev) => {
                    if (prev <= 1) {
                        handleFinishQuiz()
                        return 0
                    }
                    return prev - 1
                })
            }, 1000)

            return () => clearInterval(timer)
        }
    }, [quizState, timeRemaining])

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
    }

    const handleStartQuiz = () => {
        setQuizState('questions')
        setCurrentQuestionIndex(0)
        setSelectedAnswers({})
        setTimeRemaining(85)
    }

    const handleAnswerSelect = (answerIndex: number) => {
        setSelectedAnswers((prev) => ({
            ...prev,
            [currentQuestionIndex]: answerIndex,
        }))
    }

    const handleNextQuestion = () => {
        if (currentQuestionIndex < quiz.questions.length - 1) {
            setCurrentQuestionIndex((prev) => prev + 1)
        } else {
            handleFinishQuiz()
        }
    }

    const handleFinishQuiz = () => {
        // Calculate score
        let totalScore = 0
        quiz.questions.forEach((question, index) => {
            if (selectedAnswers[index] === question.correctAnswer) {
                totalScore += question.points
            }
        })
        setScore(totalScore)
        setQuizState('results')
    }

    const handleRetry = () => {
        setQuizState('start')
        setCurrentQuestionIndex(0)
        setSelectedAnswers({})
        setTimeRemaining(85)
        setScore(0)
    }

    const currentQuestion = quiz.questions[currentQuestionIndex]
    const selectedAnswer = selectedAnswers[currentQuestionIndex]
    const isPassed = score >= 60 // Passing score is 60/100

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
                            active: id === 'quiz1' && (quizState === 'start' || quizState === 'questions'),
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
                            active: id === 'quiz2',
                            link: '/quizzes/quiz2',
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
                            active: id === 'quiz1',
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
                        <span className="text-[#3d3d3d] truncate max-w-[200px] sm:max-w-none">{quiz.title}</span>
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
                <div className="mb-6 flex items-center gap-4">
                    <div className="relative h-16 w-16">
                        <svg className="h-16 w-16 -rotate-90 transform">
                            <circle
                                cx="32"
                                cy="32"
                                r="28"
                                stroke="#e5e7eb"
                                strokeWidth="4"
                                fill="none"
                            />
                            <circle
                                cx="32"
                                cy="32"
                                r="28"
                                stroke="#f4762d"
                                strokeWidth="4"
                                fill="none"
                                strokeDasharray={`${2 * Math.PI * 28}`}
                                strokeDashoffset={`${2 * Math.PI * 28 * (1 - quiz.progress / 100)}`}
                            />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-sm font-semibold text-slate-900">{quiz.progress}%</span>
                        </div>
                    </div>
                    <div className="text-slate-600">
                        <span className="font-semibold text-slate-900">{quiz.completedLessons}/{quiz.totalLessons}</span> Bài học
                    </div>
                </div>

                {/* Quiz Content Based on State */}
                {quizState === 'start' && (
                    <div className="space-y-8">
                        {/* Quiz Card */}
                        <div className="rounded-2xl bg-white p-8 shadow-lg">
                            <div className="flex flex-col lg:flex-row items-center gap-8">
                                {/* Illustration */}
                                <div className="flex-shrink-0">
                                    <div className="w-64 h-64 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center">
                                        <ThunderboltOutlined className="text-8xl text-orange-500" />
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex-1 text-center lg:text-left">
                                    <h1 className="mb-4 text-3xl font-bold text-slate-900">{quiz.title}</h1>
                                    <p className="mb-2 text-slate-600">Bài kiểm tra • {quiz.totalQuestions} câu hỏi</p>
                                    <p className="mb-6 text-slate-600">{quiz.description}</p>
                                    <button
                                        onClick={handleStartQuiz}
                                        className="inline-flex items-center gap-2 rounded-lg bg-[#DD673C] px-6 py-3 text-white font-semibold hover:bg-[#C85A2F] transition-colors duration-200"
                                    >
                                        <span>Bắt đầu làm bài</span>
                                        <RightOutlined />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Description Section */}
                        <div>
                            <h2 className="mb-4 text-xl font-semibold text-slate-900">{quiz.title}</h2>
                            <div className="mb-4 flex items-center gap-2 text-slate-600">
                                <ClockCircleOutlined />
                                <span>{quiz.date}</span>
                            </div>
                            <div>
                                <h3 className="mb-4 text-xl font-semibold text-slate-900">Mô tả</h3>
                                <div className="text-slate-600">
                                    {isDescriptionExpanded ? (
                                        <p>{quiz.fullDescription}</p>
                                    ) : (
                                        <p className="line-clamp-3">{quiz.fullDescription}</p>
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
                    </div>
                )}

                {quizState === 'questions' && currentQuestion && (
                    <div className="space-y-8">
                        {/* Quiz Question Card */}
                        <div className="rounded-2xl bg-white p-8 shadow-lg">
                            {/* Timer */}
                            <div className="mb-6 text-[#DD673C] font-semibold">
                                Thời gian còn lại: {formatTime(timeRemaining)}
                            </div>

                            {/* Question Number */}
                            <div className="mb-4 text-lg font-semibold text-slate-900">
                                Câu số {currentQuestionIndex + 1}
                            </div>

                            {/* Question Text */}
                            <h2 className="mb-8 text-2xl font-bold text-slate-900">{currentQuestion.text}</h2>

                            {/* Answer Options */}
                            <div className="space-y-4 mb-8">
                                {currentQuestion.options.map((option, index) => {
                                    const isSelected = selectedAnswer === index
                                    let bgColor = 'bg-white'
                                    let borderColor = 'border-slate-200'
                                    let textColor = 'text-slate-900'

                                    if (isSelected) {
                                        bgColor = 'bg-[#fff5f2]'
                                        borderColor = 'border-[#f4762d]'
                                    }

                                    return (
                                        <button
                                            key={index}
                                            onClick={() => handleAnswerSelect(index)}
                                            className={`w-full text-left p-4 rounded-lg border-2 ${bgColor} ${borderColor} ${textColor} transition-all duration-200 hover:shadow-md hover:border-slate-300`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                                    isSelected
                                                        ? 'border-[#f4762d] bg-[#f4762d]'
                                                        : 'border-slate-300'
                                                }`}>
                                                    {isSelected && (
                                                        <div className="w-3 h-3 rounded-full bg-white" />
                                                    )}
                                                </div>
                                                <span className="flex-1">{option}</span>
                                            </div>
                                        </button>
                                    )
                                })}
                            </div>

                            {/* Next Button */}
                            <div className="flex justify-end">
                                <button
                                    onClick={handleNextQuestion}
                                    className="flex items-center gap-2 rounded-lg bg-[#F4A261] px-6 py-3 text-white font-semibold hover:bg-[#E8944F] transition-colors duration-200"
                                >
                                    <span>Câu tiếp theo</span>
                                    <RightOutlined />
                                </button>
                            </div>
                        </div>

                        {/* Description Section (same as start state) */}
                        <div>
                            <h2 className="mb-4 text-xl font-semibold text-slate-900">{quiz.title}</h2>
                            <div className="mb-4 flex items-center gap-2 text-slate-600">
                                <ClockCircleOutlined />
                                <span>{quiz.date}</span>
                            </div>
                            <div>
                                <h3 className="mb-4 text-xl font-semibold text-slate-900">Mô tả</h3>
                                <div className="text-slate-600">
                                    {isDescriptionExpanded ? (
                                        <p>{quiz.fullDescription}</p>
                                    ) : (
                                        <p className="line-clamp-3">{quiz.fullDescription}</p>
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
                    </div>
                )}

                {quizState === 'results' && (
                    <div className="space-y-8">
                        {/* Results Card */}
                        <div className="rounded-2xl bg-white p-8 shadow-lg">
                            <div className="flex flex-col lg:flex-row items-center gap-8">
                                {/* Illustration */}
                                <div className="flex-shrink-0">
                                    <div className={`w-64 h-64 rounded-xl flex items-center justify-center ${
                                        isPassed
                                            ? 'bg-gradient-to-br from-green-100 to-green-200'
                                            : 'bg-gradient-to-br from-orange-100 to-orange-200'
                                    }`}>
                                        {isPassed ? (
                                            <CheckCircleOutlined className="text-8xl text-green-500" />
                                        ) : (
                                            <CloseCircleOutlined className="text-8xl text-orange-500" />
                                        )}
                                    </div>
                                </div>

                                {/* Results Content */}
                                <div className="flex-1 text-center lg:text-left">
                                    {/* Score Circle */}
                                    <div className="mb-6 flex justify-center lg:justify-start">
                                        <div className="relative h-24 w-24">
                                            <svg className="h-24 w-24 -rotate-90 transform">
                                                <circle
                                                    cx="48"
                                                    cy="48"
                                                    r="44"
                                                    stroke="#e5e7eb"
                                                    strokeWidth="6"
                                                    fill="none"
                                                />
                                                <circle
                                                    cx="48"
                                                    cy="48"
                                                    r="44"
                                                    stroke="#f4762d"
                                                    strokeWidth="6"
                                                    fill="none"
                                                    strokeDasharray={`${2 * Math.PI * 44}`}
                                                    strokeDashoffset={`${2 * Math.PI * 44 * (1 - score / 100)}`}
                                                />
                                            </svg>
                                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                <span className="text-2xl font-bold text-slate-900">{score}/100</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Message */}
                                    {isPassed ? (
                                        <>
                                            <h2 className="mb-4 text-3xl font-bold text-slate-900">
                                                Chúc mừng bạn đã hoàn thành!
                                            </h2>
                                            <p className="mb-6 text-slate-600">
                                                Hãy tiếp tục cố gắng và phát huy ở những bài học sau nhé!
                                            </p>
                                        </>
                                    ) : (
                                        <>
                                            <h2 className="mb-4 text-3xl font-bold text-slate-900">
                                                Bạn chưa vượt qua bài kiểm tra!
                                            </h2>
                                            <p className="mb-6 text-slate-600">
                                                Hãy ôn luyện và thực hiện lại bạn nhé!
                                            </p>
                                        </>
                                    )}

                                    {/* Action Buttons */}
                                    <div className="flex gap-4">
                                        <button
                                            onClick={handleRetry}
                                            className="flex items-center gap-2 rounded-lg bg-slate-200 px-6 py-3 text-slate-700 font-semibold hover:bg-slate-300 transition-colors duration-200"
                                        >
                                            <ReloadOutlined />
                                            <span>Làm lại</span>
                                        </button>
                                        {isPassed && (
                                            <button className="flex items-center gap-2 rounded-lg bg-[#DD673C] px-6 py-3 text-white font-semibold hover:bg-[#C85A2F] transition-colors duration-200">
                                                <span>Bài học tiếp theo</span>
                                                <RightOutlined />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Description Section */}
                        <div>
                            <h2 className="mb-4 text-xl font-semibold text-slate-900">{quiz.title}</h2>
                            <div className="mb-4 flex items-center gap-2 text-slate-600">
                                <ClockCircleOutlined />
                                <span>{quiz.date}</span>
                            </div>
                            <div>
                                <h3 className="mb-4 text-xl font-semibold text-slate-900">Mô tả</h3>
                                <div className="text-slate-600">
                                    {isDescriptionExpanded ? (
                                        <p>{quiz.fullDescription}</p>
                                    ) : (
                                        <p className="line-clamp-3">{quiz.fullDescription}</p>
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
                    </div>
                )}
                    </div>

                    {/* Right Column - Lesson Sidebar */}
                    <LessonSidebar sessions={sessions} homeworkLessons={homeworkLessons} />
                </div>
            </div>
            <Footer />
        </div>
    )
}


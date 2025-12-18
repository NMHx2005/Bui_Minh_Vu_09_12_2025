import { CheckCircleOutlined, PlayCircleOutlined, FileTextOutlined, UpOutlined, DownOutlined, ThunderboltOutlined, CodeOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { Link } from 'react-router-dom'

type Lesson = {
    id: string
    title: string
    type: 'video' | 'quiz' | 'exercise'
    duration?: string
    questions?: number
    completed?: boolean
    active?: boolean
    link?: string
}

type SubSession = {
    id: string
    title: string
    lessons: Lesson[]
}

type Session = {
    id: string
    title: string
    subSessions?: SubSession[]
}

type Props = {
    sessions: Session[]
    homeworkLessons?: Lesson[]
}

export function LessonSidebar({ sessions, homeworkLessons = [] }: Props) {
    const [expandedSessions, setExpandedSessions] = useState<Set<string>>(new Set(['s1', 's3']))
    const [isSidebarVisible, setIsSidebarVisible] = useState(true)

    const toggleSession = (sessionId: string) => {
        const newExpanded = new Set(expandedSessions)
        if (newExpanded.has(sessionId)) {
            newExpanded.delete(sessionId)
        } else {
            newExpanded.add(sessionId)
        }
        setExpandedSessions(newExpanded)
    }

    const renderLesson = (lesson: Lesson) => {
        const lessonContent = (
            <div className={`group flex items-start gap-3 rounded px-5 py-2 transition-all duration-200 cursor-pointer ${lesson.active
                ? 'bg-[#fff5f2] border-l-4 border-[#f4762d]'
                : 'hover:bg-slate-50 hover:border-l-4 hover:border-slate-300'
                }`}
            >
                <div className="mt-1 shrink-0">
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
        )

        if (lesson.link) {
            return (
                <Link key={lesson.id} to={lesson.link}>
                    {lessonContent}
                </Link>
            )
        }

        return <div key={lesson.id}>{lessonContent}</div>
    }

    return (
        <>
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
                                                            {subSession.lessons.map((lesson) => renderLesson(lesson))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )
                            })}

                            {/* Bài tập về nhà Section */}
                            {homeworkLessons.length > 0 && (
                                <div className="space-y-2">
                                    <div className="ml-5 text-sm font-normal text-[#3d3d3d]">
                                        Bài tập về nhà
                                    </div>
                                    <div className="space-y-2">
                                        {homeworkLessons.map((lesson) => renderLesson(lesson))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

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
        </>
    )
}


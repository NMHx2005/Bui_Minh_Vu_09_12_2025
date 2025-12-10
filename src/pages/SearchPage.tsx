import { DownOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Input, Select } from 'antd'
import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import db from '../data/db.json'
import type { Article } from '../types/article'
import type { Course } from '../types/course'

const articles = db.articles as Article[]
const courses = db.courses as Course[]
import { ArticleCard } from '../components/ArticleCard'
import { CourseCard } from '../components/CourseCard'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

type SearchResult = {
    type: 'course' | 'article'
    data: typeof courses[0] | typeof articles[0]
}

export function SearchPage() {
    const [searchParams, setSearchParams] = useSearchParams()
    const initialQuery = searchParams.get('q') || ''
    const [searchQuery, setSearchQuery] = useState(initialQuery)
    const [sortBy, setSortBy] = useState<string>('Mới nhất')

    // Search function
    const searchResults = useMemo(() => {
        if (!searchQuery.trim()) {
            return []
        }

        const query = searchQuery.toLowerCase().trim()
        const results: SearchResult[] = []

        // Search in courses
        courses.forEach((course) => {
            if (
                course.title.toLowerCase().includes(query) ||
                course.category.toLowerCase().includes(query) ||
                course.teacher.toLowerCase().includes(query) ||
                course.level.toLowerCase().includes(query)
            ) {
                results.push({ type: 'course', data: course })
            }
        })

        // Search in articles
        articles.forEach((article) => {
            if (
                article.title.toLowerCase().includes(query) ||
                article.category.toLowerCase().includes(query) ||
                article.excerpt.toLowerCase().includes(query)
            ) {
                results.push({ type: 'article', data: article })
            }
        })

        // Sort results
        if (sortBy === 'Mới nhất') {
            // Keep original order (courses first, then articles)
            return results
        } else if (sortBy === 'Cũ nhất') {
            return [...results].reverse()
        } else if (sortBy === 'A-Z') {
            return [...results].sort((a, b) => {
                const titleA = a.type === 'course' ? a.data.title : a.data.title
                const titleB = b.type === 'course' ? b.data.title : b.data.title
                return titleA.localeCompare(titleB, 'vi')
            })
        } else if (sortBy === 'Z-A') {
            return [...results].sort((a, b) => {
                const titleA = a.type === 'course' ? a.data.title : a.data.title
                const titleB = b.type === 'course' ? b.data.title : b.data.title
                return titleB.localeCompare(titleA, 'vi')
            })
        }

        return results
    }, [searchQuery, sortBy])

    const handleSearch = () => {
        setSearchParams({ q: searchQuery })
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch()
        }
    }

    // Separate courses and articles
    const courseResults = searchResults.filter((r) => r.type === 'course') as Array<{
        type: 'course'
        data: typeof courses[0]
    }>
    const articleResults = searchResults.filter((r) => r.type === 'article') as Array<{
        type: 'article'
        data: typeof articles[0]
    }>

    return (
        <div className="min-h-screen bg-white">
            <Header />
            {/* Banner */}
            <section className="relative overflow-hidden bg-[linear-gradient(105deg,#AD502F_0%,#F37142_32%,#F37142_60%,#AD502F_100%)] px-[120px] py-16">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
                    style={{ backgroundImage: "url('/back ground.png')" }}
                />
                <div className="relative z-10">
                    {/* Breadcrumb */}
                    <div className="mb-8 flex items-center gap-2 text-sm text-white/80">
                        <Link to="/" className="hover:text-white transition">
                            Trang chủ
                        </Link>
                        <span>/</span>
                        <span className="text-white">Tìm kiếm</span>
                    </div>

                    {/* Title */}
                    <h1 className="text-[48px] font-bold text-white">Tìm kiếm</h1>
                </div>
            </section>

            {/* Main Content */}
            <section className="px-[120px] py-12">
                {/* Search Bar */}
                <div className="mb-8">
                    <div className="flex gap-4">
                        <Input
                            size="large"
                            placeholder="Tìm kiếm khóa học, bài viết..."
                            prefix={<SearchOutlined className="text-slate-400" />}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyPress={handleKeyPress}
                            className="flex-1"
                        />
                        <Button
                            type="primary"
                            size="large"
                            onClick={handleSearch}
                            className="bg-[#DD673C] hover:bg-[#d45454]! px-8"
                        >
                            Cập nhật
                        </Button>
                    </div>
                </div>

                {/* Results Header */}
                {searchQuery && (
                    <div className="mb-8 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <span className="text-lg font-semibold text-slate-900">
                                Có {searchResults.length} kết quả cho từ khóa "{searchQuery}"
                            </span>
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-slate-600">Sắp xếp:</span>
                            <Select
                                value={sortBy}
                                onChange={setSortBy}
                                suffixIcon={<DownOutlined />}
                                className="min-w-[150px]"
                                options={[
                                    { label: 'Mới nhất', value: 'Mới nhất' },
                                    { label: 'Cũ nhất', value: 'Cũ nhất' },
                                    { label: 'A-Z', value: 'A-Z' },
                                    { label: 'Z-A', value: 'Z-A' },
                                ]}
                            />
                        </div>
                    </div>
                )}

                {/* Results Grid */}
                {searchQuery ? (
                    searchResults.length > 0 ? (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {/* Course Results */}
                            {courseResults.map((result) => (
                                <CourseCard key={result.data.id} course={result.data} />
                            ))}
                            {/* Article Results */}
                            {articleResults.map((result) => (
                                <ArticleCard key={result.data.id} article={result.data} />
                            ))}
                        </div>
                    ) : (
                        <div className="py-16 text-center">
                            <p className="text-lg text-slate-500">
                                Không tìm thấy kết quả nào cho từ khóa "{searchQuery}"
                            </p>
                        </div>
                    )
                ) : (
                    <div className="py-16 text-center">
                        <p className="text-lg text-slate-500">Nhập từ khóa để tìm kiếm</p>
                    </div>
                )}
            </section>
            <Footer />
        </div>
    )
}


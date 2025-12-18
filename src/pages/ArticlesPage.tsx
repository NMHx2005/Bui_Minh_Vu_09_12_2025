import { DownOutlined } from '@ant-design/icons'
import { Pagination, Select } from 'antd'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import db from '../data/db.json'
import type { Article } from '../types/article'

const articles = db.articles as Article[]
import { ArticleCard } from '../components/ArticleCard'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

export function ArticlesPage() {
    const [page, setPage] = useState(1)
    const [selectedCategory, setSelectedCategory] = useState<string>('Tất cả')
    const pageSize = 9

    const categories = ['Tất cả', 'Front-End', 'Back-End', 'DevOps', 'Mobile']

    const filteredArticles = useMemo(() => {
        if (selectedCategory === 'Tất cả') {
            return articles
        }
        return articles.filter((article) => article.category === selectedCategory)
    }, [selectedCategory])

    const pagedArticles = useMemo(() => {
        const start = (page - 1) * pageSize
        return filteredArticles.slice(start, start + pageSize)
    }, [page, filteredArticles])

    return (
        <div className="min-h-screen bg-white">
            <Header />
            {/* Banner */}
            <section className="relative overflow-hidden bg-[linear-gradient(105deg,#AD502F_0%,#F37142_32%,#F37142_60%,#AD502F_100%)] px-4 md:px-6 lg:px-10 xl:px-[120px] py-8 md:py-12 lg:py-16">
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
                    style={{ backgroundImage: "url('/back ground.png')" }}
                />
                <div className="relative z-10 flex flex-col items-center justify-center">
                    {/* Breadcrumb */}
                    <div className="mb-4 md:mb-8 flex items-center gap-2 text-xs md:text-sm text-white/80">
                        <Link to="/" className="hover:text-white transition">
                            Trang chủ
                        </Link>
                        <span>/</span>
                        <span className="text-white">Bài viết</span>
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl md:text-4xl lg:text-[48px] font-bold text-white">Bài viết</h1>
                </div>
            </section>

            {/* Main Content */}
            <section className="px-4 md:px-6 lg:px-10 xl:px-[120px] py-6 md:py-8 lg:py-12">
                {/* Filter/Sort Bar */}
                <div className="mb-6 md:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-2 md:gap-3">
                        <span className="text-base md:text-lg font-semibold text-slate-900">Tất cả bài viết</span>
                        <span className="rounded-full bg-[#e55c34] px-2 md:px-3 py-1 text-xs md:text-sm font-semibold text-white">
                            {filteredArticles.length}
                        </span>
                    </div>

                    <div className="flex items-center gap-2 md:gap-3 w-full sm:w-auto">
                        <span className="text-xs md:text-sm font-medium text-slate-600">Sắp xếp:</span>
                        <Select
                            value={selectedCategory}
                            onChange={setSelectedCategory}
                            suffixIcon={<DownOutlined />}
                            className="min-w-[120px] md:min-w-[150px] flex-1 sm:flex-none"
                            options={categories.map((cat) => ({ label: cat, value: cat }))}
                        />
                    </div>
                </div>

                {/* Articles Grid */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {pagedArticles.map((article) => (
                        <ArticleCard key={article.id} article={article} />
                    ))}
                </div>

                {/* Pagination */}
                <div className="mt-12 flex justify-center">
                    <div className="course-pagination w-full">
                        <Pagination
                            current={page}
                            pageSize={pageSize}
                            total={Math.max(articles.length, pageSize * 10)}
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
            <Footer />
        </div>
    )
}


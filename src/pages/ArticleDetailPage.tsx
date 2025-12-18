import { BookOutlined, ClockCircleOutlined } from '@ant-design/icons'
import { useParams, Link, Navigate } from 'react-router-dom'
import { useMemo } from 'react'
import db from '../data/db.json'
import type { Article } from '../types/article'

const articles = db.articles as Article[]
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { RelatedArticleCard } from '../components/RelatedArticleCard'

export function ArticleDetailPage() {
    const { id } = useParams<{ id: string }>()
    const article = articles.find((a) => a.id === id)

    // Get related articles (same category, exclude current article)
    const relatedArticles = useMemo(() => {
        if (!article) return []
        return articles
            .filter((a) => a.category === article.category && a.id !== article.id)
            .slice(0, 3)
    }, [article])

    if (!article) {
        return <Navigate to="/articles" replace />
    }

    return (
        <div className="min-h-screen bg-white">
            <Header />
            <div className="px-4 md:px-6 lg:px-10 xl:px-[120px] py-8 md:py-12 lg:py-16">
                {/* Title Section */}
                <div className="mb-8 md:mb-12 border-b border-slate-200 pb-6 md:pb-8">
                    {/* Breadcrumb */}
                    <div className="mb-4 flex flex-wrap items-center gap-2 text-xs md:text-sm">
                        <Link to="/" className="text-slate-400 hover:text-slate-600 transition">
                            Trang chủ
                        </Link>
                        <span className="text-slate-400">/</span>
                        <Link to="/articles" className="text-slate-400 hover:text-slate-600 transition">
                            Bài viết
                        </Link>
                        <span className="text-slate-400">/</span>
                        <span className="text-slate-900">Chi tiết bài viết</span>
                    </div>

                    {/* Article Title */}
                    <h1 className="mb-4 md:mb-6 text-2xl md:text-3xl lg:text-[40px] font-bold leading-tight text-slate-900">
                        {article.title}
                    </h1>

                    {/* Metadata */}
                    <div className="flex flex-wrap items-center gap-3 md:gap-4">
                        {/* Category Badge */}
                        <div className="inline-flex rounded-full bg-[#fef2f2] px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-semibold text-[#e55c34]">
                            {article.category}
                        </div>

                        {/* Divider */}
                        <div className="hidden h-6 w-px bg-slate-300 sm:block" />

                        {/* Published Date */}
                        <div className="flex items-center gap-2 text-sm md:text-base text-slate-500">
                            <ClockCircleOutlined className="text-slate-400" />
                            <span>{article.publishedAt}</span>
                        </div>

                        {/* Divider */}
                        <div className="hidden h-6 w-px bg-slate-300 sm:block" />

                        {/* Read Time */}
                        <div className="flex items-center gap-2 text-sm md:text-base text-slate-500">
                            <BookOutlined className="text-slate-400" />
                            <span>{article.readTime}</span>
                        </div>
                    </div>
                </div>

                {/* Main Content with Sidebar */}
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 w-full justify-between">
                    {/* Article Content */}
                    <div className="w-full lg:w-[70%] shrink-0">
                        <div className="space-y-8">
                            {/* Section 01 */}
                            <div className="space-y-4">
                                {/* Heading */}
                                <h2 className="text-xl md:text-2xl lg:text-[30px] font-normal leading-tight md:leading-[30px] text-[#3d3d3d]">
                                    Ornare eu elementum felis porttitor nunc
                                </h2>

                                {/* Paragraph */}
                                <p className="text-sm md:text-base leading-6 text-[#848484]">
                                    Ornare eu elementum felis porttitor nunc tortor. Ornare neque accumsan
                                    metus nulla ultricies maecenas rhoncus ultrices cras. Vestibulum varius
                                    adipiscing ipsum pharetra. Semper ullamcorper malesuada ut auctor
                                    scelerisque. Sit morbi pellentesque adipiscing pellentesque habitant
                                    ullamcorper est. In dolor sit platea faucibus ut dignissim pulvinar.
                                </p>

                                {/* Image */}
                                <div className="mt-4">
                                    <img
                                        src={article.image.startsWith('./') ? article.image.replace('./', '/') : article.image}
                                        alt="Article content"
                                        className="h-[200px] md:h-[300px] lg:h-[432px] w-full rounded-xl object-cover"
                                    />
                                </div>

                                {/* Long Paragraph */}
                                <p className="text-base leading-6 text-[#848484]">
                                    Lorem ipsum dolor sit amet consectetur: Ornare eu elementum felis
                                    porttitor nunc tortor. Ornare neque accumsan metus nulla ultricies
                                    maecenas rhoncus ultrices cras. Vestibulum varius adipiscing ipsum
                                    pharetra. Semper ullamcorper malesuada ut auctor scelerisque. Sit morbi
                                    pellentesque adipiscing pellentesque habitant ullamcorper est. In dolor
                                    sit platea faucibus ut dignissim pulvinar. Semper lacinia non lectus
                                    mauris sed eget scelerisque facilisis donec: Tellus molestie leo gravida
                                    feugiat. Ipsum est lacus lobortis accumsan eget. Sit parturient viverra
                                    ut cursus. Vestibulum non et ullamcorper fermentum fringilla est. A
                                    nullam diam rhoncus pellentesque eleifend risus ut libero. Eget gravida
                                    fermentum nisi dignissim senectus pellentesque egestas. Pellentesque
                                    scelerisque arcu congue lorem. In quis sagittis netus lacinia ut vitae.
                                    Vitae quam nunc quis libero in. Viverra purus elementum risus feugiat
                                    in est. Ut sit a erat ante aliquam. Nec viverra nibh orci erat feugiat
                                    viverra viverra sit faucibus. Adipiscing vel nunc integer mi montes
                                    cras magna. Est vitae posuere quis sed quam vivamus urna lorem dolor.
                                    Odio potenti non purus platea ultrices id egestas. Mattis arcu felis sed
                                    commodo. Magna enim vel consequat leo eleifend etiam. Tincidunt ut morbi
                                    volutpat at etiam morbi sagittis. Urna elit pretium fermentum cras
                                    cursus nam odio libero. Scelerisque augue in vel cursus. Varius amet
                                    tristique risus velit in libero id tincidunt nunc. Elit proin dictumst
                                    purus cras. Diam vitae congue est iaculis lacinia lectus senectus ut
                                    egestas. At ultrices ultricies cras ut vehicula. Nisl viverra imperdiet
                                    pharetra purus tortor viverra aenean accumsan. Sed quis viverra cras
                                    tortor lacus. Morbi eget in porta lectus risus eget mauris luctus ac.
                                </p>
                            </div>

                            {/* Standalone Image */}
                            <div>
                                <img
                                    src={article.image.startsWith('./') ? article.image.replace('./', '/') : article.image}
                                    alt="Article content"
                                    className="h-[200px] md:h-[300px] lg:h-[432px] w-full rounded-xl object-cover"
                                />
                            </div>

                            {/* Section 02 */}
                            <div className="space-y-4">
                                {/* Heading */}
                                <h2 className="text-xl md:text-2xl lg:text-[30px] font-normal leading-tight md:leading-[30px] text-[#3d3d3d]">
                                    Vestibulum varius adipiscing
                                </h2>

                                {/* Paragraph */}
                                <p className="text-sm md:text-base leading-6 text-[#848484]">
                                    Ornare eu elementum felis porttitor nunc tortor. Ornare neque accumsan
                                    metus nulla ultricies maecenas rhoncus ultrices cras. Vestibulum varius
                                    adipiscing ipsum pharetra. Semper ullamcorper malesuada ut auctor
                                    scelerisque. Sit morbi pellentesque adipiscing pellentesque habitant
                                    ullamcorper est. In dolor sit platea faucibus ut dignissim pulvinar.
                                    Semper lacinia non lectus mauris sed eget scelerisque facilisis donec:
                                    Tellus molestie leo gravida feugiat. Ipsum est lacus lobortis accumsan
                                    eget. Sit parturient viverra ut cursus. Vestibulum non et ullamcorper
                                    fermentum fringilla est. A nullam diam rhoncus pellentesque eleifend
                                    risus ut libero. Eget gravida fermentum nisi dignissim senectus
                                    pellentesque egestas. Pellentesque scelerisque arcu congue lorem. In
                                    quis sagittis netus lacinia ut vitae. Vitae quam nunc quis libero in.
                                    Viverra purus elementum risus feugiat in est. Ut sit a erat ante
                                    aliquam. Nec viverra nibh orci erat feugiat viverra viverra sit faucibus.
                                </p>
                            </div>

                            {/* Standalone Image */}
                            <div>
                                <img
                                    src={article.image.startsWith('./') ? article.image.replace('./', '/') : article.image}
                                    alt="Article content"
                                    className="h-[432px] w-full rounded-xl object-cover"
                                />
                            </div>

                            {/* Final Paragraph */}
                            <p className="text-base leading-6 text-[#848484]">
                                Lorem ipsum dolor sit amet consectetur: Ornare eu elementum felis porttitor
                                nunc tortor. Ornare neque accumsan metus nulla ultricies maecenas rhoncus
                                ultrices cras. Vestibulum varius adipiscing ipsum pharetra. Semper ullamcorper
                                malesuada ut auctor scelerisque. Sit morbi pellentesque adipiscing
                                pellentesque habitant ullamcorper est. In dolor sit platea faucibus ut
                                dignissim pulvinar.
                            </p>
                        </div>
                    </div>

                    {/* Related Articles Sidebar */}
                    <aside className="w-full lg:w-auto lg:flex-1 shrink-0">
                        <div className="space-y-4 md:space-y-6">
                            <h2 className="text-xl md:text-2xl font-bold text-black">Bài viết cùng chủ đề</h2>
                            {relatedArticles.length > 0 ? (
                                <div className="space-y-6">
                                    {relatedArticles.map((relatedArticle) => (
                                        <RelatedArticleCard
                                            key={relatedArticle.id}
                                            article={relatedArticle}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <p className="text-slate-500">Không có bài viết liên quan</p>
                            )}
                        </div>
                    </aside>
                </div>
            </div>
            <Footer />
        </div>
    )
}


import { BookOutlined, ClockCircleOutlined } from '@ant-design/icons'
import type { Article } from '../types/article'

type Props = {
    article: Article
}

export function ArticleCard({ article }: Props) {
    return (
        <div className="group flex h-full flex-col overflow-hidden rounded-[28px] bg-white shadow-[0_16px_60px_rgba(0,0,0,0.08)] transition hover:-translate-y-1 hover:shadow-[0_20px_70px_rgba(0,0,0,0.12)]">
            <div className="px-4 pt-4">
                <div className="overflow-hidden rounded-[24px]">
                    <img
                        src={article.image}
                        alt={article.title}
                        className="h-[240px] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                </div>
            </div>

            <div className="flex flex-1 flex-col gap-4 px-6 py-5">
                <div className="inline-flex w-fit rounded-full bg-[#fbe7e4] px-4 py-2 text-sm font-semibold text-[#e55c34]">
                    {article.category}
                </div>

                <div className="text-[24px] font-semibold leading-tight text-[#0f0f0f]">{article.title}</div>

                <p className="text-[15px] leading-relaxed text-slate-600 line-clamp-3">{article.excerpt}</p>

                <div className="mt-auto flex items-center gap-4 text-sm text-slate-500">
                    <div className="flex items-center gap-2">
                        <ClockCircleOutlined className="text-[#e55c34]" />
                        <span>{article.publishedAt}</span>
                    </div>
                    <span className="text-slate-300">|</span>
                    <div className="flex items-center gap-2">
                        <BookOutlined className="text-[#e55c34]" />
                        <span>{article.readTime}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}


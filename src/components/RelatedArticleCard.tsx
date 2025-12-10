import { BookOutlined, ClockCircleOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import type { Article } from '../types/article'

type Props = {
    article: Article
}

export function RelatedArticleCard({ article }: Props) {
    return (
        <Link to={`/articles/${article.id}`} className="block">
            <div className="overflow-hidden rounded-xl bg-white shadow-[0_-4px_12px_rgba(16,24,40,0.03),0_12px_24px_rgba(16,24,40,0.08)]">
                {/* Image */}
                <div className="h-[280px] w-full overflow-hidden">
                    <div className="m-4 h-[247px] overflow-hidden rounded-xl">
                        <img
                            src={article.image.startsWith('./') ? article.image.replace('./', '/') : article.image}
                            alt={article.title}
                            className="h-full w-full object-cover"
                        />
                    </div>
                </div>

                {/* Content */}
                <div className="px-4 pb-4">
                    <div className="mb-4 space-y-2">
                        {/* Badge */}
                        <div className="inline-flex rounded-2xl bg-[#fef2f2] px-[10px] py-[2px] text-xs font-semibold text-[#c4320a]">
                            {article.category}
                        </div>

                        {/* Title and Excerpt */}
                        <div className="space-y-1">
                            <h3 className="line-clamp-2 text-base font-semibold leading-[30px] text-black">
                                {article.title}
                            </h3>
                            <p className="line-clamp-2 text-sm leading-5 text-[#505050]">
                                {article.excerpt}
                            </p>
                        </div>
                    </div>

                    {/* Metadata */}
                    <div className="flex items-center gap-2 text-xs text-[#676767]">
                        <div className="flex items-center gap-2">
                            <ClockCircleOutlined className="text-[#676767]" />
                            <span>{article.publishedAt}</span>
                        </div>
                        <div className="h-3 w-px bg-[#dddddd]" />
                        <div className="flex items-center gap-2">
                            <BookOutlined className="text-[#676767]" />
                            <span>{article.readTime}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}


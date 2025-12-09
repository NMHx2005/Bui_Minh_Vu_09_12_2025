import { CheckCircleFilled } from '@ant-design/icons'
import { Carousel, Typography } from 'antd'
import { HeroPattern } from './HeroPattern'

const { Paragraph, Text } = Typography

type HeroSlide = {
    id: string
    quote: string
    name: string
    stats: string[]
    badge: string
    image: string
}

const slides: HeroSlide[] = [
    {
        id: 'giang-sensei',
        quote:
            'Hạnh phúc là điểm khởi đầu của giáo dục và cũng là đích đến cuối cùng. Giang, với hơn 10 năm kinh nghiệm giảng dạy và luyện thi JLPT, mong muốn giúp các bạn rút ngắn thời gian, vượt qua khó khăn trong việc học tiếng Nhật, và chinh phục tấm bằng JLPT. Hãy biến học tập thành không chỉ là mục tiêu phát triển bản thân mà còn là hành trình hạnh phúc để hiện thực hóa những giấc mơ.',
        name: 'Giang Sensei',
        badge: 'Giang Sensei',
        stats: ['180/180 N1', 'Hơn 10 năm kinh nghiệm luyện thi JLPT', '72% học viên thi đỗ chỉ với 1 lần thi'],
        image:
            './background_banner.png',
    },
]

export function Hero() {
    return (
        <section className="relative px-[120px] overflow-hidden bg-[linear-gradient(105deg,#AD502F_0%,#F37142_32%,#F37142_60%,#AD502F_100%)] py-10 shadow-2xl bg-linear-to-br">
            <HeroPattern />

            <div className="absolute inset-0 -z-10 bg-linear-to-br from-white/10 via-transparent to-white/5" />
            <div className="absolute left-6 top-16 h-64 w-64 rounded-full bg-orange-200/30 blur-3xl" />
            <div className="absolute right-10 bottom-10 h-56 w-56 rounded-full bg-orange-500/30 blur-3xl" />

            <Carousel
                className="hero-carousel"
                autoplay
                draggable
                swipeToSlide
                dots
                pauseOnHover
                dotPosition="bottom"
            >
                {slides.map((slide) => (
                    <div key={slide.id}>
                        <div className="relative grid min-h-[840px] grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
                            {/* Left content */}
                            <div className="relative z-10 flex flex-col gap-6 text-white">
                                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-3xl font-bold text-orange-50 backdrop-blur-md">
                                    “
                                </div>
                                <Paragraph className="text-lg! leading-8! text-white!">
                                    {slide.quote}
                                </Paragraph>

                                <div className="mt-2 flex items-center gap-3">
                                    <div className="h-[3px] w-12 rounded-full bg-white/80" />
                                    <Text className="text-sm! font-semibold! uppercase! tracking-[0.2em]! text-white/80!">
                                        {slide.name}
                                    </Text>
                                </div>
                            </div>

                            {/* Right content */}
                            <div className="relative z-10 flex items-center justify-center lg:justify-end">
                                <div className="absolute left-6 top-8 h-14 w-36 rounded-full bg-[#F7A81D] blur-2xl opacity-80" />
                                <div className="relative w-full max-w-[520px]">
                                    <div className="absolute -left-12 top-16 h-40 w-40 rounded-full bg-white/25 blur-2xl" />
                                    <div className="absolute right-6 top-6 h-10 w-10 rotate-12 rounded-lg border border-white/50" />
                                    <div className="absolute left-8 top-8 z-20 inline-flex items-center gap-2 rounded-full bg-[#F7A81D] px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-orange-900/30">
                                        {slide.badge}
                                    </div>

                                    <div className="relative overflow-visible">
                                        <img
                                            src={slide.image}
                                            alt={slide.name}
                                            className="relative z-10 w-full rounded-[32px] object-cover shadow-[0_28px_80px_rgba(0,0,0,0.35)]"
                                        />

                                        <div className="absolute -left-6 bottom-10 z-0 h-40 w-40 rounded-full bg-orange-500/25 blur-3xl" />
                                        <div className="absolute -right-10 top-12 z-0 h-52 w-52 rounded-full bg-orange-200/25 blur-3xl" />
                                    </div>

                                    <div className="absolute bottom-12 left-4 right-4 z-30">
                                        <div className="flex flex-col gap-3 rounded-2xl border border-white/40 bg-white/70 p-4 shadow-2xl backdrop-blur-xl">
                                            {slide.stats.map((item) => (
                                                <div key={item} className="flex items-start gap-2 text-slate-900">
                                                    <span className="mt-[2px] text-base text-orange-600">
                                                        <CheckCircleFilled />
                                                    </span>
                                                    <Text className="m-0! text-base! font-semibold! text-slate-900!">
                                                        {item}
                                                    </Text>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </Carousel>
        </section>
    )
}


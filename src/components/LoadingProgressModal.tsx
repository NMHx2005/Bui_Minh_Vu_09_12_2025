type Props = {
    visible: boolean
    progress?: number // 0-100
}

export function LoadingProgressModal({ visible, progress = 0 }: Props) {
    if (!visible) return null

    const radius = 36
    const circumference = 2 * Math.PI * radius
    const offset = circumference - (progress / 100) * circumference

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn"
        >
            <div
                className="relative w-[90%] max-w-[640px] h-auto min-h-[373px] max-h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col items-center animate-scaleIn p-4 md:p-0"
            >
                {/* Progress Circle */}
                <div className="mt-[100px] relative w-20 h-20 flex items-center justify-center">
                    <svg className="w-20 h-20 -rotate-90 transform">
                        {/* Background Circle */}
                        <circle
                            cx="40"
                            cy="40"
                            r={radius}
                            stroke="#DDDDDD"
                            strokeWidth="8"
                            fill="none"
                        />
                        {/* Progress Circle */}
                        <circle
                            cx="40"
                            cy="40"
                            r={radius}
                            stroke="#F37142"
                            strokeWidth="8"
                            fill="none"
                            strokeDasharray={circumference}
                            strokeDashoffset={offset}
                            className="transition-all duration-300 ease-out"
                        />
                    </svg>
                    {/* Number in center */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-base font-semibold text-[#2C2C2C]">
                            {Math.round(progress)}%
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="mt-[24px] flex flex-col items-center gap-1 w-full max-w-[360px] px-4">
                    <h3 className="text-[28px] font-semibold text-black text-center leading-[41px]">
                        Loading...
                    </h3>
                    <p className="text-base text-[#505050] text-center leading-6 mt-1">
                        Cùng nhau luyện tập mỗi ngày để thành thạo hơn nhé!
                    </p>
                </div>
            </div>
        </div>
    )
}


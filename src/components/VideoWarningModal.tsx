import { CloseOutlined } from '@ant-design/icons'

type Props = {
    visible: boolean
    onClose: () => void
}

export function VideoWarningModal({ visible, onClose }: Props) {
    if (!visible) return null

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn"
            onClick={onClose}
        >
            <div
                className="relative w-[90%] max-w-[640px] h-auto min-h-[476px] max-h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col items-center animate-scaleIn p-4 md:p-0"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-6 h-6 flex items-center justify-center text-[#3d3d3d] hover:text-[#f4762d] transition-colors duration-200"
                    aria-label="Đóng"
                >
                    <CloseOutlined className="text-lg" />
                </button>

                {/* Image */}
                <div className="mt-[72px] w-full max-w-[359px] h-[288px] rounded-lg overflow-hidden">
                    <img
                        src="/image_loading.png"
                        alt="Warning"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            // Fallback nếu không có image
                            e.currentTarget.style.display = 'none'
                        }}
                    />
                </div>

                {/* Content */}
                <div className="mt-[32px] flex flex-col items-center gap-1 w-full max-w-[454px] px-4">
                    <h3 className="text-xl md:text-[28px] font-semibold text-black text-center leading-tight md:leading-[40px]">
                        Bạn không thể tua nhanh video!
                    </h3>
                    <p className="text-sm md:text-base text-[#505050] text-center leading-6 mt-1">
                        Hãy học theo trình tự bài bạn nhé!
                    </p>
                </div>
            </div>
        </div>
    )
}


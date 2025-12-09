import {
    EnvironmentFilled,
    FacebookFilled,
    MailFilled,
    PhoneFilled,
    YoutubeFilled,
} from '@ant-design/icons'

export function Footer() {
    return (
        <footer className="mt-16 bg-[radial-gradient(140%_120%_at_50%_20%,#f08c5c,#d64b2f_45%,#c43b2a_70%)] text-white">
            <div className="mx-auto flex max-w-[1200px] flex-col gap-10 px-6 py-14 text-center">
                <div className="flex flex-col items-center gap-3">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/95 text-2xl font-bold text-orange-500 shadow-lg">
                        <img src="./logooo.png" alt="logo" className="w-full h-full object-cover" />
                    </div>
                    <p className="text-lg font-semibold uppercase">
                        Mankai Academy - Học viện đào tạo phát triển tiếng Nhật thực chiến
                    </p>
                    <div className="h-px w-full max-w-4xl bg-white/50" />
                </div>

                <div className="grid gap-10 text-left lg:grid-cols-3">
                    <div className="space-y-4">
                        <h4 className="text-base font-semibold">Thông tin liên hệ</h4>
                        <div className="flex items-start gap-3">
                            <EnvironmentFilled className="mt-1 text-xl text-white" />
                            <div>
                                <span className="font-semibold m-0">Địa chỉ:</span>
                                <div>Tòa Sông Đà, Đường Phạm Hùng, Mỹ Đình, Nam Từ Liêm, Hà Nội</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <PhoneFilled className="text-xl text-white" />
                            <div className="font-semibold  m-0">Hotline: <span className="font-normal">0835 662 538</span></div>
                        </div>
                        <div className="flex items-center  gap-3">
                            <MailFilled className="text-xl text-white" />
                            <div className="font-semibold m-0">Email: <span className="font-normal">support@mankai.edu.vn</span></div>
                        </div>
                    </div>

                    <div className="space-y-4 lg:justify-self-center">
                        <h4 className="text-base font-semibold">Theo dõi chúng tôi tại</h4>
                        <div className="flex items-center gap-4 text-2xl">
                            <FacebookFilled className="cursor-pointer hover:text-white/80" />
                            <YoutubeFilled className="cursor-pointer hover:text-white/80" />
                        </div>
                    </div>

                    <div className="space-y-4 lg:justify-self-end">
                        <p>
                            “Hạnh phúc là điểm khởi đầu của giáo dục và cũng là đích đến cuối cùng. Giang, với hơn 10 năm kinh nghiệm
                            giảng dạy và luyện thi JLPT, mong muốn giúp các bạn rút ngắn thời gian, vượt qua khó khăn trong việc học
                            tiếng Nhật, và chinh phục tấm bằng JLPT. Hãy biến học tập thành không chỉ là mục tiêu phát triển bản thân mà
                            còn là hành trình hạnh phúc để hiện thực hóa những giấc mơ.”
                        </p>
                        <p className="italic font-semibold">Anh Nguyễn Viết Lâm – CEO Rikkei Academy</p>
                    </div>
                </div>

                <div className="h-px w-full bg-white/30" />
                <p className="text-sm text-white/90">
                    © 2024 By Rikkei Academy - Rikkei Education - All rights reserved.
                </p>
            </div>
        </footer>
    )
}


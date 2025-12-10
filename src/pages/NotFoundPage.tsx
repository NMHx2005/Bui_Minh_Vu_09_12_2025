import { RightOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

export function NotFoundPage() {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            <div className="flex min-h-[calc(100vh-200px)] flex-col items-center justify-center px-6 py-16">
                <div className="flex flex-col items-center">
                    {/* 404 Illustration Image */}
                    <div className="mb-8">
                        <img
                            src="/404.png"
                            alt="404 Error"
                            className="mx-auto h-auto max-w-[500px] w-full"
                        />
                    </div>

                    {/* Error Message */}
                    <div className="mb-8 text-center">
                        <h1 className="mb-2 text-5xl font-bold text-slate-900">Oops!</h1>
                        <p className="text-xl text-slate-600">Trang không thể tìm thấy.</p>
                    </div>

                    {/* Back to Home Button */}
                    <Link to="/">
                        <Button
                            type="primary"
                            size="large"
                            className="bg-[#DD673C] hover:bg-[#d45454]! px-8 py-6 text-lg"
                            icon={<RightOutlined />}
                            iconPosition="end"
                        >
                            Về trang chủ
                        </Button>
                    </Link>
                </div>
            </div>
            <Footer />
        </div>
    )
}


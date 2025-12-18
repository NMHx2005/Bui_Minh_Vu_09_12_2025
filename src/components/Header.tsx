import {
    BellFilled,
    BookFilled,
    HomeFilled,
    SearchOutlined,
    UserOutlined,
    MenuOutlined,
    CloseOutlined,
} from '@ant-design/icons'
import { Avatar, Badge } from 'antd'
import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'

export function Header() {
    const location = useLocation()
    const isHome = location.pathname === '/'
    const isArticles = location.pathname === '/articles'
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    return (
        <>
            {/* Desktop Header */}
            <header className="hidden md:flex items-center justify-between px-4 py-4 md:px-6 lg:px-10 xl:px-[120px] md:py-5">
                {/* Left Side: Logo + Divider + Nav */}
                <div className="flex items-center gap-4 md:gap-8">
                    {/* Logo */}
                    <Link to="/" className="flex flex-col items-center leading-none">
                        <div className="mb-1 flex items-center justify-center text-orange-500">
                            {/* Simple CSS Logo Placeholder */}
                            <div className="relative flex h-6 w-6 md:h-8 md:w-8 items-center justify-center">
                                <div className="absolute top-0 h-2 w-2 rounded-full bg-orange-500" />
                                <div className="absolute bottom-1 h-4 w-8 rounded-b-full border-b-4 border-l-4 border-r-4 border-t-0 border-orange-500" />
                            </div>
                        </div>
                        <span className="text-xs md:text-sm font-bold text-orange-500">Mankai</span>
                        <span className="text-[8px] md:text-[10px] text-orange-400">Academy</span>
                    </Link>

                    {/* Vertical Divider */}
                    <div className="hidden h-8 w-[1px] bg-slate-200 md:block" />

                    {/* Navigation */}
                    <nav className="hidden items-center gap-6 lg:gap-8 md:flex">
                        <Link
                            to="/"
                            className={`flex items-center gap-2 text-sm transition ${isHome
                                ? 'font-semibold text-orange-500 hover:text-orange-600'
                                : 'font-medium text-slate-600 hover:text-slate-900'
                                }`}
                        >
                            <HomeFilled />
                            <span>Trang chủ</span>
                        </Link>
                        <Link
                            to="/articles"
                            className={`flex items-center gap-2 text-sm transition ${isArticles
                                ? 'font-semibold text-orange-500 hover:text-orange-600'
                                : 'font-medium text-slate-600 hover:text-slate-900'
                                }`}
                        >
                            <BookFilled />
                            <span>Bài viết</span>
                        </Link>
                    </nav>
                </div>

                {/* Right Side: Utilities */}
                <div className="flex items-center gap-3 md:gap-6">
                    <Link to="/search">
                        <SearchOutlined className="cursor-pointer text-lg md:text-xl text-slate-500 transition hover:text-slate-900" />
                    </Link>
                    <Badge dot offset={[-2, 2]} className="cursor-pointer">
                        <BellFilled className="text-lg md:text-xl text-slate-500 transition hover:text-slate-900" />
                    </Badge>
                    <Avatar
                        size={{ xs: 32, sm: 36, md: 40 }}
                        icon={<UserOutlined />}
                        className="cursor-pointer bg-orange-100 text-orange-500"
                        src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
                    />
                </div>
            </header>

            {/* Mobile Header */}
            <header className="md:hidden border-b border-[#DDDDDD] bg-white h-[72px]">
                <div className="px-4 pt-[14px] pb-[14px]">
                    <div className="flex items-center justify-between h-11">
                        {/* Logo */}
                        <Link to="/" className="h-11 w-[37px] flex items-center">
                            <div className="flex flex-col items-center leading-none">
                                <div className="mb-1 flex items-center justify-center text-orange-500">
                                    <div className="relative flex h-6 w-6 items-center justify-center">
                                        <div className="absolute top-0 h-2 w-2 rounded-full bg-orange-500" />
                                        <div className="absolute bottom-1 h-4 w-8 rounded-b-full border-b-4 border-l-4 border-r-4 border-t-0 border-orange-500" />
                                    </div>
                                </div>
                                <span className="text-xs font-bold text-orange-500">Mankai</span>
                                <span className="text-[8px] text-orange-400">Academy</span>
                            </div>
                        </Link>

                        {/* Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="h-10 w-10 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors"
                            aria-label="Menu"
                        >
                            <MenuOutlined className="text-xl text-[#676767]" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Modal */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm animate-fadeIn md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                >
                    <div
                        className="absolute right-0 top-0 h-full w-[80%] max-w-[320px] bg-white shadow-2xl animate-slideInRight flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-slate-200">
                            <h2 className="text-lg font-semibold text-slate-900">Menu</h2>
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors"
                                aria-label="Đóng"
                            >
                                <CloseOutlined className="text-lg text-slate-600" />
                            </button>
                        </div>

                        {/* Menu Items */}
                        <nav className="flex-1 p-4 space-y-2">
                            <Link
                                to="/"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${isHome
                                    ? 'bg-orange-50 text-orange-500 font-semibold'
                                    : 'text-slate-700 hover:bg-slate-50'
                                    }`}
                            >
                                <HomeFilled className="text-xl" />
                                <span className="text-base">Trang chủ</span>
                            </Link>
                            <Link
                                to="/articles"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${isArticles
                                    ? 'bg-orange-50 text-orange-500 font-semibold'
                                    : 'text-slate-700 hover:bg-slate-50'
                                    }`}
                            >
                                <BookFilled className="text-xl" />
                                <span className="text-base">Bài viết</span>
                            </Link>
                            <Link
                                to="/search"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-700 hover:bg-slate-50 transition"
                            >
                                <SearchOutlined className="text-xl" />
                                <span className="text-base">Tìm kiếm</span>
                            </Link>
                            <div className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-700 hover:bg-slate-50 transition cursor-pointer">
                                <Badge dot offset={[-2, 2]}>
                                    <BellFilled className="text-xl" />
                                </Badge>
                                <span className="text-base">Thông báo</span>
                            </div>
                            <div className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-700 hover:bg-slate-50 transition cursor-pointer">
                                <Avatar
                                    size={24}
                                    icon={<UserOutlined />}
                                    className="bg-orange-100 text-orange-500"
                                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
                                />
                                <span className="text-base">Tài khoản</span>
                            </div>
                        </nav>
                    </div>
                </div>
            )}
        </>
    )
}


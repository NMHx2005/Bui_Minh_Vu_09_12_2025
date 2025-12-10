import {
    BellFilled,
    BookFilled,
    HomeFilled,
    SearchOutlined,
    UserOutlined,
} from '@ant-design/icons'
import { Avatar, Badge } from 'antd'
import { Link, useLocation } from 'react-router-dom'

export function Header() {
    const location = useLocation()
    const isHome = location.pathname === '/'
    const isArticles = location.pathname === '/articles'

    return (
        <header className="flex items-center justify-between px-[120px] py-5">
            {/* Left Side: Logo + Divider + Nav */}
            <div className="flex items-center gap-8">
                {/* Logo */}
                <Link to="/" className="flex flex-col items-center leading-none">
                    <div className="mb-1 flex items-center justify-center text-orange-500">
                        {/* Simple CSS Logo Placeholder */}
                        <div className="relative flex h-8 w-8 items-center justify-center">
                            <div className="absolute top-0 h-2 w-2 rounded-full bg-orange-500" />
                            <div className="absolute bottom-1 h-4 w-8 rounded-b-full border-b-4 border-l-4 border-r-4 border-t-0 border-orange-500" />
                        </div>
                    </div>
                    <span className="text-sm font-bold text-orange-500">Mankai</span>
                    <span className="text-[10px] text-orange-400">Academy</span>
                </Link>

                {/* Vertical Divider */}
                <div className="h-8 w-[1px] bg-slate-200" />

                {/* Navigation */}
                <nav className="hidden items-center gap-8 md:flex">
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
            <div className="flex items-center gap-6">
                <Link to="/search">
                    <SearchOutlined className="cursor-pointer text-xl text-slate-500 transition hover:text-slate-900" />
                </Link>
                <Badge dot offset={[-2, 2]} className="cursor-pointer">
                    <BellFilled className="text-xl text-slate-500 transition hover:text-slate-900" />
                </Badge>
                <Avatar
                    size={40}
                    icon={<UserOutlined />}
                    className="cursor-pointer bg-orange-100 text-orange-500"
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
                />
            </div>
        </header>
    )
}


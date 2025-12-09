import type { ReactNode } from 'react'

type Props = {
    children: ReactNode
}

export function MainLayout({ children }: Props) {
    return (
        <div className="min-h-screen bg-white text-slate-900">
            <div className="relative mx-auto">{children}</div>
        </div>
    )
}


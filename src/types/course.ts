export type Course = {
    id: string
    title: string
    category: string
    level: 'Beginner' | 'Intermediate' | 'Advanced'
    durationMinutes: number
    chapters: number
    teacher: string
    heroImage: string
}


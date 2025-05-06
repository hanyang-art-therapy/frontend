import { Contact, BookOpen, HeartHandshake, Palette } from 'lucide-react';

export const QUICK_LINK = [
    {
        id: 1,
        icon: Contact,
        title: '교수진 소개',
        path: '#', // 실제 경로로 교체
        bgClass: 'bg-bg-secondary/80',
    },
    {
        id: 2,
        icon: BookOpen,
        title: '교육 과정',
        path: '#', // 실제 경로로 교체
        bgClass: 'bg-bg-primary/70',
    },
    {
        id: 3,
        icon: HeartHandshake,
        title: '임상활동',
        path: '#', // 실제 경로로 교체
        bgClass: 'bg-bg-primary/80',
    },
    {
        id: 4,
        icon: Palette,
        title: '갤러리',
        path: '/gallery', // 실제 경로로 교체
        bgClass: 'bg-bg-primary/90',
    },
]
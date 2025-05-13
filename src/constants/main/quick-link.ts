import { Contact, BookOpen, ScanHeart, Palette, Smile } from 'lucide-react';

export const QUICK_LINK = [
    {
        id: 1,
        icon: Smile,
        title: '미술심리상담\n날다',
        text: '사이트로 이동',
        path: 'https://arttherapynalda.com/',
        bgClass: 'bg-bg-secondary/80',
    },
    {
        id: 2,
        icon: Contact,
        title: '교수진소개',
        text: '자세히 보기',
        path: '/intro/professors',
        bgClass: 'bg-bg-primary/68',
    },
    {
        id: 3,
        icon: BookOpen,
        title: '교육과정',
        text: '자세히 보기',
        path: '/coming-soon',
        bgClass: 'bg-bg-primary/76',
    },
    {
        id: 4,
        icon: ScanHeart,
        title: '임상활동',
        text: '자세히 보기',
        path: '/coming-soon',
        bgClass: 'bg-bg-primary/84',
    },
        {
        id: 5,
        icon: Palette,
        title: '갤러리',
        text: '자세히 보기',
        path: '/gallery',
        bgClass: 'bg-bg-primary/92',
    },
]
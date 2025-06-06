import NoticeDetail from '@/components/notice/notice-detail/notice-detail';
import { NOTICE_MOCK_DATA } from '@/constants/notice/notice';

export default function NoticeDetailPage() {
  return <NoticeDetail data={NOTICE_MOCK_DATA.content} />;
}

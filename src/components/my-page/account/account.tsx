import AccountActions from '@/components/my-page/account/account-actions';
import AccountTable from '@/components/my-page/account/account-table';
import MyPageHeader from '@/components/my-page/ui/my-page-header';
import type { MyPage as MyPageType } from '@/types/my-page';

export default function Account({ accountData }: { accountData: MyPageType }) {
  return (
    <>
      <MyPageHeader title='개인정보 관리' />
      <AccountTable accountData={accountData} />
      <AccountActions />
    </>
  );
}

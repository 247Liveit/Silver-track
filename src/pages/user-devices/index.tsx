import PageHead from '@/components/shared/page-head';
import { UserDevice } from '@/types/types';
import { useGet } from '@/lib/api/queries/generic';
import { SkeletonBig } from '@/components/ui/skeleton';
import { useNavigate } from 'react-router-dom';
import UserDevicesTable from './components/UserDevicesTable';

export default function UserDevicesPage() {
  const { data, isLoading, refetch } = useGet<UserDevice>('/user-devices', { limit: 100, system: "tracking" });


  return (
    <>
      {isLoading ? <SkeletonBig /> :
        <div className='mx-6'>
          <PageHead title="Dashboard | User Devices" />
          <div className="px-5">
            <UserDevicesTable items={data} setItems={refetch} />
          </div>
        </div>
      }
    </>
  );
}

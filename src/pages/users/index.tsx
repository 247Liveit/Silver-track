import PageHead from '@/components/shared/page-head';
import PopupModal from '@/components/shared/popup-modal';
import CustomFormLayout from "@/components/shared/form/CustomFormLayout";
import UserForm from './forms/UserForm';
import UsersTable from '@/pages/users/components/UsersTable';
import { User } from '@/types/types';
import { useGetSingle } from '@/lib/api/queries/generic';
import { createUserSchema } from '@/lib/validation/zodSchema';
import { PaginationApiType } from '@/types/table/PaginationTypes';
import { SkeletonBig } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Eye, Plus, UsersIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function UsersPage() {
  const { data, isLoading, refetch } = useGetSingle<PaginationApiType<User>>('/users', { limit: 100, system: "tracking" });
  const navigate = useNavigate();


  return (
    <>
      {isLoading ? <SkeletonBig /> :
        <div className='mx-6'>
          <PageHead title="Dashboard | Users" />
          <div className="px-5">
            <div className="gap-3 mb-4">
              <PopupModal
                title='Add user'
                url="/users"
                extraBtns={() => {
                  return (
                    <Button className="flex justify-end ml-auto  text-xs md:text-sm "
                      onClick={() => {
                        navigate('/dashboard/user-groups')
                      }}>
                      <UsersIcon className="mr-2 h-4 w-4" /> User Groups
                    </Button>
                  )
                }}
                renderModal={(onClose) => {
                  return (<CustomFormLayout
                    item={{ password: "", system: "tracking" }}
                    url='/users' redirectUrl=''
                    edit={true} onSave={() => {
                      refetch();
                      onClose();
                    }}
                    validationSchema={createUserSchema}
                    showNewBtn={false}>
                    <UserForm />
                  </CustomFormLayout>
                  );
                }}
              />
            </div>
            <UsersTable items={data?.items} setItems={refetch} />
          </div>
        </div>
      }
    </>
  );
}

import PageHead from '@/components/shared/page-head';
import PopupModal from '@/components/shared/popup-modal';
import CustomFormLayout from "@/components/shared/form/CustomFormLayout";
import UserGroupForm from './forms/UserGroupForm';
import UserGroupsTable from '@/pages/user-groups/components/UsersGroupTable';
import { User } from '@/types/types';
import { useGetSingle } from '@/lib/api/queries/generic';
import { createUserGroupSchema, createUserSchema, UserGroupFormDataFormat } from '@/lib/validation/zodSchema';
import { PaginationApiType } from '@/types/table/PaginationTypes';
import { SkeletonBig } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { UsersIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function UserGroupsPage() {
  const { data, isLoading, refetch } = useGetSingle<PaginationApiType<User>>('/user-groups/paginate', { limit: 100, system: "tracking" });
  const navigate = useNavigate();

  return (
    <>
      {isLoading ? <SkeletonBig /> :
        <div className='mx-6'>
          <PageHead title="Dashboard | User Groups" />
          <div className="px-5">
            <div className="gap-3 mb-4">
              <PopupModal
                url="/user-groups" 
                title='Add User Group'
                extraBtns={() => {
                  return (
                    <Button className="flex justify-end ml-auto  text-xs md:text-sm "
                      onClick={() => {
                        navigate('/dashboard/users')
                      }}>
                      <UsersIcon className="mr-2 h-4 w-4" /> Go To Users
                    </Button>
                  )
                }}
                renderModal={(onClose) => {
                  return (
                    <div >
                      <CustomFormLayout
                        item={{ password: "", system: "tracking" }}
                        url='/user-groups' redirectUrl=''
                        edit={true} onSave={() => {
                          refetch();
                          onClose();
                        }}
                        validationSchema={createUserGroupSchema}
                        dataFromatter={UserGroupFormDataFormat}
                        showNewBtn={false}>
                        <UserGroupForm />
                      </CustomFormLayout>
                    </div>
                  );
                }}
              />
            </div>
            <UserGroupsTable items={data?.items} setItems={refetch} />
          </div>
        </div>
      }
    </>
  );
}

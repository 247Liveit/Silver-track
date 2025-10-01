import PageHead from '@/components/shared/page-head';
import { useSearchParams } from 'react-router-dom';
import PopupModal from '@/components/shared/popup-modal';
import CustomFormLayout from "@/components/shared/form/CustomFormLayout";
import ClientsForm from './components/forms/ClientForm';
import { Client } from '@/types/types';
import { useGetSingle } from '@/lib/api/queries/generic';
import ClientsTable from './components/ClientsTable';
import { clientSchema } from '@/lib/validation/zodSchema';
import { PaginationApiType } from '@/types/table/PaginationTypes';
import CustomInputSimple from '@/components/shared/form/inputs/CustomInputSimple';
import { useCallback, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { SkeletonBig } from '@/components/ui/skeleton';
import { debounce } from '@/lib/utils';


export default function ClientsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const clientKey='/clients/paginate';
  const page = Number(searchParams.get('page') || 1);
  const pageLimit = Number(searchParams.get('limit') || 25);
  const search = searchParams.get('search') || '';
  const handleSearch = useCallback(
    debounce((searchTerm: string) => {
        const newSearchParams = new URLSearchParams(searchParams);
        if (searchTerm) {
            newSearchParams.set('search', searchTerm);
            newSearchParams.delete('page');
            newSearchParams.delete('limit');
        } else {
            newSearchParams.delete('search');
        }
        setSearchParams(newSearchParams);
        
    }, 300),
    [searchParams, setSearchParams]
);
  const { data, isLoading, refetch } = useGetSingle<PaginationApiType<Client>>(clientKey+"clientPage", 
    { limit: pageLimit, page: page, search: search },null,clientKey);

  const queryClient = useQueryClient();

  useEffect(()=>{
    queryClient.invalidateQueries({queryKey:[clientKey+"clientPage"]})
  },[page,pageLimit,search])

  if (isLoading) {
    return (
    <SkeletonBig/>
    );
  }

  return (
    <div className='mx-6'>
      <PageHead title="Dashboard | Clients" />
      <div className="px-5">
        <div className="gap-3 mb-1 n
        ">
          <PopupModal
            renderModal={(onClose) => {
              return (<CustomFormLayout
                item={{}}
                url='/clients' redirectUrl=''
                resetForm={true}
                edit={true} onSave={()=>{
                  refetch()
                  onClose()
                }}
                validationSchema={clientSchema}
                showNewBtn={false}>
                <ClientsForm />
              </CustomFormLayout>
              );
            }}
          />
        </div>
        <CustomInputSimple
          error={""}
          title="Search"
          name="search"
          type="text"
          value={search}
          defaultValue={search}
          placeholder="Search"
          disabled={false}
          onChange={(e) => handleSearch(e.target.value)}
        />
        {!isLoading &&
          <ClientsTable items={data} setItems={refetch} />
        }
      </div>
    </div>
  );
}

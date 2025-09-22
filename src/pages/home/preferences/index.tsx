import PageHead from '@/components/shared/page-head.jsx';
import { Button } from '@/components/ui/button';
import { Link, useSearchParams } from 'react-router-dom';
import Loading from '../loading';
import { useGet, useGetSingle } from '@/lib/api/queries/generic';
import { Alert, Preference, SpecialDay } from '@/types/preferences';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AlertTab from '@/components/dashboard/preferences/AlertTab';
import { useQueryClient } from '@tanstack/react-query';
import { handleEditCache } from '@/lib/cache-util';
import RatesTab from '@/components/dashboard/preferences/RatesTab';
import SpecialDaysTab from '@/components/dashboard/preferences/SpecialDaysTab';
import GeneralTab from '@/components/dashboard/preferences/GeneralTab';
import HistoriesTab from '@/components/dashboard/preferences/HisrtoriesTab';
import { TableProp } from '@/types/CommonPageProp';
import { UserHistory } from '@/types/pagesData';
import { useEffect } from 'react';


export default function PreferncesPage() {
  const alertKey = "/preferences/alerts"
  const HisKey = "/users/history"
  const prefKey = "/preferences"
  const daysKey = "/preferences/special-days"

  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page') || 1);
  const pageLimit = Number(searchParams.get('limit') || 10);
  const search = searchParams.get('search') || '';

  const { data: alerts, isLoading } = useGet<Alert>(alertKey)
  const { data: preference, refetch } = useGetSingle<Preference>(prefKey)
  const { data: history } = useGetSingle<TableProp<UserHistory>>(HisKey,{
    page:page,
    limit:pageLimit,
    search:search
  })

  const { data: days, isLoading: isDaysLoading, refetch: daysRefetch } = useGet<SpecialDay>(daysKey)
  
  const queryClient = useQueryClient();

  useEffect(()=>{
    queryClient.invalidateQueries({queryKey:[HisKey]})
  },[page,pageLimit,search])
  
  if (isLoading || isDaysLoading)
    return <Loading />

  return (
    <div className='m-6'>
      <PageHead title="Dashboard | Prefernce" />
      {/* <ScheduleInterface/> */}
      <div className='grid grid-cols-8'>
        <h1 className='col-span-6 lg:col-span-7 ms-4 text-2xl font-bold'>Preferences</h1>

        <Link to={`/dashboard`}
          className='btn col-span-2 lg:col-span-1  mt-4 text-md font-bold'>
          <Button className='w-full'>
            Go Back
          </Button>
        </Link>
      </div>
      <Tabs defaultValue="histories" className="mt-6 " onValueChange={value => {
        // setCurrentTab(value)
      }}>
        <TabsList className="grid grid-cols-2  w-full lg:w-fit lg:flex lg:items-left">
          {/* <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="rates">Rates</TabsTrigger>
          <TabsTrigger value="SpecialDays">Special Days</TabsTrigger> */}
          <TabsTrigger value="histories">Histories</TabsTrigger>
        </TabsList>

        {/* <GeneralTab id="general" data={preference} handleAction={(data) => { refetch() }} />
        <AlertTab id="alerts" data={alerts} handleAction={(data) => { handleEditCache({ item: data, type: 'edit', cacheKey: alertKey }) }} />
        <RatesTab id="rates" data={preference} handleAction={(data) => { refetch() }} />
        <SpecialDaysTab id="SpecialDays" data={days} handleAction={(data) => { daysRefetch() }} /> */}
        <HistoriesTab id="histories" data={history} />


      </Tabs>

    </div>
  );
}

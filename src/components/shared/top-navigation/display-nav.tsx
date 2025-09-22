import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Modal } from '@/components/ui/modal';
import withAccessControl from '@/rbac/access-control-wrapper';
import { Action, Resource } from '@/rbac/aceess-rules';
import useAccessControl from '@/rbac/use-access-control';
import { addDays, addMonths, addWeeks, subDays, subMonths, subWeeks } from 'date-fns';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function DisplayNav() {

  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);


  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative mr-2 h-14 w-14 rounded-full">
            Display
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64" align="end" forceMount>
          <DropdownMenuGroup>
            <DropdownMenuItem className='flex justify-between' onClick={() => {
              const filterStartDate = queryParams.get('filterStartDate') ?? subDays(new Date(), 2).toISOString().split('T')[0];
              const filterEndDate = queryParams.get('filterEndDate') ?? addDays(new Date(), 4).toISOString().split('T')[0];

              queryParams.set('filterStartDate', addDays(filterStartDate, -1)?.toISOString().split('T')[0]);
              queryParams.set('filterEndDate', addDays(filterEndDate, -1).toISOString().split('T')[0]);

              navigate({ search: queryParams.toString() })
            }}>

              <div>Back Day</div><div>Alt+Left</div>

            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='flex justify-between' onClick={() => {
              const filterStartDate = queryParams.get('filterStartDate') ?? subDays(new Date(), 2).toISOString().split('T')[0];
              const filterEndDate = queryParams.get('filterEndDate') ?? addDays(new Date(), 4).toISOString().split('T')[0];

              queryParams.set('filterStartDate', addDays(filterStartDate, 1)?.toISOString().split('T')[0]);
              queryParams.set('filterEndDate', addDays(filterEndDate, 1).toISOString().split('T')[0]);

              navigate({ search: queryParams.toString() })
            }}>
              <div>Ahead Day</div><div>Alt+Right</div>

            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='flex justify-between' onClick={() => {
              const filterStartDate = queryParams.get('filterStartDate') ?? subDays(new Date(), 2).toISOString().split('T')[0];
              const filterEndDate = queryParams.get('filterEndDate') ?? addDays(new Date(), 3).toISOString().split('T')[0];

              queryParams.set('filterStartDate', subWeeks(filterStartDate, 1)?.toISOString().split('T')[0]);
              queryParams.set('filterEndDate', subWeeks(filterEndDate, 1).toISOString().split('T')[0]);

              navigate({ search: queryParams.toString() })
            }}>
              <div>Back Week</div><div>Ctrl+Alt+Left</div>

            </DropdownMenuItem>
            <DropdownMenuSeparator />

            <DropdownMenuItem className='flex justify-between' onClick={() => {
              const filterStartDate = queryParams.get('filterStartDate') ?? subDays(new Date(), 2).toISOString().split('T')[0];
              const filterEndDate = queryParams.get('filterEndDate') ?? addDays(new Date(), 4).toISOString().split('T')[0];

              queryParams.set('filterStartDate', addWeeks(filterStartDate, 1)?.toISOString().split('T')[0]);
              queryParams.set('filterEndDate', addWeeks(filterEndDate, 1).toISOString().split('T')[0]);

              navigate({ search: queryParams.toString() })
            }}>
              <div>Ahead Week</div><div>Ctrl+Alt+Right</div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='flex justify-between' onClick={() => {
              const filterStartDate = queryParams.get('filterStartDate') ?? subDays(new Date(), 2).toISOString().split('T')[0];
              const filterEndDate = queryParams.get('filterEndDate') ?? addDays(new Date(), 4).toISOString().split('T')[0];

              queryParams.set('filterStartDate', subMonths(filterStartDate, 1)?.toISOString().split('T')[0]);
              queryParams.set('filterEndDate', subMonths(filterEndDate, 1).toISOString().split('T')[0]);

              navigate({ search: queryParams.toString() })
            }}>
              <div>Back Month</div><div>Ctrl+Alt+PgUp</div>

            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='flex justify-between' onClick={() => {
              const filterStartDate = queryParams.get('filterStartDate') ?? subDays(new Date(), 2).toISOString().split('T')[0];
              const filterEndDate = queryParams.get('filterEndDate') ?? addDays(new Date(), 4).toISOString().split('T')[0];

              queryParams.set('filterStartDate', addMonths(filterStartDate, 1)?.toISOString().split('T')[0]);
              queryParams.set('filterEndDate', addMonths(filterEndDate, 1).toISOString().split('T')[0]);

              navigate({ search: queryParams.toString() })
            }}>
              <div>Ahead Month</div><div>Ctrl+Alt+PgUp</div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Range</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                {[...Array(12).keys()].map(i => {
                  return (
                    <DropdownMenuItem className='flex justify-between' key={i} onClick={() => {
                      const filterStartDate = queryParams.get('filterStartDate') ?? subDays(new Date(), 2).toISOString().split('T')[0];

                      queryParams.set('filterStartDate', filterStartDate);
                      queryParams.set('filterEndDate', subDays(addWeeks(filterStartDate, (i + 1)), 1).toISOString().split('T')[0]);

                      navigate({ search: queryParams.toString() });
                    }}>
                      {(i + 1)} Week{(i + 1) != 1 ? "s" : ""}
                      <DropdownMenuSeparator />
                    </DropdownMenuItem>
                  )
                })}

              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuItem className='flex justify-between' onClick={() => {
              const filterStartDate = queryParams.get('filterStartDate') ?? subDays(new Date(), 2).toISOString().split('T')[0];
              const filterEndDate = queryParams.get('filterEndDate') ?? addDays(new Date(), 4).toISOString().split('T')[0];

              queryParams.set('filterStartDate', subWeeks(filterStartDate, 1).toISOString().split('T')[0]);
              queryParams.set('filterEndDate', subWeeks(filterEndDate, 1).toISOString().split('T')[0]);

              navigate({ search: queryParams.toString() })
            }}>
              <div>Decrease</div><div>Ctrl+Alt+Down</div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='flex justify-between' onClick={() => {
              const filterStartDate = queryParams.get('filterStartDate') ?? subDays(new Date(), 2).toISOString().split('T')[0];
              const filterEndDate = queryParams.get('filterEndDate') ?? addDays(new Date(), 4).toISOString().split('T')[0];

              queryParams.set('filterStartDate', addWeeks(filterStartDate, 1).toISOString().split('T')[0]);
              queryParams.set('filterEndDate', addWeeks(filterEndDate, 1).toISOString().split('T')[0]);

              navigate({ search: queryParams.toString() })
            }}>
              <div>Increase</div><div>Ctrl+Alt+Up</div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='flex justify-between' onClick={() => {
              const filterStartDate = queryParams.get('filterStartDate') ?? subDays(new Date(), 2).toISOString().split('T')[0];

              queryParams.set('filterStartDate', filterStartDate);
              queryParams.set('filterEndDate', subDays(addWeeks(filterStartDate, (1)), 1).toISOString().split('T')[0]);

              navigate({ search: queryParams.toString() })
            }}>
              <div>1 Week</div><div>Ctrl+End</div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='flex justify-between' onClick={() => {
              const filterStartDate = queryParams.get('filterStartDate') ?? subDays(new Date(), 2).toISOString().split('T')[0];

              queryParams.set('filterStartDate', filterStartDate);
              queryParams.set('filterEndDate', subDays(addWeeks(filterStartDate, 12), 1).toISOString().split('T')[0]);

              navigate({ search: queryParams.toString() })
            }}>
              <div>12 Week</div><div >Ctrl+Home</div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}


export const ProtectedDisplayNav = withAccessControl(DisplayNav);
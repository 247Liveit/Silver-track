import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import CustomFormLayout from "@/components/shared/form/CustomFormLayout";
import { Modal } from '@/components/ui/modal';
import withAccessControl from '@/rbac/access-control-wrapper';
import { useState } from 'react';

export default function ReportNav() {

  // const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  // const [selectedReport, setSelectedReport] = useState<string>("employeeList");

  // function closeReportModal() {
  //   setIsReportModalOpen(false);
  // }
  
  return (
    <>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-14 w-14 rounded-full">
            Report
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuGroup>
            <DropdownMenuItem >
              Person
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => {
              // setIsReportModalOpen(true)
              // setSelectedReport("employeeList")
            }}>
              List
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => {
              // setIsReportModalOpen(true)
              // setSelectedReport("employeeSchedule")
            }}>
              Schedule
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => {
              // setIsReportModalOpen(true)
              // setSelectedReport("employeeTime")
            }}>
              Time
            </DropdownMenuItem>


          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              Location
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => {
              // setIsReportModalOpen(true)
              // setSelectedReport("locationList")
            }}>
              List
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => {
              // setIsReportModalOpen(true)
              // setSelectedReport("locationSchedule")
            }}>
              Schedule
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => {
              // setIsReportModalOpen(true)
              // setSelectedReport("locationTime")
            }}>
              Time
            </DropdownMenuItem>

          </DropdownMenuGroup>
          <DropdownMenuSeparator />
        </DropdownMenuContent>
      </DropdownMenu>
      </>
  );
}


export const ReportNavProtected = withAccessControl(ReportNav);
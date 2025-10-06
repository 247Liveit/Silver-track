import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { IssueType, LocationIssueType } from '@/types/pagesData';
import { itemsEqual } from '@dnd-kit/sortable/dist/utilities';
import {  Edit2Icon, Trash2Icon } from 'lucide-react';
import React from 'react';

interface IssueTypeListProps {
    issues: IssueType[];
    selectedIssues: LocationIssueType[];
    onSelectionChange: (selectedIds:LocationIssueType[]) => void;
    className?: string;
    onDeleteEditClick?: any;
    locationId?:number
}

const IssueTypeList: React.FC<IssueTypeListProps> = ({ issues, selectedIssues,locationId, onSelectionChange, className, onDeleteEditClick }) => {
   console.log(selectedIssues)
    const handleCheckboxChange = (issue: IssueType) => {
        const isSelected = selectedIssues.filter(item=> item.issue_type_id === issue.id).length > 0;
        console.log(issue.id);
        console.log(isSelected);
        const updatedSelection = isSelected
            ? selectedIssues.filter(issueId => issueId.issue_type_id !== issue.id)
            : [...selectedIssues, {issue_type_id:issue.id,location_id:locationId||0,id:0}];
            console.log(updatedSelection);
        onSelectionChange(updatedSelection);
    };

    return (
        <div className={`${className}`}>
            <div  className='max-h-96 overflow-y-auto'>
                {issues.length > 0 ? issues.map(issue => (
                    <div key={issue.id} className=' border border-gray-300 rounded-md p-1 mb-1 flex items-center justify-between'>
                        <label >
                            <Button className='text-xs p-1 w-8 bg-orange-600' onClick={() => { onDeleteEditClick(issue) }}><Edit2Icon className='' /></Button>
                            <input
                                className='p-1 gap-2 m-2'
                                type="checkbox"
                                checked={selectedIssues.filter(item=> item.issue_type_id === issue.id).length > 0}
                                onChange={() => handleCheckboxChange(issue)}
                            />
                            {issue.name}
                            <Badge className='ml-2 text-white' variant={issue.isActive?"success":"destructive"}>{issue.isActive?"Active":"Inactive"}</Badge>
                        </label>
                        <Button className='text-xs p-1 w-8 bg-red-600' onClick={() => { onDeleteEditClick(issue,"delete") }}><Trash2Icon className='' /></Button>

                    </div>
                    
                ))
                    :
                    <b className='text-red-400'>- No issue types found !</b>
                }
            </div>
            
        </div>
    );
};

export default IssueTypeList;
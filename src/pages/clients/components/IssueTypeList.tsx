import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { IssueType } from '@/types/pagesData';
import {  Edit2Icon } from 'lucide-react';
import React from 'react';

interface IssueTypeListProps {
    issues: IssueType[];
    selectedIssues: number[];
    onSelectionChange: (selectedIds: number[]) => void;
    className?: string;
    onEditClick?: any;
}

const IssueTypeList: React.FC<IssueTypeListProps> = ({ issues, selectedIssues, onSelectionChange, className, onEditClick }) => {
    const handleCheckboxChange = (id: number) => {
        const isSelected = selectedIssues.includes(id);
        const updatedSelection = isSelected
            ? selectedIssues.filter(issueId => issueId !== id)
            : [...selectedIssues, id];
        onSelectionChange(updatedSelection);
    };

    return (
        <div className={`${className}`}>
            <div  className='max-h-96 overflow-y-auto'>
                {issues.length > 0 ? issues.map(issue => (
                    <div key={issue.id} className=' border border-gray-300 rounded-md p-1 mb-1 '>
                        <label >
                            <Button className='text-xs p-1 w-8 bg-orange-600' onClick={() => { onEditClick(issue) }}><Edit2Icon className='' /></Button>
                            <input
                                className='p-1 gap-2 m-2'
                                type="checkbox"
                                checked={selectedIssues.includes(issue.id)}
                                onChange={() => handleCheckboxChange(issue.id)}
                            />
                            {issue.name}
                            <Badge className='ml-2 text-white' variant={issue.isActive?"success":"destructive"}>{issue.isActive?"Active":"Inactive"}</Badge>
                        </label>
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
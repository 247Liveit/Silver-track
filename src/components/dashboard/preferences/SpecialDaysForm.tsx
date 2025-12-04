
import { FormContext } from '@/providers/formContext';;
import CustomInput from '@/components/shared/form/inputs/CustomInput';
import { useContext } from 'react';
import InlineCheckBox from '@/components/shared/form/inputs/InlineCheckBox';

const SpecialDaysForm = () => {
    const { register, errors, edit, setValue, itemState } = useContext(FormContext);

    console.error(errors)
    return (
        <>

            {/* Phone Numbers Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                
                    {/* Address */}
                    <CustomInput
                        error={errors.name?.message}
                        {...register('name')}
                        title="Name"
                        name="name"
                        type="text"
                        disabled={!edit}

                    />
                    
                    <InlineCheckBox
                        error={errors.repeat?.message}
                        {...register('repeat')}
                        title="Repeat"
                        name="repeat"
                        item={{ id: "repeat", name: "Repeat" }}
                        disabled={!edit}
                    />
                    <CustomInput
                        error={errors.start?.message}
                        {...register('start')}
                        title="Start"
                        name="start"
                        type="date"
                        disabled={!edit}
                    />
                    <CustomInput
                        error={errors.end?.message}
                        {...register('end')}
                        title="End"
                        name="end"
                        type="date"
                        disabled={!edit}
                    />
                
                </div>
        </>
    );
};

export default SpecialDaysForm;

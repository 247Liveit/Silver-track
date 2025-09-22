
import CustomInput from '@/components/shared/form/inputs/CustomInput';
import { FormContext } from '@/providers/formContext';
import { useContext } from 'react';

const GeneralForm = () => {
    const { register, errors, edit } = useContext(FormContext);


    return (
        <>

            {/* Phone Numbers Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                    {/* Address */}
                    <CustomInput
                        error={errors.longWeek?.message}
                        {...register('longWeek')}
                        title="Default Long Week"
                        name="longWeek"
                        type="number"
                        placeholder="5"
                        disabled={!edit}

                    />
                    <CustomInput
                        error={errors.longDay?.message}
                        {...register('longDay')}
                        title="Long Day"
                        name="longDay"
                        type="number"
                        placeholder="5"
                        disabled={!edit}
                    />
                    <CustomInput
                        error={errors.longShift?.message}
                        {...register('longShift')}
                        title="Long Shift"
                        name="longShift"
                        type="number"
                        placeholder="5"
                        disabled={!edit}
                    />
                </div>

            </div>
        </>
    );
};

export default GeneralForm;

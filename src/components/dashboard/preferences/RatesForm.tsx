
import { FormContext } from '@/providers/formContext';;
import CustomInput from '@/components/shared/form/inputs/CustomInput';
import { useContext } from 'react';

const RatesForm = () => {
    const { register, errors, edit} = useContext(FormContext);


    return (
        <>

            {/* Phone Numbers Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                    {/* Address */}
                    <CustomInput
                        error={errors.payRate?.message}
                        {...register('payRate')}
                        title="Default Pay Rate"
                        name="payRate"
                        type="number"
                        step={0.1}
                        placeholder="5"
                        disabled={!edit}

                    />
                    <CustomInput
                        error={errors.payRateOverTime?.message}
                        {...register('payRateOverTime')}
                        title="Pay Rate Over Time"
                        name="payRateOverTime"
                        type="number"
                        step={0.1}
                        placeholder="5"
                        disabled={!edit}
                    />
                    <CustomInput
                        error={errors.payRateSpecialDay?.message}
                        {...register('payRateSpecialDay')}
                        title="Pay Rate Special Day"
                        name="payRateSpecialDay"
                        type="number"
                        step={0.1}
                        placeholder="5"
                        disabled={!edit}
                    />
                </div>
                <div>
                    {/* Address */}
                    <CustomInput
                        error={errors.billRate?.message}
                        {...register('billRate')}
                        title="Default Bill Rate"
                        name="billRate"
                        type="number"
                        step={0.1}
                        placeholder="5"
                        disabled={!edit}

                    />
                    <CustomInput
                        error={errors.billRateOverTime?.message}
                        {...register('billRateOverTime')}
                        title="Bill Rate Over Time"
                        name="billRateOverTime"
                        type="number"
                        step={0.1}
                        placeholder="5"
                        disabled={!edit}
                    />
                    <CustomInput
                        error={errors.billRateSpecialDay?.message}
                        {...register('billRateSpecialDay')}
                        title="bill Rate Special Day"
                        name="BillRateSpecialDay"
                        type="number"
                        step={0.1}
                        placeholder="5"
                        disabled={!edit}
                    />
                </div>
            </div>
        </>
    );
};

export default RatesForm;

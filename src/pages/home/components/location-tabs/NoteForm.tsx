import CustomInput from '@/components/shared/form/inputs/CustomInput';
import { FormContext } from '@/providers/formContext';
import { useContext, useEffect } from 'react';

const NoteForm = ({ entityId }: { entityId: number }) => {
  const { errors, edit, setValue, itemState } = useContext(FormContext);
  useEffect(()=>{
    setValue("modelId",entityId)
  },itemState.type)

  return (
    <>

      {/* Phone Numbers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4">

        <CustomInput
          error={errors.text?.message}
          title="Note"
          name="text"
          type="textarea"
          placeholder="Enter Note"
          disabled={!edit}
        />
      </div>
    </>
  );
};

export default NoteForm;

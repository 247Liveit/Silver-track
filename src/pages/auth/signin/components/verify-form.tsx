import { UserCircleIcon } from "lucide-react";
import CustomInput from '@/components/shared/form/inputs/CustomInput';

export default function VerifyForm() {
  return (<div className=" gap-4">
    <h3 className="font-bold mb-2"></h3>
    <CustomInput type='hidden' hidden name="email" title='' placeholder=''  />
    <div className="col-md-12 col-lg-12 ">
      <CustomInput 
        title="Code( The code is valid for 1 minute )"
        name="code" type="text"
        placeholder=""
        icon={<UserCircleIcon />} />
    </div>
  </div>
  )
}
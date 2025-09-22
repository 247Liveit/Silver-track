import { UserCircleIcon } from "lucide-react";
import CustomInput from '@/components/shared/form/inputs/CustomInput';

export default function UserForm() {
  return (
    <div className=" gap-4">
      <div className="col-md-12 col-lg-12 ">
        <CustomInput
          title="Email"
          name="email" type="text"
          placeholder="email@email.com"
          icon={<UserCircleIcon />} />
      </div>
      <div className="col-md-12 col-lg-12">
        <CustomInput
          title="Password"
          name="password" type="password"
          placeholder="Password"
          icon={<UserCircleIcon />} />
      </div>
    </div>
  )
}
'use client'
import CustomInput from "@/components/shared/form/inputs/CustomInput";


export default function ExtraChargesForm() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Description Field */}
      <div className="col-md-12 col-lg-6">
        <CustomInput
          title="Description"
          name="description"
          type="text"
          placeholder="Enter description"
        />
      </div>

      {/* Amount Field */}
      <div className="col-md-12 col-lg-6">
        <CustomInput
          title="Amount"
          name="amount"
          type="number"
          placeholder="Enter amount"
        />
      </div>

      {/* Type Field */}
      <div className="col-md-12 col-lg-6">
        <CustomInput
          title="Type"
          name="type"
          type="text"
          placeholder="Enter type "
        />
      </div>
    </div>
  );
}
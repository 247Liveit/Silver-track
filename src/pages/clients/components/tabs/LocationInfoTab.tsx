import CustomInput from "@/components/shared/form/inputs/CustomInputSimple";
import { TabsContent } from "@/components/ui/tabs";
import { GuardType } from "@/lib/constants/Constants";
import { Location } from "@/types/pagesData";
import { LinkIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function LocationInfoTab({ location }: { location: Location | null }) {

  if (!location) return "No Location ! "
  const defaultEmployeeImgSrc = "https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001882.png";


  const [previewUrl, setPreviewUrl] = useState<string | null>(location.image || defaultEmployeeImgSrc);


  return (
    <TabsContent value="locationInfo" className={`"w-full h-11/12 grid  m-4 `}>


      <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
        <div className="space-y-4">
          <div className="grid lg:grid-cols-3 grid-cols-1 gap-2">
            <div>
              <CustomInput
                className='dark:text-black'
                title="Type"
                name="locationGuardType"
                defaultValue={GuardType[location.locationGuardType]}
                placeholder='' icon={<></>} type='single'
                disabled={true}
                inputClassName='text-black'
              />

            </div>
            <div className='col-span-2 grid lg:grid-cols-2 gap-2'>
              <CustomInput
                defaultValue={location.name}
                title="Location Name"
                name="name"
                type="string"
                placeholder="Location Name"
                disabled={true}
                inputClassName='text-black'
              />
              <CustomInput
                defaultValue={location.client?.name || location.clientName}
                title="Client Name"
                name="clientName"
                type="text"
                placeholder="Client Name"
                error=""
                disabled={true}
                inputClassName='text-black'
              />

            </div>
            <div>
              <CustomInput
                defaultValue={location.location}
                title="Location"
                name="location"
                type="string"
                placeholder="Location"
                disabled={true}
                inputClassName='text-black'
              />
            </div>

          </div>

          <div className="grid lg:grid-cols-3 grid-cols-1 gap-2">

            <div>
              <CustomInput
                defaultValue={location.reference}
                title="Reference"
                name="reference"
                type="string"
                placeholder="Reference"
                disabled={true}
                inputClassName='text-black'
              />
            </div>
            <div>
              <CustomInput 
                defaultValue={location.status ? "ACTIVE" : "INACTIVE"} 
                className='dark:text-black' 
                title="Status" name="status"
                placeholder='' icon={<></>} 
                type='single' disabled={true}
                inputClassName='text-black'
                />

            </div>
            <div>
              <CustomInput defaultValue={location.department} className='dark:text-black' title="Department" name="department"
                disabled={true}
                inputClassName='text-black'
                placeholder='' icon={<></>} type='single' />
            </div>
          </div>

          <div className='grid lg:grid-cols-2 grid-cols-1 gap-2'>
            <CustomInput
              defaultValue={location.address}
              type="textarea"
              title="Address"
              name="Address"
              placeholder="Address"
              rows={5}
              className="mt-1"
              disabled={true}
            />
            <CustomInput
              defaultValue={location.billingAddress}
              type="textarea"
              title="Billing Address"
              name="Billing Address"
              placeholder="Billing Address"
              rows={5}
              className="mt-1"
              disabled={true}
            />
          </div>

        </div>

        {/* Right Column */}
        <div className="space-y-7">
          <div>
            <CustomInput
              defaultValue={location.other}
              title="Other"
              type="textarea"
              name="other"
              placeholder="Other"
              rows={5}
              disabled={true}
            />
          </div>
          <div className="space-y-4">
            <div>
              <label className={`mb-2 block text-sm font-bold `}>
                Map
              </label>
              <Link className="inline flex text-blue-500" to={location?.geoLocationUrl} target="_blank" >Show on Map <LinkIcon /></Link>
            </div>
          </div>
          <div className='grid grid-cols-2 space-y-6'>
            <div className='text-center flex justify-center pt-5'>
              {previewUrl &&
                <img src={previewUrl} className='mt-4 w-28 h-28 object-cover rounded-lg mt-2' width={75} height={150} />
              }
            </div>

          </div>
        </div>
      </div>
    </TabsContent>
  );
}

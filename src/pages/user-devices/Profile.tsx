// 'use client'
// import React, {useContext} from "react";
// import {FormContext} from "@/ui/forms/CustomFormLayout";
// import {CalendarIcon, EnvelopeIcon, LockClosedIcon, UserCircleIcon} from "@heroicons/react/24/outline";
// import CustomInput from "@/ui/forms/inputs/CustomInput";
// import OrdersTable from "@/ui/dashboard/user/OrdersTable";
// import {GlobeAmericasIcon, HashtagIcon, PhoneIcon} from "@heroicons/react/24/solid";

// export default function Profile() {
//     const {register, errors, edit,item} = useContext(FormContext);
//     return (<>
//             <div className="grid grid-cols-2 gap-4">
//                 <CustomInput error={errors.firstName?.message} {...register('firstName')} title="First Name" name="name"
//                              type="string"
//                              placeholder="First Name"
//                              disabled={true}
//                              icon={<UserCircleIcon/>}/>
//                 <CustomInput error={errors.lastName?.message} {...register('lastName')} title="Last Name"
//                              name="lastName" type="string"
//                              placeholder="Last Name"
//                              disabled={true}
//                              icon={<UserCircleIcon/>}/>
//                 <CustomInput error={errors.email?.message} {...register('email')} title="Email" name="email"
//                              type="email" placeholder="email@example.com"
//                              disabled={true}
//                              icon={<EnvelopeIcon/>}/>
//                 <div className="col-md-12 col-lg-6 ">
//                     <CustomInput error={errors.address1?.message} {...register('address1')}
//                                  title="Home Address 1"
//                                  name="address1" type="string"
//                                  placeholder="Home Address 1"
//                                  disabled={!edit}
//                                  icon={<GlobeAmericasIcon/>}/>
//                 </div>
//                 <div className="col-md-12 col-lg-6 ">
//                     <CustomInput error={errors.address2?.message} {...register('address2')}
//                                  title="Home Address 2"
//                                  name="address2" type="string"
//                                  placeholder="Home Address 2"
//                                  disabled={!edit}
//                                  icon={<GlobeAmericasIcon/>}/>
//                 </div>
//                 <div className="col-md-12 col-lg-6 ">
//                     <CustomInput error={errors.city?.message} {...register('city')} title="City" name="city"
//                                  type="string"
//                                  placeholder="City"
//                                  disabled={!edit}
//                                  icon={<GlobeAmericasIcon/>}/>
//                 </div>
//                 <div className="col-md-12 col-lg-6 ">
//                     <CustomInput error={errors.cityState?.message} {...register('cityState')} title="State"
//                                  name="cityState" type="string"
//                                  placeholder="State"
//                                  disabled={!edit}
//                                  icon={<GlobeAmericasIcon/>}/>
//                 </div>
//                 <div className="col-md-12 col-lg-6 ">
//                     <CustomInput error={errors.zipCode?.message} {...register('zipCode')} title="Zip Code"
//                                  name="zipCode" type="string"
//                                  placeholder="Zip Code"
//                                  disabled={!edit}
//                                  icon={<GlobeAmericasIcon/>}/>
//                 </div>
//                 <div className="col-md-12 col-lg-6 ">
//                     <CustomInput error={errors.phone?.message} {...register('phone')}
//                                  title="Home Phone/Cell Number"
//                                  name="phone" type="string"
//                                  placeholder="Home Phone/Cell Number"
//                                  disabled={!edit}
//                                  icon={<PhoneIcon/>}/>
//                 </div>
//                 <div className="col-md-12 col-lg-6 ">
//                     <CustomInput error={errors.birthdate?.message} {...register('birthdate')}
//                                  title="Date of Birth (MM/DD/YYYY)" name="birthdate" type="string"
//                                  placeholder="MM/DD/YYYY"
//                                  disabled={!edit}
//                                  icon={<CalendarIcon/>}/>
//                 </div>
//                 <div className="col-md-12 col-lg-6 ">
//                     <CustomInput error={errors.socialSecurity?.message} {...register('socialSecurity')}
//                                  title="Social Security" name="socialSecurity" type="string"
//                                  placeholder="Social Security Number"
//                                  disabled={!edit}
//                                  icon={<HashtagIcon/>}/>
//                 </div>
//                 <div className="col-md-12 col-lg-6 ">
//                     <CustomInput error={errors.guardCardNumber?.message} {...register('guardCardNumber')}
//                                  title="Guard Card Number" name="guardCardNumber" type="string"
//                                  placeholder="Guard Card Number"
//                                  disabled={!edit}
//                                  icon={<HashtagIcon/>}/>
//                 </div>
//             </div>

//             <CustomInput error={errors.oldPassword?.message} {...register('oldPassword')} title="Old Password"
//                          name="oldPassword"
//                          type="password" placeholder="Old Password"
//                          disabled={!edit}
//                          icon={<LockClosedIcon/>}/>
//             <CustomInput error={errors.password?.message} {...register('password')} title="Password" name="password"
//                          type="password" placeholder="New password"
//                          disabled={!edit}
//                          icon={<LockClosedIcon/>}/>
//             <OrdersTable user={item}/>
//         </>
//     )
// }
import CustomInput from "@/components/shared/form/inputs/CustomInput";

const LocationRateForm = () => {

    return (
        <div className="w-full h-11/12">
            <div className="grid lg:grid-cols-1 grid-cols-1 gap-4">
                <div className="space-y-4">
                    <div className="grid lg:grid-cols-2 grid-cols-1 gap-2">
                        <div>
                            <div>
                                <CustomInput

                                    title="Normal Rate"
                                    name="normalRate"
                                    type="number"
                                    step={0.01}
                                    placeholder="Normal Rate"
                                />
                            </div>
                            <div>
                                <CustomInput

                                    title="OverTime Rate"
                                    name="overTimeRate"
                                    type="number"
                                    step={0.01}
                                    placeholder="OverTime Rate"

                                />
                            </div>
                            <div>
                                <CustomInput

                                    title="Special Day Rate"
                                    name="specialDayRate"
                                    type="number"
                                    step={0.01}
                                    placeholder="Special Day Rate"

                                />
                            </div>
                            <CustomInput

                                title="Weekly Overtime After"
                                name="longWeek"
                                type="number"
                                placeholder="5"

                            />
                            <CustomInput

                                title="Daily OvertTime After"
                                name="longDay"
                                type="number"
                                placeholder="5"
                            />
                        </div>
                        <div>

                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default LocationRateForm;
import React, {useState} from 'react'
import TextInput from '@/components/TextInput/TextInput';
import Select from '@/components/Select/Select';
import {useAddCampaign} from '@/hooks/campaignHooks';
import * as CampaignTypes from '@/api_services/campaign/campaignTypes';

const AddCampaignPopup = ({
  closePopup
}: {
  closePopup: () => void;
}) => {
  const addCampaign = useAddCampaign();

  const [formData, setFormData] = useState<{
    name: string;
    budget: string;
    spend: string;
    status: "draft" | "active" | "paused" | "completed";
  }>({
    name: "",
    budget: "",
    spend: "",
    status: "draft"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    closePopup();

    const campaignData: CampaignTypes.CampaignCreate = {
      name: formData.name,
      budget: formData.budget,
      spend: formData.spend,
      status: formData.status as "draft" | "active" | "paused" | "completed"
    };

    addCampaign.mutate({ campaign: campaignData })
  }



  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl p-8 shadow-xl flex flex-col gap-4 w-[500px]"
    >
      <h2 className="text-2xl font-bold mb-4">Add Campaign</h2>
      <TextInput
        type="name"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <TextInput
        type="number"
        id="budget"
        name="budget"
        value={formData.budget}
        onChange={handleChange}
        required
      />

      <TextInput
        type="number"
        id="spend"
        name="spend"
        value={formData.spend}
        onChange={handleChange}
        required
      />

      <Select
        id="status"
        name="status"
        value={formData.status}
        onChange={handleChange}
        required
      />

      <div className='w-full mt-4'>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors cursor-pointer w-full"
          type='submit'
        >
          Add Campaign
        </button>
      </div>


    </form>
  )
}

export default AddCampaignPopup

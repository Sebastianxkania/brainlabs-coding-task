"use client";

// Next.js
import { useState } from 'react';

// Components
import Loader from "@/components/Loader/Loader"
import Table from "@/components/Table/Table";
import AddCampaignPopup from '@/components/AddCampaignPopup/AddCampaignPopup';
import { Popup } from '@/components/Popup/Popup';

// Hooks
import { useFetchCampaigns } from "@/hooks/campaignHooks";
import { useFetchCsrf } from "@/hooks/csrfHooks";

export default function Home() {

  // Hooks
  const campaigns = useFetchCampaigns();
  useFetchCsrf();

  // States
  const [popupIsOpen, setPopupIsOpen] = useState<boolean>(false);

  return (
    <div className="flex justify-center items-center h-screen">
      {/* Add Widget Popup */}
      <Popup
        isOpen={popupIsOpen}
        onClose={() => setPopupIsOpen(false)}
      >
        <AddCampaignPopup
          closePopup={() => setPopupIsOpen(false)}
        />
      </Popup>

      {/* Main Content */}
      {campaigns.isLoading && <div className="flex justify-center items-center h-16"><Loader /></div>}
      {campaigns.isError && <div className="text-red-500">Error fetching campaigns</div>}
      {campaigns.isSuccess && campaigns.data &&

        <div className='flex flex-col gap-4 w-full max-w-4xl'>
          <h2 className="text-2xl font-bold text-[#161616]">Mange Campaigns</h2>

          <div className='ml-auto'>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors cursor-pointer w-full"
              onClick={() => setPopupIsOpen(true)}
            >
              Add Campaign
            </button>

          </div>


          <Table
            tableData={campaigns.data || []}
            noDataMessage="No campaigns available"
            pagination={7}
          />
        </div>
      }
    </div>
  );
}

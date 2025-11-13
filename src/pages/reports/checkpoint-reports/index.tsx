import AdvanceSelectSimple from "@/components/shared/form/inputs/AdvanceSelectSimple";
import InlineCheckBoxSimple from "@/components/shared/form/inputs/InlineCheckBoxSimple";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import useAxiosAuth from "@/lib/api/axios/hooks/useAxiosAuth";
import { useGetSingle } from "@/lib/api/queries/generic";
import { dateFromat, debounce } from "@/lib/utils";
import { Client } from "@/types/types";
import { PaginationApiType } from "@/types/table/PaginationTypes";
import { useCallback, useState } from "react";

export default function CheckpointReportsPage() {

  const [selectedClient, setSelectedClient] = useState<Client | null | undefined>(null);
  const [selectAllClients, setSelectAllClients] = useState<string | null | undefined>(null);
  const [dropSearch, setDropSearch] = useState<string>("");
  const [isLoadingPost, setLoadingPost] = useState<boolean>(false);
  const { toast } = useToast();
  const axios = useAxiosAuth();
  
  const { data: clients, isFetched, refetch } = useGetSingle<PaginationApiType<Client>>('/clients/paginate', {
    limit: 1000,
    page: 1,
    search: dropSearch,
    sortBy: "id",
    sortOrder: "DESC",
    fields: "id,name,contactName",
  }, []);

  const handleSearch = useCallback(
    debounce((searchTerm: string) => {
      setDropSearch(searchTerm);
      refetch()
    }, 300),
    []
  );

  function onGenerateReport() {

    if (!selectedClient && selectAllClients !== "All") {
      toast({
        title: "Validation Error",
        description: "Please select a client or check 'All Clients'",
        variant: "destructive"
      });
      return;
    }

    setLoadingPost(true);
    axios.post('/reports/checkpoints', {
      clientId: selectedClient ? selectedClient.id : null,
      allLocations: selectAllClients, 
    }).then((response) => {
      console.log(response)
      const blob = new Blob([response.data.data], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
      
      toast({
        title: "Success",
        description: "Report generated successfully",
        variant: "default"
      });
    }).catch((error) => {
      console.error("Error generating report:", error);
      if (error.response && error.response.data && error.response.status === 555) {
        toast({
          title: error.response.data.message[0],
          description: dateFromat(new Date()),
          variant: "destructive"
        })
      } else {
        toast({
          title: "Error",
          description: error.response?.data?.message || "Failed to generate report",
          variant: "destructive"
        });
      }
    }).finally(() => {
      setLoadingPost(false);
    });
  }

  return (
    <div className="p-4">
      <AdvanceSelectSimple 
        className='dark:text-black mt-4' 
        title="Client" 
        name="client"
        disabled={selectAllClients === "All"} 
        value={selectedClient ? selectedClient.id : ""}
        options={clients ? clients.items.map(item => { 
          return { 
            label: item.name || item.contactName || `Client ${item.id}`, 
            value: item.id 
          } 
        }) : []}
        selected={selectedClient?.id + ""}
        placeholder='Please Select'
        onTypeing={handleSearch}
        icon={<></>} 
        error={""} 
        type='single'
        onChange={e => {
          const client = clients ? clients.items.find(d => d.id == +e.target.value) : null;
          setSelectedClient(() => { return client });
        }}
      />
      <InlineCheckBoxSimple 
        title="" 
        name="allClients" 
        className="mt-4" 
        placeholder=""
        onChange={(e) => {
          setSelectAllClients(prev => {
            const newValue = prev === "All" ? null : "All";
    
            if (newValue === "All") {
              setSelectedClient(null);
            }
            return newValue;
          });
        }}
        items={[{ id: 'all', name: "All Clients", checked: selectAllClients === "All" }]}
      />
      <div className="p-4 flex items-center justify-center">
        <Button className="mt-4 text-center" onClick={() => {
          if (!isLoadingPost)
            onGenerateReport();
        }}>{isLoadingPost ? "Processing..." : "Generate Report"}</Button>
      </div>
    </div>
  );
}
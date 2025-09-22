import { queryClient } from "@/providers/app-provider";

export const handleEditCache = function ({ item, type, cacheKey }: { item: any, type: string, cacheKey: string }) {

  queryClient.setQueriesData({ queryKey: [`${cacheKey}`] }, (oldData: any) => {
    let newCategories = [] as any;
    if (type === 'edit') {
      newCategories = oldData?.map(itm => {
        if (itm.id === item.id) {
          return item;
        }
        return itm;
      });
    } else if (type == 'add') {
      newCategories = oldData;
      newCategories?.unshift(item);
    } else {
      newCategories = oldData?.filter(itm => itm.id !== item.id);
    }

    return newCategories
  });

}
export const handleSingleEditCache = function ({item, type,cacheKey}:{item:any,type:string,cacheKey:string}) {
    
    queryClient.setQueriesData({ queryKey: [`${cacheKey}`] }, (oldData:any)=>{

    return item
  });

}
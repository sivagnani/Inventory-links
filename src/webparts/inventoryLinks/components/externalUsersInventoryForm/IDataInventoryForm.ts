import { ISiteInfo } from "../../model/model";

export interface IExternalUsersInventoryFormProps{
    handleInputChange:(event:React.ChangeEvent<HTMLSelectElement>)=>void;
    source:string;
    isSubSiteSeleted:boolean;
    allSitesInfo:ISiteInfo[];
    fetchResults:()=>void;
    showSubSiteError:boolean;
}
export interface IExternalUsersInventoryFormState{
    
}
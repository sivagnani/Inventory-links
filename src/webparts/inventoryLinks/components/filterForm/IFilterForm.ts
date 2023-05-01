import { IFilterMode, ISiteInfo } from "../../model/model";

export interface IFilterFormProps{
    handleInputChange:(event:React.ChangeEvent<HTMLSelectElement>)=>void;
    filterMode:IFilterMode;
    source:string;
    isSubSiteSeleted:boolean;
    allSitesInfo:ISiteInfo[];
    showSubSiteError:boolean;
    usedSince:number;
    fetchResults:()=>void;
}
export interface IFilterFormState{
    
}
import { ISiteInfo } from "../../model/model";

export interface IRarelyAccessedFormProps{
    handleInputChange:(event:React.ChangeEvent<HTMLSelectElement>)=>void;
    source:string;
    isSubSiteSeleted:boolean;
    allSitesInfo:ISiteInfo[];
    usedSince:number,
    fetchResults:()=>void;
    showSubSiteError:boolean;
}
export interface IRarelyAccessedFormState{
    
}
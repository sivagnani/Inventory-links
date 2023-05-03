import { ISPFXContext } from "@pnp/sp";
import { IListInfo, ISiteInfo } from "../../model/model";

export interface IDataInventoryFormProps {
    context:ISPFXContext;
}
export interface IDataInventoryFormState {
    allSitesInfo: ISiteInfo[];
    isSubSiteSeleted: boolean;
    showResults: boolean;
    showSiteResults: boolean;
    noResultsFoundError: boolean;
    source: string;
    searchFor: string;
    subSite: string;
    showSubSiteError: boolean;
    siteResults: ISiteInfo[];
    listResults: IListInfo[];
}
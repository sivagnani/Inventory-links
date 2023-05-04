import { ISPFXContext } from "@pnp/sp";
import { IListInfo, ISiteInfo } from "../../model/model";

export interface IRarelyAccessedFormProps {
    context:ISPFXContext;
}
export interface IRarelyAccessedFormState {
    allSitesInfo: ISiteInfo[];
    allListsInfo: IListInfo[];
    isSubSiteSeleted: boolean;
    showResults: boolean;
    showSiteResults: boolean;
    noResultsFoundError: boolean;
    source: string;
    searchFor: string;
    subSite: string;
    usedSince: number;
    showSubSiteError: boolean;
    siteResults: ISiteInfo[];
    listResults: {
        [key: string]: IListInfo[];
    };
}
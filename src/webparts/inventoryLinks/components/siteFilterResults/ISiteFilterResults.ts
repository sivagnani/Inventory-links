import { ISiteInfo } from "../../model/model";

export interface ISiteFilterResultsProps{
    siteResults:ISiteInfo[];
}
export interface ISiteFilterResultsState{
    noResultsFoundError:boolean;
}
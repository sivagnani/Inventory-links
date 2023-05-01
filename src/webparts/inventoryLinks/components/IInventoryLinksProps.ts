import { ISPFXContext } from "@pnp/sp";
import { IFilterMode, IListInfo, ISiteInfo } from "../model/model";
export interface IInventoryLinksProps {
  context:ISPFXContext;
  filterMode:string;
}
export interface IInventoryLinksState{
  filterMode:IFilterMode;
  allSitesInfo:ISiteInfo[];
  allListsInfo:IListInfo[];
  isSubSiteSeleted:boolean;
  showResults:boolean;
  showSiteResults:boolean;
  noResultsFoundError:boolean;
  source:string;
  searchFor:string;
  subSite:string;
  usedSince:number;
  showSubSiteError:boolean;
  siteResults:ISiteInfo[];
  listResults:IListInfo[];
}

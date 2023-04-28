import { ISPFXContext } from "@pnp/sp";
import { IListInfo, ISiteInfo } from "../model/model";
export interface IInventoryLinksProps {
  context:ISPFXContext;
  filterMode:string;
}
export interface IInventoryLinksState{
  filterMode:string;
  isRarelyAccess:boolean;
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

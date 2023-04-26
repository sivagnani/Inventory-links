import { ISPFXContext } from "@pnp/sp";
import { SiteInfo } from "../model/model";
export interface IInventoryLinksProps {
  context:ISPFXContext;
}
export interface IInventoryLinksState{
  allSitesInfo:SiteInfo[];
}

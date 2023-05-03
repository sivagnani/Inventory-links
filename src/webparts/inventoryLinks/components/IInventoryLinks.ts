import { ISPFXContext } from "@pnp/sp";
import { IFilterMode} from "../model/model";
export interface IInventoryLinksProps {
  context:ISPFXContext;
  filterMode:string;
}
export interface IInventoryLinksState{
  filterMode:IFilterMode;
}

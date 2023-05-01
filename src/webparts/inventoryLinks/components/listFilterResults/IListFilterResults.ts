import { IListInfo} from "../../model/model";

export interface IListFilterResultsProps{
    listResults:IListInfo[];
}
export interface IListFilterResultsState{
    noResultsFoundError:boolean;
}
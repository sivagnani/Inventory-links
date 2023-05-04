import { IListInfo} from "../../model/model";

export interface IListFilterResultsProps{
    listResults:{
        [key: string]: IListInfo[];
    };
}
export interface IListFilterResultsState{
    noResultsFoundError:boolean;
}
import { ISPFXContext } from "@pnp/sp";
import { IUserInfo } from "../../model/model";

export interface IUserFilterResultsProps{
    userResults: {
        results:IUserInfo[],
        searchForUser:string,
        searchFromDate:string,
    };
    context : ISPFXContext;
}
export interface IUserFilterResultsState{
    userInfos:IUserInfo[],
    noResultsFoundError:boolean;
    isSortbyName:boolean;
    isAscending:boolean;
    showNameSortOptions:boolean;
    showDateSortOptions:boolean;
}
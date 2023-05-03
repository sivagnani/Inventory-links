import { ISPFXContext } from "@pnp/sp";
import { IUserInfo } from "../../model/model";

export interface IExternalUsersInventoryFormProps {
    context:ISPFXContext;
}
export interface IExternalUsersInventoryFormState {
    allUsersInfo: IUserInfo[];
    filterUserName: string;
    unUsedSinceInterval:string;
    unUsedSinceDate:Date;
    isCustomDateRequired: boolean;
    noDateFoundError: boolean;
    userResults: {
        results:IUserInfo[],
        searchForUser:string,
        searchFromDate:string,
    };
}
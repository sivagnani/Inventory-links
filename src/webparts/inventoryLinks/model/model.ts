export interface ISiteInfo {
    WebTitle: string;
    CreatedOn: string;
    ModifiedDate: string;
    WebURL: string;
    RelativeURL: string;
    HasUniquePermissions: boolean;
}
export interface IListInfo{
    ListTitle: string;
    ItemCount: number;
    CreatedOn: string;
    ModifiedDate: string;
    WebURL: string;
    WebTitle: string;
    ListRelativeURL: string;
    HasUniquePermissions: boolean;
}
export interface IUserInfo{
    Title:string;
    UPN:string;
    SignInDateTime:string;
    Id:string;
    LoginName:string;
}
export interface IFilterMode{
    isDatainventory:boolean;
    isRarelyAccessed:boolean;
    isExternalUsersInventory:boolean;
}
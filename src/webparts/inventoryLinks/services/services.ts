import { ISPFXContext, SPFx } from '@pnp/sp';
import { IServices } from './IServices';
import { IWeb, IWebInfo, Web } from '@pnp/sp/webs';
import "@pnp/sp/sites";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { IListInfo, ISiteInfo, IUserInfo } from '../model/model';
export class Services implements IServices {
    allSitesInfo: ISiteInfo[] = [];
    allListsInfo: IListInfo[] = [];
    async getRootWebDetails(context: ISPFXContext): Promise<void> {
        const web = Web("https://digitalrealty.sharepoint.com").using(SPFx(context));
        await web().then(async (site: IWebInfo) => {
            this.allSitesInfo.push({
                WebTitle: site.Title,
                CreatedOn: this.convertDate(site.Created),
                ModifiedDate: this.convertDate(site.LastItemModifiedDate),
                WebURL: site.Url,
                RelativeURL: site.ServerRelativeUrl,
                HasUniquePermissions: true
            });
            await this.getSubWebDetails(context, site.Url);
        });
        return Promise.resolve();
    }
    async getSubWebDetails(context: ISPFXContext, url: string) {
        const web = Web(url).using(SPFx(context));
        await this.getListDetails(web);
        await web.webs.select("Title", "Created", "LastItemModifiedDate", "Url", "ServerRelativeUrl", "HasUniqueRoleAssignments")().then((sites: any[]) => {
            sites.map(async (site) => {
                this.allSitesInfo.push({
                    WebTitle: site.Title,
                    CreatedOn: this.convertDate(site.Created),
                    ModifiedDate: this.convertDate(site.LastItemModifiedDate),
                    WebURL: site.Url,
                    RelativeURL: site.ServerRelativeUrl,
                    HasUniquePermissions: site.HasUniqueRoleAssignments,
                });
                await this.getSubWebDetails(context, site.Url);
            })
        });
        return Promise.resolve();
    }
    async getListDetails(web: IWeb) {
        await web.lists.select("Title", "ItemCount", "Created", "LastItemModifiedDate", "ParentWebUrl", "ParentWeb/Title", "RootFolder/ServerRelativeUrl", "HasUniqueRoleAssignments").expand("RootFolder", "ParentWeb")().then(
            (listsInfo: any[]) => listsInfo.map(
                (list) => {
                    let listInfo = {
                        ListTitle: list.Title,
                        ItemCount: list.ItemCount,
                        CreatedOn: this.convertDate(list.Created),
                        ModifiedDate: this.convertDate(list.LastItemModifiedDate),
                        WebURL: list.ParentWebUrl,
                        WebTitle: list.ParentWeb.Title,
                        ListRelativeURL: list.RootFolder.ServerRelativeUrl,
                        HasUniquePermissions: list.HasUniqueRoleAssignments,
                    };
                    this.allListsInfo.push(listInfo);
                }
            )
        )
    }
    convertDate(dateStr: string): string {
        const date = new Date(dateStr);
        const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        return (formattedDate);
    }
    getExternalUsers(context: ISPFXContext):Promise<IUserInfo[]>{
        const web = Web("https://digitalrealty.sharepoint.com/Portfolio/").using(SPFx(context));
        return web.lists.getByTitle("SignInReport").items
            .filter("IsActive eq 1 and Disabled eq 0").select("Title","UPN","SignInDateTime","Id","LoginName")
            .top(5000)();
    }
}

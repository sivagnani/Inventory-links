import { ISPFXContext, SPFx} from '@pnp/sp';
import { IServices } from './IServices';
import { IWebInfo, Web } from '@pnp/sp/webs';
import "@pnp/sp/sites";
import "@pnp/sp/webs"
import { SiteInfo } from '../model/model';
export class Services implements IServices {
    allSites:SiteInfo[]=[];
    getRoot(context:ISPFXContext):Promise<void>{
        const web1 = Web("https://digitalrealty.sharepoint.com").using(SPFx(context));
        web1().then((site:IWebInfo)=>{
            this.allSites.push({
                WebTitle:site.Title,
                CreatedOn:site.Created,
                ModifiedDate:site.LastItemModifiedDate,
                WebURL:site.Url,
                RelativeURL:site.ServerRelativeUrl,
                HasUniquePermissions:true
            });
            this.getSub(context,site.Url);
        });
        return Promise.resolve();
    }
    getSub(context:ISPFXContext,url:string){
        const web=Web(url).using(SPFx(context));
        web.webs().then((sites:IWebInfo[])=>{
            sites.map((site)=>{
                this.allSites.push({
                WebTitle:site.Title,
                CreatedOn:site.Created,
                ModifiedDate:site.LastItemModifiedDate,
                WebURL:site.Url,
                RelativeURL:site.ServerRelativeUrl,
                HasUniquePermissions:true
            });
            this.getSub(context,site.Url);})
        });
    }
}

import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { IInventoryLinksProps, IInventoryLinksState } from './IInventoryLinksProps';
import { Services } from '../services/services';
import styles from './InventoryLinks.module.scss';
export default class InventoryLinks extends React.Component<IInventoryLinksProps, IInventoryLinksState> {
  service = new Services();
  constructor(props:IInventoryLinksProps){
    super(props);
    this.state={
      allSitesInfo:[],
    }
  }
  componentDidMount(): void {
    this.service.getRoot(this.props.context).then(
      () => {
        this.setState({
          allSitesInfo: this.service.allSites
        })
      }
    );
  }
  public render(): React.ReactElement<IInventoryLinksProps> {
    return (
      <div>
        <div>
          <select id="ddlInventoryLinks">
            <option value='1'>Connection Inventory</option>
            <option value='2'>Rarely Accessed</option>
            <option value='3'>External User Inventory</option>
            <option value='4'>User Permissions Inventory</option>
            <option value='5'>SiteCollection Inventory</option>
            <option value='6'>Web Inventory</option>
          </select>
          <div className={styles.inventoryLinkContainer}>
            <div id="inventoryTitleContainer" className={styles.inventoryTitle}>
              Data Inventory
            </div>
            <div className={styles.inventoryBody}>
              <div id="filtersContainer" className={styles.filtersContainer}>
                <div className='row mb-2'>
                  <div id="dvSourceSite" className='col-xs-6 col-md-5'>
                    <label className="">Source</label>
                    <select id="ddlSourceSite" className={styles.CADropdown}>
                      <option value="siteCollection">Site Collection</option>
                      <option value="subSite">Sub-Site</option>
                    </select>
                  </div>
                  <div id="dvSourceSubSiteURL" className='col-xs-6 col-md-6'>
                    <label className="lblSPContentAnalytics">Sub-site</label>
                    <select id="ddlSourceSubSite" className={styles.CADropdown}>
                      <option value="0"> ------ Select Sub-site ------ </option>
                      {this.state.allSitesInfo.sort((function (a, b) {
                        return ((a.RelativeURL.toLowerCase() < b.RelativeURL.toLowerCase()) ? -1 : ((a.RelativeURL.toLowerCase() > b.RelativeURL.toLowerCase()) ? 1 : 0))
                      })).map((site) =><option value={site.RelativeURL}>{site.RelativeURL}</option>)}
                    </select>
                  </div>
                </div>
                <div className='row mb-2'>
                  <div id="dvSearchFor" className='col-xs-6 col-md-5'>
                    <label className="lblSPContentAnalytics">Search For</label>
                    <select id="ddlSearchFor" className={styles.CADropdown}>
                      <option value="Sites">Sites</option>
                      <option value="Lists">Lists &amp; Libraries</option>
                    </select>
                  </div>
                </div>
                <div className='row'></div>
                <div id="dvButtonContainer" className="dvSPButton col-xs-6 col-md-5">
                  <input type="button" id="btnGetResults" className={styles.btnGetResults} value="Get Results" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

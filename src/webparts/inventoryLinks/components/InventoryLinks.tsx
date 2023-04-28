import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { IInventoryLinksProps, IInventoryLinksState } from './IInventoryLinksProps';
import { Services } from '../services/services';
import styles from './InventoryLinks.module.scss';
import { IListInfo, ISiteInfo } from '../model/model';
export default class InventoryLinks extends React.Component<IInventoryLinksProps, IInventoryLinksState> {
  service = new Services();
  constructor(props: IInventoryLinksProps) {
    super(props);
    this.state = {
      filterMode: "Connection Inventory",
      isRarelyAccess: false,
      allSitesInfo: [],
      allListsInfo: [],
      isSubSiteSeleted: false,
      showSubSiteError: false,
      showResults: false,
      noResultsFoundError: false,
      showSiteResults: false,
      source: "siteCollection",
      searchFor: "Sites",
      usedSince: 3,
      subSite: "0",
      siteResults: [],
      listResults: [],
    }
  }
  componentDidMount(): void {
    this.service.getRootWebDetails(this.props.context);
    if (this.props.filterMode === "Rarely Accessed") {
      this.setState({
        isRarelyAccess: true,
        filterMode: this.props.filterMode
      });
    }
    else {
      this.setState({
        isRarelyAccess: false,
        filterMode: this.props.filterMode
      });
    }
  }
  componentDidUpdate(prevProps: Readonly<IInventoryLinksProps>, prevState: Readonly<IInventoryLinksState>, snapshot?: any): void {
    if (prevState.source !== this.state.source || prevState.searchFor !== this.state.searchFor || prevState.subSite !== this.state.subSite) {
      this.setState({
        showResults: false,
      })
    }
  }
  handleInputChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const id: string = event.target.id;
    const value: string = event.target.value;
    switch (id) {
      case "ddlInventoryLinks":
        if (value === "Rarely Accessed") {
          this.setState({
            isRarelyAccess: true,
            filterMode: value
          });
        }
        else {
          this.setState({
            isRarelyAccess: false,
            filterMode: value
          });
        }
        break;
      case "ddlSourceSite":
        value === "subSite" ?
          this.setState({
            isSubSiteSeleted: true,
            allSitesInfo: this.service.allSitesInfo,
            source: value,
          })
          :
          this.setState({
            isSubSiteSeleted: false,
            allSitesInfo: [],
            source: value,
          });
        break;
      case "ddlSourceSubSite":
        this.setState({
          subSite: value,
          showSubSiteError: false,
        });
        break;
      case "ddlSearchFor":
        this.setState({
          searchFor: value,
        });
        break;
      case "ddlUnusedFrom":
        this.setState({
          usedSince: Number(value),
        });
        break;

    }
  }
  filterByDate(list: any[], months: number) {
    return list.filter((item) => {
      const currentDate = new Date();
      const itemDate = new Date(item.ModifiedDate.split("/").reverse().join("-"));
      const since = new Date();
      since.setMonth(currentDate.getMonth() - months);
      return itemDate <= since;
    })
  }
  fetchResults() {
    if (this.state.searchFor === "Sites") {
      let filteredData: ISiteInfo[] = [];
      this.state.isRarelyAccess ?
        filteredData = this.filterByDate(this.service.allSitesInfo, this.state.usedSince)
        :
        filteredData = this.state.allSitesInfo;
      if (this.state.isSubSiteSeleted) {
        if (this.state.subSite === "0") {
          this.setState({
            showSubSiteError: true,
          })
        }
        else {
          let result = filteredData.filter((site) => site.RelativeURL.slice(0, this.state.subSite.length) === this.state.subSite);
          this.setState({
            siteResults: result,
            showResults: true,
            showSiteResults: true,
            noResultsFoundError: (result.length === 0),
          })
        }
      }
      else {
        this.setState({
          siteResults: filteredData,
          showResults: true,
          showSiteResults: true,
          noResultsFoundError: (filteredData.length === 0),
        })
      }
    }
    else {
      let filteredData: IListInfo[] = [];
      this.state.isRarelyAccess ?
        filteredData = this.filterByDate(this.service.allListsInfo, this.state.usedSince)
        :
        filteredData = this.state.allListsInfo;
      if (this.state.isSubSiteSeleted) {
        if (this.state.subSite === "0") {
          this.setState({
            showSubSiteError: true,
          })
        }
        else {
          let result = filteredData.filter((list) => list.ListRelativeURL.slice(0, this.state.subSite.length) === this.state.subSite);
          this.setState({
            listResults: result,
            showResults: true,
            showSiteResults: false,
            noResultsFoundError: (result.length === 0),
          })
        }
      }
      else {
        this.setState({
          listResults: filteredData,
          showResults: true,
          showSiteResults: false,
          noResultsFoundError: (filteredData.length === 0),
        })
      }
    }

  }
  public render(): React.ReactElement<IInventoryLinksProps> {
    return (
      <div>
        <div>
          <div className={styles.inventoryLinkContainer}>
            <div id="inventoryTitleContainer" className={styles.inventoryTitle}>
              {this.state.filterMode}
            </div>
            <div className={styles.inventoryBody}>
              <div id="filtersContainer" className={styles.filtersContainer}>
                <div className='row mb-2'>
                  <div id="dvSourceSite" className='col-xs-6 col-md-5'>
                    <label className="">Source</label>
                    <select id="ddlSourceSite" className={`form-control ${styles.CADropdown}`}
                      onChange={(event) => this.handleInputChange(event)}
                      value={this.state.source}>
                      <option value="siteCollection">Site Collection</option>
                      <option value="subSite">Sub-Site</option>
                    </select>
                  </div>
                  {this.state.isSubSiteSeleted && <div id="dvSourceSubSiteURL" className='col-xs-6 col-md-6'>
                    <label className="lblSPContentAnalytics">Sub-site</label>
                    <select id="ddlSourceSubSite" className={`form-control ${styles.CADropdown} ${this.state.showSubSiteError && styles.requiredInputValue}`} onChange={(event) => this.handleInputChange(event)}>
                      <option value="0"> ------ Select Sub-site ------ </option>
                      {this.state.allSitesInfo.sort((function (a, b) {
                        return ((a.RelativeURL.toLowerCase() < b.RelativeURL.toLowerCase()) ? -1 : ((a.RelativeURL.toLowerCase() > b.RelativeURL.toLowerCase()) ? 1 : 0))
                      })).map((site) => <option value={site.RelativeURL}>{site.RelativeURL}</option>)}
                    </select>
                  </div>}
                </div>
                <div className='row mb-2'>
                  <div id="dvSearchFor" className='col-xs-6 col-md-5'>
                    <label className="lblSPContentAnalytics">Search For</label>
                    <select id="ddlSearchFor" className={`form-control ${styles.CADropdown}`} onChange={(event) => this.handleInputChange(event)}>
                      <option value="Sites">Sites</option>
                      <option value="Lists">Lists &amp; Libraries</option>
                    </select>
                  </div>
                  {this.state.isRarelyAccess && <div id="dvUnusedFrom" className='col-xs-6 col-md-6'>
                    <label className="lblSPContentAnalytics">Unused Since</label>
                    <select id="ddlUnusedFrom" className={`form-control ${styles.CADropdown}`} value={this.state.usedSince} onChange={(event) => this.handleInputChange(event)}>
                      <option value={3}>Three Months</option>
                      <option value={6}>Six Months</option>
                      <option value={12}>One Year</option>
                      <option value={24}>Two Years</option>
                    </select>
                  </div>}
                </div>
                <div className='row'></div>
                <div id="dvButtonContainer" className="dvSPButton col-xs-6 col-md-5">
                  <input type="button" id="btnGetResults" className={styles.btnGetResults} value="Get Results"
                    onClick={() => this.fetchResults()} />
                </div>
              </div>
              {this.state.showResults
                && (this.state.showSiteResults
                  ?
                  (<div id="sitesResultsContainer" className={styles.ResultContainer}>
                    <h2 className={styles.ResultContainerHeading}>SharePoint Sites</h2>
                    <div id="sitesResults" className={styles.Results}>
                      {
                        !this.state.noResultsFoundError
                          ? <table id="sitesResultsTable" className={styles.ResultsTable}>
                            <tbody>
                              <tr>
                                <th>Web Title</th>
                                <th>Web Relative URI</th>
                                <th>Has unique Permissions</th>
                                <th>Last Accessed On</th>
                                <th>Site Link</th>
                              </tr>
                              {this.state.siteResults.sort((function (a, b) {
                                return ((a.WebTitle.toLowerCase() < b.WebTitle.toLowerCase()) ? -1 : ((a.WebTitle.toLowerCase() > b.WebTitle.toLowerCase()) ? 1 : 0))
                              })).map((site) =>
                                <tr>
                                  <td>{site.WebTitle}</td>
                                  <td>{site.RelativeURL}</td>
                                  <td className='text-center'>{site.HasUniquePermissions.toString()}</td>
                                  <td className='text-center'>{site.ModifiedDate}</td>
                                  <td className='text-center'><a href={site.WebURL} target='_blank'>View</a></td>
                                </tr>)
                              }
                            </tbody>
                          </table>
                          :
                          <div id="dvNoSites" className={styles.noRecords}>
                            Oops, there are no records matching with current filter criteria.
                          </div>
                      }
                    </div>
                  </div>)
                  :
                  (<div id="listsResultsContainer" className={styles.ResultContainer}>
                    <h2 className={styles.ResultContainerHeading}>SharePoint Lists/Libraries</h2>
                    <div id="listsResults" className={styles.Results}>
                      {
                        !this.state.noResultsFoundError
                          ?
                          <table id="listsResultsTable" className={styles.ResultsTable}>
                            <tbody>
                              <tr>
                                <th>Web Title</th>
                                <th>List Title</th>
                                <th>Item Count</th>
                                <th>List Relative URI</th>
                                <th>Has Unique Permissions</th>
                                <th>Last Accessed On</th>
                                <th>List Link</th>
                              </tr>
                              {this.state.listResults.sort((function (a, b) {
                                if (a.WebTitle.toLowerCase() < b.WebTitle.toLowerCase()) {
                                  return -1;
                                }
                                else if (a.WebTitle.toLowerCase() > b.WebTitle.toLowerCase()) {
                                  return 1;
                                }
                                else {
                                  if (a.ListTitle.toLowerCase() < b.ListTitle.toLowerCase()) {
                                    return -1;
                                  }
                                  else if (a.ListTitle.toLowerCase() > b.ListTitle.toLowerCase()) {
                                    return 1;
                                  }
                                  else {
                                    return 0;
                                  }
                                }
                              })).map((list) =>
                                <tr>
                                  <td className='text-center'>{list.WebTitle}</td>
                                  <td>{list.ListTitle}</td>
                                  <td className='text-center'>{list.ItemCount}</td>
                                  <td>{list.ListRelativeURL}</td>
                                  <td className='text-center'>{list.HasUniquePermissions.toString()}</td>
                                  <td className='text-center'>{list.ModifiedDate}</td>
                                  <td className='text-center'><a href={window.location.origin + list.ListRelativeURL} target='_blank'>View</a></td>
                                </tr>)
                              }
                            </tbody>
                          </table>
                          :
                          <div id="dvNoLists" className={styles.noRecords}>
                            Oops, there are no records matching with current filter criteria.
                          </div>
                        }
                    </div>
                  </div>))
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

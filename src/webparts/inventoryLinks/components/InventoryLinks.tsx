import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { IInventoryLinksProps, IInventoryLinksState } from './IInventoryLinksProps';
import { Services } from '../services/services';
import styles from './InventoryLinks.module.scss';
import { IFilterMode, IListInfo, ISiteInfo } from '../model/model';
import FilterForm from './filterForm/filterForm';
import SiteFilterResults from './siteFilterResults/siteFilterResults';
import ListFilterResults from './listFilterResults/listFilterResults';
export default class InventoryLinks extends React.Component<IInventoryLinksProps, IInventoryLinksState> {
  service = new Services();
  constructor(props: IInventoryLinksProps) {
    super(props);
    this.state = {
      filterMode: {
        isDatainventory: true,
        isRarelyAccessed: false,
        isExternalUsersInventory: false,
      },
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
    this.service.getExternalUsers(this.props.context);
    const defaultMode: IFilterMode = {
      isDatainventory: false,
      isRarelyAccessed: false,
      isExternalUsersInventory: false,
    };
    switch(this.props.filterMode){
      case "connectionInventory":
        this.setState({
          filterMode:{
            ...defaultMode,
            isDatainventory:true,
          }
        }
        )
        break;
      case "rarelyAccessed":
        this.setState({
          filterMode:{
            ...defaultMode,
            isRarelyAccessed:true,
          }
        }
        )
        break;
      case "externalUserInventory":
        this.setState({
          filterMode:{
            ...defaultMode,
            isExternalUsersInventory:true,
          }
        }
        )
        break;
    }

  }
  componentDidUpdate(prevProps: Readonly<IInventoryLinksProps>, prevState: Readonly<IInventoryLinksState>, snapshot?: any): void {
    if (prevState.source !== this.state.source || prevState.searchFor !== this.state.searchFor || prevState.subSite !== this.state.subSite) {
      this.setState({
        showResults: false,
      })
    }
    if (this.props.filterMode !== prevProps.filterMode) {
      const defaultMode: IFilterMode = {
        isDatainventory: false,
        isRarelyAccessed: false,
        isExternalUsersInventory: false,
      };
      switch(this.props.filterMode){
        case "connectionInventory":
          this.setState({
            filterMode:{
              ...defaultMode,
              isDatainventory:true,
            }
          }
          )
          break;
        case "rarelyAccessed":
          this.setState({
            filterMode:{
              ...defaultMode,
              isRarelyAccessed:true,
            }
          }
          )
          break;
        case "externalUserInventory":
          this.setState({
            filterMode:{
              ...defaultMode,
              isExternalUsersInventory:true,
            }
          }
          )
          break;
      }
    }
  }
  handleInputChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const id: string = event.target.id;
    const value: string = event.target.value;
    switch (id) {
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
            subSite: "0",
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
      this.state.filterMode.isRarelyAccessed ?
        filteredData = this.filterByDate(this.service.allSitesInfo, this.state.usedSince)
        :
        filteredData = this.service.allSitesInfo;
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
      this.state.filterMode.isRarelyAccessed ?
        filteredData = this.filterByDate(this.service.allListsInfo, this.state.usedSince)
        :
        filteredData = this.service.allListsInfo;
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
              {this.state.filterMode.isDatainventory ? "Data Inventory" : "Rarely Accessed"}
            </div>
            <div className={styles.inventoryBody}>
              <FilterForm handleInputChange={(event) => this.handleInputChange(event)}
                filterMode={this.state.filterMode}
                source={this.state.source}
                isSubSiteSeleted={this.state.isSubSiteSeleted}
                allSitesInfo={this.state.allSitesInfo}
                showSubSiteError={this.state.showSubSiteError}
                usedSince={this.state.usedSince}
                fetchResults={() => this.fetchResults()} />
              {this.state.showResults
                && (this.state.showSiteResults
                  ?
                  <SiteFilterResults siteResults={this.state.siteResults} />
                  :
                  <ListFilterResults listResults={this.state.listResults} />
                )
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

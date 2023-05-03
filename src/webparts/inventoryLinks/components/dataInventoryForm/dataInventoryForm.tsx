import * as React from "react";
import styles from "./filterForm.module.scss";
import { IDataInventoryFormProps, IDataInventoryFormState } from './IDataInventoryForm'
import { Services } from "../../services/services";
import { IListInfo, ISiteInfo } from "../../model/model";
import SiteFilterResults from "../siteFilterResults/siteFilterResults";
import ListFilterResults from "../listFilterResults/listFilterResults";
export default class DataInventoryForm extends React.Component<IDataInventoryFormProps, IDataInventoryFormState>{
    service = new Services();
    constructor(props: IDataInventoryFormProps) {
        super(props);
        this.state = {
            allSitesInfo: [],
            isSubSiteSeleted: false,
            showSubSiteError: false,
            showResults: false,
            noResultsFoundError: false,
            showSiteResults: false,
            source: "siteCollection",
            searchFor: "Sites",
            subSite: "0",
            siteResults: [],
            listResults: [],
        }
    }
    componentDidMount(): void {
        this.service.getRootWebDetails(this.props.context);
    }
    componentDidUpdate(prevProps: Readonly<IDataInventoryFormProps>, prevState: Readonly<IDataInventoryFormState>, snapshot?: any): void {
        if (prevState.source !== this.state.source || prevState.searchFor !== this.state.searchFor || prevState.subSite !== this.state.subSite) {
            this.setState({
                showResults: false,
                showSubSiteError: false
            })
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
        }
    }
    sortListItems(listResults: IListInfo[]): IListInfo[] {
        return listResults.sort((function (a, b) {
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
        }))
    }
    sortSiteItems(siteResults: ISiteInfo[]): ISiteInfo[] {
        return siteResults.sort((function (a, b) {
            return ((a.WebTitle.toLowerCase() < b.WebTitle.toLowerCase()) ? -1 : ((a.WebTitle.toLowerCase() > b.WebTitle.toLowerCase()) ? 1 : 0))
        }))
    }
    fetchResults() {
        if (this.state.searchFor === "Sites") {
            let filteredData: ISiteInfo[] = this.sortSiteItems(this.service.allSitesInfo);
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
            let filteredData: IListInfo[] = this.sortListItems(this.service.allListsInfo);
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
    render(): React.ReactNode {
        return (
            <div>
                <div id="inventoryTitleContainer" className={styles.inventoryTitle}>Data Inventory</div>
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
                            <select id="ddlSourceSubSite" className={`form-control ${styles.CADropdown} ${this.state.showSubSiteError && styles.requiredInputValue}`}
                                onChange={(event) => this.handleInputChange(event)}>
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
                    </div>
                    <div className='row'>
                        <div id="dvButtonContainer" className="dvSPButton col-xs-6 col-md-5">
                            <input type="button" id="btnGetResults" className={styles.btnGetResults} value="Get Results"
                                onClick={() => this.fetchResults()} />
                        </div>
                    </div>
                </div>
                {this.state.showResults
                    && (this.state.showSiteResults
                        ?
                        <SiteFilterResults siteResults={this.state.siteResults} />
                        :
                        <ListFilterResults listResults={this.state.listResults} />
                    )
                }
            </div>
        );
    }
}
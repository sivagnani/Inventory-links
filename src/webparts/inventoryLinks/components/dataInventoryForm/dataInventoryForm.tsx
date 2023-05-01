import * as React from "react";
import styles from "./filterForm.module.scss";
import { IDataInventoryFormProps, IDataInventoryFormState } from './IDataInventoryForm'
export default class DataInventoryForm extends React.Component<IDataInventoryFormProps, IDataInventoryFormState>{
    render(): React.ReactNode {
        return (
            <div>
                <div id="filtersContainer" className={styles.filtersContainer}>
                    <div className='row mb-2'>
                        <div id="dvSourceSite" className='col-xs-6 col-md-5'>
                            <label className="">Source</label>
                            <select id="ddlSourceSite" className={`form-control ${styles.CADropdown}`}
                                onChange={(event) => this.props.handleInputChange(event)}
                                value={this.props.source}>
                                <option value="siteCollection">Site Collection</option>
                                <option value="subSite">Sub-Site</option>
                            </select>
                        </div>
                        {this.props.isSubSiteSeleted && <div id="dvSourceSubSiteURL" className='col-xs-6 col-md-6'>
                            <label className="lblSPContentAnalytics">Sub-site</label>
                            <select id="ddlSourceSubSite" className={`form-control ${styles.CADropdown} ${this.props.showSubSiteError && styles.requiredInputValue}`}
                                onChange={(event) => this.props.handleInputChange(event)}>
                                <option value="0"> ------ Select Sub-site ------ </option>
                                {this.props.allSitesInfo.sort((function (a, b) {
                                    return ((a.RelativeURL.toLowerCase() < b.RelativeURL.toLowerCase()) ? -1 : ((a.RelativeURL.toLowerCase() > b.RelativeURL.toLowerCase()) ? 1 : 0))
                                })).map((site) => <option value={site.RelativeURL}>{site.RelativeURL}</option>)}
                            </select>
                        </div>}
                    </div>
                    <div className='row mb-2'>
                        <div id="dvSearchFor" className='col-xs-6 col-md-5'>
                            <label className="lblSPContentAnalytics">Search For</label>
                            <select id="ddlSearchFor" className={`form-control ${styles.CADropdown}`} onChange={(event) => this.props.handleInputChange(event)}>
                                <option value="Sites">Sites</option>
                                <option value="Lists">Lists &amp; Libraries</option>
                            </select>
                        </div>
                    </div>
                    <div className='row'>
                        <div id="dvButtonContainer" className="dvSPButton col-xs-6 col-md-5">
                            <input type="button" id="btnGetResults" className={styles.btnGetResults} value="Get Results"
                                onClick={() => this.props.fetchResults()} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
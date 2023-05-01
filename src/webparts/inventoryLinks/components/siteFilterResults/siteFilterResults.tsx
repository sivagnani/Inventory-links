import * as React from "react";
import styles from "./siteFilterResults.module.scss";
import { ISiteFilterResultsProps, ISiteFilterResultsState } from './ISiteFilterResults'
export default class SiteFilterResults extends React.Component<ISiteFilterResultsProps, ISiteFilterResultsState>{
    constructor(props:ISiteFilterResultsProps){
        super(props);
        this.state={
            noResultsFoundError:false,
        }
    }
    componentDidMount(): void {
        this.setState({
            noResultsFoundError:this.props.siteResults.length===0,
        })
    }
    componentDidUpdate(prevProps: Readonly<ISiteFilterResultsProps>, prevState: Readonly<ISiteFilterResultsState>, snapshot?: any): void {
        if(prevProps.siteResults!==this.props.siteResults){
            this.setState({
                noResultsFoundError:this.props.siteResults.length===0,
            })
        }
    }
    render(): React.ReactNode {
        return (
            <div>
                <div id="sitesResultsContainer" className={styles.ResultContainer}>
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
                                        {this.props.siteResults.sort((function (a, b) {
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
                </div>
            </div>
        );
    }
}
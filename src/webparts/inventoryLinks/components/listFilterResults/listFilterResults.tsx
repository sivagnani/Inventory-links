import * as React from "react";
import styles from "./listFilterResults.module.scss";
import { IListFilterResultsProps, IListFilterResultsState } from './IListFilterResults'
export default class ListFilterResults extends React.Component<IListFilterResultsProps, IListFilterResultsState>{
    constructor(props:IListFilterResultsProps){
        super(props);
        this.state={
            noResultsFoundError:false,
        }
    }
    componentDidMount(): void {
        this.setState({
            noResultsFoundError:this.props.listResults.length===0,
        })
    }
    componentDidUpdate(prevProps: Readonly<IListFilterResultsProps>, prevState: Readonly<IListFilterResultsState>, snapshot?: any): void {
        if(prevProps.listResults!==this.props.listResults){
            this.setState({
                noResultsFoundError:this.props.listResults.length===0,
            })
        }
    }
    render(): React.ReactNode {
        return (
            <div>
                <div id="listsResultsContainer" className={styles.ResultContainer}>
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
                              {this.props.listResults.sort((function (a, b) {
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
                  </div>
            </div>
        );
    }
}
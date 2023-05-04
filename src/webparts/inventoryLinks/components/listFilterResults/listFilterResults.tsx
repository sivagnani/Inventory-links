import * as React from "react";
import styles from "./listFilterResults.module.scss";
import { IListFilterResultsProps, IListFilterResultsState } from './IListFilterResults'
import { IListInfo } from "../../model/model";
export default class ListFilterResults extends React.Component<IListFilterResultsProps, IListFilterResultsState>{
  constructor(props: IListFilterResultsProps) {
    super(props);
    this.state = {
      noResultsFoundError: false,
    }
  }
  componentDidMount(): void {
    this.setState({
      noResultsFoundError: Object.keys(this.props.listResults).length === 0,
    })
  }
  componentDidUpdate(prevProps: Readonly<IListFilterResultsProps>, prevState: Readonly<IListFilterResultsState>, snapshot?: any): void {
    if (prevProps.listResults !== this.props.listResults) {
      this.setState({
        noResultsFoundError: Object.keys(this.props.listResults).length === 0,
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
                    {/* {Object.keys(this.props.listResults).forEach((webTitle) => {
                      const listInfo = this.props.listResults[webTitle];
                      return <>
                        <tr>
                          <td className='text-center' rowSpan={listInfo.length}>{webTitle}</td>
                          <td>{listInfo[0].ListTitle}</td>
                          <td className='text-center'>{listInfo[0].ItemCount}</td>
                          <td>{listInfo[0].ListRelativeURL}</td>
                          <td className='text-center'>{listInfo[0].HasUniquePermissions.toString()}</td>
                          <td className='text-center'>{listInfo[0].ModifiedDate}</td>
                          <td className='text-center'><a href={window.location.origin + listInfo[0].ListRelativeURL} target='_blank'>View</a></td>
                        </tr>
                        {listInfo.slice(1).map((list: IListInfo) =>
                          <tr>
                            <td>{list.ListTitle}</td>
                            <td className='text-center'>{list.ItemCount}</td>
                            <td>{list.ListRelativeURL}</td>
                            <td className='text-center'>{list.HasUniquePermissions.toString()}</td>
                            <td className='text-center'>{list.ModifiedDate}</td>
                            <td className='text-center'><a href={window.location.origin + list.ListRelativeURL} target='_blank'>View</a></td>
                          </tr>)
                        }
                      </>
                    })} */}
                    {Object.keys(this.props.listResults).map((WebTitle) => {
                      const listInfo = this.props.listResults[WebTitle];
                      return (
                        <>
                          <tr>
                            <td className='text-center' rowSpan={listInfo.length}>{WebTitle}</td>
                            <td>{listInfo[0].ListTitle}</td>
                            <td className='text-center'>{listInfo[0].ItemCount}</td>
                            <td>{listInfo[0].ListRelativeURL}</td>
                            <td className='text-center'>{listInfo[0].HasUniquePermissions.toString()}</td>
                            <td className='text-center'>{listInfo[0].ModifiedDate}</td>
                            <td className='text-center'><a href={window.location.origin + listInfo[0].ListRelativeURL} target='_blank'>View</a></td>
                          </tr>
                          {listInfo.slice(1).map((list: IListInfo) =>
                            <tr>
                              <td>{list.ListTitle}</td>
                              <td className='text-center'>{list.ItemCount}</td>
                              <td>{list.ListRelativeURL}</td>
                              <td className='text-center'>{list.HasUniquePermissions.toString()}</td>
                              <td className='text-center'>{list.ModifiedDate}</td>
                              <td className='text-center'><a href={window.location.origin + list.ListRelativeURL} target='_blank'>View</a></td>
                            </tr>
                          )}
                        </>
                      );
                    })}

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
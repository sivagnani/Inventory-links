import * as React from "react";
import styles from "./siteFilterResults.module.scss";
import { IUserFilterResultsProps, IUserFilterResultsState } from './IUserFilterResults'
import { IUserInfo } from "../../model/model";
import { Services } from "../../services/services";
export default class SiteFilterResults extends React.Component<IUserFilterResultsProps, IUserFilterResultsState>{
    service = new Services();
    constructor(props: IUserFilterResultsProps) {
        super(props);
        this.state = {
            userInfos: [],
            noResultsFoundError: false,
            isSortbyName: true,
            isAscending: true,
            showNameSortOptions: false,
            showDateSortOptions: false,
        }
    }
    componentDidMount(): void {
        this.setState({
            noResultsFoundError: this.props.userResults.results.length === 0,
            userInfos: this.props.userResults.results,
            isSortbyName: true,
            isAscending: true,
        });
    }
    componentDidUpdate(prevProps: Readonly<IUserFilterResultsProps>, prevState: Readonly<IUserFilterResultsState>, snapshot?: any): void {
        if (prevProps.userResults !== this.props.userResults) {
            this.setState({
                noResultsFoundError: this.props.userResults.results.length === 0,
                userInfos: this.props.userResults.results,
                isSortbyName: true,
                isAscending: true,
            })
        }
    }
    componentWillUnmount() {
        document.removeEventListener("click", this.handleClick);
    }
    handleClick() {
        (this.state.showNameSortOptions || this.state.showDateSortOptions)&&this.setState({
            showNameSortOptions: false,
            showDateSortOptions: false,
        });
    }
    handleNameSortClick() {
        this.setState({
            showNameSortOptions:!this.state.showNameSortOptions,
            showDateSortOptions:false
        });
    }
    handleDateSortClick() {
        this.setState({
            showDateSortOptions:!this.state.showDateSortOptions,
            showNameSortOptions:false
        });
    }
    convertDate(dateStr: string): string {
        const date = new Date(dateStr);
        const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        return (formattedDate);
    }
    sortAscByName() {
        let userData: IUserInfo[] = JSON.parse(JSON.stringify(this.props.userResults.results));
        this.setState({
            userInfos: userData,
            isSortbyName: true,
            isAscending: true,
            showNameSortOptions:false,
        })
    }
    sortDescByName() {
        let userData: IUserInfo[] = JSON.parse(JSON.stringify(this.props.userResults.results)).reverse();
        this.setState({
            userInfos: userData,
            isSortbyName: true,
            isAscending: false,
            showNameSortOptions:false,
        })
    }
    sortDescByDate() {
        let userData: IUserInfo[] = JSON.parse(JSON.stringify(this.props.userResults.results));
        const sortedData = userData.sort((a, b) => {
            const aDate = new Date(b.SignInDateTime);
            const bDate = new Date(a.SignInDateTime);
            return aDate < bDate ? -1 : aDate > bDate ? 1 : 0
        });
        this.setState({
            userInfos: sortedData,
            isSortbyName: false,
            isAscending: false,
            showDateSortOptions:false,
        })
    }
    sortAscByDate() {
        let userData: IUserInfo[] = JSON.parse(JSON.stringify(this.props.userResults.results)).reverse();
        const sortedData = userData.sort((a, b) => {
            const aDate = new Date(b.SignInDateTime);
            const bDate = new Date(a.SignInDateTime);
            return aDate > bDate ? -1 : aDate < bDate ? 1 : 0
        });
        this.setState({
            userInfos: sortedData,
            isSortbyName: false,
            isAscending: true,
            showDateSortOptions:false,
        })
    }
    onDisableClick(id: string) {
        this.service.disableUser(this.props.context, id).then((status: boolean) => status && alert("Your Request has been initiated successfully.User will be disabled with in 24 hours"));
    }
    render(): React.ReactNode {
        return (
            <div>
                <div style={{position:'fixed',top:0,left:0,right:0,bottom:0}} onClick={()=>this.handleClick()}></div>
                <div id="sitesResultsContainer" className={styles.ResultContainer}>
                    <h2 className={styles.ResultContainerHeading}>
                        {(this.props.userResults.searchFromDate !== "") && <div className={styles.inlineBlock}><b className={styles.fontBold}>Not Signed-In since:</b><span>{this.props.userResults.searchFromDate}</span></div>}
                        {(this.props.userResults.searchForUser !== "" && this.props.userResults.searchFromDate !== "") && <span> and </span>}
                        {(this.props.userResults.searchForUser !== "") && <div className={styles.inlineBlock}><b className={styles.fontBold}>User Title/UPN contains:</b><span>{this.props.userResults.searchForUser}</span></div>}
                    </h2>
                    <div id="sitesResults" className={styles.Results}>
                        {
                            !this.state.noResultsFoundError
                                ? <table id="sitesResultsTable" className={styles.ResultsTable}>
                                    <tbody>
                                        <tr>
                                            <th className={styles.sitesResultsTableTh} onClick={()=>this.handleNameSortClick()}>Name
                                                {this.state.isSortbyName && (this.state.isAscending ? <i className="fa fa-sort-alpha-asc m-1" aria-hidden="true"></i> : <i className="fa fa-sort-alpha-desc m-1" aria-hidden="true"></i>)}
                                                <div className={styles.sort}>
                                                    <i className="fa fa-angle-down" id="dvTitleSort" aria-hidden="true"></i>
                                                    {this.state.showNameSortOptions && <div className={styles.dvSort}>
                                                        <ul className={styles.sortOptions}>
                                                            <li>
                                                                <div className="title-sort" id="AtoZorder" onClick={() => this.sortAscByName()}>
                                                                    <i className="fa fa-sort-alpha-asc" aria-hidden="true"></i>
                                                                    <span className="m-2">A to Z</span>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className="title-sort" id="ZtoAorder" onClick={() => this.sortDescByName()}>
                                                                    <i className="fa fa-sort-alpha-desc" aria-hidden="true"></i>
                                                                    <span className="m-2">Z to A</span></div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    }
                                                </div>
                                            </th>
                                            <th id="lastmodified" className={styles.sitesResultsTableTh} onClick={()=>this.handleDateSortClick()}>Last Sign-In Date
                                                {!this.state.isSortbyName && (this.state.isAscending ? <i className="fa fa-long-arrow-down m-1" aria-hidden="true"></i> : <i className="fa fa-long-arrow-up m-1" aria-hidden="true"></i>)}
                                                <div className={styles.sort}>
                                                    <i className="fa fa-angle-down" id="dvDateSort" aria-hidden="true"></i>
                                                    {this.state.showDateSortOptions && <div className={styles.dvSort}>
                                                        <ul className={styles.sortOptions}>
                                                            <li>
                                                                <div className="date-sort" id="OldtoNew" onClick={() => this.sortAscByDate()}>
                                                                    <i className="fa fa-long-arrow-down" aria-hidden="true"></i>
                                                                    <span className="m-2">Old to New</span>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className="date-sort" id="NewtoOld" onClick={() => this.sortDescByDate()}>
                                                                    <i className="fa fa-long-arrow-up" aria-hidden="true"></i>
                                                                    <span className="m-2">New to Old</span>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>}
                                                </div>

                                            </th>
                                            <th className={styles.sitesResultsTableTh}>User Principal Name</th>
                                            <th></th>
                                        </tr>
                                        {this.state.userInfos.map((user) =>
                                            <tr>
                                                <td><a href=''>{user.Title}</a></td>
                                                <td>{this.convertDate(user.SignInDateTime)}</td>
                                                <td>{user.UPN ? user.UPN : "-"}</td>
                                                <td><input type='button' value='Disable' className={styles.btnDisableUser} id={user.Id} onClick={() => this.onDisableClick(user.Id)} /></td>
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
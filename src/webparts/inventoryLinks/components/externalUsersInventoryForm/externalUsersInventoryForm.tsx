import * as React from "react";
import "./filterForm.scss";
import { IExternalUsersInventoryFormProps, IExternalUsersInventoryFormState } from './IExternalUsersInventoryForm'
import { Services } from "../../services/services";
import { IUserInfo } from "../../model/model";
import { DateTimePicker, DateConvention } from '@pnp/spfx-controls-react/lib/DateTimePicker';
import UserFilterResults from "../userFilterResults/userFilterResults";
export default class ExternalUsersInventoryForm extends React.Component<IExternalUsersInventoryFormProps, IExternalUsersInventoryFormState>{
    service = new Services();
    constructor(props: IExternalUsersInventoryFormProps) {
        super(props);
        this.state = {
            allUsersInfo: [],
            unUsedSinceInterval: "",
            filterUserName: "",
            unUsedSinceDate: new Date(),
            isCustomDateRequired: false,
            noDateFoundError: false,
            userResults: {
                results: [],
                searchForUser: "",
                searchFromDate: ""
            }
        }
    }
    componentDidMount(): void {
        this.service.getExternalUsers(this.props.context).then((usersInfo: IUserInfo[]) => this.setState({
            allUsersInfo: this.sortUserItems(usersInfo),
            userResults: {
                ...this.state.userResults,
                results: this.sortUserItems(usersInfo),
            }
        }))
    }
    sortUserItems(userResults: IUserInfo[]): IUserInfo[] {
        return userResults.sort((function (a, b) {
            return ((a.Title.toLowerCase() < b.Title.toLowerCase()) ? -1 : ((a.Title.toLowerCase() > b.Title.toLowerCase()) ? 1 : 0))
        }))
    }
    handleInputChange(event: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) {
        const id: string = event.target.id;
        const value: string = event.target.value;
        switch (id) {
            case "ddlUnUsedSince":
                if (Number(value) || value === "0") {
                    const currentDate = new Date();
                    const since = new Date();
                    since.setMonth(currentDate.getMonth() - Number(value));
                    this.setState({
                        unUsedSinceDate: since,
                        isCustomDateRequired: false,
                        unUsedSinceInterval: value,
                        noDateFoundError:false
                    });
                }
                else {
                    this.setState({
                        isCustomDateRequired: true,
                        unUsedSinceInterval: value,
                        unUsedSinceDate: null
                    });
                }
                break;
            case "txtUserFilter":
                this.setState({
                    filterUserName: value,
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
        if (this.state.unUsedSinceDate) {
            const filteredData = this.state.allUsersInfo.filter(
                (user: IUserInfo) => {
                    const dateTime = new Date(user.SignInDateTime);
                    return ((dateTime < this.state.unUsedSinceDate) && ((user.LoginName.indexOf(this.state.filterUserName) !== -1) || (user.Title.indexOf(this.state.filterUserName)) !== -1));
                }
            );
            this.setState({
                userResults: {
                    results: filteredData,
                    searchForUser: this.state.filterUserName,
                    searchFromDate: (this.state.unUsedSinceDate && (this.formatDate(new Date()) === this.formatDate(this.state.unUsedSinceDate))) ? "" : this.formatDate(this.state.unUsedSinceDate),
                }
            });
        }
        else{
            this.setState({
                noDateFoundError:true
            })
        }
    }
    reserForm(){
        this.setState({
            unUsedSinceInterval: "",
            filterUserName: "",
            unUsedSinceDate: new Date(),
            isCustomDateRequired: false,
            noDateFoundError: false,
            userResults: {
                results:this.state.allUsersInfo,
                searchForUser: "",
                searchFromDate: ""
            }
        });
    }
    formatDate(date: Date): string {
        const day = ("0" + date.getDate()).slice(-2);
        const month = ("0" + (date.getMonth() + 1)).slice(-2);
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }
    setDate(date: Date) {
        this.setState({
            unUsedSinceDate: date,
            noDateFoundError:false
        });
    }
    render(): React.ReactNode {
        return (
            <div>
                <div id="inventoryTitleContainer" className="inventoryTitle">External Users Inventory</div>
                <div id="filtersContainer" className="filtersContainer">
                    <div className='row mb-2'>
                        <div id="dvUnUsedSince" className='col-xs-6 col-md-5'>
                            <label className="">Source</label>
                            <select id="ddlUnUsedSince" className={`form-control formInputs`}
                                onChange={(event) => this.handleInputChange(event)}
                                value={this.state.unUsedSinceInterval}>
                                <option value="0">---Select Date---</option>
                                <option value="1">1 Month</option>
                                <option value="3">3 Months</option>
                                <option value="6">6 Months</option>
                                <option value="9">9 Months</option>
                                <option value="12">12 Months</option>
                                <option value="custom">Custom</option>
                            </select>
                        </div>
                        <div id="dvUserFilter" className='col-xs-6 col-md-6'>
                            <label className="lblUserFilter">User</label>
                            <input id="txtUserFilter"
                                className={`form-control formInputs`}
                                onChange={(event) => this.handleInputChange(event)}
                                value={this.state.filterUserName}
                                placeholder="Enter user name or upn">
                            </input>
                        </div>
                    </div>
                    {this.state.isCustomDateRequired && <div className='row mb-2'>
                        <div id="dvDatePicker" className='col-xs-6 col-md-5 d-flex'>
                            <label className="lblDatePicker">From Date</label>
                            <div className={this.state.noDateFoundError?"datePickerError":"datePicker"}>
                                <DateTimePicker
                                    showLabels={false}
                                    dateConvention={DateConvention.Date}
                                    isMonthPickerVisible={false}
                                    maxDate={new Date()}
                                    formatDate={(date: Date) => this.formatDate(date)}
                                    onChange={(date: Date) => this.setDate(date)}
                                />
                            </div>
                        </div>
                    </div>
                    }
                    <div className='row'>
                        <div id="dvButtonContainer" className="dvSPButton col-xs-6 col-md-5">
                            <input type="button" id="btnApply" className="btnGetResults" value="Apply"
                                onClick={() => this.fetchResults()}
                            >
                            </input>
                            <input type="button" id="btnClear" className="btnGetResults" value="Clear"
                            onClick={() => this.reserForm()}
                            ></input>
                        </div>
                    </div>
                </div>
                <UserFilterResults userResults={this.state.userResults} context={this.props.context} />
            </div>
        );
    }
}
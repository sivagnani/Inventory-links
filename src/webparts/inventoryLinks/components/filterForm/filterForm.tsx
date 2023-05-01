import * as React from "react";
import { IFilterFormProps, IFilterFormState } from './IFilterForm'
import DataInventoryForm from "../dataInventoryForm/dataInventoryForm";
import RarelyAccessedForm from "../rarelyAccessedForm/rarelyAccessedForm";
export default class FilterForm extends React.Component<IFilterFormProps, IFilterFormState>{
    render(): React.ReactNode {
        return (
            <div>
                {this.props.filterMode.isDatainventory && <DataInventoryForm
                handleInputChange={(event:React.ChangeEvent<HTMLSelectElement>)=>this.props.handleInputChange(event)}
                source={this.props.source}
                isSubSiteSeleted={this.props.isSubSiteSeleted}
                allSitesInfo={this.props.allSitesInfo}
                fetchResults={()=>this.props.fetchResults()}
                showSubSiteError={this.props.showSubSiteError} />}
                {this.props.filterMode.isRarelyAccessed && <RarelyAccessedForm
                handleInputChange={(event:React.ChangeEvent<HTMLSelectElement>)=>this.props.handleInputChange(event)}
                source={this.props.source}
                isSubSiteSeleted={this.props.isSubSiteSeleted}
                allSitesInfo={this.props.allSitesInfo}
                fetchResults={()=>this.props.fetchResults()}
                usedSince={this.props.usedSince}
                showSubSiteError={this.props.showSubSiteError} />}
            </div>
        );
    }
}
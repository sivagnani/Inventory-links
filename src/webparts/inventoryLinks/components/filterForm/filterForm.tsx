import * as React from "react";
import { IFilterFormProps, IFilterFormState } from './IFilterForm'
import DataInventoryForm from "../dataInventoryForm/dataInventoryForm";
import RarelyAccessedForm from "../rarelyAccessedForm/rarelyAccessedForm";
import ExternalUsersInventoryForm from "../externalUsersInventoryForm/externalUsersInventoryForm";
export default class FilterForm extends React.Component<IFilterFormProps, IFilterFormState>{
    render(): React.ReactNode {
        return (
            <div>
                {this.props.filterMode.isDatainventory && <DataInventoryForm   context={this.props.context}/>}
                {this.props.filterMode.isRarelyAccessed && <RarelyAccessedForm context={this.props.context}/>}
                {this.props.filterMode.isExternalUsersInventory && <ExternalUsersInventoryForm context={this.props.context}/>}
            </div>
        );
    }
}
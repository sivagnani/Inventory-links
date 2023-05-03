import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'font-awesome/css/font-awesome.min.css';
import { IInventoryLinksProps, IInventoryLinksState } from './IInventoryLinks';
import { Services } from '../services/services';
import styles from './InventoryLinks.module.scss';
import { IFilterMode} from '../model/model';
import FilterForm from './filterForm/filterForm';
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
    }
  }
  componentDidMount(): void {
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
  
  public render(): React.ReactElement<IInventoryLinksProps> {
    return (
      <div>
        <div>
          <div className={styles.inventoryLinkContainer}>
            <div className={styles.inventoryBody}>
              <FilterForm context={this.props.context} filterMode={this.state.filterMode} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

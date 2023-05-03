import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  IPropertyPaneConfiguration,
  PropertyPaneDropdown,
  IPropertyPaneDropdownOption
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'InventoryLinksWebPartStrings';
import InventoryLinks from './components/InventoryLinks';
import { IInventoryLinksProps } from './components/IInventoryLinks';
import { ISPFXContext } from '@pnp/sp';

export interface IInventoryLinksWebPartProps {
  context: ISPFXContext;
  filterMode: string;
}

export default class InventoryLinksWebPart extends BaseClientSideWebPart<IInventoryLinksWebPartProps> {
  private filterModes: IPropertyPaneDropdownOption[] = [{
    key: 'connectionInventory',
    text: 'Connection Inventory'
  },
  {
    key: 'rarelyAccessed',
    text: 'Rarely Accessed'
  },
  {
    key: 'externalUserInventory',
    text: 'External User Inventory'
  },
  {
    key: 'userPermissionsInventory',
    text: 'User Permissions Inventory'
  },
  {
    key: 'siteCollectionInventory',
    text: 'SiteCollection Inventory'
  },
  {
    key: 'webInventory',
    text: 'Web Inventory'
  }
]

  public render(): void {
    console.log(this.properties.filterMode);
    const element: React.ReactElement<IInventoryLinksProps> = React.createElement(
      InventoryLinks,
      {
        context: this.context,
        filterMode: this.properties.filterMode,
      }
    );
    ReactDom.render(element, this.domElement);
  }
  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneDropdown('filterMode', {
                  options: this.filterModes,
                  label: strings.FilterMode
                })
              ]
            }
          ]
        }
      ]
    };
  }
}

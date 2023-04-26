import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'InventoryLinksWebPartStrings';
import InventoryLinks from './components/InventoryLinks';
import { IInventoryLinksProps } from './components/IInventoryLinksProps';
import { ISPFXContext } from '@pnp/sp';

export interface IInventoryLinksWebPartProps {
  context:ISPFXContext;
}

export default class InventoryLinksWebPart extends BaseClientSideWebPart<IInventoryLinksWebPartProps> {


  public render(): void {
    const element: React.ReactElement<IInventoryLinksProps> = React.createElement(
      InventoryLinks,
      {context:this.context}
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
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}

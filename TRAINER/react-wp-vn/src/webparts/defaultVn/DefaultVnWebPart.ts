import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'DefaultVnWebPartStrings';
import DefaultVn from './components/DefaultVn';
import { IDefaultVnProps } from './components/IDefaultVnProps';

export interface IDefaultVnWebPartProps {
  description: string;
  userInWPProps: string;
}

export default class DefaultVnWebPart extends BaseClientSideWebPart<IDefaultVnWebPartProps> {

  private  _items = [
    { Title: 'List 1', Id: '1' },
    { Title: 'List 2', Id: '2' },
    { Title: 'List 3', Id: '3' }
  ]

  public render(): void {

    const element: React.ReactElement<IDefaultVnProps> = React.createElement(
      DefaultVn,
      {
        description: this.properties.description,
        user: this.properties.userInWPProps,
        lists: this._items
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected getdataVersion(): Version {
    return Version.parse('1.0');
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
                }),
                PropertyPaneTextField('userInWPProps', {
                  label: strings.UserFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}

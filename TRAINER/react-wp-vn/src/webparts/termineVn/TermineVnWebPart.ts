import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'TermineVnWebPartStrings';
import TermineVn from './components/Termine/TermineVn';
import { ITermineVnProps } from './components/Termine/ITermineVnProps';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { override } from '@microsoft/decorators';

export interface ITermineVnWebPartProps {
  description: string;
}

export interface ITermin {
  Datum: Date | string;
  Title: string;
  Id: number;
  key: number;
}
/* todo #1 */

export default class TermineVnWebPart extends BaseClientSideWebPart<ITermineVnWebPartProps> {
  private _termine: ITermin[] = [];

  /* 
  https://naumchyk.sharepoint.com/sites/naumchyk/Lists/Termine/AllItems.aspx
  */

  public render(): void {
    const element: React.ReactElement<ITermineVnProps> = React.createElement(
      TermineVn,
      {
        description: this.properties.description,
        termine: this._termine
      }
    );

    ReactDom.render(element, this.domElement);
   
  }

  @override
  onInit(): Promise<void> {
    this._onGetListItems();
    return Promise.resolve<void>();
  }

  private _onGetListItems = (): void => {
    console.log('_onGetListItemsNeu');
    this._getListItems()
      .then(response => {
        console.log('response :>> ', response);
        this._termine = response;

        this._termine = this._termine.map((terminEl) => {
          console.log('typeof String :>> ', typeof String); // function, weil Konstruktor
          console.log('typeof terminEl.Datum === typeof "" :>> ', typeof terminEl.Datum === typeof "");// true
          terminEl.Datum = new Date(terminEl.Datum.toString())
          console.log('terminEl.Datum :>> ', terminEl.Datum);
console.log('typeof terminEl.Datum :>> ', typeof terminEl.Datum);
          return terminEl;
          // terminEl.Datum = new Date(terminEl.Datum)

        })
        this.render();
      });
  }

  private _getListItems(): Promise<ITermin[]> {
    console.log('_getListItems');
    return this.context.spHttpClient.get(
      this.context.pageContext.web.absoluteUrl + `/_api/web/lists/getbytitle('Termine')/items?$select=Id,Title,Datum`,
      SPHttpClient.configurations.v1)
      .then(response => {
        console.log('_getListItems response :>> ', response); // Response object mit body - Readable Stream
        return response.json();
      })
      .then(jsonResponse => {
        console.log('jsonResponse :>> ', jsonResponse);
        // todo #2
        // json wandelt Datum Objekt zu string. TS-Date akzeptiert auch strings
        return jsonResponse.value;
      }) as Promise<ITermin[]>;
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
                })
              ]
            }
          ]
        }
      ]
    };
  }
}

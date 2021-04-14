import { Environment, EnvironmentType, Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import FakeHttpClient from './FakeHttpClient';

import styles from './SphttpclientVnWebPart.module.scss';
import * as strings from 'SphttpclientVnWebPartStrings';

export interface ISphttpclientVnWebPartProps {
  description: string;
}

export interface ISPLists {
  value: ISPList[];
}

export interface ISPList {
  Title: string;
  Id: string;
}

export default class SphttpclientVnWebPart extends BaseClientSideWebPart<ISphttpclientVnWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${styles.sphttpclientVn}">
        <div class="${styles.container}">
          <div class="${styles.row}">
            <div class="${styles.column}">
              <span class="${styles.title}">SPHttpClient & Environment</span>
              <h2>pageContext.web.title: ${escape(this.context.pageContext.web.title)}</h2>
              <p>pageContext.web.absoluteUrl: ${this.context.pageContext.web.absoluteUrl}</p>
              <div id="textJeNachEnv"></div>
              <div id="platzFuerAsyncDaten"></div>
            </div>
          </div>
        </div>
      </div>`;
    this._holeDenRestHtml();
    console.log('pageContext.list :>> ', this.context.pageContext.list); // aus Interesse nach Todo List in lokal Workbench nachgeschaut
    console.log('pageContext.listItem :>> ', this.context.pageContext.listItem);
  }
  // WICHTIG: den schließenden Tag bei den Platzhalter-Divs verwenden, 
  // sonst kann die zweite Div (platzFuerAsyncDaten) vom querySelector nicht gefunden werden!

  private _holeDenRestHtml(): void {
    const divTextJeNachEnv: Element = this.domElement.querySelector('#textJeNachEnv');
    console.log('divTextJeNachEnv :>> ', divTextJeNachEnv);
    if (Environment.type === EnvironmentType.Local) {
      console.log('inIf');
      /* dieses jeNachEnvHtml kann auch am Anfang der Render-Methode erzeugt werden */
      divTextJeNachEnv.innerHTML = `
        <h2>Inhalte für Lokal</h2>
        <p>Im lokalen Environment kann Context-Objekt anders befüllt werden.</p>
        <p>Je nach Environment können verschiedene Aktionen ausgeführt werden.</p>
        `;
      this._getFakeLists()
        .then((response) => {
          console.log('inFakeThen');
          this._buildAsyncHtml(response.value)
        })
    } else if (Environment.type === EnvironmentType.SharePoint || Environment.type === EnvironmentType.ClassicSharePoint) {
      divTextJeNachEnv.innerHTML = `
        <h2>Inhalte für SP-Env</h2>
        <p>Im SP-Environment kann Context-Objekt anders befüllt werden.</p>
        `;
      this._getSPLists().then((response) => {
        console.log('inSPThen');
        this._buildAsyncHtml(response.value)
      })
    }
  }

  private _getFakeLists(): Promise<ISPLists> {
    return FakeHttpClient.get()
      .then((daten) => {
        var listData: ISPLists = { value: daten };
        return listData;
      })
  }

  private _getSPLists() {
    console.log('this.context.pageContext.web.absoluteUrl :>> ', this.context.pageContext.web.absoluteUrl);
    // Filter verhindert Abruf versteckter Listen
    return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + '/_api/web/lists?$filter=Hidden eq false', SPHttpClient.configurations.v1)
    // return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + '/_api/web/lists', SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        console.log('response :>> ', response);
        return response.json();
      })
  }

  private _buildAsyncHtml(lists: ISPList[]) {
    let htmlString = `<p>${lists[1].Title}</p>`;
    console.log('lists[0] :>> ', lists[0]);
    const divPlatzFuerAsyncDaten: Element = this.domElement.querySelector('#platzFuerAsyncDaten');
    console.log('divPlatzFuerAsyncDaten :>> ', divPlatzFuerAsyncDaten);
    divPlatzFuerAsyncDaten.innerHTML = htmlString;
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

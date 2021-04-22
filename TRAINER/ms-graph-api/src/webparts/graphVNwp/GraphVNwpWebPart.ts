import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './GraphVNwpWebPart.module.scss';
import * as strings from 'GraphVNwpWebPartStrings';
import { MSGraphClient } from '@microsoft/sp-http';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';

export interface IGraphVNwpWebPartProps {
  description: string;
}

export default class GraphVNwpWebPart extends BaseClientSideWebPart<IGraphVNwpWebPartProps> {

  public render(): void {
    this.context.msGraphClientFactory.getClient()
    .then((client) => {
      const me = client.api('/me');
      console.log('me :>> ', me);
      const users = client.api('/me/users');
      console.log('users :>> ', users);

      const mesgs = client.api('/me/messages');
      console.log('mesgs :>> ', mesgs);
      
      mesgs.top(3)
      .orderby("receivedDateTime desc")
      .get((error, messages: any, rawResponse?: any) => {
        this.domElement.innerHTML = `
        <div class="${ styles.graphVNwp }">
          <div class="${ styles.container }">
            <div class="${ styles.row }">
              <div class="${ styles.column }">
                <span class="${ styles.title }">Graph API zu my Mail</span>
                <p class="${ styles.subTitle }">Customize SharePoint experiences using Web Parts.</p>
                <p class="${ styles.description }">${escape(this.properties.description)}</p>
                <div id="responseContainer"></div>                
              </div>
            </div>
          </div>
        </div>`;

        this._renderEmails(messages.values);
      })
    })
  }

  private _renderEmails(msgs: MicrosoftGraph.Message[]) {
    console.log('msgs :>> ', msgs);
    let htmlString = '<ol>';
    for (const iterator of msgs) {
      htmlString += `
      <li>Mail mit Betreff ${iterator.subject}, hat Anhänge: ${iterator.hasAttachments} ${iterator.toRecipients}</li>
      `
    }
    htmlString += '</ol>';

    const responseContainer = this.domElement.querySelector('#responseContainer');
    responseContainer.innerHTML = htmlString;
  }

  protected get dataVersion(): Version {
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

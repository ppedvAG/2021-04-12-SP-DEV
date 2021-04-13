import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './ContextVnWebPart.module.scss';
import * as strings from 'ContextVnWebPartStrings';

export interface IContextVnWebPartProps {
  description: string;
}

export default class ContextVnWebPart extends BaseClientSideWebPart<IContextVnWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${ styles.contextVn }">
        <div class="${ styles.container }">
          <div class="${ styles.row }">
            <div class="${ styles.column }">
              <span class="${ styles.title }">Welcome to SharePoint!</span>
              <p class="${ styles.subTitle }">Customize SharePoint experiences using Web Parts.</p>
              <p class="${ styles.description }">${escape(this.properties.description)}</p>
              <a href="https://aka.ms/spfx" class="${ styles.button }">
                <span class="${ styles.label }">Learn more</span>
              </a>
              <h2>Context</h2>
              <p class="${ styles.description }">context.pageContext.web.title: ${this.context.pageContext.web.title}</p>
              <p class="${ styles.description }">context.pageContext.list: ${this.context.pageContext.list}</p>
              <p class="${ styles.description }">context.pageContext.list.title: ${this.context.pageContext.list.title}</p>
              <p class="${ styles.description }">context.pageContext.site: ${this.context.pageContext.site}</p>
              <p class="${ styles.description }">context.pageContext.site.absoluteUrl: ${this.context.pageContext.site.absoluteUrl}</p>
              <p class="${ styles.description }">context.pageContext.user: ${this.context.pageContext.user}</p>
              <p class="${ styles.description }">context.pageContext.user.displayName: ${this.context.pageContext.user.displayName}</p>
              <p class="${ styles.description }">context.pageContext.web: ${this.context.pageContext.web}</p>
              <p class="${ styles.description }">context.pageContext.web.absoluteUrl: ${this.context.pageContext.web.absoluteUrl}</p>
              <p class="${ styles.description }">context.pageContext.web.description: ${this.context.pageContext.web.description}</p>
              <p class="${ styles.description }">context.pageContext: ${this.context.pageContext}</p>
              <p class="${ styles.description }">context.spHttpClient: ${this.context.spHttpClient}</p>
              <p class="${ styles.description }">context.spHttpClient.get: ${this.context.spHttpClient.get}</p>
            </div>
          </div>
        </div>
      </div>`;
  }

  protected getdataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    console.log('propPane angelegt');
    console.log('this :>> ', this);
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

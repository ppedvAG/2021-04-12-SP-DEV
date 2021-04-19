import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './CssVnWebPart.module.scss';
import * as strings from 'CssVnWebPartStrings';

export interface ICssVnWebPartProps {
  description: string;
}

export default class CssVnWebPart extends BaseClientSideWebPart<ICssVnWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${styles.cssVn}">
        <div class="${styles.container}">
          <div class="${styles.row}">
            <div class="${styles.column}">
            <p class="${styles.description}">
              <a href="https://aka.ms/spfx" class="${styles.button}">
                <span class="${styles.label}">Learn more</span>
              </a></p>
            </div>
            <div class="${styles.column}">
            <p class="${styles.description}">
              <a href="https://aka.ms/spfx" class="${styles.button}">
                <span class="${styles.label}">Learn more</span>
              </a></p>
          </div>
          <div class="${styles.row}">
            <div class="${styles.column}">
            <p class="${styles.description}">
              <a href="https://aka.ms/spfx" class="${styles.button}">
                <span class="${styles.label}">Learn more</span>
              </a></p>
            </div>
            <div class="${styles.column}">
            <p class="${styles.description}">
              <a href="https://aka.ms/spfx" class="${styles.button}">
                <span class="${styles.label}">Learn more</span>
              </a></p>
          </div>
          </div>
        </div>
      </div>`;
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

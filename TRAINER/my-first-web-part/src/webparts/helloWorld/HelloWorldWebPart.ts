import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneCheckbox,
  PropertyPaneDropdown,
  PropertyPaneTextField,
  PropertyPaneToggle
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './HelloWorldWebPart.module.scss';
import * as strings from 'HelloWorldWebPartStrings';

export interface IHelloWorldWebPartProps {
  description: string;
  textfield: string;
  multiline: string;
  checkboxProp: boolean;
  dropdownProp: string;
  toggleProp: boolean;
}

export default class HelloWorldWebPart extends BaseClientSideWebPart<IHelloWorldWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${ styles.helloWorld }">
        <div class="${ styles.container }">
          <div class="${ styles.row }">
            <div class="${ styles.column }">
              <span class="${ styles.title }">Welcome to SharePoint!</span>
              <p class="${ styles.subTitle }">Customize SharePoint experiences using Web Parts.</p>
              <p class="${ styles.description }">${escape(this.properties.description)}</p>
              <a href="https://aka.ms/spfx" class="${ styles.button }">
                <span class="${ styles.label }">Learn more</span>
              </a>
              <p> Web Part 13.04</p>
              <p class="${ styles.description }">${escape(this.properties.multiline)}</p>
              <p class="${ styles.subTitle }">${escape(this.properties.multiline)}</p>
              <p class="${ styles.description }">${this.properties.checkboxProp}</p>
              <p class="${ styles.description }">${escape(this.properties.dropdownProp)}</p>
              <p class="${ styles.description }">${this.properties.toggleProp}</p>
              <p>Änderung nach dem Deployment</p>

            </div>
          </div>
        </div>
      </div>`;
  }

  protected getdataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          displayGroupsAsAccordion: true,
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              isCollapsed: true,
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneTextField('textfield', {}),
                PropertyPaneTextField('multiline', {
                  label: 'mehrzeiliges Inputfeld',
                  multiline: true,
                  rows: 5
                }),
                PropertyPaneCheckbox('checkboxProp', {
                  text: 'Checkbox'
                }),
                PropertyPaneDropdown('dropdownProp', {
                  label: 'Dropdown',
                  options: [
                    { key: '1', text: 'One"eins"'}, 
                    { key: '2', text: 'Two'}, 
                    { key: '3', text: 'Three'}, 
                    { key: '4', text: 'Four'}, 
                  ]
                }),
                PropertyPaneToggle('toggleProp', {
                  label: 'Toggle',
                  onText: 'On',
                  offText: 'Off'
                })

              ]
            },
            {
              isCollapsed: false,
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        },
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

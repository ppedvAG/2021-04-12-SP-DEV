import { Log } from '@microsoft/sp-core-library';
import { override } from '@microsoft/decorators';
import {
  BaseFieldCustomizer,
  IFieldCustomizerCellEventParameters
} from '@microsoft/sp-listview-extensibility';

import * as strings from 'FielsCstmzVnFieldCustomizerStrings';
import styles from './FielsCstmzVnFieldCustomizer.module.scss';

/* 

aus serve.json

"default": {
      "pageUrl": "https://naumchyk.sharepoint.com/sites/naumchyk/SitePages/Test-Page.aspx",
      "customActions": {
        "5f37c37a-b422-4e38-b1d3-c376afcabe5c": {
          "location": "ClientSideExtension.ApplicationCustomizer",
          "properties": {
            "Top": "Header",
            "Bottom": "Footer"
          }
        }
      }
    },
     "appCstmzVn": {
      "pageUrl": "https://naumchyk.sharepoint.com/sites/naumchyk/SitePages/Test-Page.aspx",
      "customActions": {
        "5f37c37a-b422-4e38-b1d3-c376afcabe5c": {
          "location": "ClientSideExtension.ApplicationCustomizer",
          "properties": {
            "Top": "Header",
            "Bottom": "Footer"
          }
        }
      }
    },
    
    */
/**
 * If your field customizer uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IFielsCstmzVnFieldCustomizerProperties {
  // This is an example; replace with your own property
  sampleText?: string;
}

const LOG_SOURCE: string = 'FielsCstmzVnFieldCustomizer';

export default class FielsCstmzVnFieldCustomizer
  extends BaseFieldCustomizer<IFielsCstmzVnFieldCustomizerProperties> {

  @override
  public onInit(): Promise<void> {
    // Add your custom initialization to this method.  The framework will wait
    // for the returned promise to resolve before firing any BaseFieldCustomizer events.
    Log.info(LOG_SOURCE, 'Activated FielsCstmzVnFieldCustomizer with properties:');
    Log.info(LOG_SOURCE, JSON.stringify(this.properties, undefined, 2));
    Log.info(LOG_SOURCE, `The following string should be equal: "FielsCstmzVnFieldCustomizer" and "${strings.Title}"`);
    return Promise.resolve();
  }

  @override
  public onRenderCell(event: IFieldCustomizerCellEventParameters): void {
    // Use this method to perform your custom cell rendering.
    // const text: string = `${this.properties.sampleText}: ${event.fieldValue}`;
    const text: string = `${this.properties.sampleText}: ${event.fieldValue}`;

    event.domElement.innerText = text;

    event.domElement.classList.add(styles.cell);
  }

  @override
  public onDisposeCell(event: IFieldCustomizerCellEventParameters): void {
    // This method should be used to free any resources that were allocated during rendering.
    // For example, if your onRenderCell() called ReactDOM.render(), then you should
    // call ReactDOM.unmountComponentAtNode() here.
    super.onDisposeCell(event);
  }
}

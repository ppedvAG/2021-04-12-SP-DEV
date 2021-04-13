import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './TypeScriptVnWebPart.module.scss';
import * as strings from 'TypeScriptVnWebPartStrings';

export interface ITypeScriptVnWebPartProps {
  description: string;
}



export default class TypeScriptVnWebPart extends BaseClientSideWebPart<ITypeScriptVnWebPartProps> {

  constructor() {
    super()
    console.log('constructor ausgeführt');

  }
  onInit() {
    console.log('web part initialisiert');
    return new Promise<void>(resolve => resolve());

  }
  public render(): void {
    this.domElement.innerHTML = `
      <div class="${styles.typeScriptVn}">
      <h2>
    Syntax einer Funktion
</h2>
<p>
    function fnName() {}
</p>
<hr>
<h2>
    Syntax einer Klasse
</h2>
<p>
    class className {}
</p>
<hr>
<h2>
    Syntax einer Klasse mit Members (Props & Methods)
</h2>
<p>
    class className {
        propName : propType;
        methodName () : returnType {};
    }
</p>
<hr>
<h2>
    Syntax von einem Objekt
</h2>
<p>
    {
        keyName : value,
        methodName () : returnType {}
    }
</p>
<hr>
<h2>
    Syntax von einem Array
</h2>
<p>
    [element1, element2, element3]
</p>
<hr>
<h2>
    Syntax von einer generischen Klasse
</h2>
<p>
    class className&#60typeName&#65 {}
</p>
<hr>
<h2>
    Syntax von einem Interface
</h2>
<p>
    interface interfaceName {
        key1Name: key1Type;
        key2Name: key2Type;
    }
</p>
<hr>
<h2>Union Type</h2>
<p>
    let variableName: string | number;
</p>
<hr>
<p>
    <em>anonyme Pfeilfunktion</em>
    <br>
    (): string => {
        return 'Pfeilfunktion mit keinen Argumenten und einem string-return';
      }
      <br>
      <em>benannte Pfeilfunktion</em>
      <br>
      let fnName(): string => {
        return 'Pfeilfunktion mit keinen Argumenten und einem string-return';
      }
</p>
      </div>`;
  }

  protected getdataVersion(): Version {
    return Version.parse('1.0');
  }
  protected demostrateTypeScript() { }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {

    console.log('ausgabe aus getPropPaneConf')

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

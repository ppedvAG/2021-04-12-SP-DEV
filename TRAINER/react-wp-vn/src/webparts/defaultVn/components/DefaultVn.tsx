import * as React from 'react';
import styles from './DefaultVn.module.scss';
import { IDefaultVnProps } from './IDefaultVnProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class DefaultVn extends React.Component<IDefaultVnProps, {}> {
 
  public render(): React.ReactElement<IDefaultVnProps> {
    let datum = new Date();
    console.log('typeof datum :>> ', typeof datum);
    return (
      <div className={ styles.defaultVn }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to SharePoint!</span>
              <p className={ styles.subTitle }>Today is: {datum.toLocaleDateString()}</p>
              <p className={ styles.description }>{escape(this.props.description)}</p>
              <p className={ styles.description }>{escape(this.props.user)}</p>
              <p className={ styles.description }>{escape(this.props.lists[0].Title)}</p>
              <a href="https://aka.ms/spfx" className={ styles.button }>
                <span className={ styles.label }>Learn more</span>
              </a>             
            </div>
          </div>
        </div>
      </div>
    );
  }
}

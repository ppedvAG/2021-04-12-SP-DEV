import * as React from 'react';
import styles from './TermineVn.module.scss';
import { ITermineVnProps } from './ITermineVnProps';
import { escape } from '@microsoft/sp-lodash-subset';
import Termin from '../Termin/Termin';

export default class TermineVn extends React.Component<ITermineVnProps, {}> {
  public render(): React.ReactElement<ITermineVnProps> {
    let termineJSX = this.props.termine.map((terminEl) => {
      return <Termin key={terminEl.Id} datum={terminEl.Datum} title={terminEl.Title} />

    })
    return (
      <div className={styles.termineVn}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <span className={styles.title}>Welcome to SharePoint!</span>
              {/* this.props.spListItems.map((list) =>
                  <li key={list.Id} className={styles.item}>
                    <strong>Id:</strong> {list.Id}, <strong>Title:</strong> {list.Title}
                  </li>
                ) */}
              {this.props.termine.map((terminEl) => {
                  console.log('terminEl: ', terminEl);  
                 /* return <Termin key={terminEl.id} datum={terminEl.datum} title={terminEl.title} /> */
               
                return (
                <ul>
                  <li key={terminEl.Id}>
                    test
                    <h2>h2 {terminEl.Datum}</h2>
                    <p>p {terminEl.Title}</p>
                  </li>                  
                </ul>
              )})}

             <div>{termineJSX}</div> 

              {/* <Termin datum="19.04.2021" title="termin beschr" /> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

declare interface IDefaultVnWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  UserFieldLabel: string;
}

declare module 'DefaultVnWebPartStrings' {
  const strings: IDefaultVnWebPartStrings;
  export = strings;
}

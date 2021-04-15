export interface IDefaultVnProps {
  description: string;
  user: string;
  lists: ISPList[];
}

export interface ISPList {
  Title: string;
  Id: string;
}

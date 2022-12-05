export declare interface Action {
  account: string;
  type: string;
  content: string;
}

export declare interface Exception {
  account: string;
  type: string;
  code: number;
  content: string;
}
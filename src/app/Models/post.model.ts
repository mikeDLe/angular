export interface People {
    result: Results;
}
export interface Results {
    gender: string;
    name: string;
    title: string;
    date: string;
    picture: string;
    phone: string;
    country: string;
}

export interface Element {
    name: string;
    position: number;
    weight: number;
    symbol: string;
  }

  export interface AppState {
    result: Array<any>;
  }

  // Begin --- For testing of Material form.
  export class Address {
    constructor(
      public firstname?: string,
      public lastname?: string,
      public address?: string,
      public city?: string,
      public state?: string,
      public postalcode?: string
    ) {}
  }

  export interface User {
    name: string;
    email: string;
    phone: string;
    company: {
        name: string;
    }
} 
// End --- For testing of Material form.
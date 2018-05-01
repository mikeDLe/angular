export interface People {
    result: ApiResponse;
}

export class ApiResponse {
  id: number;
  gender: string;
  name: string;
  title: string;
  date: string;
  picture: string;
  phone: string;
  country: string;
}

// export class Results {
//   gender: string;
//   name: string;
//   title: string;
//   date: string;
//   picture: string;
//   phone: string;
//   country: string;
// }

export interface Element {
    name: string;
    position: number;
    weight: number;
    symbol: string;
  }

  export interface AppState {
    result: Array<any>;
  }

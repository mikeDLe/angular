// Not used but shows all responses from randomapi.com
declare module namespace {

    export interface Result {
        name: string;
        country: string;
        date: Date;
        picture: string;
        phone: string;
        gender: string;
        title: string;
    }

    export interface Time {
        instruct: number;
        generate: number;
    }

    export interface User {
        username: string;
        tier: string;
        results: string;
        remaining: string;
    }

    export interface Info {
        seed: string;
        results: string;
        page: string;
        version: string;
        time: Time;
        user: User;
    }

    export interface RootObject {
        results: Result[];
        info: Info;
    }

}
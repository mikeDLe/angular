import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {
    public Server = 'https://randomapi.com/';
    public ApiUrl = 'api/erb3dowx?key=GOV2-3ZOI-M3WQ-2J9Y';
    public ServerWithApiUrl = this.Server + this.ApiUrl;
}
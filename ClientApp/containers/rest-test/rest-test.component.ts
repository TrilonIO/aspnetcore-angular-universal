import { Component } from '@angular/core';
import { Http } from '@angular/http';

import { XhrService } from 'nh-shared';

@Component({
    selector: 'rest-test',
    template: require('./rest-test.component.html')
})
export class RestTestComponent {
    public forecasts: IWeatherForecast[];

    constructor(private http: Http, private xhrService: XhrService) {
        this.http.get('/api/SampleData/WeatherForecasts').subscribe(result => {

            this.forecasts = result.json();

            xhrService.cacheResponse({
                method: '/api/SampleData/WeatherForecasts',
                response: result.json()
            });

            console.log(result.json());
        });
    }
}

interface IWeatherForecast {
    dateFormatted: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiGatewayConfiguration {
  rootUrl: string = 'http://localhost:8084';
}

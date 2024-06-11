import {Injectable} from '@angular/core';
import {LandaService} from "../../../core/services/landa.service";

@Injectable({
    providedIn: 'root'
})
export class DashboardService extends LandaService {

    getSummaries() {
        return this.DataGet('/v1/report/total-sale/summaries');
    }

    getTotalPerYear() {
        return this.DataGet('/v1/report/total-sale/year');
    }

    getTotalPerMonth(year: any) {
        return this.DataGet(`/v1/report/total-sale/month/${year}`);
    }

    getTotalPerDay(arrParameter = {}) {
        return this.DataGet('/v1/report/total-sale/day', arrParameter);
    }
}

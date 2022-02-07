import axios from 'axios';

export default class ReportService {
  getReports() {
    return axios.get('data/reports.json').then((res) => res.data.data);
  }
}

import axios from 'axios';
import { HttpService } from './base';

class UserService extends HttpService {
  prefix = 'user';

  async getUsers() {
    const users = localStorage.getItem('users');
    if (!users) {
      return axios.get('data/user/default.json').then((res) => {
        localStorage.setItem('users', JSON.stringify(res.data.data));
        return res.data.data;
      });
    } else {
      return JSON.parse(users);
    }
  }

  uploadCSV(file) {
    return new Promise((resolve, reject) => {
      // let users = JSON.parse(localStorage.getItem('users') || []);
      // let users = JSON.parse([]);
      let users = [];
      const reader = new FileReader();
      reader.readAsBinaryString(file);
      reader.onload = () => {
        const csv = reader.result;
        const u = this.csvToJSON(csv);
        users = [...users, ...u];
      };

      reader.onerror = (e) => {
        console.log('Error', e);
        reject(e);
      };

      reader.onloadend = () => {
        localStorage.setItem('users', JSON.stringify(users));
        resolve(users);
      };
    });
  }

  csvToJSON(csv) {
    const lines = csv.split('\n');
    const result = [];
    const headers = lines[0].trim().split(',');
    for (let i = 1; i < lines.length; i++) {
      const obj = {};
      const currentline = lines[i].trim().split(',');
      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }
      if (obj.id !== '') result.push(obj);
    }
    return result;
  }

  createUsers = (data) => this.post(`${this.prefix}/createUsers`, data);
  getUsers = () => this.get(this.prefix);
  createUser = (data) => this.post(`${this.prefix}/create`, data);
  getUser = (id) => this.get(`${this.prefix}/user/${id}`);
  assignBay = (id, body) => this.put(`${this.prefix}/assignBay/${id}`, body);
  report = (id) => this.get(`${this.prefix}/report/${id}`);
}

export const userService = new UserService();

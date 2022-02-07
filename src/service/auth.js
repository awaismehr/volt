import { HttpService } from './base';

class AuthService extends HttpService {
  prefix = 'auth';
  login = (data) => this.post(`${this.prefix}/login`, data);
  sendForgetPasswordEmail = (data) => this.post(`${this.prefix}/send-forgetPassword-email`, data);
  forgetPassword = (data) => this.post(`${this.prefix}/forgetPassword/${data.id}/${data.token}`, { password: data.password });
}
export const authService = new AuthService();

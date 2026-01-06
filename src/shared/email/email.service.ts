import {
  emailConfig,
  EmailConfigType,
  appConfig,
  AppConfigType,
} from '@/config';
import { Injectable } from '@nestjs/common';
import { createTransport, Transporter, SendMailOptions } from 'nodemailer';

enum EmailType {
  REGISTER = 0,
  FORGET = 1,
  LOGIN = 2,
}

@Injectable()
export class EmailService {
  transporter: Transporter;
  emailConfig: EmailConfigType;
  appConfig: AppConfigType;
  constructor() {
    this.emailConfig = emailConfig();
    this.appConfig = appConfig();

    this.transporter = createTransport({
      host: this.emailConfig.host,
      port: this.emailConfig.port,
      secure: false,
      auth: {
        user: this.emailConfig.auth.user,
        pass: this.emailConfig.auth.pass,
      },
    });
  }

  async sendEmail(options: SendMailOptions): Promise<void> {
    await this.transporter.sendMail({
      from: {
        name: this.appConfig.name,
        address: this.emailConfig.auth.user, // 修正邮箱地址
      },
      ...options,
    });
  }

  async sendEmailCode(email: string, type: EmailType): Promise<void> {
    let msg = '';
    const code = Math.random().toString().slice(2, 8);
    switch (type) {
      case EmailType.REGISTER:
        msg = `<p>你的注册验证码是 ${code}</p>`;
        break;
      case EmailType.FORGET:
        msg = `<p>你的找回密码验证码是 ${code}</p>`;
        break;
      case EmailType.LOGIN:
        msg = `<p>你的登录验证码是 ${code}</p>`;
        break;
    }

    await this.transporter.sendMail({
      from: {
        name: this.appConfig.name,
        address: this.emailConfig.auth.user,
      },
      to: email,
      subject: '验证码',
      html: msg,
    });
  }
}

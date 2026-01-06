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

  private readonly EMAIL = '270535431@qq.com';

  private readonly KEY = 'irrfnxbnilpvbiej';

  constructor() {
    this.transporter = createTransport({
      host: 'smtp.qq.com',
      port: 587,
      secure: false,
      auth: {
        user: this.EMAIL,
        pass: this.KEY,
      },
    });
  }

  async sendEmail(options: SendMailOptions): Promise<void> {
    await this.transporter.sendMail({
      from: {
        name: 'v-admin',
        address: this.EMAIL, // 修正邮箱地址
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
        name: 'v-admin',
        address: this.EMAIL,
      },
      to: email,
      subject: '验证码',
      html: msg,
    });
  }
}

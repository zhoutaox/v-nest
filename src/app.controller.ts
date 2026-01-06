import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  Logger,
  Inject,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { storage } from './utils/storage';
import axios, { AxiosResponse } from 'axios';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';
import { JsonResult } from './utils/json.result';
import { EmailService } from './shared/email/email.service';

@Controller('/app')
export class AppController {
  @Inject(EmailService)
  private readonly emailService: EmailService;
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: '获取文档信息' })
  @ApiTags('文档')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'aaa 成功',
  })
  @ApiQuery({
    name: 'a1',
    required: true,
  })
  @Post('docs')
  async docs() {
    const port = process.env.APP_PORT || 3000;

    const url = `http://localhost:${port}/api-docs-json`;

    const data = JsonResult.getInstance();

    try {
      const result: AxiosResponse<{
        success: boolean;
        message: string;
      }> = await axios.get(url);
      if (result.data) {
        data.set(HttpStatus.OK).setData(result.data);
        return data;
      }

      data.set(HttpStatus.BAD_REQUEST, '获取失败');
    } catch (error) {
      new Logger(this.docs.name).error(error);
      data.set(HttpStatus.BAD_REQUEST, '获取失败');
    }
    return data;
  }

  @Post('initDatabase')
  async initDatabase() {
    const jsonResult = JsonResult.getInstance();

    const result = await this.appService.init();

    if (result) {
      jsonResult.set(HttpStatus.OK);
    } else {
      jsonResult.set(HttpStatus.BAD_REQUEST, '初始化失败');
    }
    return jsonResult;
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      dest: 'uploads',
      storage: storage,
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File, @Body() body) {
    console.log(file);
    console.log(body);
  }

  @Post('uploads')
  @UseInterceptors(
    FilesInterceptor('file', 99, {
      dest: 'uploads',
      storage: storage,
    }),
  )
  uploadFiles(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 10000000,
            message: (maxSize) => {
              return `文件大小不能超过${maxSize / 1000000}MB`;
            },
          }), // 5MB
          new FileTypeValidator({
            fileType: 'image/png',
          }), // only png
        ],
      }),
    )
    files: Express.Multer.File[],
    @Body() body,
  ) {
    console.log(files.length);
    console.log(body);
  }

  @Post('sendEmail')
  async sendEmail(@Body('email') email: string) {
    const jsonResult = JsonResult.getInstance();

    if (!email) {
      return jsonResult.set(HttpStatus.BAD_REQUEST, '邮箱不能为空');
    }

    const code = Math.random().toString().slice(2, 8);

    try {
      await this.emailService.sendEmail({
        to: email,
        subject: '注册验证码',
        html: `<p>你的注册验证码是 ${code}</p>`,
      });
      jsonResult.set(HttpStatus.OK, '发送成功');
    } catch (error) {
      new Logger(this.sendEmail.name).error(error);
      jsonResult.set(HttpStatus.BAD_REQUEST, '发送失败');
    }
    return jsonResult;
  }
}

import { Controller, Inject, Post } from '@nestjs/common';
import { JobService } from './job.service';

@Controller('job')
export class JobController {
  @Inject(JobService)
  private readonly jobService: JobService;
  @Post('crawler')
  crawler() {
    this.jobService.crawler();
  }
}

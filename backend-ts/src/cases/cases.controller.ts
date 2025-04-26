import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CasesService } from './cases.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CaseResponseDTO, CreateCaseDTO } from './cases.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { File, FormData } from 'formdata-node';
import { ApiConsumes } from '@nestjs/swagger';

@Controller('cases')
export class CasesController {
  constructor(
    private casesService: CasesService,
    private prisma: PrismaService,
    private httpService: HttpService,
  ) {}

  @Get()
  async findAll() {
    return this.prisma.legalCase.findMany({ include: { CaseInfo: true } });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.prisma.legalCase.findUnique({
      where: { id },
    });
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() data: CreateCaseDTO,
  ) {
    console.log('data', data);
    if (!file) {
      throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
    }

    try {
      // Create form data
      const formData = new FormData();
      formData.append('file', new File([file.buffer], file.originalname));

      // Forward the file to Python backend
      const response = await firstValueFrom(
        this.httpService.post<{ upload_id: string }>(
          'http://localhost:8000/upload-pdf',
          formData,
          {
            headers: {
              Accept: 'application/json',
            },
          },
        ),
      );
      const uploadId = response.data.upload_id;
      const newCase = await this.prisma.legalCase.create({
        data: {
          name: file.originalname,
          uploadId,
        },
      });

      return newCase;
    } catch (error) {
      console.error('Failed to upload file:', error);
      throw new HttpException(
        'Failed to upload file to analysis service',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post(':id/analyze')
  async analyzeCase(@Param('id') id: string) {
    const legalCase = await this.prisma.legalCase.findUnique({ where: { id } });

    if (!legalCase) {
      throw new HttpException('Case not found', HttpStatus.NOT_FOUND);
    }

    const response = await firstValueFrom(
      this.httpService.post<CaseResponseDTO>(`http://localhost:8000/query`, {
        query: legalCase.name,
        uuid: legalCase.uploadId,
      }),
    );

    const caseInfo = await this.prisma.caseInfo.create({
      data: {
        appellant: response.data.appellant,
        apellee: response.data.appellee,
        relevant_to_bmw: response.data.relevant_to_bmw,
        subject_of_case: response.data.subject_of_case,
        high_risk: response.data.high_risk,
        complaint_and_legal_action: response.data.complaint_and_legal_action,
        department: response.data.department,
        summary: response.data.summary,
        legalCaseId: legalCase.id,
      },
    });
    return caseInfo;
  }
}

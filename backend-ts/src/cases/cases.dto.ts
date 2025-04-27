import { ApiProperty } from '@nestjs/swagger';

// Create case DTO
export class CreateCaseDTO {
  @ApiProperty()
  name: string;

  @ApiProperty()
  title: string;

  @ApiProperty({ type: () => String, format: 'binary' })
  file: any;
}

// Case response DTO
export class CaseResponseDTO {
  appellant: string;
  appellee: string;
  relevant_to_bmw: boolean;
  subject_of_case: boolean;
  high_risk: boolean;
  complaint_and_legal_action: string;
  department: string[];
  summary: string;
}

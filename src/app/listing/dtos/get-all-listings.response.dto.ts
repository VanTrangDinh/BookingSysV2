import { IListingsDefine } from '../../../shared';
import { GetListingsDto } from './get-listings.dto';

export class GetAllListingsResponseDto extends GetListingsDto {
  general: IListingsDefine[];
}

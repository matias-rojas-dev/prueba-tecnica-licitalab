import { Controller, Get, Param, Patch } from '@nestjs/common';
import { OpportunitiesService } from './opportunities.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GetListOpportunityDto } from './dto/get-list-opportunity.dto';

@Controller('opportunities')
export class OpportunitiesController {
  constructor(private readonly opportunitiesService: OpportunitiesService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener oportunidades' })
  @ApiResponse({
    status: 200,
    description: 'Se han obtenido correctamente las oportunidades',
    type: [GetListOpportunityDto],
  })
  findAll() {
    return this.opportunitiesService.findAll();
  }

  @Get('/followed')
  @ApiOperation({ summary: 'Obtener oportunidades que estas siguiendo' })
  @ApiResponse({
    status: 200,
    description:
      'Se han obtenido correctamente las oportunidades que estás siguiendo',
    type: [GetListOpportunityDto],
  })
  findFollowedOpportunities() {
    return this.opportunitiesService.findFollowedOpportunities();
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar oportunidad' })
  @ApiResponse({
    status: 200,
    description: 'Se ha actualizado correctamente la oportunidad',
    type: [GetListOpportunityDto],
  })
  updateFollowedOpportunities(@Param('id') opportunityId: string) {
    return this.opportunitiesService.updateFollowedOpportunities(
      Number(opportunityId),
    );
  }
}

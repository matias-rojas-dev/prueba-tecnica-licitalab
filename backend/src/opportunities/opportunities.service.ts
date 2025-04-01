import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { GetListOpportunityDto } from './dto/get-list-opportunity.dto';

@Injectable()
export class OpportunitiesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<GetListOpportunityDto[]> {
    return await this.prisma.opportunities.findMany({
      where: {
        close_date: { gte: new Date() },
      },
      orderBy: { publish_date: 'desc' },
    });
  }

  async findFollowedOpportunities(): Promise<GetListOpportunityDto[]> {
    return await this.prisma.opportunities.findMany({
      where: { is_followed: true, close_date: { gte: new Date() } },
      orderBy: { publish_date: 'desc' },
    });
  }

  async updateFollowedOpportunities(
    opportunityId: number,
  ): Promise<GetListOpportunityDto[]> {
    const opportunity = await this.prisma.opportunities.findUnique({
      where: { id: opportunityId },
    });

    await this.prisma.opportunities.update({
      where: {
        id: opportunityId,
      },

      data: {
        is_followed: !opportunity!.is_followed,
      },
    });

    return await this.prisma.opportunities.findMany({
      orderBy: { publish_date: 'desc' },
    });
  }
}

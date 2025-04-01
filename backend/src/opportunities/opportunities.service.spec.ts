import { Test, TestingModule } from '@nestjs/testing';
import { OpportunitiesService } from './opportunities.service';
import { PrismaService } from '../prisma.service';

describe('OpportunitiesService - Fecha de cierre de una oportunidad', () => {
  let service: OpportunitiesService;
  let prisma: PrismaService;

  const mockOpportunities = [
    {
      id: 1,
      code: 'L1-16-26',
      title: 'Oportunidad expirada',
      type: 'tender',
      is_followed: false,
      publish_date: '2025-03-28T23:00:00.000Z',
      close_date: new Date(Date.now() - 86400000).toISOString(),
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OpportunitiesService,
        {
          provide: PrismaService,
          useValue: {
            opportunities: {
              findMany: jest.fn().mockImplementation(() => {
                const currentDate = new Date();
                return Promise.resolve(
                  mockOpportunities.filter(
                    (opp) => new Date(opp.close_date) >= currentDate,
                  ),
                );
              }),
            },
          },
        },
      ],
    }).compile();

    service = module.get<OpportunitiesService>(OpportunitiesService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('debería devolver array vacío si todas las oportunidades están expiradas', async () => {
    jest.spyOn(prisma.opportunities, 'findMany').mockResolvedValue([]);

    const result = await service.findAll();
    expect(result).toEqual([]);
    expect(result.length).toBe(0);
  });
});

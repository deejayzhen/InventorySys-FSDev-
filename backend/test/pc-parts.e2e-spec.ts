import { execSync } from 'child_process';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from '@testcontainers/postgresql';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma.service';

describe('PC parts API', () => {
  let container: StartedPostgreSqlContainer;
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    container = await new PostgreSqlContainer('postgres:16').start();
    process.env.DATABASE_URL = container.getConnectionUri();
    execSync('npx prisma migrate deploy', { env: process.env });

    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();

    prisma = app.get(PrismaService);
  }, 120000);

  afterAll(async () => {
    await app?.close();
    await container?.stop();
  });

  beforeEach(async () => {
    await prisma.pcPart.deleteMany();
  });

  it('creates a part', async () => {
    const response = await request(app.getHttpServer())
      .post('/pc-parts')
      .send({
        name: 'Ryzen 5 7600',
        sku: 'CPU-R5-7600',
        brand: 'AMD',
        category: 'CPU',
        quantity: 4,
        price: 229.99,
      })
      .expect(201);

    expect(response.body.sku).toBe('CPU-R5-7600');
  });
});

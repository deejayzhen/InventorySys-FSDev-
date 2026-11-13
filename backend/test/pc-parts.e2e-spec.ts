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
  let token: string;
  const part = {
    name: 'Ryzen 5 7600',
    sku: 'CPU-R5-7600',
    brand: 'AMD',
    category: 'CPU',
    quantity: 4,
    price: 229.99,
  };

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

    const credentials = { email: 'test@test.com', password: 'secret123' };
    await request(app.getHttpServer()).post('/auth/register').send(credentials);
    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send(credentials);
    token = (res.body as { accessToken: string }).accessToken;
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
      .set('Authorization', `Bearer ${token}`)
      .send(part)
      .expect(201);

    expect(response.body.sku).toBe('CPU-R5-7600');
  });

  it('rejects invalid data', async () => {
    await request(app.getHttpServer())
      .post('/pc-parts')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Ryzen 5 7600',
        sku: 'CPU-R5-7600',
        brand: 'AMD',
        category: 'CPU',
        quantity: -4,
        price: 229.99,
      })
      .expect(400);
  });

  it('rejects a duplicate SKU', async () => {
    await request(app.getHttpServer())
      .post('/pc-parts')
      .set('Authorization', `Bearer ${token}`)
      .send(part)
      .expect(201);
    await request(app.getHttpServer())
      .post('/pc-parts')
      .set('Authorization', `Bearer ${token}`)
      .send(part)
      .expect(409);
  });

  it('returns 404 for a missing part', async () => {
    await request(app.getHttpServer())
      .get('/pc-parts/999')
      .set('Authorization', `Bearer ${token}`)
      .expect(404);
  });

  it('updates a part', async () => {
    const created = await request(app.getHttpServer())
      .post('/pc-parts')
      .set('Authorization', `Bearer ${token}`)
      .send(part)
      .expect(201);

    const response = await request(app.getHttpServer())
      .patch(`/pc-parts/${created.body.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ quantity: 10 })
      .expect(200);

    expect(response.body.quantity).toBe(10);
  });

  it('returns 404 when updating a missing part', async () => {
    await request(app.getHttpServer())
      .patch('/pc-parts/999')
      .set('Authorization', `Bearer ${token}`)
      .send({ quantity: 10 })
      .expect(404);
  });

  it('rejects requests without a token', async () => {
    await request(app.getHttpServer()).get('/pc-parts').expect(401);
  });
});

import request from 'supertest';
import express, { Express } from 'express';
import donorRouter from '../routes/donorRoutes';
import mockPrismaClient from '../__mocks__/mockPrismaClient'; // Mock Prisma

const app: Express = express();
app.use(express.json());
app.use('/donor', donorRouter);

describe('Donor API', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Clear mocks before each test to avoid interference
    });

    it('should create a new donor', async () => {
        const newDonor = {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
            contact: '1234567890',
            addressLine1: '123 Main St',
            state: 'Missouri',
            city: 'St. Louis',
            zipcode: '63108',
            emailOptIn: false,
        };

        mockPrismaClient.donor.create.mockResolvedValue({
            id: 1,
            ...newDonor,
        });

        const response = await request(app)
            .post('/donor')
            .send(newDonor)
            .expect(201)
            .expect('Content-Type', /json/);

        expect(response.body).toHaveProperty('id');
        expect(response.body.firstName).toBe('John');
        expect(mockPrismaClient.donor.create).toHaveBeenCalledTimes(1);
        expect(mockPrismaClient.donor.create).toHaveBeenCalledWith({
            data: { ...newDonor },
        });
    });

    it('should handle errors when creating a donor', async () => {
        const newDonor = {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
            contact: '1234567890',
            addressLine1: '123 Main St',
            state: 'Missouri',
            city: 'St. Louis',
            zipcode: '63101',
            emailOptIn: false,
        };

        mockPrismaClient.donor.create.mockRejectedValue(
            new Error('Database error'),
        );

        const response = await request(app)
            .post('/donor')
            .send(newDonor)
            .expect(500);

        expect(response.body.message).toBe('Error creating donor');
        expect(mockPrismaClient.donor.create).toHaveBeenCalled();
    });

    it('should get all donors', async () => {
        mockPrismaClient.donor.findMany.mockResolvedValue([
            {
                id: 1,
                firstName: 'John',
                lastName: 'Doe',
                email: 'john@example.com',
            },
        ]);

        const response = await request(app)
            .get('/donor')
            .expect(200)
            .expect('Content-Type', /json/);

        expect(response.body).toHaveLength(1);
        expect(response.body[0].firstName).toBe('John');
        expect(mockPrismaClient.donor.findMany).toHaveBeenCalled();
    });

    it('should handle errors when fetching donors', async () => {
        mockPrismaClient.donor.findMany.mockRejectedValue(
            new Error('Database error'),
        );

        const response = await request(app).get('/donor').expect(500);

        expect(response.body.message).toBe('Error fetching donors');
    });
});

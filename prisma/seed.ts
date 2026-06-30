import { PrismaClient, Prisma } from '@/generated/prisma/client';
import {UserCreateInput} from '@/generated/prisma/models';
import { PrismaPg } from "@prisma/adapter-pg";
import { faker } from '@faker-js/faker';
import "dotenv/config";

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
    adapter,
});

export async function seedUsers(prisma: PrismaClient) {
const inputs = Array.from({ length: 10 }).map(() => {

    return { 
        name: faker.person.fullName(),
        email:faker.internet.email(),
        
    }satisfies UserCreateInput;

}); 


await prisma.$transaction(
		inputs.map((input) => prisma.user.createMany({ data: input,skipDuplicates: true })),
	);
	return await prisma.user.findMany();
}




export async function main() {
    const users = await seedUsers(prisma);
    
}

main();
import { PrismaAdapter } from '@lucia-auth/adapter-prisma';
import { PrismaClient } from '@prisma/client';
import { env } from '$env/dynamic/private';

const prisma = global.__prisma || new PrismaClient();

if (env.NODE_ENV === 'development') {
	global.__prisma = prisma;
}

// Create a new PrismaAdapter instance with your session and user models
const adapter = new PrismaAdapter(prisma.session, prisma.user);

export { prisma, adapter };

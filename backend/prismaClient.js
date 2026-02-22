const { PrismaClient } = require('@prisma/client');

// Initialize Prisma directly so it natively parses TLS/SSL parameters 
// like `sslaccept=accept_invalid_certs` from the environment DATABASE_URL.
const prisma = new PrismaClient({
    log: ['error', 'warn'],
});

// Explicit database connection test with detailed error handling
prisma.$connect()
    .then(() => {
        console.log("✅ Prisma successfully connected to the database with TLS.");
    })
    .catch((err) => {
        console.error("❌ Prisma database connection failed:");
        console.error("Make sure your DATABASE_URL in .env includes: ?sslmode=require&sslaccept=accept_invalid_certs");
        console.error(err);
    });

module.exports = prisma;

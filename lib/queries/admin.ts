import prisma from "../prisma";

// 🔍 Get admin by email (login use)
export const getAdminByEmail = async (email: string) => {
  return await prisma.admin.findUnique({
    where: { email },
  });
};

// 🔍 Get admin by id
export const getAdminById = async (id: string) => {
  return await prisma.admin.findUnique({
    where: { id },
  });
};

// ➕ Create admin
export const createAdmin = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  return await prisma.admin.create({
    data,
  });
};

// 📋 Get all admins
export const getAllAdmins = async () => {
  return await prisma.admin.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

// ✏️ Update admin
export const updateAdmin = async (
  id: string,
  data: Partial<{
    name: string;
    email: string;
    password: string;
  }>
) => {
  return await prisma.admin.update({
    where: { id },
    data,
  });
};

// ❌ Delete admin
export const deleteAdmin = async (id: string) => {
  return await prisma.admin.delete({
    where: { id },
  });
};
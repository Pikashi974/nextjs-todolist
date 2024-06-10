import prisma from "./prisma";

export const getCategories = async () => {
  return await prisma.task.findMany();
};

export const getCategoryById = async (id: string) => {
  return await prisma.task.findUnique({ where: { id } });
};
export const createTask = async (title: string) => {
  return await prisma.task.create({
    data: {
      text: title,
      statut: "pending",
      dateCreation: getCurrentDate(),
    },
  });
};

export const setStatusComplete = async (id: string) => {
  return await prisma.task.update({
    where: { id },
    data: { statut: "complete" },
  });
};

export const deleteTask = async (id: string) => {
  return await prisma.task.delete({
    where: { id },
  });
};

function getCurrentDate() {
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();

  let formatted_dd = dd < 10 ? "0" + dd.toString() : dd.toString();
  let formatted_mm = mm < 10 ? "0" + mm.toString() : mm.toString();

  const formattedToday = formatted_dd + "/" + formatted_mm + "/" + yyyy;
  return formattedToday;
}

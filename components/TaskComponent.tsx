"use client";
import React, { useEffect, useState } from "react";
import { Task } from "@prisma/client";

export default function TaskComponent() {
  // main();

  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000" + "/api/categories", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setTasks(data);
      })
      .catch((error) => console.log(error));
  }, []);

  function validateTask(id: string) {
    fetch("http://localhost:3000" + "/api/categories", {
      method: "PUT",
      body: JSON.stringify({
        id: id,
        method: "setStatus",
      }),
    });
    fetch("http://localhost:3000" + "/api/categories", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setTasks(data);
      })
      .catch((error) => console.log(error));
  }
  function deleteTask(id: string) {
    fetch("http://localhost:3000" + "/api/categories", {
      method: "DELETE",
      body: JSON.stringify({
        id: id,
      }),
    });
    fetch("http://localhost:3000" + "/api/categories", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setTasks(data);
      })
      .catch((error) => console.log(error));
  }

  return (
    <div>
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        TODO List
      </h1>
      <a href="./add">
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">
          Ajouter
        </button>
      </a>
      <table className="border-collapse border border-slate-400 items-center">
        <thead>
          <tr>
            <th className="border border-slate-300 items-center">Title</th>
            <th className="border border-slate-300 items-center">Statut</th>
            <th className="border border-slate-300 items-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => {
            return (
              <tr key={index}>
                <td className="border border-slate-300 items-center">
                  <div className="flex flex-wrap">
                    <h1 className="flex-auto text-lg font-semibold text-slate-900">
                      {task.text}
                    </h1>
                    <div className="w-full flex-none text-sm font-medium text-slate-700 mt-2">
                      {task.dateCreation}
                    </div>
                  </div>
                </td>
                <td className="border border-slate-300 items-center">
                  <h1
                    className={
                      task.statut == "complete"
                        ? "rounded-full bg-green-600 text-center text-white font-bold py-2 px-4"
                        : "rounded-full bg-yellow-600 text-center text-white font-bold py-2 px-4"
                    }
                  >
                    {task.statut.toLocaleUpperCase()}
                  </h1>
                </td>
                <td className="border border-slate-300 justify-center h-16 flex ">
                  {task.statut == "complete" ? (
                    ""
                  ) : (
                    <button
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
                      onClick={() => validateTask(task.id)}
                    >
                      Valider
                    </button>
                  )}
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                    onClick={() => deleteTask(task.id)}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

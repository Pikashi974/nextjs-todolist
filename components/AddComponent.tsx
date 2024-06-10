"use client";
import React, { useEffect, useState } from "react";
import { Task } from "@prisma/client";

export default function AddComponent() {
  const [firstName, setFirstName] = useState("");
  function addTask() {
    if (firstName != "") {
      fetch("./api/categories", {
        method: "POST",
        body: JSON.stringify({
          titre: firstName,
        }),
      });
      location.href = "/";
    }
  }
  return (
    <div>
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Ajouter une tache
      </h1>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Titre
        </label>
        <input
          type="text"
          id="titreTODO"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Titre"
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </div>
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
        onClick={() => addTask()}
      >
        Ajouter
      </button>
    </div>
  );
}

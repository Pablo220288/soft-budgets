export const permissionsDefault = [
  {
    ref: "superadmin",
    data: [
      {
        id: "user",
        name: "Usuarios",
        permissions: [
          {
            id: "viewUser",
            name: "Ver",
            value: true,
          },
          {
            id: "createUser",
            name: "Crear",
            value: true,
          },
          {
            id: "editUser",
            name: "Editar",
            value: true,
          },
          {
            id: "deleteUser",
            name: "Eliminar",
            value: true,
          },
        ],
      },
      {
        id: "categorie",
        name: "Categorias",
        permissions: [
          {
            id: "viewCategorie",
            name: "Ver",
            value: true,
          },
          {
            id: "createCategorie",
            name: "Crear",
            value: true,
          },
          {
            id: "editCategorie",
            name: "Editar",
            value: true,
          },
          {
            id: "deleteCategorie",
            name: "Eliminar",
            value: true,
          },
        ],
      },
      {
        id: "budgets",
        name: "Presupuestos",
        permissions: [
          {
            id: "viewBudgets",
            name: "Ver",
            value: true,
          },
          {
            id: "createBudgets",
            name: "Crear",
            value: true,
          },
          {
            id: "editBudgets",
            name: "Editar",
            value: true,
          },
          {
            id: "deleteBudgets",
            name: "Eliminar",
            value: true,
          },
        ],
      },
    ],
  },
  {
    ref: "admin",
    data: [
      {
        id: "user",
        name: "Usuarios",
        permissions: [
          {
            id: "viewUser",
            name: "Ver",
            value: true,
          },
          {
            id: "createUser",
            name: "Crear",
            value: true,
          },
          {
            id: "editUser",
            name: "Editar",
            value: true,
          },
          {
            id: "deleteUser",
            name: "Eliminar",
            value: false,
          },
        ],
      },
      {
        id: "categorie",
        name: "Categorias",
        permissions: [
          {
            id: "viewCategorie",
            name: "Ver",
            value: true,
          },
          {
            id: "createCategorie",
            name: "Crear",
            value: true,
          },
          {
            id: "editCategorie",
            name: "Editar",
            value: true,
          },
          {
            id: "deleteCategorie",
            name: "Eliminar",
            value: false,
          },
        ],
      },
      {
        id: "budgets",
        name: "Presupuestos",
        permissions: [
          {
            id: "viewBudgets",
            name: "Ver",
            value: true,
          },
          {
            id: "createBudgets",
            name: "Crear",
            value: true,
          },
          {
            id: "editBudgets",
            name: "Editar",
            value: true,
          },
          {
            id: "deleteBudgets",
            name: "Eliminar",
            value: false,
          },
        ],
      },
    ],
  },
  {
    ref: "moderator",
    data: [
      {
        id: "user",
        name: "Usuarios",
        permissions: [
          {
            id: "viewUser",
            name: "Ver",
            value: true,
          },
          {
            id: "createUser",
            name: "Crear",
            value: true,
          },
          {
            id: "editUser",
            name: "Editar",
            value: false,
          },
          {
            id: "deleteUser",
            name: "Eliminar",
            value: false,
          },
        ],
      },
      {
        id: "categorie",
        name: "Categorias",
        permissions: [
          {
            id: "viewCategorie",
            name: "Ver",
            value: true,
          },
          {
            id: "createCategorie",
            name: "Crear",
            value: true,
          },
          {
            id: "editCategorie",
            name: "Editar",
            value: false,
          },
          {
            id: "deleteCategorie",
            name: "Eliminar",
            value: false,
          },
        ],
      },
      {
        id: "budgets",
        name: "Presupuestos",
        permissions: [
          {
            id: "viewBudgets",
            name: "Ver",
            value: true,
          },
          {
            id: "createBudgets",
            name: "Crear",
            value: true,
          },
          {
            id: "editBudgets",
            name: "Editar",
            value: false,
          },
          {
            id: "deleteBudgets",
            name: "Eliminar",
            value: false,
          },
        ],
      },
    ],
  },
  {
    ref: "user",
    data: [
      {
        id: "user",
        name: "Usuarios",
        permissions: [
          {
            id: "viewUser",
            name: "Ver",
            value: true,
          },
          {
            id: "createUser",
            name: "Crear",
            value: false,
          },
          {
            id: "editUser",
            name: "Editar",
            value: false,
          },
          {
            id: "deleteUser",
            name: "Eliminar",
            value: false,
          },
        ],
      },
      {
        id: "categorie",
        name: "Categorias",
        permissions: [
          {
            id: "viewCategorie",
            name: "Ver",
            value: true,
          },
          {
            id: "createCategorie",
            name: "Crear",
            value: false,
          },
          {
            id: "editCategorie",
            name: "Editar",
            value: false,
          },
          {
            id: "deleteCategorie",
            name: "Eliminar",
            value: false,
          },
        ],
      },
      {
        id: "budgets",
        name: "Presupuestos",
        permissions: [
          {
            id: "viewBudgets",
            name: "Ver",
            value: true,
          },
          {
            id: "createBudgets",
            name: "Crear",
            value: false,
          },
          {
            id: "editBudgets",
            name: "Editar",
            value: false,
          },
          {
            id: "deleteBudgets",
            name: "Eliminar",
            value: false,
          },
        ],
      },
    ],
  },
];
